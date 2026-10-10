#!/usr/bin/env node
// Picks photos for every place in js/data.js and saves them in js/photos.js.
//
//   node tools/pick-photos.mjs                    fill any gaps (new places, changed searches)
//   node tools/pick-photos.mjs venice rome        only look at these places
//   node tools/pick-photos.mjs --refresh venice   pick Venice again from scratch
//   node tools/pick-photos.mjs --refresh all      pick everything again
//   node tools/pick-photos.mjs --verbose          also print the runners up
//
// Photos you drop in choose-photos.html are never picked again, and photos you
// pick there by hand stay put, even with --refresh.
// Needs Node 18 or newer and the internet. Nothing to install.
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PhotoRank = createRequire(import.meta.url)(path.join(root, "js/photo-rank.js"));
const photosFile = path.join(root, "js/photos.js");
const UA = "hoilday-trip-site/1.0 (https://github.com/nickdm26/hoilday) photo picker";
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- Read the site's data files ----------
function load(file) {
  const sandbox = { window: {} };
  if (fs.existsSync(file)) vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window;
}
const { PLACES } = load(path.join(root, "js/data.js"));
const PHOTOS = load(photosFile).PHOTOS || {};

// ---------- Options ----------
const args = process.argv.slice(2);
const flag = name => args.includes(name);
const ids = args.filter(a => !a.startsWith("--"));
const fromEnv = (process.env.REFRESH || "").trim().split(/[\s,]+/).filter(Boolean);
const refresh = flag("--refresh") || fromEnv.length > 0;
const only = new Set(fromEnv.length ? fromEnv : ids);
const wanted = p => only.size === 0 || only.has("all") || only.has(p.id);

// ---------- Talk to Commons politely ----------
let calls = 0;
async function fetchJson(url) {
  for (let attempt = 1; ; attempt++) {
    await sleep(120);
    calls++;
    const res = await fetch(url, { headers: { "User-Agent": UA, "Api-User-Agent": UA } });
    if (res.ok) {
      const data = await res.json();
      if (data.error) throw new Error(`Commons said: ${data.error.info}`);
      if (data.warnings && flag("--verbose")) console.log("   warning:", JSON.stringify(data.warnings));
      return data;
    }
    if (attempt >= 4 || ![429, 500, 502, 503, 504].includes(res.status)) throw new Error(`HTTP ${res.status} for ${url}`);
    await sleep(1000 * 2 ** attempt);
  }
}

function badge(p) { return [p.featured && "featured", p.quality && "quality", p.valued && "valued"].filter(Boolean).join("+") || "other"; }
function log(subject, ranked, chosen) {
  const top = chosen[0];
  console.log(`   ${top ? "✓" : "✗"} ${subject.label} (${subject.q}): ${ranked.length} on topic` +
    (top ? `, picked ${chosen.length}. Best: ${top.file} [${badge(top)}, score ${top.score}]` : ", none usable"));
  if (flag("--verbose")) ranked.slice(0, 8).forEach(p => console.log(`        ${p.score}\t${p.rel.toFixed(2)}\t${badge(p)}\t${p.w}x${p.h}\t${p.file}`));
}

// ---------- Pick ----------
const out = {};
let failed = 0;
// Photos on other places, so the same photo doesn't show up on two pages.
// A place still to be picked from scratch doesn't count.
const filesOf = entry => Object.keys(entry || {}).filter(k => k !== "skip").flatMap(k => entry[k].photos.map(p => p.file));
for (const place of PLACES) {
  const before = PHOTOS[place.id] || {};
  if (!wanted(place)) { if (PHOTOS[place.id]) out[place.id] = before; continue; }
  console.log(`${place.flag || ""} ${place.name}`);
  const taken = PLACES.filter(o => o.id !== place.id)
    .flatMap(o => filesOf(out[o.id] || (refresh && wanted(o) ? null : PHOTOS[o.id])));
  try {
    out[place.id] = await PhotoRank.pickForPlace(place, before, fetchJson, { refresh: refresh && wanted(place), log, taken });
  } catch (e) {
    failed++;
    console.log(`   ✗ ${e.message}`);
    out[place.id] = before;
  }
}
fs.writeFileSync(photosFile, PhotoRank.fileText(out, PLACES.map(p => p.id)));
console.log(`\nSaved js/photos.js after ${calls} requests to Commons.${failed ? ` ${failed} place(s) failed, see above.` : ""}`);
if (failed) process.exitCode = 1;
