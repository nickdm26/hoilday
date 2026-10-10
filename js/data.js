/*
  All the trip info lives here. Edit this file to change the site.
  Dates are the current plan (European Horizon Contiki). Nothing is booked yet.
*/

// Each part of the trip gets its own colour on the map and timeline.
window.LEGS = {
  wedding: { name: "Singapore wedding", colour: "#d6457a" },
  snow:    { name: "Snowboarding",      colour: "#2f7fd8" },
  contiki: { name: "Contiki tour",      colour: "#e8862a" },
  solo:    { name: "On my own",         colour: "#2e9e6a" },
  home:    { name: "Way home",          colour: "#7b5cd6" }
};

// Stops in trip order, with rough dates.
window.STOPS = [
  { id: "akl", name: "Auckland",     country: "New Zealand", flag: "🇳🇿", lat: -36.85, lng: 174.76, leg: "home",    start: "2027-03-20", end: "2027-03-20", note: "Leave home" },
  { id: "sin", name: "Singapore",    country: "Singapore",   flag: "🇸🇬", lat: 1.29,   lng: 103.85, leg: "wedding", start: "2027-03-20", end: "2027-03-28", note: "Wedding on Friday 26 March" },
  { id: "mil", name: "Milan",        country: "Italy",       flag: "🇮🇹", lat: 45.46,  lng: 9.19,   leg: "snow",    start: "2027-03-28", end: "2027-03-29", note: "Land in Europe. Snow hub" },
  { id: "cer", name: "Cervinia or Livigno", short: "Snow", country: "Italy", flag: "🇮🇹", lat: 45.94, lng: 7.63,  leg: "snow",    start: "2027-03-29", end: "2027-04-09", note: "About 6 days riding plus rest days. Pick the resort from the snow forecast" },
  { id: "lon", name: "London",       country: "England",     flag: "🇬🇧", lat: 51.51,  lng: -0.13,  leg: "contiki", start: "2027-04-09", end: "2027-04-11", note: "Rest, then meet the Contiki group" },
  { id: "ams", name: "Amsterdam",    country: "Netherlands", flag: "🇳🇱", lat: 52.37,  lng: 4.90,   leg: "contiki", start: "2027-04-11", end: "2027-04-12" },
  { id: "rhi", name: "Rhine Valley", short: "Rhine", country: "Germany",     flag: "🇩🇪", lat: 50.15,  lng: 7.71,   leg: "contiki", start: "2027-04-12", end: "2027-04-13" },
  { id: "mun", name: "Munich",       country: "Germany",     flag: "🇩🇪", lat: 48.14,  lng: 11.58,  leg: "contiki", start: "2027-04-13", end: "2027-04-14" },
  { id: "ven", name: "Venice",       country: "Italy",       flag: "🇮🇹", lat: 45.44,  lng: 12.33,  leg: "contiki", start: "2027-04-14", end: "2027-04-16" },
  { id: "luc", name: "Lucerne",      country: "Switzerland", flag: "🇨🇭", lat: 47.05,  lng: 8.31,   leg: "contiki", start: "2027-04-16", end: "2027-04-18" },
  { id: "par", name: "Paris",        country: "France",      flag: "🇫🇷", lat: 48.86,  lng: 2.35,   leg: "contiki", start: "2027-04-18", end: "2027-04-20" },
  { id: "lon2", name: "London",      country: "England",     flag: "🇬🇧", lat: 51.51,  lng: -0.13,  leg: "contiki", start: "2027-04-20", end: "2027-04-21", note: "Contiki ends", hidePin: true },
  { id: "bel", name: "Bruges and Brussels", short: "Belgium", country: "Belgium", flag: "🇧🇪", lat: 51.05, lng: 3.85, leg: "solo",  start: "2027-04-21", end: "2027-04-23", note: "Chocolate and waffles. Eurostar from London" },
  { id: "rom", name: "Rome",         country: "Italy",       flag: "🇮🇹", lat: 41.90,  lng: 12.50,  leg: "solo",    start: "2027-04-23", end: "2027-04-26", note: "Colosseum, Vatican, Trastevere" },
  { id: "flo", name: "Florence",     country: "Italy",       flag: "🇮🇹", lat: 43.77,  lng: 11.26,  leg: "solo",    start: "2027-04-26", end: "2027-04-27", note: "Uffizi and the Statue of David" },
  { id: "gar", name: "Lake Garda", short: "Garda",   country: "Italy",       flag: "🇮🇹", lat: 45.45,  lng: 10.71,  leg: "solo",    start: "2027-04-27", end: "2027-04-29", note: "Gardaland theme park" },
  { id: "mil2", name: "Milan",       country: "Italy",       flag: "🇮🇹", lat: 45.46,  lng: 9.19,   leg: "home",    start: "2027-04-29", end: "2027-04-29", note: "Train to Milan airport", hidePin: true },
  { id: "hkg", name: "Hong Kong", short: "Hong Kong",    country: "Hong Kong",   flag: "🇭🇰", lat: 22.30,  lng: 114.17, leg: "home",    start: "2027-04-29", end: "2027-05-01", note: "1 or 2 nights to rest my back" },
  { id: "akl2", name: "Auckland",    country: "New Zealand", flag: "🇳🇿", lat: -36.85, lng: 174.76, leg: "home",    start: "2027-05-01", end: "2027-05-01", note: "Home", hidePin: true }
];

// How I get between stops. mode: "fly", "coach", "train" or "drive".
window.MOVES = [
  { from: "akl", to: "sin", mode: "fly" },
  { from: "sin", to: "mil", mode: "fly" },
  { from: "mil", to: "cer", mode: "drive" },
  { from: "cer", to: "lon", mode: "fly" },
  { from: "lon", to: "ams", mode: "coach" },
  { from: "ams", to: "rhi", mode: "coach" },
  { from: "rhi", to: "mun", mode: "coach" },
  { from: "mun", to: "ven", mode: "coach" },
  { from: "ven", to: "luc", mode: "coach" },
  { from: "luc", to: "par", mode: "coach" },
  { from: "par", to: "lon2", mode: "coach" },
  { from: "lon2", to: "bel", mode: "train" },
  { from: "bel", to: "rom", mode: "fly" },
  { from: "rom", to: "flo", mode: "train" },
  { from: "flo", to: "gar", mode: "train" },
  { from: "gar", to: "mil2", mode: "train" },
  { from: "mil2", to: "hkg", mode: "fly" },
  { from: "hkg", to: "akl2", mode: "fly" }
];

// Flights. Hours are rough flying times.
window.FLIGHTS = [
  { from: "AKL", fromCity: "Auckland",  to: "SIN", toCity: "Singapore", date: "Sat 20 Mar", day: "2027-03-20", hours: 10.5, leg: "wedding" },
  { from: "SIN", fromCity: "Singapore", to: "MXP", toCity: "Milan",     date: "Sun 28 Mar", day: "2027-03-28", hours: 13,   leg: "snow" },
  { from: "MXP", fromCity: "Milan",     to: "LHR", toCity: "London",    date: "Fri 9 Apr", day: "2027-04-09",  hours: 2,    leg: "contiki" },
  { from: "BRU", fromCity: "Brussels",  to: "FCO", toCity: "Rome",      date: "Fri 23 Apr", day: "2027-04-23", hours: 2.25, leg: "solo" },
  { from: "MXP", fromCity: "Milan",     to: "HKG", toCity: "Hong Kong", date: "Thu 29 Apr", day: "2027-04-29", hours: 12,   leg: "home" },
  { from: "HKG", fromCity: "Hong Kong", to: "AKL", toCity: "Auckland",  date: "Sat 1 May", day: "2027-05-01",  hours: 11,   leg: "home" }
];

