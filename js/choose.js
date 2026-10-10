/* The photo chooser. Swap the photos picked for a place, then save a new js/photos.js. */
(function () {
  const { PLACES, PhotoRank } = window;
  const $ = sel => document.querySelector(sel);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const copy = o => JSON.parse(JSON.stringify(o));
  const fetchJson = url => fetch(url).then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });

  document.addEventListener("error", e => { if (e.target.tagName === "IMG") e.target.classList.add("broken"); }, true);

  // The photos.js this page was opened with, and the working copy you change.
  const base = window.PHOTOS || {};
  const baseText = JSON.stringify(base);
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0; return String(h); };
  let work = copy(base);

  // Unsaved changes from last time are kept in this browser, as long as photos.js hasn't changed since.
  const KEY = "trip-photo-edits";
  try {
    const kept = JSON.parse(localStorage.getItem(KEY) || "null");
    if (kept && kept.base === hash(baseText)) work = kept.work;
    else if (kept) {
      localStorage.removeItem(KEY);
      $("#notice").textContent = "Your unsaved changes were for an older photos.js, so they were cleared.";
      $("#notice").hidden = false;
    }
  } catch (e) { /* no storage, that's ok */ }

  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify({ base: hash(baseText), work })); } catch (e) { /* fine */ }
    updateBar();
  }

  // ---------- Save bar ----------
  let savedText = null;
  function changes() {
    let n = 0;
    PLACES.forEach(p => {
      const a = work[p.id] || {}, b = base[p.id] || {};
      new Set([...Object.keys(a), ...Object.keys(b)]).forEach(k => { if (k !== "skip" && JSON.stringify(a[k]) !== JSON.stringify(b[k])) n++; });
    });
    return n;
  }
  function updateBar() {
    const n = changes();
    const text = PhotoRank.fileText(work, PLACES.map(p => p.id));
    $("#save-bar").hidden = n === 0;
    $("#save-text").textContent = text === savedText
      ? "Saved. Put it in js/ if you haven't, then reload the trip site."
      : `${n} change${n === 1 ? "" : "s"} not saved yet.`;
  }
  $("#save").addEventListener("click", async () => {
    const text = PhotoRank.fileText(work, PLACES.map(p => p.id));
    try {
      if (window.showSaveFilePicker) {
        const file = await window.showSaveFilePicker({ suggestedName: "photos.js", types: [{ description: "JavaScript", accept: { "text/javascript": [".js"] } }] });
        const out = await file.createWritable();
        await out.write(text);
        await out.close();
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
        a.download = "photos.js";
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      savedText = text;
      try { localStorage.removeItem(KEY); } catch (e) { /* fine */ }
      updateBar();
    } catch (e) {
      if (e.name !== "AbortError") alert("Couldn't save: " + e.message);
    }
  });
  $("#undo").addEventListener("click", () => {
    if (!confirm("Undo every change since photos.js was saved?")) return;
    work = copy(base);
    try { localStorage.removeItem(KEY); } catch (e) { /* fine */ }
    show(place.id);
    updateBar();
  });

  // ---------- Places ----------
  const groups = [["On my route", PLACES.filter(p => p.onRoute)], ["Maybe ideas", PLACES.filter(p => !p.onRoute)]];
  $("#place").innerHTML = groups.map(([label, list]) =>
    `<optgroup label="${label}">${list.map(p => `<option value="${p.id}">${p.flag} ${esc(p.name)}</option>`).join("")}</optgroup>`).join("");
  $("#place").addEventListener("change", e => { location.hash = e.target.value; });
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));

  let place;
  const open = {}; // subject key to the search shown under it
  function show(id) {
    const next = PLACES.find(p => p.id === id) || PLACES[0];
    if (!place || next.id !== place.id) Object.keys(open).forEach(k => delete open[k]);
    place = next;
    $("#place").value = place.id;
    const entry = work[place.id];
    $("#subjects").innerHTML = (entry ? "" : `
      <div class="tip">No photos picked for ${esc(place.name)} yet. <button class="chip" data-act="fill">Find photos now</button></div>`) +
      PhotoRank.subjectsFor(place).map(s => subjectHtml(s, entry && entry[s.key])).join("");
    Object.keys(open).forEach(key => showOptions(key, open[key]));
  }

  const badges = p => (p.featured ? "★ " : "") + (p.quality ? "✓ " : "") + (p.valued ? "◆ " : "");

  function subjectHtml(s, sub) {
    const photos = (sub && sub.photos) || [];
    const old = sub && sub.q !== s.q;
    return `
      <section class="subject" data-key="${esc(s.key)}">
        <div class="subject-head">
          <h2>${esc(s.label)}</h2>
          ${sub && sub.hand ? `<span class="hand">Picked by you</span>` : ""}
          <span class="small muted">Search: ${esc(s.q)}</span>
        </div>
        ${old ? `<p class="small muted">The search changed since these were picked. The picker will pick new ones.</p>` : ""}
        <div class="picks ${s.kind === "gallery" ? "is-gallery" : ""}">
          ${photos.length ? photos.map((ph, i) => `
            <figure class="pick">
              <img src="${esc(PhotoRank.sized(ph, 500))}" alt="${esc(ph.caption)}" loading="lazy">
              <div class="pick-tools">
                ${s.kind === "gallery" && i > 0 ? `<button data-act="first" data-i="${i}" title="Show this one big" aria-label="Show this one big">⬆</button>` : ""}
                <button data-act="drop" data-i="${i}" title="Don't use this photo" aria-label="Don't use this photo">✕</button>
              </div>
              <figcaption>${badges(ph)}${esc(ph.caption)} <span class="muted">by ${esc(ph.by)}</span></figcaption>
            </figure>`).join("") : `<p class="small muted">No photo yet.</p>`}
        </div>
        <div class="subject-tools">
          <button class="chip" data-act="more">Show other photos</button>
          <form class="find" data-act="find">
            <input name="q" placeholder="Or search for something else" aria-label="Search Wikimedia Commons">
            <button class="chip">Search</button>
          </form>
        </div>
        <div class="options"></div>
      </section>`;
  }

  // ---------- Other photos ----------
  // "Show other photos" checks them like the picker does, so they must be from the place.
  // Your own searches are not checked for the place.
  const found = {};
  const subjectFor = key => PhotoRank.subjectsFor(place).find(s => s.key === key);
  const findId = (s, q) => [place.id, s.kind, q].join("|");
  async function showOptions(key, q) {
    const s = subjectFor(key);
    const box = document.querySelector(`.subject[data-key="${CSS.escape(key)}"] .options`);
    if (!s || !box) return;
    open[key] = q;
    const id = findId(s, q);
    if (!found[id]) box.innerHTML = `<p class="small muted">Looking on Wikimedia Commons…</p>`;
    try {
      found[id] = found[id] || PhotoRank.candidates(q === s.q ? s : { kind: s.kind, q, home: s.home }, fetchJson);
      const list = await found[id];
      const using = new Set(((work[place.id] || {})[key] || { photos: [] }).photos.map(p => p.file));
      box.innerHTML = list.length ? `
        <p class="small muted">${list.length} on topic photos for “${esc(q)}”, best first. ★ Featured, ✓ Quality, ◆ Valued. Tap one to use it.</p>
        <div class="option-grid">${list.slice(0, 48).map((p, i) => `
          <button class="option ${using.has(p.file) ? "is-on" : ""}" data-act="use" data-i="${i}" data-q="${esc(q)}" title="${esc(p.caption)}">
            <img src="${esc(PhotoRank.sized(p, 330))}" alt="" loading="lazy">
            <span>${badges(p)}${p.w} × ${p.h}</span>
          </button>`).join("")}</div>`
        : `<p class="small muted">Nothing on topic for “${esc(q)}”. Try other words.</p>`;
    } catch (e) {
      delete found[id];
      box.innerHTML = `<p class="small muted">Couldn't reach Wikimedia Commons. Check the internet and try again.</p>`;
    }
  }

  // ---------- Changes ----------
  function subjectOf(key, q) {
    const entry = work[place.id] = work[place.id] || { skip: [] };
    if (!entry[key] || entry[key].q !== q) entry[key] = { q, photos: [] };
    entry[key].hand = true;
    return entry[key];
  }

  // Use a photo from the options. In the gallery, tapping one adds or removes it.
  async function use(key, q, i) {
    const s = subjectFor(key);
    const p = (await found[findId(s, q)])[i];
    const sub = subjectOf(key, s.q);
    const entry = work[place.id];
    entry.skip = (entry.skip || []).filter(f => f !== p.file);
    if (s.kind === "gallery") {
      const at = sub.photos.findIndex(x => x.file === p.file);
      if (at >= 0) sub.photos.splice(at, 1);
      else sub.photos.push(PhotoRank.slim(p));
    } else {
      sub.photos = [PhotoRank.slim(p)];
    }
    remember();
    show(place.id);
  }

  // Drop a photo for good, then let the picker fill the gap with the next best one.
  async function drop(key, i) {
    const s = subjectFor(key);
    const sub = subjectOf(key, s.q);
    const [gone] = sub.photos.splice(i, 1);
    const entry = work[place.id];
    entry.skip = [...new Set([...(entry.skip || []), gone.file])];
    remember();
    show(place.id);
    await fill("Finding the next best photo…");
  }

  function first(key, i) {
    const sub = subjectOf(key, subjectFor(key).q);
    sub.photos.unshift(...sub.photos.splice(i, 1));
    remember();
    show(place.id);
  }

  // Fill any gaps for this place, the same way tools/pick-photos.mjs does.
  // Photos on other places are left out, so one photo doesn't show up twice.
  async function fill(message) {
    const p = place;
    const note = $("#notice");
    note.textContent = message;
    note.hidden = false;
    const taken = PLACES.filter(o => o.id !== p.id && work[o.id]).flatMap(o =>
      Object.keys(work[o.id]).filter(k => k !== "skip").flatMap(k => work[o.id][k].photos.map(ph => ph.file)));
    try {
      work[p.id] = await PhotoRank.pickForPlace(p, work[p.id] || {}, fetchJson, { taken });
      note.hidden = true;
      remember();
    } catch (e) {
      note.textContent = "Couldn't reach Wikimedia Commons, so the gap stays for now. The picker on GitHub fills it later.";
    }
    if (place === p) show(p.id);
  }

  $("#subjects").addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn || btn.tagName === "FORM") return;
    const key = btn.closest(".subject") && btn.closest(".subject").dataset.key;
    const act = btn.dataset.act;
    if (act === "more") showOptions(key, subjectFor(key).q);
    else if (act === "use") use(key, btn.dataset.q, +btn.dataset.i);
    else if (act === "drop") drop(key, +btn.dataset.i);
    else if (act === "first") first(key, +btn.dataset.i);
    else if (act === "fill") fill("Finding photos…");
  });
  $("#subjects").addEventListener("submit", e => {
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q) showOptions(e.target.closest(".subject").dataset.key, q);
  });

  show(location.hash.slice(1));
  updateBar();
})();
