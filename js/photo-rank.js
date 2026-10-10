/*
  Picks good photos for each place from Wikimedia Commons.

  The site, the photo chooser page (choose-photos.html) and tools/pick-photos.mjs
  all use this one file, so they always agree on what a "good" photo is.

  How it works:
  1. Search three times: Commons' Featured pictures (voted the best), its Quality images
     (checked by reviewers), then all of Commons.
  2. Throw out anything off topic. Every search word must be in the photo's name or
     categories, and "quoted names" must be there together. Views must also be from the
     right place (the place's "where" names). Paintings, maps and coins are thrown out.
  3. Score the rest. Top rated first, then wide shapes and big sizes. Close-ups, inside
     shots and old photos score lower for views.
  4. Take the best ones, skipping near copies and photos already used on another place.
     The gallery takes turns between its spots, so it shows the whole place.
*/
(function (root) {
  const API = "https://commons.wikimedia.org/w/api.php";
  const POOLS = [
    { key: "featured", category: "Featured pictures on Wikimedia Commons" },
    { key: "quality", category: "Quality images" },
    { key: "all" }
  ];
  // How many photos each kind of subject needs.
  const COUNT = { hero: 1, gallery: 9, thing: 1, food: 1 };
  const isView = kind => kind === "hero" || kind === "gallery";
  // How much of the search a photo must match. Views must match all of it.
  // Things and food can use a photo that matches most of it when nothing matches it all.
  const MIN = { hero: 1, gallery: 1, thing: 0.66, food: 0.66 };

  // Not a photo of a real place: art, maps, money and so on.
  const NOT_A_PHOTO = /\b(paintings?|drawings?|prints|engravings?|etchings?|lithographs?|woodcuts?|watercolou?rs?|maps?|coins?|banknotes?|stamps?|manuscripts?|illustrations?|google art project|artworks?|photochroms?|postcards?|diagrams?|charts?|flags?|logos?|coats? of arms|renderings?|screenshots?|svg|specimens?|x-rays?)\b/i;
  // Close-ups, inside shots and things in the way. Fine for things to do, not for views.
  const NOT_A_VIEW = /\b(interiors?|inside|innen\w*|ceilings?|organs?|naves?|crypts?|apses?|details?|doors?|portals?|windows?|stained glass|plaques?|signs?|graves?|tombs?|statues?|sculptures?|busts?|reliefs?|frescoe?s?|mosaics?|insects?|birds?|animals?|flowers?|portraits?|selfies?|close-?ups?|macro|food|dishes|stations?|platforms?|u-bahn|s-bahn|subway|trains?|locomotives?|railcars?|telescopes?|teleskop\w*|binoculars|lamp ?posts?|street ?lamps?|street ?lights?|lanterns?|farolas?|aircraft|airplanes?|aeroplanes?|helicopters?|protests?|demonstrations?|riots?|police|military|scaffolding|construction|renovation|\w*altar)\b/i;
  // Buildings and views, when we want a plate of food.
  const NOT_FOOD = /\b(church|chiesa|iglesia|kirche|cathedral|basilica|chapel|building|street|square|station|bridge|castle|museum|palace|tower|shop ?front|storefront|facade|gallery|jewell?ery|hotel|ship|train|factory|headquarters|company|mountains?|peaks?|valley|lake|landscape|panorama|skyline|aerial|village|uncooked|manholes?|covers?|lids?|rexistro|registro|hydrants?)\b/i;
  // Words that say it really is food or drink.
  const FOOD = /\b(food|cuisine|dish(es)?|desserts?|pastr(y|ies)|cakes?|bread|snacks?|meals?|drinks?|beverages?|cocktails?|wines?|beers?|cheeses?|sausages?|plates?|served|breakfast|lunch|dinner)\b/i;
  const OLD = /\b(black and white|black-and-white|monochrome|b&w|bw|sepia|bildarchiv|archives?|archief|archivio|fotothek|bundesarchiv|historical (images|photographs)|vintage|photochrom|glass plates?|negatives?)\b/i;
  const OLD_YEAR = /\b(18[3-9]\d|19[0-8]\d)\b/;
  const HOUSEKEEPING = /^((pages|files|media|images|items|photos|photographs) (with|by|from|taken|uploaded|using)|uploaded|self-published|taken with|cc-|gfdl|pd-|license|attribution|user:|wikidata|commons)/i;
  // Categories like "Views of Venice from the Campanile" hold photos of Venice taken from the
  // Campanile, not photos of the Campanile.
  const VIEWS_FROM = /^(.*\b(?:views?|panoramics?|panoramas?|seen|photographs taken|taken)\b.*?)\bfrom\b(.*)$/i;

  // Other names for each country, so food photos from the right country get a small boost.
  const HOME = {
    "Italy": "Italy OR Italia OR Italian OR Italiano OR Italien OR Italie",
    "Germany": "Germany OR Deutschland OR German OR Deutsch OR Bavaria OR Bayern",
    "France": "France OR French OR Francais OR Frankreich",
    "Switzerland": "Switzerland OR Swiss OR Schweiz OR Suisse OR Svizzera",
    "Netherlands": "Netherlands OR Nederland OR Dutch OR Holland",
    "Belgium": "Belgium OR Belgian OR Belgie OR Belgique OR Belgien",
    "England": "England OR English OR British OR UK",
    "Spain": "Spain OR Spanish OR Espana OR Catalonia OR Catalunya",
    "Hungary": "Hungary OR Hungarian OR Magyar",
    "Hong Kong": "Hong Kong OR Cantonese",
    "Singapore": "Singapore OR Singaporean OR Malaysian"
  };

  // ---------- Commons API ----------
  const INFO = {
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "330",
    iiextmetadatafilter: "Artist|LicenseShortName|ImageDescription|Categories|Assessments"
  };
  function searchUrl(q, pool) {
    const filter = pool && pool.category ? ` incategory:"${pool.category}"` : "";
    return API + "?" + new URLSearchParams(Object.assign({
      action: "query", format: "json", formatversion: "2", origin: "*",
      generator: "search", gsrnamespace: "6", gsrlimit: "50",
      gsrsearch: `${q}${filter} filetype:bitmap`
    }, INFO));
  }
  function filesUrl(titles) {
    return API + "?" + new URLSearchParams(Object.assign({
      action: "query", format: "json", formatversion: "2", origin: "*", titles: titles.join("|")
    }, INFO));
  }

  const plain = html => String(html || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
  const cut = (s, n) => (s.length > n ? s.slice(0, n - 1).trim() + "…" : s);
  // Commons adds tracking to its links, like "photo.jpg?utm_source=...". Thumbnails break with it.
  const bare = url => String(url || "").split("?")[0];
  const fileName = url => bare(url).split("/").pop();

  // Turn one API page into the photo object used everywhere.
  function toPhoto(page) {
    const info = page.imageinfo && page.imageinfo[0];
    if (!info) return null;
    const meta = info.extmetadata || {};
    const get = k => plain(meta[k] && meta[k].value);
    const name = page.title.replace(/^File:/, "").replace(/\.[a-z0-9]+$/i, "");
    // Leave out housekeeping categories like "Pages with maps" or "Uploaded with UploadWizard".
    const cats = get("Categories").split("|").map(c => c.trim()).filter(c => c && !HOUSEKEEPING.test(c));
    const marks = get("Assessments").toLowerCase();
    const description = get("ImageDescription");
    const p = {
      file: page.title,
      url: bare(info.url),
      page: bare(info.descriptionurl),
      w: info.width,
      h: info.height,
      mime: info.mime,
      by: cut(get("Artist") || "Unknown", 60),
      license: get("LicenseShortName"),
      caption: cut(description || name, 140),
      featured: /featured/.test(marks),
      quality: /quality/.test(marks),
      valued: /valued/.test(marks),
      // What the photo is of, for checking it's on topic. Not saved.
      about: name + " | " + cats.join(" | "),
      title: words(name),
      cats: cats.map(category),
      text: words(description)
    };
    // Very long file names get a short thumbnail name. Remember it if so.
    const thumb = info.thumburl && fileName(info.thumburl).replace(/^\d+px-/, "");
    if (thumb && thumb !== fileName(p.url)) p.tn = thumb;
    return p;
  }

  // A sized copy of a photo, e.g. sized(p, 960). Uses Wikimedia's standard thumbnail widths.
  const WIDTHS = [330, 500, 960, 1280, 1920];
  function sized(p, width) {
    const url = bare(p.url);
    const w = WIDTHS.find(x => x >= width) || WIDTHS[WIDTHS.length - 1];
    if (!p.w || w >= p.w) return url;
    const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/(\w\/\w\w)\/([^/]+)$/);
    return m ? `${m[1]}/thumb/${m[2]}/${m[3]}/${w}px-${bare(p.tn) || m[3]}` : url;
  }

  // ---------- Is it on topic? ----------
  const STOP = new Set(("a an and the of in on at by to for from with di da del della delle dello dei degli al alla alle allo ai " +
    "agli de des du la le les el los las au aux der die das den dem von vom zu zum zur und im am auf het van en op").split(" "));
  // "Kapellbrücke, Luzern" becomes ["kapellbrucke", "luzern"]. Plurals and -ing are trimmed.
  function words(text) {
    return String(text || "")
      .replace(/([a-z])([A-Z])/g, "$1 $2") // file names like "PortAventuraPark"
      .toLowerCase()
      .replace(/ß/g, "ss").replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/ø/g, "o").replace(/ł/g, "l")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .split(/[^a-z0-9]+/)
      .map(w => (/^[a-z]+\d+$/.test(w) ? w.replace(/\d+$/, "") : w))
      .filter(w => w.length > 1 && !STOP.has(w))
      .map(w => (w.length > 4 && !/(ss|us|is)$/.test(w) ? w.replace(/s$/, "") : w))
      .map(w => (w.length > 5 ? w.replace(/(ing|er)$/, "") : w));
  }
  // Same word, or nearly: grand and grande, chocolat and chocolate. Not europa and europaische.
  function alike(a, b) {
    if (a === b) return true;
    const [s, l] = a.length < b.length ? [a, b] : [b, a];
    return s.length >= 4 && l.length - s.length <= 2 && l.startsWith(s);
  }

  // A search like 'Herengracht OR "Magere Brug" OR intitle:Damrak' becomes a list of options.
  // Each option is a list of terms. A term is one word, or a name whose words must be together.
  // intitle: means the photo's own name must have it.
  const parsed = new Map();
  function parse(q) {
    q = String(q || "");
    if (!parsed.has(q)) {
      parsed.set(q, q.split(/\s+OR\s+/).map(part => {
        const terms = [];
        part.replace(/(intitle:)?(?:"([^"]*)"|(\S+))/g, (m, title, quoted, word) => {
          const w = words(quoted != null ? quoted : word);
          // "Breuil-Cervinia" counts as one name, like "Magere Brug" does.
          if (w.length) terms.push({ words: w, title: !!title });
          return m;
        });
        return terms;
      }).filter(o => o.length));
    }
    return parsed.get(q);
  }
  function has(list, term) {
    const w = term.words;
    for (let i = 0; i + w.length <= list.length; i++) if (w.every((x, j) => alike(x, list[i + j]))) return true;
    return false;
  }
  // A category's words. For "Views of X from Y", Y goes in from: the photo is taken from there.
  function category(c) {
    const m = c.match(VIEWS_FROM);
    return m ? { words: words(m[1]), from: words(m[2]) } : { words: words(c), from: [] };
  }
  // Where a term is: "title", "category", "view" (only as where a photo was taken from) or "" for nowhere.
  function find(p, term) {
    if (has(p.title, term)) return "title";
    if (term.title) return "";
    let found = "";
    for (const c of p.cats) {
      if (has(c.words, term)) return "category";
      if (has(c.from, term)) found = "view";
    }
    return found;
  }

  // How well a photo matches a search. rel is how much of it matches, 1 means all of it.
  // inTitle: it's all in the photo's own name. fromView: some only in a "Views from" category.
  function match(p, q, noViews) {
    let best = { rel: 0, inTitle: false, fromView: false };
    for (const option of parse(q)) {
      let got = 0, all = 0, inTitle = true, fromView = false;
      for (const term of option) {
        const at = find(p, term);
        all += term.words.length;
        if (at && !(at === "view" && noViews)) got += term.words.length;
        if (at !== "title") inTitle = false;
        if (at === "view") fromView = true;
      }
      const m = { rel: got / all, inTitle: inTitle, fromView: fromView && !noViews };
      if (m.rel > best.rel || (m.rel === best.rel && m.inTitle && !best.inTitle)) best = m;
    }
    return best;
  }

  // Is the photo from this place? where is like 'Venice OR Venezia OR Burano'.
  function isFrom(p, where) {
    if (!where) return true;
    const lists = [p.title, p.text].concat(...p.cats.map(c => [c.words, c.from]));
    return parse(where).some(option => option.every(term => lists.some(l => has(l, term))));
  }
  const relevance = (p, q) => match(p, q).rel;

  // ---------- Scoring ----------
  function nameOf(p) { return p.file.replace(/^File:/, "").replace(/\.[a-z0-9]+$/i, ""); }
  // Near copies: "Jewel Changi (I)" and "Jewel Changi (II)", or "Bacharach 01" and "Bacharach 02".
  function looksSame(p) { return nameOf(p).toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[\d_\-–,.()[\]\s]+/g, " ").trim(); }

  function usable(p) {
    return p && p.mime === "image/jpeg" && p.w >= 1200 && p.h >= 700 && !NOT_A_PHOTO.test(p.about);
  }

  // s is the subject: { kind, q, where, home }. kind is "hero", "gallery", "thing" or "food".
  function score(p, s) {
    const view = isView(s.kind);
    const ratio = p.w / p.h;
    const m = match(p, s.q, s.kind === "hero");
    p.rel = m.rel;
    p.here = isFrom(p, s.where);
    let n = m.rel >= 1 ? 10 : m.rel >= 0.66 ? 2 : -20;
    if (m.inTitle) n += 2;                           // its own name says what it is
    if (m.fromView) n -= 4;                          // a view from the spot, not of it
    if (p.featured) n += 5;
    if (p.quality) n += 3;
    if (p.valued) n += 3;
    if (ratio >= 1.3 && ratio <= 2.1) n += 3;        // a nice landscape shape
    else if (ratio > 2.1) n -= ratio > 3 ? 6 : 1;     // wide panoramas get cropped a lot
    else if (ratio >= 1.1) n += 1;
    else n -= view ? 6 : 2;                           // tall photos
    if (p.w >= 3000) n += 1;
    if (p.w * p.h < 3e6) n -= 2;
    const rank = p.rank == null ? 99 : p.rank;
    n += rank < 5 ? 2 : rank < 15 ? 1 : 0;
    if (NOT_A_VIEW.test(p.about)) n -= s.kind === "hero" ? 12 : view ? 6 : 2;
    if (s.kind === "food") {
      if (NOT_FOOD.test(p.about)) n -= 8;
      if (FOOD.test(p.about)) n += 2;
      p.local = (s.where && p.here) || isFrom(p, s.home); // made in the place or the country
    }
    if (OLD.test(p.about) || OLD_YEAR.test(nameOf(p))) n -= 6;
    if (/panoramio|geograph/i.test(p.file)) n -= 2;
    return n;
  }

  // Merge results from several searches. A photo found in more than one keeps every badge.
  function merge(lists) {
    const byFile = new Map();
    lists.forEach(({ pool, pages }) => {
      pages.forEach(page => {
        const p = byFile.get(page.title) || toPhoto(page);
        if (!p) return;
        if (pool && pool.category) p[pool.key] = true;
        p.rank = Math.min(p.rank == null ? 99 : p.rank, (page.index || 1) - 1);
        byFile.set(page.title, p);
      });
    });
    return [...byFile.values()];
  }

  // On topic photos only, best first. Views must be from the place.
  // Photos that match the whole search always come first. Then things to do from the place,
  // and food from the place or its country.
  function rank(photos, s) {
    const tier = p => (p.rel >= 1 ? 2 : 0) + ((s.kind === "thing" && p.here) || (s.kind === "food" && p.local) ? 1 : 0);
    return photos.filter(usable)
      .map(p => Object.assign(p, { score: score(p, s) }))
      .filter(p => p.rel >= MIN[s.kind] && (!isView(s.kind) || p.here))
      .sort((a, b) => tier(b) - tier(a) || b.score - a.score || a.rank - b.rank);
  }

  // Best n photos, skipping ones already used, skipped ones and near copies.
  function choose(ranked, n, used, skip) {
    const out = [];
    for (const p of ranked) {
      if (out.length >= n) break;
      if (used.has(p.file) || used.has(looksSame(p)) || skip.has(p.file)) continue;
      used.add(p.file);
      used.add(looksSame(p));
      out.push(p);
    }
    return out;
  }

  // The gallery takes turns: the best photo of each spot, then runners up for the big
  // photo and each thing to do, then each spot's next best, and so on. Good photos only.
  const GOOD = 10;
  function takeTurns(spots, others, n, used, skip) {
    const out = [];
    const free = p => p.score >= GOOD && !used.has(p.file) && !used.has(looksSame(p)) && !skip.has(p.file);
    for (let more = true; more && out.length < n;) {
      more = false;
      for (const group of [spots, others]) {
        const best = group.map(list => list.find(free)).filter(Boolean).sort((a, b) => b.score - a.score);
        for (const p of best) {
          if (out.length >= n || !free(p)) continue; // two spots can share a best photo
          used.add(p.file);
          used.add(looksSame(p));
          out.push(p);
          more = true;
        }
      }
    }
    return out;
  }

  // ---------- Subjects ----------
  // Everything on a place page that needs a photo, in the order photos get picked.
  function subjectsFor(place) {
    const list = [];
    const where = place.where || null;
    const home = HOME[place.country] || place.country || null;
    const add = (key, kind, q, label, more) => list.push(Object.assign({ key, kind, q, label, where, home }, more));
    if (place.hero) add("hero", "hero", place.hero, "Big photo");
    (place.highlights || []).forEach(h => h.q && add("do:" + h.name, "thing", h.q, h.name));
    (place.food || []).forEach(f => f.q && add("eat:" + f.name, "food", f.q, f.name));
    const spots = [].concat(place.gallery || []).filter(Boolean);
    if (spots.length) add("gallery", "gallery", spots.join(" OR "), "More photos", { spots });
    return list;
  }

  // All on topic photos for one subject, best first. fetchJson(url) must return the parsed JSON.
  // A gallery searches each of its spots.
  async function candidates(s, fetchJson) {
    const lists = [];
    for (const q of s.spots && s.spots.length > 1 ? s.spots : [s.q]) {
      for (const pool of POOLS) {
        const data = await fetchJson(searchUrl(q, pool));
        lists.push({ pool, pages: (data.query && data.query.pages) || [] });
      }
    }
    return rank(merge(lists), s);
  }

  // Fill in photos for one place. entry is the place's current entry in PHOTOS (or {}).
  // Photos stay unless their search changed, they were skipped, or refresh is on.
  // Photos picked by hand (hand: true) stay even with refresh.
  // taken lists photos used on other places, so the same photo doesn't show up twice.
  // Returns the new entry.
  async function pickForPlace(place, entry, fetchJson, { refresh = false, log = () => {}, taken = [] } = {}) {
    entry = entry || {};
    const out = { skip: entry.skip || [] };
    const skip = new Set(out.skip);
    const used = new Set(taken);
    const subjects = subjectsFor(place);
    const keep = {};
    subjects.forEach(s => {
      const old = entry[s.key];
      keep[s.key] = old && old.q === s.q && (!refresh || old.hand) ? old.photos.filter(p => !skip.has(p.file)) : [];
      keep[s.key].forEach(p => { used.add(p.file); used.add(looksSame(p)); });
    });
    const found = {};
    for (const s of subjects) {
      const old = entry[s.key];
      let photos = keep[s.key];
      const need = COUNT[s.kind] - photos.length;
      if (need > 0) {
        let ranked, more;
        if (s.kind === "gallery") {
          const spots = [];
          for (const q of s.spots) spots.push(await candidates(Object.assign({}, s, { q, spots: null }), fetchJson));
          // Runners up for the big photo and things to do, checked again as views.
          const others = subjects.filter(x => (x.kind === "hero" || x.kind === "thing") && found[x.key])
            .map(x => rank(found[x.key].map(p => Object.assign({}, p)), Object.assign({}, s, { q: x.q })));
          more = takeTurns(spots, others, need, used, skip);
          ranked = [].concat(...spots).sort((a, b) => b.score - a.score);
        } else {
          ranked = found[s.key] = await candidates(s, fetchJson);
          more = choose(ranked, need, used, skip);
        }
        photos = photos.concat(more.map(slim));
        log(s, ranked, more);
      }
      out[s.key] = old && old.hand && old.q === s.q ? { q: s.q, hand: true, photos } : { q: s.q, photos };
    }
    // No big photo found: the best gallery photo takes its place.
    const { hero, gallery } = out;
    if (hero && !hero.photos.length && !hero.hand && gallery && gallery.photos.length > 1) hero.photos = gallery.photos.splice(0, 1);
    return out;
  }

  // Only keep what the site needs.
  function slim(p) {
    const o = { file: p.file, url: bare(p.url), page: bare(p.page), w: p.w, h: p.h, by: p.by, license: p.license, caption: p.caption };
    if (p.tn) o.tn = bare(p.tn);
    if (p.featured) o.featured = true;
    if (p.quality) o.quality = true;
    if (p.valued) o.valued = true;
    return o;
  }

  // The text of js/photos.js. One photo per line, so changes are easy to read in git.
  function fileText(photos, order) {
    const L = [
      "// Photos for each place, picked from Wikimedia Commons by tools/pick-photos.mjs.",
      "// Swap photos with choose-photos.html. \"hand\" means picked by hand, so it stays put.",
      "window.PHOTOS = {"
    ];
    const ids = (order || Object.keys(photos)).filter(id => photos[id]);
    ids.forEach((id, i) => {
      L.push(`  ${JSON.stringify(id)}: {`);
      const entry = photos[id];
      const keys = Object.keys(entry);
      keys.forEach((k, j) => {
        const comma = j < keys.length - 1 ? "," : "";
        if (k === "skip") { L.push(`    "skip": ${JSON.stringify(entry.skip)}${comma}`); return; }
        const { q, hand, photos: ps } = entry[k];
        L.push(`    ${JSON.stringify(k)}: { "q": ${JSON.stringify(q)},${hand ? ' "hand": true,' : ""} "photos": [`);
        ps.forEach((p, n) => L.push(`      ${JSON.stringify(p)}${n < ps.length - 1 ? "," : ""}`));
        L.push(`    ] }${comma}`);
      });
      L.push(`  }${i < ids.length - 1 ? "," : ""}`);
    });
    L.push("};", "");
    return L.join("\n");
  }

  const PhotoRank = {
    POOLS, COUNT, WIDTHS, searchUrl, filesUrl, toPhoto, sized, words, relevance, isFrom, score, rank, choose,
    merge, subjectsFor, candidates, pickForPlace, slim, usable, fileText
  };
  if (typeof module !== "undefined" && module.exports) module.exports = PhotoRank;
  else root.PhotoRank = PhotoRank;
})(typeof window !== "undefined" ? window : globalThis);