// Tags shown on "things to do" cards.
window.TAGS = {
  art: "🎨 Art", history: "🏛️ History", views: "🌄 Views", thrill: "🎢 Thrills", night: "🍻 Night out",
  sweet: "🍫 Sweet", food: "🍝 Food", relax: "♨️ Relax", snow: "🏂 Snow", free: "🆓 Free", book: "🎟️ Book ahead"
};

// Handy facts for each country.
window.COUNTRIES = {
  "Singapore":   { language: "English (also Malay, Mandarin, Tamil)", hello: "Hello", money: "Singapore dollar (S$)", plug: "Type G (UK style)" },
  "Italy":       { language: "Italian", hello: "Ciao", money: "Euro (€)", plug: "Type F and L" },
  "England":     { language: "English", hello: "Hello", money: "Pound (£)", plug: "Type G (UK style)" },
  "Netherlands": { language: "Dutch", hello: "Hallo", money: "Euro (€)", plug: "Type F" },
  "Germany":     { language: "German", hello: "Hallo (Servus in Bavaria)", money: "Euro (€)", plug: "Type F" },
  "Switzerland": { language: "German (in Lucerne and Interlaken)", hello: "Grüezi", money: "Swiss franc (CHF)", plug: "Type J (Type C fits too)" },
  "France":      { language: "French", hello: "Bonjour", money: "Euro (€)", plug: "Type E" },
  "Belgium":     { language: "Dutch in Bruges, French in Brussels", hello: "Hallo or Bonjour", money: "Euro (€)", plug: "Type E" },
  "Hong Kong":   { language: "Cantonese and English", hello: "Nei hou", money: "Hong Kong dollar (HK$)", plug: "Type G (UK style)" },
  "Hungary":     { language: "Hungarian", hello: "Szia", money: "Forint (Ft)", plug: "Type F" },
  "Spain":       { language: "Spanish and Catalan", hello: "Hola", money: "Euro (€)", plug: "Type F" }
};

