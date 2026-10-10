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
  { id: "cer", name: "Cervinia or Livigno", country: "Italy", flag: "🇮🇹", lat: 45.94, lng: 7.63,  leg: "snow",    start: "2027-03-29", end: "2027-04-09", note: "About 6 days riding plus rest days. Pick the resort from the snow forecast" },
  { id: "lon", name: "London",       country: "England",     flag: "🇬🇧", lat: 51.51,  lng: -0.13,  leg: "contiki", start: "2027-04-09", end: "2027-04-11", note: "Rest, then meet the Contiki group" },
  { id: "ams", name: "Amsterdam",    country: "Netherlands", flag: "🇳🇱", lat: 52.37,  lng: 4.90,   leg: "contiki", start: "2027-04-11", end: "2027-04-12" },
  { id: "rhi", name: "Rhine Valley", country: "Germany",     flag: "🇩🇪", lat: 50.15,  lng: 7.71,   leg: "contiki", start: "2027-04-12", end: "2027-04-13" },
  { id: "mun", name: "Munich",       country: "Germany",     flag: "🇩🇪", lat: 48.14,  lng: 11.58,  leg: "contiki", start: "2027-04-13", end: "2027-04-14" },
  { id: "ven", name: "Venice",       country: "Italy",       flag: "🇮🇹", lat: 45.44,  lng: 12.33,  leg: "contiki", start: "2027-04-14", end: "2027-04-16" },
  { id: "luc", name: "Lucerne",      country: "Switzerland", flag: "🇨🇭", lat: 47.05,  lng: 8.31,   leg: "contiki", start: "2027-04-16", end: "2027-04-18" },
  { id: "par", name: "Paris",        country: "France",      flag: "🇫🇷", lat: 48.86,  lng: 2.35,   leg: "contiki", start: "2027-04-18", end: "2027-04-20" },
  { id: "lon2", name: "London",      country: "England",     flag: "🇬🇧", lat: 51.51,  lng: -0.13,  leg: "contiki", start: "2027-04-20", end: "2027-04-21", note: "Contiki ends", hidePin: true },
  { id: "bel", name: "Bruges and Brussels", country: "Belgium", flag: "🇧🇪", lat: 51.05, lng: 3.85, leg: "solo",  start: "2027-04-21", end: "2027-04-23", note: "Chocolate and waffles. Eurostar from London" },
  { id: "rom", name: "Rome",         country: "Italy",       flag: "🇮🇹", lat: 41.90,  lng: 12.50,  leg: "solo",    start: "2027-04-23", end: "2027-04-26", note: "Colosseum, Vatican, Trastevere" },
  { id: "flo", name: "Florence",     country: "Italy",       flag: "🇮🇹", lat: 43.77,  lng: 11.26,  leg: "solo",    start: "2027-04-26", end: "2027-04-27", note: "Uffizi and the Statue of David" },
  { id: "gar", name: "Lake Garda",   country: "Italy",       flag: "🇮🇹", lat: 45.45,  lng: 10.71,  leg: "solo",    start: "2027-04-27", end: "2027-04-29", note: "Gardaland theme park" },
  { id: "mil2", name: "Milan",       country: "Italy",       flag: "🇮🇹", lat: 45.46,  lng: 9.19,   leg: "home",    start: "2027-04-29", end: "2027-04-29", note: "Train to Milan airport", hidePin: true },
  { id: "hkg", name: "Hong Kong",    country: "Hong Kong",   flag: "🇭🇰", lat: 22.30,  lng: 114.17, leg: "home",    start: "2027-04-29", end: "2027-05-01", note: "1 or 2 nights to rest my back" },
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
  { from: "AKL", fromCity: "Auckland",  to: "SIN", toCity: "Singapore", date: "Sat 20 Mar", hours: 10.5, leg: "wedding" },
  { from: "SIN", fromCity: "Singapore", to: "MXP", toCity: "Milan",     date: "Sun 28 Mar", hours: 13,   leg: "snow" },
  { from: "MXP", fromCity: "Milan",     to: "LHR", toCity: "London",    date: "Fri 9 Apr",  hours: 2,    leg: "contiki" },
  { from: "BRU", fromCity: "Brussels",  to: "FCO", toCity: "Rome",      date: "Fri 23 Apr", hours: 2.25, leg: "solo" },
  { from: "MXP", fromCity: "Milan",     to: "HKG", toCity: "Hong Kong", date: "Thu 29 Apr", hours: 12,   leg: "home" },
  { from: "HKG", fromCity: "Hong Kong", to: "AKL", toCity: "Auckland",  date: "Sat 1 May",  hours: 11,   leg: "home" }
];

