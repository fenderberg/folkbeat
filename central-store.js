import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./supabase-config.js";

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
});

let userId = null;
let draining = false;

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function publicData(value) {
  const clean = {};
  for (const [key, item] of Object.entries(value || {})) {
    if (!key.startsWith("_")) clean[key] = item;
  }
  return clean;
}

async function ensureAnonymousUser() {
  const { data: sessionData } = await client.auth.getSession();
  if (sessionData.session?.user) return sessionData.session.user;
  const { data, error } = await client.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
}

async function perform(operation) {
  const table = operation.kind === "groove" ? "grooves" : "songs";
  if (operation.action === "delete") {
    const { error } = await client.from(table).delete().eq("id", operation.payload.id);
    if (error) throw error;
    return;
  }

  const data = publicData(operation.payload);
  const row = {
    id: data.id,
    owner_id: userId,
    name: data.name || (operation.kind === "groove" ? "Groove" : "Nummer"),
    data,
    updated_at: new Date().toISOString()
  };
  const { error } = await client.from(table).upsert(row, { onConflict: "id" });
  if (error) throw error;
}

async function loadPublic() {
  const [grooveResult, songResult] = await Promise.all([
    client.from("grooves").select("id, owner_id, name, data, created_at, updated_at").order("updated_at", { ascending: false }),
    client.from("songs").select("id, owner_id, name, data, created_at, updated_at").order("updated_at", { ascending: false })
  ]);
  if (grooveResult.error) throw grooveResult.error;
  if (songResult.error) throw songResult.error;

  const grooves = grooveResult.data.map(row => ({
    ...row.data,
    id: row.id,
    name: row.name,
    custom: true,
    _cloud: true,
    _ownerId: row.owner_id,
    _readOnly: row.owner_id !== userId
  }));
  const songs = songResult.data.map(row => ({
    ...row.data,
    id: row.id,
    name: row.name,
    _cloud: true,
    _ownerId: row.owner_id,
    _readOnly: row.owner_id !== userId
  }));
  emit("folkbeat:cloud-ready", { userId, grooves, songs });
}

async function drainQueue() {
  if (draining || !userId) return;
  draining = true;
  let changed = false;
  try {
    const queue = JSON.parse(localStorage.getItem("folkbeat.cloudQueue") || "[]");
    for (const operation of [...queue]) {
      try {
        await perform(operation);
        const current = JSON.parse(localStorage.getItem("folkbeat.cloudQueue") || "[]");
        localStorage.setItem("folkbeat.cloudQueue", JSON.stringify(current.filter(item => item.opId !== operation.opId)));
        changed = true;
      } catch (error) {
        emit("folkbeat:cloud-status", { state: "error", message: error.message });
        break;
      }
    }
    if (changed) await loadPublic();
  } finally {
    draining = false;
  }
}

async function start() {
  try {
    emit("folkbeat:cloud-status", { state: "connecting", message: "Verbinden…" });
    const user = await ensureAnonymousUser();
    userId = user.id;
    window.FolkBeatCloud = { client, userId, refresh: loadPublic, drainQueue };
    await drainQueue();
    await loadPublic();
    emit("folkbeat:cloud-status", { state: "online", message: "Centraal gesynchroniseerd" });
  } catch (error) {
    emit("folkbeat:cloud-status", { state: "error", message: error.message });
  }
}

window.addEventListener("folkbeat:cloud-queue", drainQueue);
window.addEventListener("online", async () => {
  if (!userId) await start(); else { await drainQueue(); await loadPublic(); }
});

start();