// Places. Tap a card on the site to open its own page.
//   stops:      which STOPS ids above give my dates there
//   article:    Wikipedia page for "read more"
//   where:      names this place goes by. Big photos and gallery photos must mention one
//   hero:       what to search for the big photo
//   gallery:    spots to search for the extra photos. The gallery takes turns between them
//   highlights: things to do. q is what to search for its photo
//   food:       things to eat. q is what to search for its photo
// Photo searches: every word must be in the photo's name or categories, "quoted names" must be
// there together, OR gives choices, and intitle:Word means the photo's own name must have it.
// After changing a search, push it and the "Pick photos" action picks new photos.
// Or run: node tools/pick-photos.mjs
window.PLACES = [
  { id: "singapore", name: "Singapore", country: "Singapore", flag: "🇸🇬", lat: 1.29, lng: 103.85,
    onRoute: true, leg: "wedding", stops: ["sin"], article: "Singapore",
    where: "Singapore OR Singapur OR Sentosa OR Changi",
    hero: '"Marina Bay Sands"',
    gallery: ['"Singapore skyline" OR "Skyline of Singapore"', "Merlion", '"Clarke Quay"', '"Jewel Changi"', '"Helix Bridge" OR "ArtScience Museum"'],
    blurb: "A week in a hot, clean and very easy city. The wedding is the main event. Around it, eat at a hawker centre every day and watch the city light up at night.",
    highlights: [
      { name: "Gardens by the Bay", what: "Giant metal Supertrees that light up to music every night. The show is free.", tags: ["views", "night", "free"], q: '"Gardens by the Bay" Supertree' },
      { name: "Marina Bay at night", what: "Walk the loop around the bay for the skyline and the light and water show.", tags: ["night", "views", "free"], q: '"Marina Bay" night' },
      { name: "Universal Studios", what: "A full theme park on Sentosa island, with proper roller coasters.", tags: ["thrill"], q: '"Universal Studios Singapore"' },
      { name: "Chinatown and Little India", what: "Colourful streets, temples and cheap eats.", tags: ["food", "history"], q: 'Chinatown OR "Little India"' }
    ],
    food: [
      { name: "Hawker centres", what: "Cheap and amazing food stalls. Try Lau Pa Sat, Maxwell or Newton.", q: '"Lau Pa Sat" OR "hawker centre" OR "Maxwell Food Centre"' },
      { name: "Chilli crab", what: "Messy, spicy and the classic Singapore dinner.", q: '"chilli crab" OR "chili crab"' },
      { name: "Kaya toast", what: "Toast with coconut jam, soft eggs and strong coffee. The local breakfast.", q: "kaya toast" }
    ],
    tip: "Fill in the Singapore Arrival Card online within 3 days of landing. Carry water, it's hot and humid." },

  { id: "cervinia", name: "Cervinia", country: "Italy", flag: "🇮🇹", lat: 45.94, lng: 7.63,
    onRoute: true, leg: "snow", stops: ["cer"], article: "Breuil-Cervinia",
    where: 'Cervinia OR Breuil OR Cervino OR Matterhorn OR Valtournenche OR Zermatt OR "Plateau Rosa" OR "Plan Maison" OR "Cime Bianche" OR "Testa Grigia" OR "Klein Matterhorn"',
    hero: "Breuil-Cervinia OR Cervinia",
    gallery: ["Breuil-Cervinia OR Cervinia", "Cervino OR Matterhorn", "Valtournenche", '"Plateau Rosa" OR "Cime Bianche" OR "Plan Maison"'],
    blurb: "A high resort right under the Matterhorn, so the snow lasts well into spring. Wide, gentle runs make it a great place to find your feet again.",
    highlights: [
      { name: "Matterhorn views", what: "The famous peak towers over the village. Best on a clear morning.", tags: ["views"], q: "Matterhorn OR Cervino" },
      { name: "Easy blue runs", what: "Long, wide runs up at Plan Maison. Perfect for warming up.", tags: ["snow"], q: 'Cervinia ski OR Cervinia piste OR "Plan Maison" OR "Plateau Rosa"' },
      { name: "Ride into Switzerland", what: "On a good day you can ride over to Zermatt. You need the international pass.", tags: ["snow", "views"], q: 'Zermatt ski OR Zermatt winter OR "Klein Matterhorn" OR "Matterhorn Glacier Paradise"' }
    ],
    food: [
      { name: "Fondue and polenta", what: "Warm, cheesy mountain food after a cold day.", q: '"cheese fondue" OR "fondue au fromage" OR Käsefondue OR fonduta' },
      { name: "Bombardino", what: "Hot eggnog with brandy and cream. A ski trip must.", q: "bombardino" }
    ],
    tip: "The Open pass lets you ride days that are not in a row. Good for rest days for your back." },

  { id: "livigno", name: "Livigno", country: "Italy", flag: "🇮🇹", lat: 46.54, lng: 10.14,
    onRoute: true, leg: "snow", stops: ["cer"], article: "Livigno",
    where: "Livigno OR Mottolino OR Carosello",
    hero: "intitle:Livigno",
    gallery: ["intitle:Livigno", "Mottolino", "Carosello", '"Lago di Livigno"'],
    blurb: "A long, snowy valley near the Swiss border. It's tax free, so food and drinks are cheap. The blue runs and snow parks suit beginners.",
    highlights: [
      { name: "Two ski areas", what: "Mottolino and Carosello face each other across the valley. Lots of long, easy blues.", tags: ["snow"], q: 'Livigno ski OR Livigno piste OR "Carosello 3000"' },
      { name: "Mottolino snow park", what: "One of the best snow parks in Europe. Watch the pros or try the small jumps.", tags: ["thrill", "snow"], q: 'Mottolino OR "Livigno Snow Park" OR "Livigno snowpark"' },
      { name: "Aquagranda spa", what: "Pools, saunas and steam rooms. Great for tired legs and your back.", tags: ["relax"], q: "Aquagranda" }
    ],
    food: [
      { name: "Pizzoccheri", what: "Buckwheat pasta with cabbage, potato and lots of cheese.", q: "pizzoccheri" },
      { name: "Bresaola", what: "Thin slices of air dried beef from the valley. Great with rocket and parmesan.", q: "bresaola" }
    ],
    tip: "Backup snow pick. Open to early May. The transfer from Milan is long, so plan a full travel day." },

  { id: "london", name: "London", country: "England", flag: "🇬🇧", lat: 51.51, lng: -0.13,
    onRoute: true, leg: "contiki", stops: ["lon", "lon2"], article: "London",
    where: "London OR Londres OR Londra OR Londen OR Westminster OR Southwark OR Camden",
    hero: '"Tower Bridge"',
    gallery: ['"Palace of Westminster" OR "Big Ben" OR "Elizabeth Tower"', '"St Paul\'s Cathedral"', '"Trafalgar Square"', '"Buckingham Palace"', '"London skyline" OR "Skyline of London"', '"Tower of London"'],
    blurb: "Big, busy and full of free museums. The Contiki starts and ends here, so it's a great spot for a day or two either side.",
    highlights: [
      { name: "Natural History Museum", what: "Dinosaurs in a stunning building. Free to get in.", tags: ["history", "free"], q: '"Natural History Museum"' },
      { name: "British Museum", what: "Treasures from all over the world, like the Rosetta Stone. Free.", tags: ["history", "art", "free"], q: '"British Museum" "Great Court"' },
      { name: "A West End show", what: "See a big musical. Same day tickets from the TKTS booth are cheaper.", tags: ["night"], q: '"West End" theatre OR "Shaftesbury Avenue" OR "Piccadilly Circus" night' },
      { name: "South Bank walk", what: "Walk the river from the London Eye to Tower Bridge.", tags: ["views", "free"], q: '"London Eye" OR "South Bank"' },
      { name: "Camden Market", what: "Street food, music and quirky shops.", tags: ["food"], q: '"Camden Market" OR "Camden Lock"' }
    ],
    food: [
      { name: "Borough Market", what: "London's best food market. Go hungry.", q: '"Borough Market"' },
      { name: "Sunday roast", what: "Roast meat, Yorkshire pudding and gravy at a pub.", q: '"Sunday roast" OR "roast dinner"' },
      { name: "Fish and chips", what: "The classic. Best eaten by the water.", q: '"fish and chips"' }
    ],
    tip: "Book a bed the night before and after the Contiki. Tap your card on the Tube, no ticket needed." },

  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", lat: 52.37, lng: 4.90,
    onRoute: true, leg: "contiki", stops: ["ams"], article: "Amsterdam",
    where: "Amsterdam",
    hero: '"canal houses" OR Grachtengordel',
    gallery: ["Herengracht", "Prinsengracht", "Keizersgracht", "Reguliersgracht", '"Magere Brug"', 'Damrak OR "Dam Square" OR "Dam (Amsterdam)"'],
    blurb: "Canals, bikes and crooked old houses. One night on the Contiki is short, so pick a canal cruise and a big night out.",
    highlights: [
      { name: "Canal cruise", what: "See the canal houses from the water. Best around sunset.", tags: ["views"], q: '"canal boat" OR "canal cruise" OR rondvaartboot OR rondvaart' },
      { name: "Rijksmuseum", what: "Rembrandt's Night Watch and the Dutch masters.", tags: ["art", "book"], q: "Rijksmuseum" },
      { name: "Van Gogh Museum", what: "The biggest Van Gogh collection in the world. Book ahead.", tags: ["art", "book"], q: '"Van Gogh Museum"' },
      { name: "Leidseplein at night", what: "Busy bars and clubs right in the centre.", tags: ["night"], q: "Leidseplein" }
    ],
    food: [
      { name: "Stroopwafels", what: "Thin waffles with syrup inside. Get them hot from a market.", q: "stroopwafel" },
      { name: "Dutch pancakes", what: "Big, thin pancakes, sweet or savoury.", q: 'pannenkoek OR "Dutch pancake"' },
      { name: "Fries with mayo", what: "Thick fries in a paper cone.", q: 'patat OR friet OR frites OR "Vlaamse friet"' }
    ],
    tip: "King's Day is Tuesday 27 April. It clashes with the Italy part of the plan." },

  { id: "rhine", name: "Rhine Valley", country: "Germany", flag: "🇩🇪", lat: 50.15, lng: 7.71,
    onRoute: true, leg: "contiki", stops: ["rhi"], article: "Rhine Gorge",
    where: 'Bacharach OR Oberwesel OR Kaub OR Goar OR Goarshausen OR Loreley OR Lorelei OR Boppard OR Braubach OR Marksburg OR Pfalzgrafenstein OR Rheinfels OR Rheinstein OR Stahleck OR Gutenfels OR Sooneck OR Reichenstein OR Assmannshausen OR Rüdesheim OR Lorch OR Trechtingshausen OR Mittelrhein OR Mittelrheintal OR "Middle Rhine" OR "Rhine Gorge" OR "Burg Katz" OR "Burg Maus"',
    hero: "Pfalzgrafenstein",
    gallery: ["Bacharach", "Oberwesel", '"Burg Rheinfels" OR Goar', 'Kaub OR "Burg Gutenfels"', '"Rhine Gorge" OR Mittelrheintal OR "Middle Rhine"', "Boppard OR Marksburg OR Braubach"],
    blurb: "A calm day of river views, castles on every hill and little wine villages. A nice breather in the middle of the Contiki.",
    highlights: [
      { name: "Castles on the river", what: "Dozens of castles line the river. Pfalz castle sits on an island in the middle.", tags: ["views", "history"], q: 'Marksburg OR "Burg Katz" OR "Burg Stahleck" OR "Burg Rheinstein" OR "Burg Sooneck" OR "Burg Reichenstein"' },
      { name: "Loreley rock", what: "A famous cliff high above a tight bend in the river.", tags: ["views"], q: "Loreley OR Lorelei" },
      { name: "Wine villages", what: "Half timbered towns like Bacharach and St Goar.", tags: ["history", "food"], q: "Bacharach" }
    ],
    food: [
      { name: "Riesling", what: "The local white wine, grown on the steep hills above the river.", q: "Riesling wine OR Riesling Wein OR Riesling glass OR Riesling Weinberg OR Riesling vineyard" },
      { name: "Pretzels and sausages", what: "Simple German pub food.", q: "Brezel OR Laugenbrezel OR Bratwurst" }
    ],
    tip: "Have your camera ready. The castles come thick and fast." },

  { id: "munich", name: "Munich", country: "Germany", flag: "🇩🇪", lat: 48.14, lng: 11.58,
    onRoute: true, leg: "contiki", stops: ["mun"], article: "Munich",
    where: 'München OR Munich OR Muenchen OR "Monaco di Baviera" OR Erding',
    hero: 'Marienplatz OR "Neues Rathaus"',
    gallery: ['"Englischer Garten" OR "English Garden"', "Viktualienmarkt", '"Schloss Nymphenburg" OR "Nymphenburg Palace"', 'Olympiapark OR "Olympic Park"', "Frauenkirche", '"Alter Peter" OR Peterskirche'],
    blurb: "Beer halls, beer gardens and hearty Bavarian food. Your brother knows it well, so ask him for tips. There's even surfing in the middle of town.",
    highlights: [
      { name: "Hofbräuhaus", what: "The world famous beer hall. Loud, fun and touristy in a good way.", tags: ["night", "food"], q: "Hofbräuhaus" },
      { name: "Marienplatz", what: "The main square and the Glockenspiel clock show.", tags: ["history", "free"], q: 'Glockenspiel OR "Neues Rathaus"' },
      { name: "Eisbach river surfers", what: "Surfers ride a standing wave in the English Garden. Then grab a beer in the beer garden.", tags: ["views", "free"], q: "Eisbach surfing" },
      { name: "Spring beer festival", what: "A smaller Oktoberfest with tents and rides. It starts in mid to late April, so check the 2027 dates.", tags: ["night", "thrill"], q: "Frühlingsfest OR Theresienwiese" },
      { name: "Therme Erding", what: "One of the biggest spa and sauna parks in the world. Worth a whole lazy day.", tags: ["relax"], q: '"Therme Erding"' }
    ],
    food: [
      { name: "Weisswurst and pretzels", what: "White sausage with sweet mustard and a big pretzel.", q: "Weißwurst" },
      { name: "Schnitzel", what: "Crumbed and fried. Huge and filling.", q: "Schnitzel" },
      { name: "Apple strudel", what: "Warm with vanilla sauce. One for the sweet tooth.", q: "Apfelstrudel" }
    ],
    tip: "Ask your brother for his favourite spots." },

  { id: "venice", name: "Venice", country: "Italy", flag: "🇮🇹", lat: 45.44, lng: 12.33,
    onRoute: true, leg: "contiki", stops: ["ven"], article: "Venice",
    where: "Venice OR Venezia OR Venedig OR Venise OR Venecia OR Burano OR Murano",
    hero: '"Grand Canal" OR "Canal Grande"',
    gallery: ['"Santa Maria della Salute"', '"Doge\'s Palace" OR "Palazzo Ducale"', '"San Giorgio Maggiore"', '"Bridge of Sighs" OR "Ponte dei Sospiri"', '"Canals of Venice" OR "Venice canal"', '"Campanile di San Marco" OR "St Mark\'s Campanile"'],
    blurb: "A city on water with no cars at all. Two nights here is one of the best parts of the trip. Get lost in the back lanes, then find a bar for cicchetti.",
    highlights: [
      { name: "Grand Canal by water bus", what: "Ride water bus line 1 the whole way. The cheapest great boat trip in Venice.", tags: ["views"], q: 'vaporetto OR "water bus"' },
      { name: "St Mark's Square", what: "The basilica, the bell tower and the famous square.", tags: ["history"], q: '"Piazza San Marco" OR "St Mark\'s Square" OR "St Mark\'s Basilica" OR "Basilica di San Marco"' },
      { name: "Rialto Bridge", what: "The oldest bridge over the Grand Canal. Lovely at sunset.", tags: ["views", "free"], q: '"Rialto Bridge" OR "Ponte di Rialto"' },
      { name: "Burano and Murano", what: "Islands of brightly painted houses and glass blowing.", tags: ["views"], q: "Burano" },
      { name: "Gondola ride", what: "Pricey but very Venice. Share one to split the cost.", tags: ["views"], q: "gondola OR gondolier" }
    ],
    food: [
      { name: "Cicchetti", what: "Small Venetian snacks with a glass of wine. Hop from bar to bar.", q: "cicchetti" },
      { name: "Spritz", what: "The orange Venetian aperitivo.", q: '"Aperol Spritz" OR "Spritz Veneziano"' },
      { name: "Tiramisu", what: "First made in nearby Treviso. Try it here.", q: "tiramisu" }
    ],
    tip: "There may be a day visitor fee. It does not apply if you stay the night." },

  { id: "lucerne", name: "Lucerne", country: "Switzerland", flag: "🇨🇭", lat: 47.05, lng: 8.31,
    onRoute: true, leg: "contiki", stops: ["luc"], article: "Lucerne",
    where: 'Luzern OR Lucerne OR Lucerna OR Vierwaldstättersee OR "Pilatus Kulm" OR "Mount Pilatus" OR Rigi OR Bürgenstock',
    hero: 'Kapellbrücke OR "Chapel Bridge"',
    gallery: ['"Lake Lucerne" OR Vierwaldstättersee', 'Altstadt Luzern OR "Old Town" Lucerne OR Weinmarkt OR Kornmarkt', "Spreuerbrücke", 'Jesuitenkirche OR "Jesuit Church"', "Rigi", 'Löwendenkmal OR "Lion Monument"'],
    blurb: "A picture perfect Swiss town on a lake with mountains all around. The place for Swiss chocolate and a cable car up a mountain.",
    highlights: [
      { name: "Chapel Bridge", what: "A covered wooden bridge from the 1300s, with old paintings in the roof.", tags: ["history", "free"], q: 'Kapellbrücke OR "Chapel Bridge"' },
      { name: "Mount Pilatus", what: "Ride the cable car up for huge views. The steep cog railway opens later in spring.", tags: ["views"], q: '"Pilatus Kulm" OR "Mount Pilatus" OR Pilatusbahn OR Pilatus Luzern' },
      { name: "Lake cruise", what: "A paddle steamer trip on Lake Lucerne.", tags: ["views"], q: 'Vierwaldstättersee Dampfschiff OR "Lake Lucerne" steamer OR "Lake Lucerne" steamship OR "DS Stadt Luzern"' },
      { name: "Musegg Wall", what: "Old city walls and towers you can climb for free.", tags: ["history", "free"], q: 'Museggmauer OR "Musegg Wall"' }
    ],
    food: [
      { name: "Swiss chocolate", what: "Visit a chocolatier and taste the good stuff.", q: '"Swiss chocolate" OR "Schweizer Schokolade" OR "chocolat suisse"' },
      { name: "Cheese fondue", what: "A pot of melted cheese to share. Very Swiss.", q: "fondue" },
      { name: "Rösti", what: "Crispy fried potato. Cheap by Swiss standards.", q: "Rösti OR Roesti" }
    ],
    tip: "Switzerland is pricey. Have a big lunch and a cheap supermarket dinner from Coop or Migros." },

  { id: "paris", name: "Paris", country: "France", flag: "🇫🇷", lat: 48.86, lng: 2.35,
    onRoute: true, leg: "contiki", stops: ["par"], article: "Paris",
    where: 'Paris OR Parigi OR Parijs OR "Marne-la-Vallée" OR Chessy',
    hero: '"Eiffel Tower" OR "Tour Eiffel" OR Eiffelturm',
    gallery: ['"Arc de Triomphe"', '"Notre-Dame de Paris"', '"Pont Alexandre III"', '"Champs-Élysées"', '"Paris skyline" OR "Skyline of Paris"', '"Musée d\'Orsay" OR "Orsay Museum"', '"Place de la Concorde"'],
    blurb: "Two nights for the big sights and a lot of pastries. The Louvre is the big art museum you missed in New York.",
    highlights: [
      { name: "The Louvre", what: "The Mona Lisa and miles of art. Book a time slot ahead.", tags: ["art", "book"], q: '"Louvre Pyramid" OR "Pyramide du Louvre"' },
      { name: "Eiffel Tower", what: "Go up at sunset, or watch it sparkle on the hour at night.", tags: ["views", "night"], q: '"Eiffel Tower" night OR "Tour Eiffel" nuit' },
      { name: "Montmartre", what: "A hilltop village with Sacré-Cœur and street artists.", tags: ["views", "art"], q: 'Sacré-Cœur OR "Sacre Coeur" OR Montmartre' },
      { name: "The Seine at night", what: "Walk or take a boat past the lit up sights.", tags: ["night", "views"], q: "Seine night OR Seine nuit OR Seine dusk" },
      { name: "Disneyland Paris", what: "A day trip by train for the coasters.", tags: ["thrill"], q: '"Disneyland Paris" OR "Château de la Belle au Bois Dormant"' }
    ],
    food: [
      { name: "Croissants and pastries", what: "Start every day at a bakery.", q: "croissant OR viennoiserie" },
      { name: "Macarons", what: "Colourful and sweet. Try Ladurée or Pierre Hermé.", q: "macaron" },
      { name: "Crêpes", what: "Sweet ones from a street stand.", q: "crêpe" }
    ],
    tip: "Book Louvre tickets a day or two ahead." },

  { id: "bruges", name: "Bruges and Brussels", country: "Belgium", flag: "🇧🇪", lat: 51.21, lng: 3.22,
    onRoute: true, leg: "solo", stops: ["bel"], article: "Bruges",
    where: "Brugge OR Bruges OR Brujas OR Brügge OR Brussels OR Bruxelles OR Brussel OR Brüssel OR Bruselas",
    hero: "Rozenhoedkaai",
    gallery: ["Markt Brugge OR Markt Bruges", "Begijnhof OR Beguinage", "Minnewater", "Groenerei OR Spiegelrei OR Langerei OR Dijver", '"Manneken Pis"', "Atomium"],
    blurb: "Fairy tale canals in Bruges and big city buzz in Brussels. Belgium is a dream for your sweet tooth: chocolate, waffles and very good beer.",
    highlights: [
      { name: "Bruges canals", what: "Take a short boat trip past old brick houses.", tags: ["views"], q: "Brugge canal OR Bruges canal OR Groenerei OR Dijver OR Spiegelrei" },
      { name: "The Belfry", what: "Climb 366 steps for a view over the rooftops.", tags: ["views", "history"], q: 'Belfort Brugge OR "Belfry of Bruges"' },
      { name: "Grand Place, Brussels", what: "One of the most beautiful squares in Europe.", tags: ["history", "free"], q: '"Grand-Place" OR "Grand Place" OR "Grote Markt" Brussel' },
      { name: "Chocolate shop crawl", what: "Taste your way from shop to shop.", tags: ["sweet"], q: '"Belgian chocolate" OR chocolatier OR "chocolate shop"' }
    ],
    food: [
      { name: "Belgian waffles", what: "Brussels waffles are light. Liège waffles are sweet and chewy.", q: '"Belgian waffle" OR "Brussels waffle" OR "Liège waffle" OR gaufre OR wafel' },
      { name: "Fries", what: "Belgian fries in a cone with a sauce.", q: '"Belgian fries" OR frietkot OR fritkot OR frites OR friet' },
      { name: "Belgian beer", what: "Try a Trappist beer. They're strong!", q: '"Trappist beer" OR "Belgian beer"' }
    ],
    tip: "London to Brussels is about 2 hours on the Eurostar. Brussels to Bruges is about an hour by train." },

  { id: "rome", name: "Rome", country: "Italy", flag: "🇮🇹", lat: 41.90, lng: 12.50,
    onRoute: true, leg: "solo", stops: ["rom"], article: "Rome",
    where: "Rome OR Roma OR Rom OR Vatican OR Vaticano OR Vatikan",
    hero: "Colosseum OR Colosseo OR Kolosseum",
    gallery: ['"Piazza Navona"', '"Castel Sant\'Angelo"', '"St. Peter\'s Basilica" OR "St. Peter\'s Square" OR "Piazza San Pietro" OR "Basilica di San Pietro"', '"Spanish Steps" OR "Piazza di Spagna"', '"Altare della Patria" OR Vittoriano', '"Ponte Sant\'Angelo" OR Tiber OR Tevere'],
    blurb: "Three nights in a city with history on every corner. Great food, late nights in Trastevere and the Vatican's huge art collection.",
    highlights: [
      { name: "Colosseum and Forum", what: "Walk where gladiators fought. Book a time slot ahead.", tags: ["history", "book"], q: '"Roman Forum" OR "Foro Romano" OR "Forum Romanum"' },
      { name: "Vatican Museums", what: "The Sistine Chapel ceiling and room after room of art. Book ahead.", tags: ["art", "book"], q: '"Vatican Museums" OR "Musei Vaticani"' },
      { name: "Trevi Fountain", what: "Throw in a coin. Go late at night to dodge the crowds.", tags: ["night", "free"], q: '"Trevi Fountain" OR "Fontana di Trevi"' },
      { name: "Pantheon", what: "A temple nearly 2,000 years old with a hole in the roof.", tags: ["history"], q: "Pantheon" },
      { name: "Trastevere at night", what: "Cobbled lanes full of bars and places to eat.", tags: ["night", "food"], q: "Trastevere" }
    ],
    food: [
      { name: "Carbonara", what: "Rome's famous pasta. Egg, cheese and crispy pork. No cream!", q: "carbonara" },
      { name: "Pizza al taglio", what: "Pizza by the slice, sold by weight.", q: "pizza al taglio" },
      { name: "Gelato", what: "Have one every day. That's the rule.", q: "gelato" }
    ],
    tip: "Vatican tickets sell out, so book ahead. The Pantheon now has a small entry fee." },

  { id: "florence", name: "Florence", country: "Italy", flag: "🇮🇹", lat: 43.77, lng: 11.26,
    onRoute: true, leg: "solo", stops: ["flo"], article: "Florence",
    where: "Florence OR Firenze OR Florenz OR Florencia OR Fiesole",
    hero: '"Florence Cathedral" OR "Santa Maria del Fiore" OR "Duomo di Firenze"',
    gallery: ['"Palazzo Vecchio"', '"Piazza della Signoria"', '"Boboli Gardens" OR "Giardino di Boboli"', '"Santa Croce"', '"Giotto\'s Campanile" OR "Campanile di Giotto"', "Arno"],
    blurb: "Small, walkable and packed with famous art. Climb the Duomo, see the David and watch the sun set over the city.",
    highlights: [
      { name: "Uffizi Gallery", what: "Botticelli's Birth of Venus and more. Book ahead.", tags: ["art", "book"], q: '"Piazzale degli Uffizi" OR Uffizi exterior OR Uffizi corridor OR Uffizi courtyard OR "Uffizi Gallery"' },
      { name: "Statue of David", what: "Michelangelo's David. Much bigger than you think.", tags: ["art", "book"], q: '"David (Michelangelo)" OR "Michelangelo\'s David" OR "David di Michelangelo"' },
      { name: "Climb the Duomo", what: "463 steps up inside the famous dome.", tags: ["views", "book"], q: '"Brunelleschi\'s Dome" OR "Cupola del Brunelleschi" OR Brunelleschi dome' },
      { name: "Piazzale Michelangelo", what: "The best sunset view over Florence.", tags: ["views", "free"], q: '"Piazzale Michelangelo"' },
      { name: "Ponte Vecchio", what: "The old bridge lined with jewellery shops.", tags: ["history", "free"], q: '"Ponte Vecchio"' }
    ],
    food: [
      { name: "Mercato Centrale", what: "A food hall full of stalls. A buffet you build yourself.", q: '"Mercato Centrale"' },
      { name: "Florentine steak", what: "A giant T-bone steak to share.", q: '"bistecca alla fiorentina"' },
      { name: "Schiacciata sandwiches", what: "Huge and cheap. All'Antico Vinaio is the famous one.", q: 'schiacciata OR "Antico Vinaio"' }
    ],
    tip: "The Duomo climb needs a ticket with a time slot. Book ahead." },

  { id: "garda", name: "Lake Garda", country: "Italy", flag: "🇮🇹", lat: 45.45, lng: 10.71,
    onRoute: true, leg: "solo", stops: ["gar"], article: "Lake Garda",
    where: 'Garda OR Gardasee OR Sirmione OR Malcesine OR Limone OR Bardolino OR Salò OR Desenzano OR Gardaland OR Lazise OR Peschiera OR Torbole OR Gardone OR "Monte Baldo"',
    hero: '"Limone sul Garda" OR Malcesine',
    gallery: ["Malcesine", '"Limone sul Garda"', "Sirmione", '"Monte Baldo"', 'Torbole OR "Riva del Garda"', 'Salò OR "Gardone Riviera"', "Bardolino OR Lazise"],
    blurb: "Italy's biggest lake, with mountains in the north and beaches in the south. Gardaland is your roller coaster fix, and the spas are perfect for a rest day.",
    highlights: [
      { name: "Gardaland", what: "Italy's biggest theme park, with big roller coasters.", tags: ["thrill"], q: "Gardaland" },
      { name: "Sirmione", what: "A castle town on a thin strip of land, with a thermal spa.", tags: ["history", "relax"], q: '"Rocca Scaligera" Sirmione OR "Castello Scaligero" Sirmione OR "Scaliger Castle" Sirmione' },
      { name: "Riva del Garda", what: "Mountains drop straight into the lake. Famous for mountain biking.", tags: ["views"], q: '"Riva del Garda"' },
      { name: "Boat between towns", what: "Ferries link the lake towns. Slow and scenic.", tags: ["views"], q: '"Lake Garda" ferry OR "Lago di Garda" traghetto OR "Navigazione Lago di Garda" OR Gardasee Schiff OR Gardasee Fähre' }
    ],
    food: [
      { name: "Spritz by the water", what: "Sit by the lake with an Aperol spritz.", q: '"Aperol Spritz"' },
      { name: "Gelato", what: "Lakeside gelato is the best gelato.", q: "gelato" }
    ],
    tip: "Check Gardaland's opening dates. It usually opens around Easter." },

  { id: "hongkong", name: "Hong Kong", country: "Hong Kong", flag: "🇭🇰", lat: 22.30, lng: 114.17,
    onRoute: true, leg: "home", stops: ["hkg"], article: "Hong Kong",
    where: '"Hong Kong" OR Hongkong OR Kowloon OR "Victoria Harbour" OR "Tsim Sha Tsui" OR Lantau',
    hero: '"Victoria Harbour"',
    gallery: ['"Hong Kong skyline" OR "Skyline of Hong Kong"', '"Tsim Sha Tsui"', '"Avenue of Stars" OR "Clock Tower"', '"Temple Street" OR "Mong Kok"', '"Tian Tan Buddha" OR "Big Buddha"', '"Wan Chai" OR "Central, Hong Kong"'],
    blurb: "A rest stop on the way home that's anything but boring. Skyline views, dim sum and two theme parks, all an easy train ride apart.",
    highlights: [
      { name: "Victoria Peak", what: "Ride the Peak Tram up for the classic skyline view.", tags: ["views"], q: '"Victoria Peak" OR "Peak Tram"' },
      { name: "Star Ferry", what: "A cheap, short ferry across the harbour with great views.", tags: ["views"], q: '"Star Ferry"' },
      { name: "Symphony of Lights", what: "A free light show on the skyline every night at 8pm.", tags: ["night", "free"], q: '"A Symphony of Lights" OR "Hong Kong" skyline night OR "Victoria Harbour" night' },
      { name: "Ocean Park", what: "A theme park with coasters, cable cars and pandas.", tags: ["thrill"], q: '"Ocean Park"' }
    ],
    food: [
      { name: "Dim sum", what: "Little steamed dishes with tea. Perfect for a long lunch.", q: '"dim sum"' },
      { name: "Egg tarts", what: "Flaky, sweet and best eaten warm.", q: '"egg tart" OR "dan tat"' },
      { name: "Roast goose", what: "Crispy skin over rice. A Hong Kong classic.", q: '"roast goose"' }
    ],
    tip: "Stay near the Airport Express line so the last flight is easy." },

  { id: "interlaken", name: "Interlaken", country: "Switzerland", flag: "🇨🇭", lat: 46.69, lng: 7.86,
    onRoute: false, article: "Interlaken",
    where: 'Interlaken OR Lauterbrunnen OR Jungfrau OR Jungfraujoch OR Grindelwald OR Mürren OR Wengen OR Eiger OR Mönch OR Schilthorn OR Brienz OR Brienzersee OR Thunersee OR "Lake Thun" OR "Lake Brienz" OR "Bernese Oberland" OR "Berner Oberland" OR Staubbach OR Gimmelwald OR "Harder Kulm" OR Iseltwald',
    hero: '"Lauterbrunnen valley" OR Lauterbrunnental OR Lauterbrunnen Staubbach',
    gallery: ["Interlaken", "Lauterbrunnen", "Jungfrau OR Eiger OR Mönch", "Grindelwald", "Mürren OR Gimmelwald", '"Lake Brienz" OR Brienzersee OR Iseltwald', '"Harder Kulm"'],
    blurb: "Switzerland's adventure capital, between two lakes with huge mountains behind. Pricey but unforgettable.",
    highlights: [
      { name: "Paragliding", what: "Fly over the lakes with a pilot. No experience needed.", tags: ["thrill", "views"], q: "paragliding Interlaken OR Gleitschirm Interlaken" },
      { name: "Lauterbrunnen Valley", what: "A flat walk past huge waterfalls. Easy on the back.", tags: ["views", "free"], q: "Staubbach OR Staubbachfall" },
      { name: "Jungfraujoch", what: "A train up to the Top of Europe. Expensive, about NZ$300 or more.", tags: ["views"], q: 'Jungfraujoch OR "Sphinx Observatory"' }
    ],
    food: [
      { name: "Raclette", what: "Melted cheese scraped over potatoes.", q: "raclette" }
    ] },

  { id: "milan", name: "Milan", country: "Italy", flag: "🇮🇹", lat: 45.46, lng: 9.19,
    onRoute: false, article: "Milan",
    where: 'Milan OR Milano OR Mailand OR "San Siro" OR Termemilano',
    hero: '"Duomo di Milano" OR "Milan Cathedral" OR "Mailänder Dom"',
    gallery: ['"Castello Sforzesco"', 'Navigli OR "Naviglio Grande"', '"Bosco Verticale"', '"Milan skyline" OR "Porta Nuova" OR CityLife', '"Piazza del Duomo"', '"Santa Maria delle Grazie"'],
    blurb: "Fashion, football and the best aperitivo in Italy. A handy hub between the snow and the rest of Italy.",
    highlights: [
      { name: "Duomo rooftop", what: "Walk on the cathedral roof among the spires.", tags: ["views", "book"], q: '"Milan Cathedral" roof OR "Duomo di Milano" tetto OR "Milan Cathedral" terraces OR "Duomo di Milano" terrazze' },
      { name: "Galleria Vittorio Emanuele II", what: "A grand old shopping arcade with a glass roof.", tags: ["history", "free"], q: '"Galleria Vittorio Emanuele II"' },
      { name: "Football at San Siro", what: "See AC Milan or Inter play in a huge stadium.", tags: ["night"], q: '"San Siro" OR "Stadio Giuseppe Meazza"' },
      { name: "QC Termemilano spa", what: "Pools and saunas in an old tram depot.", tags: ["relax"], q: "Termemilano" }
    ],
    food: [
      { name: "Aperitivo", what: "Buy a drink and graze a free buffet, usually 6 to 9pm.", q: "aperitivo" },
      { name: "Risotto alla milanese", what: "Golden saffron risotto.", q: '"risotto alla milanese"' }
    ] },

  { id: "amalfi", name: "Amalfi Coast", country: "Italy", flag: "🇮🇹", lat: 40.63, lng: 14.60,
    onRoute: false, article: "Amalfi Coast",
    where: 'Amalfi OR "Costiera Amalfitana" OR Positano OR Ravello OR Atrani OR Praiano OR Maiori OR Minori OR Furore OR Sorrento OR Pompeii OR Pompei OR Pompeji OR Naples OR Napoli OR Nocelle OR Agerola OR "Sentiero degli Dei"',
    hero: '"Amalfi Coast" OR "Costiera Amalfitana"',
    gallery: ["Amalfi", "Ravello", "Atrani", "Praiano OR Furore", "Positano", "Sorrento"],
    blurb: "Cliffside towns over a deep blue sea. Add Naples for the best pizza in the world and Pompeii for history.",
    highlights: [
      { name: "Positano", what: "Pastel houses stacked up a cliff over the sea.", tags: ["views"], q: "Positano" },
      { name: "Path of the Gods", what: "A famous walk high above the coast. Moderate, with amazing views.", tags: ["views"], q: '"Sentiero degli Dei" OR "Path of the Gods"' },
      { name: "Pompeii", what: "A Roman town frozen in time by a volcano.", tags: ["history"], q: "Pompeii OR Pompei" }
    ],
    food: [
      { name: "Neapolitan pizza", what: "Try L'Antica Pizzeria da Michele in Naples.", q: '"pizza napoletana" OR "Neapolitan pizza" OR "pizza margherita"' },
      { name: "Limoncello", what: "Sweet lemon liqueur from local lemons.", q: "limoncello" }
    ] },

  { id: "europapark", name: "Europa-Park", country: "Germany", flag: "🇩🇪", lat: 48.27, lng: 7.72,
    onRoute: false, article: "Europa-Park",
    where: "Europa-Park OR Europapark OR Rulantica OR Rust",
    hero: '"Europa-Park" OR Europapark',
    gallery: ['"Europa-Park" OR Europapark', 'Wodan OR Eurosat OR "Euro-Mir" OR Voltron OR Poseidon'],
    blurb: "Germany's biggest theme park and one of the best in the world. Worth a detour for the coasters alone.",
    highlights: [
      { name: "Silver Star", what: "One of the tallest roller coasters in Europe.", tags: ["thrill"], q: '"Silver Star"' },
      { name: "Blue Fire", what: "A launch coaster that goes 0 to 100 km/h in seconds.", tags: ["thrill"], q: '"Blue Fire"' },
      { name: "Rulantica", what: "A big indoor water park next door.", tags: ["relax"], q: "Rulantica" }
    ],
    food: [
      { name: "Black Forest cake", what: "The local cake. Chocolate, cherries and cream.", q: '"Schwarzwälder Kirschtorte" OR "Black Forest cake" OR "Black Forest gateau"' }
    ] },

  { id: "berlin", name: "Berlin", country: "Germany", flag: "🇩🇪", lat: 52.52, lng: 13.40,
    onRoute: false, article: "Berlin",
    where: "Berlin OR Berlijn OR Berlino",
    hero: '"Brandenburger Tor" OR "Brandenburg Gate"',
    gallery: ['"Berliner Dom" OR "Berlin Cathedral"', "Reichstag OR Reichstagsgebäude", "Gendarmenmarkt", 'Fernsehturm OR "TV Tower"', '"Potsdamer Platz"', "Oberbaumbrücke", '"Checkpoint Charlie"'],
    blurb: "History, street art and famous nightlife. Cheap compared with other big cities.",
    highlights: [
      { name: "Brandenburg Gate", what: "Berlin's famous landmark.", tags: ["history", "free"], q: '"Brandenburger Tor" OR "Brandenburg Gate"' },
      { name: "East Side Gallery", what: "The longest piece of the Berlin Wall still standing, covered in art.", tags: ["art", "history", "free"], q: '"East Side Gallery"' },
      { name: "Museum Island", what: "Five big museums on one island.", tags: ["art", "history"], q: 'Museumsinsel OR "Museum Island"' },
      { name: "Nightlife", what: "Clubs that open late and go till morning.", tags: ["night"], q: "Berlin night OR Berlin Nacht OR Berlin nightlife OR Berghain" }
    ],
    food: [
      { name: "Currywurst", what: "Sausage with curry ketchup. Berlin's street food.", q: "Currywurst" },
      { name: "Döner kebab", what: "Berlin claims it as its own. Huge and cheap.", q: "Döner" }
    ] },

  { id: "budapest", name: "Budapest", country: "Hungary", flag: "🇭🇺", lat: 47.50, lng: 19.04,
    onRoute: false, article: "Budapest",
    where: "Budapest",
    hero: '"Hungarian Parliament Building" OR Országház OR Parliament Budapest',
    gallery: ['"Széchenyi Chain Bridge" OR "Chain Bridge" OR Lánchíd', '"Buda Castle" OR "Budavári Palota"', '"St. Stephen\'s Basilica" OR "Szent István Bazilika"', '"Heroes\' Square" OR "Hősök tere"', '"Matthias Church" OR "Mátyás-templom"', "Danube OR Duna"],
    blurb: "Grand buildings on the Danube, thermal baths and ruin bars. Great value.",
    highlights: [
      { name: "Széchenyi baths", what: "Hot outdoor pools and saunas. Perfect for your back.", tags: ["relax"], q: '"Széchenyi thermal bath" OR "Széchenyi fürdő" OR "Széchenyi Bath"' },
      { name: "Parliament at night", what: "Lit up gold on the river. Best from the other bank.", tags: ["views", "night"], q: '"Hungarian Parliament Building" night OR Országház night OR Parliament Budapest night' },
      { name: "Ruin bars", what: "Bars in old run down buildings. Szimpla Kert is the famous one.", tags: ["night"], q: '"Szimpla Kert" OR "ruin bar" OR romkocsma' },
      { name: "Fisherman's Bastion", what: "Fairy tale towers with views over the city.", tags: ["views"], q: '"Fisherman\'s Bastion" OR Halászbástya' }
    ],
    food: [
      { name: "Chimney cake", what: "Sweet bread baked in a spiral.", q: "kürtőskalács" },
      { name: "Lángos", what: "Fried dough with sour cream and cheese.", q: "lángos" }
    ] },

  { id: "barcelona", name: "Barcelona", country: "Spain", flag: "🇪🇸", lat: 41.39, lng: 2.17,
    onRoute: false, article: "Barcelona",
    where: "Barcelona OR Barcelone OR Barcellona OR PortAventura OR Salou",
    hero: '"Barcelona skyline" OR "Skyline of Barcelona" OR Barcelona panorama',
    gallery: ['"Casa Batlló"', '"Casa Milà" OR "La Pedrera"', "Barceloneta", 'Montjuïc OR "Font Màgica"', '"La Rambla" OR "La Boqueria"', '"Arc de Triomf"', '"Barcelona Cathedral" OR "Catedral de Barcelona"'],
    blurb: "Beach, Gaudí and late nights. Dinner starts at 9pm here.",
    highlights: [
      { name: "Sagrada Família", what: "Gaudí's giant church, still being built. Book ahead.", tags: ["art", "book"], q: '"Sagrada Família"' },
      { name: "Park Güell", what: "Colourful mosaics and views over the city.", tags: ["art", "views", "book"], q: '"Park Güell"' },
      { name: "Gothic Quarter", what: "Narrow old lanes full of bars.", tags: ["history", "night"], q: '"Barri Gòtic" OR "Gothic Quarter"' },
      { name: "PortAventura", what: "A big theme park an hour south.", tags: ["thrill"], q: "PortAventura" }
    ],
    food: [
      { name: "Tapas", what: "Lots of small plates to share.", q: "tapas" },
      { name: "Churros with chocolate", what: "Dunk them in thick hot chocolate.", q: "churros chocolate" }
    ] },

  { id: "kingsday", name: "Amsterdam King's Day", country: "Netherlands", flag: "🇳🇱", lat: 52.37, lng: 4.90,
    onRoute: false, article: "Koningsdag",
    where: "Amsterdam",
    hero: 'Koningsdag OR Koninginnedag OR "King\'s Day" OR "Queen\'s Day"',
    gallery: ["Koningsdag", "Koninginnedag", '"King\'s Day" OR "Queen\'s Day"'],
    blurb: "Amsterdam's biggest party, on Tuesday 27 April 2027. The whole city wears orange.",
    highlights: [
      { name: "Street party", what: "Music and crowds all over the city.", tags: ["night"], q: "Koningsdag OR Koninginnedag" },
      { name: "Canal boat parties", what: "The canals fill with orange party boats.", tags: ["night", "views"], q: "Koningsdag boat OR Koningsdag boot OR Koninginnedag boot OR Koninginnedag boat OR Koningsdag gracht OR Koninginnedag gracht" },
      { name: "Free market", what: "Anyone can sell things on the street for the day.", tags: ["free"], q: "vrijmarkt" }
    ],
    food: [
      { name: "Orange tompouce", what: "A Dutch custard pastry with orange icing, only on King's Day.", q: "tompouce OR tompoes" }
    ],
    tip: "Clashes with the Italy part of the plan. Beds sell out early." }
];

