/* Builds the page from the data in data.js. */
(function () {
  const { LEGS, STOPS, MOVES, FLIGHTS, PLACES, CHECKLIST } = window;
  const byId = Object.fromEntries(STOPS.map(s => [s.id, s]));
  const $ = sel => document.querySelector(sel);
  const DAY = 86400000;
  const day = iso => new Date(iso + "T00:00:00");
  const fmt = iso => day(iso).toLocaleDateString("en-NZ", { day: "numeric", month: "short" });

  // ---------- Hero numbers ----------
  const tripStart = day(STOPS[0].start);
  const tripEnd = day(STOPS[STOPS.length - 1].end);
  const daysToGo = Math.max(0, Math.ceil((tripStart - new Date()) / DAY));
  const countries = new Set(STOPS.filter(s => s.country !== "New Zealand").map(s => s.country));
  const flightHours = FLIGHTS.reduce((t, f) => t + f.hours, 0);
  $("#stats").innerHTML = [
    [daysToGo, "days to go"],
    [Math.round((tripEnd - tripStart) / DAY), "days away"],
    [countries.size, "countries"],
    [FLIGHTS.length, "flights"],
    [Math.round(flightHours), "hours flying"]
  ].map(([n, label]) => `<div class="stat"><b>${n}</b><span>${label}</span></div>`).join("");

  // ---------- Map ----------
  const map = L.map("route-map", { scrollWheelZoom: false, worldCopyJump: false, zoomSnap: 0.25 });
  // Set the view first so the shapes have somewhere to draw.
  const views = {
    all: L.latLngBounds(STOPS.map(s => [s.lat, s.lng])),
    europe: L.latLngBounds(STOPS.filter(s => s.lng > -15 && s.lng < 30).map(s => [s.lat, s.lng]))
  };
  map.fitBounds(views.all, { padding: [30, 30] });
  const css = getComputedStyle(document.documentElement);
  const visited = new Set(["380", "826", "528", "276", "756", "250", "056", "702", "554", "344"]);
  const world = topojson.feature(WORLD, WORLD.objects.countries);
  L.geoJSON(world, {
    style: f => ({
      color: css.getPropertyValue("--border-country").trim(),
      weight: 0.8,
      fillColor: css.getPropertyValue(visited.has(f.id) ? "--land-visit" : "--land").trim(),
      fillOpacity: 1
    }),
    interactive: false
  }).addTo(map);

  // Curved line for flights so they look like flight paths.
  function arc(a, b) {
    const pts = [];
    const dx = b[1] - a[1], dy = b[0] - a[0];
    const bend = 0.18;
    const c = [(a[0] + b[0]) / 2 + dx * bend, (a[1] + b[1]) / 2 - dy * bend];
    for (let t = 0; t <= 1.0001; t += 0.04) {
      pts.push([
        (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
        (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]
      ]);
    }
    return pts;
  }

  MOVES.forEach(m => {
    const a = byId[m.from], b = byId[m.to];
    const colour = LEGS[b.leg].colour;
    const from = [a.lat, a.lng], to = [b.lat, b.lng];
    if (m.mode === "fly") {
      L.polyline(arc(from, to), { color: colour, weight: 2.5, dashArray: "6 7", opacity: 0.9 }).addTo(map);
    } else {
      L.polyline([from, to], { color: colour, weight: 3.5, opacity: 0.9 }).addTo(map);
    }
  });

  let n = 0;
  STOPS.forEach(s => {
    if (s.hidePin) return;
    n += 1;
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin" style="background:${LEGS[s.leg].colour}">${n}</div>`,
      iconSize: [26, 26], iconAnchor: [13, 13]
    });
    L.marker([s.lat, s.lng], { icon, title: s.name })
      .bindPopup(`<b>${s.flag} ${s.name}, ${s.country}</b><br>${fmt(s.start)}${s.end !== s.start ? " to " + fmt(s.end) : ""}${s.note ? "<br>" + s.note : ""}`)
      .addTo(map);
  });

  document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach(b => b.classList.toggle("is-on", b === btn));
    map.flyToBounds(views[btn.dataset.view], { padding: [40, 40], duration: 0.8 });
  }));

  $("#legend").innerHTML =
    Object.values(LEGS).map(l => `<span><i style="background:${l.colour}"></i>${l.name}</span>`).join("") +
    `<span><i class="line dash"></i>Flight</span><span><i class="line"></i>Coach, train or car</span>`;

  // ---------- Flights ----------
  const maxHours = Math.max(...FLIGHTS.map(f => f.hours));
  $("#flight-total").textContent = `${FLIGHTS.length} flights, about ${Math.round(flightHours)} hours in the air. Times are rough.`;
  $("#flight-list").innerHTML = FLIGHTS.map(f => `
    <div class="flight">
      <div>
        <div class="codes">${f.from} → ${f.to}</div>
        <div class="cities">${f.fromCity} to ${f.toCity} · ${f.date}</div>
      </div>
      <div class="bar-wrap"><div class="bar" style="width:calc(${(f.hours / maxHours) * 100}% - 14px);background:${LEGS[f.leg].colour}"></div></div>
      <div class="hours">${f.hours}h</div>
    </div>`).join("");

  // ---------- Timeline ----------
  const span = tripEnd - tripStart;
  const pct = d => ((day(d) - tripStart) / span) * 100;
  const blocks = [];
  STOPS.forEach(s => {
    const last = blocks[blocks.length - 1];
    if (s.start === s.end) return;
    if (last && last.leg === s.leg) { last.end = s.end; return; }
    blocks.push({ leg: s.leg, start: s.start, end: s.end });
  });
  const scaleDates = ["2027-03-20", "2027-03-26", "2027-04-01", "2027-04-11", "2027-04-20", "2027-05-01"];
  $("#gantt").innerHTML =
    `<div class="gantt-row">${blocks.map(b => `
      <div class="gantt-block" title="${LEGS[b.leg].name}: ${fmt(b.start)} to ${fmt(b.end)}"
        style="left:${pct(b.start)}%;width:${pct(b.end) - pct(b.start)}%;background:${LEGS[b.leg].colour}">${LEGS[b.leg].name}</div>`).join("")}
    </div>
    <div class="gantt-scale">${scaleDates.map(t => `<span style="left:${pct(t)}%">${fmt(t)}</span>`).join("")}</div>`;

  $("#stop-list").innerHTML = STOPS.map(s => `
    <li style="--dot:${LEGS[s.leg].colour}">
      <div class="when">${fmt(s.start)}${s.end !== s.start ? " to " + fmt(s.end) : ""} · ${LEGS[s.leg].name}</div>
      <div class="where">${s.flag} ${s.name}, ${s.country}</div>
      ${s.note ? `<div class="note">${s.note}</div>` : ""}
    </li>`).join("");

  // ---------- Places ----------
  function renderPlaces(filter) {
    const list = PLACES.filter(p => filter === "all" || (filter === "route") === p.onRoute);
    $("#place-cards").innerHTML = list.map(p => {
      const tag = p.onRoute
        ? `<span class="tag" style="background:${LEGS[p.leg].colour}">${LEGS[p.leg].name}</span>`
        : `<span class="tag maybe">Maybe</span>`;
      return `
      <article class="card">
        <div class="photo" data-wiki="${p.wiki}" ${p.img ? `style="background-image:url('${p.img}')"` : ""}>${p.flag}</div>
        <div class="body">
          ${tag}
          <h3>${p.name}</h3>
          <div class="country">${p.flag} ${p.country}</div>
          <ul>${p.todo.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>
      </article>`;
    }).join("");
    applyPhotos();
  }

  // Ask Wikipedia for one photo per place, all in one request.
  const photos = {};
  function applyPhotos() {
    document.querySelectorAll(".photo[data-wiki]").forEach(el => {
      const url = photos[el.dataset.wiki];
      if (url && !el.style.backgroundImage) {
        el.style.backgroundImage = `url("${url}")`;
        el.classList.add("loaded");
      }
    });
  }
  async function loadPhotos() {
    const titles = PLACES.filter(p => !p.img).map(p => p.wiki);
    const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1" +
      "&prop=pageimages&piprop=thumbnail&pithumbsize=800&titles=" + encodeURIComponent(titles.join("|"));
    try {
      const data = await (await fetch(url)).json();
      const back = {};
      (data.query.normalized || []).forEach(x => { back[x.to] = x.from; });
      (data.query.redirects || []).forEach(x => { back[x.to] = back[x.from] || x.from; });
      Object.values(data.query.pages).forEach(pg => {
        if (pg.thumbnail) photos[back[pg.title] || pg.title] = pg.thumbnail.source;
      });
      applyPhotos();
    } catch (e) {
      // No internet. The cards keep their flag instead of a photo.
    }
  }

  document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.toggle("is-on", b === btn));
    renderPlaces(btn.dataset.filter);
  }));
  renderPlaces("route");
  loadPhotos();

  // ---------- Checklist ----------
  const KEY = "trip-checklist";
  let ticks = {};
  try { ticks = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { ticks = {}; }
  const total = CHECKLIST.reduce((t, g) => t + g.items.length, 0);
  function updateCount() {
    const done = Object.values(ticks).filter(Boolean).length;
    $("#check-count").textContent = `${done} of ${total} done.`;
  }
  $("#check-groups").innerHTML = CHECKLIST.map(g => `
    <div class="check-group">
      <h3>${g.group}</h3>
      ${g.items.map(item => `<label><input type="checkbox" data-item="${item}" ${ticks[item] ? "checked" : ""}><span>${item}</span></label>`).join("")}
    </div>`).join("");
  document.querySelectorAll("[data-item]").forEach(box => box.addEventListener("change", () => {
    ticks[box.dataset.item] = box.checked;
    try { localStorage.setItem(KEY, JSON.stringify(ticks)); } catch (e) { /* not saved, that's ok */ }
    updateCount();
  }));
  updateCount();
})();
