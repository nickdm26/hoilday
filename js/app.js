/* Builds the page from the data in data.js. */
(function () {
  const { LEGS, STOPS, MOVES, FLIGHTS, PLACES, CHECKLIST, EVENTS } = window;
  const byId = Object.fromEntries(STOPS.map(s => [s.id, s]));
  const $ = sel => document.querySelector(sel);
  const DAY = 86400000;
  const day = iso => new Date(iso + "T00:00:00");
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmt = s => day(s).toLocaleDateString("en-NZ", { day: "numeric", month: "short" });
  const fmtLong = s => day(s).toLocaleDateString("en-NZ", { weekday: "long", day: "numeric", month: "long" });

  const tripStart = day(STOPS[0].start);
  const tripEnd = day(STOPS[STOPS.length - 1].end);
  const flightHours = FLIGHTS.reduce((t, f) => t + f.hours, 0);

  // ---------- Tabs ----------
  const TABS = ["overview", "map", "flights", "calendar", "places", "checklist"];
  const onShow = {};
  function showTab() {
    const name = TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "overview";
    TABS.forEach(t => { $("#tab-" + t).hidden = t !== name; });
    document.querySelectorAll("[data-tab]").forEach(a => a.classList.toggle("is-on", a.dataset.tab === name));
    window.scrollTo(0, 0);
    if (onShow[name]) onShow[name]();
  }
  window.addEventListener("hashchange", showTab);

  // ---------- Overview: live countdown ----------
  function tick() {
    const left = Math.max(0, tripStart - new Date());
    const parts = [
      [Math.floor(left / DAY), "days"],
      [Math.floor(left / 3600000) % 24, "hours"],
      [Math.floor(left / 60000) % 60, "mins"],
      [Math.floor(left / 1000) % 60, "secs"]
    ];
    $("#countdown").innerHTML =
      `<div class="countdown-label">${left > 0 ? "Until I leave for Singapore" : "The trip has started!"}</div>
       <div class="countdown-row">${parts.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>`;
  }
  tick();
  setInterval(tick, 1000);

  const countries = new Set(STOPS.filter(s => s.country !== "New Zealand").map(s => s.country));
  $("#stats").innerHTML = [
    [Math.round((tripEnd - tripStart) / DAY), "days away"],
    [countries.size, "countries"],
    [FLIGHTS.length, "flights"],
    [Math.round(flightHours), "hours flying"]
  ].map(([n, label]) => `<div class="stat"><b>${n}</b><span>${label}</span></div>`).join("");

  // Trip at a glance bar
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

  // ---------- Map (built the first time the tab opens) ----------
  const legendHtml = Object.values(LEGS).map(l => `<span><i style="background:${l.colour}"></i>${l.name}</span>`).join("");
  $("#legend").innerHTML = legendHtml +
    `<span><i class="line dash"></i>Flight</span><span><i class="line"></i>Coach, train or car</span>`;

  let map;
  onShow.map = () => {
    if (map) { map.invalidateSize(); return; }
    map = L.map("route-map", { worldCopyJump: false, zoomSnap: 0.25, maxZoom: 18 });
    // Set the view first so the shapes have somewhere to draw.
    const views = {
      all: L.latLngBounds(STOPS.map(s => [s.lat, s.lng])),
      europe: L.latLngBounds(STOPS.filter(s => s.lng > -15 && s.lng < 30).map(s => [s.lat, s.lng]))
    };
    map.fitBounds(views.all, { padding: [30, 30] });

    // The base map sits in its own layer under the route, so switching never covers the lines.
    map.createPane("base").style.zIndex = 250;
    const css = getComputedStyle(document.documentElement);
    const visited = new Set(["380", "826", "528", "276", "756", "250", "056", "702", "554", "344"]);
    // Three looks for the map. Simple is offline country shapes. The others are online map tiles.
    const looks = {
      simple: L.geoJSON(topojson.feature(WORLD, WORLD.objects.countries), {
        pane: "base",
        style: f => ({
          color: css.getPropertyValue("--border-country").trim(),
          weight: 0.8,
          fillColor: css.getPropertyValue(visited.has(f.id) ? "--land-visit" : "--land").trim(),
          fillOpacity: 1
        }),
        interactive: false
      }),
      streets: L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd", maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }),
      satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: "Imagery &copy; Esri"
      })
    };
    let look = "simple";
    looks.simple.addTo(map);
    document.querySelectorAll("[data-style]").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll("[data-style]").forEach(b => b.classList.toggle("is-on", b === btn));
      map.removeLayer(looks[look]);
      look = btn.dataset.style;
      looks[look].addTo(map);
    }));

    // Curved line for flights so they look like flight paths.
    function arc(a, b) {
      const pts = [];
      const dx = b[1] - a[1], dy = b[0] - a[0];
      const c = [(a[0] + b[0]) / 2 + dx * 0.18, (a[1] + b[1]) / 2 - dy * 0.18];
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
  };

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

  // ---------- Calendar ----------
  // Where am I on a given day? Travel days list every stop touched that day.
  function dayInfo(d) {
    const here = STOPS.filter(s => s.start <= d && d <= s.end);
    if (!here.length) return null;
    const names = [];
    here.forEach(s => {
      const label = s.short || s.name;
      if (names[names.length - 1] !== label) names.push(label);
    });
    const main = here[here.length - 1];
    return {
      stops: here,
      label: names.length > 1 ? `${names[0]} → ${names[names.length - 1]}` : names[0],
      leg: main.leg,
      flights: FLIGHTS.filter(f => f.day === d),
      events: EVENTS.filter(e => e.day === d)
    };
  }

  $("#cal-legend").innerHTML = legendHtml + `<span>✈️ Flight day</span>`;

  const months = [[2027, 2], [2027, 3]]; // March and April 2027 (months start at 0)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  function cell(date, other, big) {
    const d = iso(date);
    const info = dayInfo(d);
    if (!info) return `<div class="cal-day ${other ? "other" : ""}"><span class="num">${date.getDate()}</span></div>`;
    const icons = info.events.map(e => e.icon).join("") + (info.flights.length ? "✈️" : "");
    const lastFlag = info.stops[info.stops.length - 1].flag;
    const flag = big ? lastFlag + " " : "";
    return `
      <button class="cal-day in-trip ${other ? "other" : ""}" data-day="${d}" style="--leg:${LEGS[info.leg].colour}">
        <span class="num">${big ? date.toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "short" }) : date.getDate()}</span>
        ${icons ? `<span class="icons">${icons}</span>` : ""}
        <span class="where">${flag}${info.label}</span>
        ${big ? "" : `<span class="flag-only">${lastFlag}</span>`}
      </button>`;
  }

  // Each view is a function that turns the same data into HTML.
  // Only the view you pick is drawn into the page.
  const calViews = {
    month() {
      return `<div class="months">${months.map(([y, m]) => {
        const first = new Date(y, m, 1);
        const lead = (first.getDay() + 6) % 7; // Monday first
        const daysIn = new Date(y, m + 1, 0).getDate();
        let html = "";
        for (let i = 0; i < Math.ceil((lead + daysIn) / 7) * 7; i++) {
          const date = new Date(y, m, 1 - lead + i);
          html += cell(date, date.getMonth() !== m, false);
        }
        return `
          <div class="month">
            <h3>${first.toLocaleDateString("en-NZ", { month: "long", year: "numeric" })}</h3>
            <div class="cal-grid">${weekdays.map(w => `<div class="cal-head">${w}</div>`).join("")}${html}</div>
          </div>`;
      }).join("")}</div>`;
    },

    // One row per week of the trip, Monday to Sunday
    week() {
      const mon = new Date(tripStart);
      mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
      let html = `<div class="cal-grid week-grid week-head">${weekdays.map(w => `<div class="cal-head">${w}</div>`).join("")}</div>`;
      for (let w = 1; mon <= tripEnd; w++, mon.setDate(mon.getDate() + 7)) {
        let row = "";
        for (let i = 0; i < 7; i++) row += cell(new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i), false, true);
        html += `
          <div class="week">
            <h3>Week ${w} <span class="muted small">from ${fmt(iso(mon))}</span></h3>
            <div class="cal-grid week-grid">${row}</div>
          </div>`;
      }
      return html;
    },

    // One card per day with everything on it
    day() {
      let html = "";
      for (let date = new Date(tripStart); date <= tripEnd; date.setDate(date.getDate() + 1)) {
        const d = iso(date);
        const info = dayInfo(d);
        html += `
          <div class="day-row" style="--leg:${LEGS[info.leg].colour}">
            <div class="day-date"><span>${date.toLocaleDateString("en-NZ", { weekday: "short" })}</span><b>${date.getDate()}</b><span>${date.toLocaleDateString("en-NZ", { month: "short" })}</span></div>
            <div class="day-body">
              <div class="day-leg">${LEGS[info.leg].name}</div>
              ${dayLines(d, info, true)}
            </div>
          </div>`;
      }
      return html;
    }
  };

  // The lines for one day. firstDayNotes only shows a stop's note on its first day.
  function dayLines(d, info, firstDayNotes) {
    const seen = new Set();
    const places = info.stops.filter(s => !seen.has(s.name) && seen.add(s.name));
    return places.map(s => {
      const note = s.note && (!firstDayNotes || s.start === d) ? ` · ${s.note}` : "";
      return `<div><b>${s.flag} ${s.name}, ${s.country}</b>${note}</div>`;
    }).join("") +
      info.flights.map(f => `<div>✈️ Flight ${f.from} → ${f.to}, about ${f.hours} hours</div>`).join("") +
      info.events.map(e => `<div>${e.icon} ${e.text}</div>`).join("");
  }

  let pickedDay = STOPS[0].start;
  function showDay(d) {
    pickedDay = d;
    const info = dayInfo(d);
    document.querySelectorAll(".cal-day.is-on").forEach(el => el.classList.remove("is-on"));
    document.querySelectorAll(`[data-day="${d}"]`).forEach(el => el.classList.add("is-on"));
    $("#day-detail").innerHTML = `
      <div class="detail-card" style="--leg:${LEGS[info.leg].colour}">
        <div class="detail-date">${fmtLong(d)} · ${LEGS[info.leg].name}</div>
        ${dayLines(d, info, false)}
      </div>`;
  }
  // One click handler for every day box, whichever view is showing.
  $("#cal-body").addEventListener("click", e => {
    const box = e.target.closest("[data-day]");
    if (!box) return;
    showDay(box.dataset.day);
    $("#day-detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // Switch between Month, Week and Day. Remember the choice in this browser.
  function showCal(view) {
    if (!calViews[view]) view = "month";
    $("#cal-body").innerHTML = calViews[view]();
    $("#cal-pick").hidden = view === "day";
    if (view !== "day") showDay(pickedDay);
    document.querySelectorAll("[data-cal]").forEach(b => b.classList.toggle("is-on", b.dataset.cal === view));
    try { localStorage.setItem("trip-cal-view", view); } catch (e) { /* fine */ }
  }
  document.querySelectorAll("[data-cal]").forEach(b => b.addEventListener("click", () => showCal(b.dataset.cal)));
  let savedView = "month";
  try { savedView = localStorage.getItem("trip-cal-view") || "month"; } catch (e) { /* fine */ }
  showCal(savedView);

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

  showTab();
})();