// Easy-to-forget checklist. Ticks are saved in your browser.
window.CHECKLIST = [
  { group: "Big ones", items: [
    "Travel insurance with snowboarding and my back covered",
    "Passport valid 6 months after I get home",
    "ETIAS travel permit for Europe (official EU site only)",
    "Leave approved by my manager",
    "Singapore Arrival Card (within 3 days of landing)"
  ]},
  { group: "Money", items: [
    "Travel card with no foreign fees, plus a backup card",
    "Some euro cash",
    "Tell the bank I'm travelling",
    "Contiki deposit and final payment dates"
  ]},
  { group: "Phone", items: [
    "eSIM for Singapore, Europe and Hong Kong",
    "Offline Google Maps for each city",
    "Contiki and train apps"
  ]},
  { group: "Book ahead", items: [
    "Vatican Museums and Uffizi tickets",
    "Venice day visitor fee (if still running)",
    "Refundable snow beds for Easter weekend",
    "Hotel the night before and after Contiki"
  ]},
  { group: "Packing", items: [
    "Snow jacket, pants, gloves, goggles",
    "Wedding outfit and gift",
    "Plug adapters (UK type G, Europe type F and L)",
    "Padlock for hostel lockers",
    "Back care: meds and a massage ball"
  ]},
  { group: "At home", items: [
    "Bills, rent and car rego covered",
    "Copies of passport and insurance in my email"
  ]}
];

// Special days shown on the calendar.
window.EVENTS = [
  { day: "2027-03-26", icon: "💍", text: "The wedding" },
  { day: "2027-03-28", icon: "🐣", text: "Easter Sunday. Resorts are busy" }
];