// Place cards. "wiki" is the Wikipedia page used for the photo.
// Put your own photo link in "img" to override it.
window.PLACES = [
  { name: "Singapore", country: "Singapore", flag: "🇸🇬", wiki: "Marina Bay Sands", onRoute: true, leg: "wedding",
    todo: ["The wedding!", "Hawker centre food", "Gardens by the Bay light show"] },
  { name: "Cervinia", country: "Italy", flag: "🇮🇹", wiki: "Breuil-Cervinia", onRoute: true, leg: "snow",
    todo: ["Very high, snow into May", "Nursery slopes for beginners", "Matterhorn views"] },
  { name: "Livigno", country: "Italy", flag: "🇮🇹", wiki: "Livigno", onRoute: true, leg: "snow",
    todo: ["Tax free, cheap food and drink", "Open to early May", "Backup snow pick"] },
  { name: "London", country: "England", flag: "🇬🇧", wiki: "Tower Bridge", onRoute: true, leg: "contiki",
    todo: ["Huge free museums", "Theatre night", "Contiki starts here"] },
  { name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", wiki: "Amsterdam", onRoute: true, leg: "contiki",
    todo: ["Canals and bikes", "Stroopwafels", "Nightlife"] },
  { name: "Rhine Valley", country: "Germany", flag: "🇩🇪", wiki: "Middle Rhine", onRoute: true, leg: "contiki",
    todo: ["Castles on the river", "Wine villages"] },
  { name: "Munich", country: "Germany", flag: "🇩🇪", wiki: "Munich", onRoute: true, leg: "contiki",
    todo: ["Beer halls and Hofbräuhaus", "Spring beer festival", "Therme Erding spa"] },
  { name: "Venice", country: "Italy", flag: "🇮🇹", wiki: "Venice", onRoute: true, leg: "contiki",
    todo: ["Cicchetti bar crawl", "Murano and Burano islands", "St Mark's Square"] },
  { name: "Lucerne", country: "Switzerland", flag: "🇨🇭", wiki: "Lucerne", onRoute: true, leg: "contiki",
    todo: ["Chapel Bridge", "Cable car up Mount Pilatus", "Swiss chocolate"] },
  { name: "Paris", country: "France", flag: "🇫🇷", wiki: "Eiffel Tower", onRoute: true, leg: "contiki",
    todo: ["The Louvre", "Pastries and macarons", "Disneyland Paris coasters"] },
  { name: "Bruges", country: "Belgium", flag: "🇧🇪", wiki: "Bruges", onRoute: true, leg: "solo",
    todo: ["Chocolate shops", "Waffles", "Fairy tale old town"] },
  { name: "Rome", country: "Italy", flag: "🇮🇹", wiki: "Colosseum", onRoute: true, leg: "solo",
    todo: ["Colosseum and Forum", "Vatican Museums", "Trastevere food at night"] },
  { name: "Florence", country: "Italy", flag: "🇮🇹", wiki: "Florence Cathedral", onRoute: true, leg: "solo",
    todo: ["Uffizi Gallery", "Statue of David", "Climb the Duomo"] },
  { name: "Lake Garda", country: "Italy", flag: "🇮🇹", wiki: "Lake Garda", onRoute: true, leg: "solo",
    todo: ["Gardaland roller coasters", "Mountain biking at Riva", "Sirmione thermal spa"] },
  { name: "Hong Kong", country: "Hong Kong", flag: "🇭🇰", wiki: "Victoria Harbour", onRoute: true, leg: "home",
    todo: ["Ocean Park or Disneyland", "Dim sum", "Rest before the last flight"] },

  { name: "Interlaken", country: "Switzerland", flag: "🇨🇭", wiki: "Lauterbrunnen", onRoute: false,
    todo: ["Paragliding", "Lauterbrunnen waterfalls", "Jungfraujoch train"] },
  { name: "Milan", country: "Italy", flag: "🇮🇹", wiki: "Milan Cathedral", onRoute: false,
    todo: ["Aperitivo buffet", "QC Termemilano spa", "Football at San Siro"] },
  { name: "Amalfi Coast", country: "Italy", flag: "🇮🇹", wiki: "Positano", onRoute: false,
    todo: ["Real Naples pizza", "Pompeii", "Path of the Gods"] },
  { name: "Europa-Park", country: "Germany", flag: "🇩🇪", wiki: "Europa-Park", onRoute: false,
    todo: ["Some of Europe's best coasters"] },
  { name: "Berlin", country: "Germany", flag: "🇩🇪", wiki: "Brandenburg Gate", onRoute: false,
    todo: ["Berlin Wall", "Museum Island", "Famous nightlife"] },
  { name: "Budapest", country: "Hungary", flag: "🇭🇺", wiki: "Hungarian Parliament Building", onRoute: false,
    todo: ["Thermal baths", "Ruin bars", "Chimney cake"] },
  { name: "Barcelona", country: "Spain", flag: "🇪🇸", wiki: "Sagrada Família", onRoute: false,
    todo: ["Beach, food and nightlife", "PortAventura theme park"] },
  { name: "Amsterdam King's Day", country: "Netherlands", flag: "🇳🇱", wiki: "Koningsdag", onRoute: false,
    todo: ["Tue 27 April 2027", "Orange street parties", "Clashes with Italy time"] }
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
