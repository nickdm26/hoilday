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

// Places. Tap a card on the site to open its own page.
//   wiki:    Wikipedia page used for the card photo
//   article: Wikipedia page used for the intro text and extra photos
//   stops:   which STOPS ids above give my dates there
//   img:     put your own photo link here to override the card photo
window.PLACES = [
  { id: "singapore", name: "Singapore", country: "Singapore", flag: "🇸🇬", wiki: "Marina Bay Sands", article: "Singapore",
    lat: 1.29, lng: 103.85, onRoute: true, leg: "wedding", stops: ["sin"],
    todo: ["The wedding!", "Gardens by the Bay light show", "Marina Bay Sands rooftop", "Sentosa and Universal Studios", "Night Safari"],
    food: ["Hawker centres: Lau Pa Sat, Maxwell, Newton", "Chilli crab", "Hainanese chicken rice", "Kaya toast for breakfast"],
    tip: "Fill in the Singapore Arrival Card online within 3 days of landing." },

  { id: "cervinia", name: "Cervinia", country: "Italy", flag: "🇮🇹", wiki: "Breuil-Cervinia", article: "Breuil-Cervinia",
    lat: 45.94, lng: 7.63, onRoute: true, leg: "snow", stops: ["cer"],
    todo: ["Very high, so snow lasts into May", "Wide nursery slopes for beginners", "Matterhorn views from the slopes", "Ride across to Zermatt, Switzerland on a clear day"],
    food: ["Polenta and fondue after riding", "Bombardino (hot eggnog and brandy)"],
    tip: "The Open pass lets you ride days that are not in a row. Good for rest days." },

  { id: "livigno", name: "Livigno", country: "Italy", flag: "🇮🇹", wiki: "Livigno", article: "Livigno",
    lat: 46.54, lng: 10.14, onRoute: true, leg: "snow", stops: ["cer"],
    todo: ["Big terrain park", "Long easy blue runs", "Aquagranda spa after riding"],
    food: ["Tax free, so food and drink are cheap", "Pizzoccheri (buckwheat pasta)"],
    tip: "Backup snow pick. Open to early May. The transfer from Milan is long." },

  { id: "london", name: "London", country: "England", flag: "🇬🇧", wiki: "Tower Bridge", article: "London",
    lat: 51.51, lng: -0.13, onRoute: true, leg: "contiki", stops: ["lon", "lon2"],
    todo: ["Natural History Museum (free)", "British Museum (free)", "A West End show", "Camden Market", "Pub night in Soho"],
    food: ["Borough Market", "Sunday roast", "Fish and chips"],
    tip: "The Contiki starts and ends here. Book a bed the night before and after." },

  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", wiki: "Amsterdam", article: "Amsterdam",
    lat: 52.37, lng: 4.90, onRoute: true, leg: "contiki", stops: ["ams"],
    todo: ["Canal boat ride", "Rijksmuseum or Van Gogh Museum", "Ride a bike like a local", "Nightlife around Leidseplein"],
    food: ["Stroopwafels", "Dutch pancakes", "Fries with mayo"],
    tip: "King's Day is Tue 27 April. It clashes with the Italy part of the plan." },

  { id: "rhine", name: "Rhine Valley", country: "Germany", flag: "🇩🇪", wiki: "Middle Rhine", article: "Middle Rhine",
    lat: 50.15, lng: 7.71, onRoute: true, leg: "contiki", stops: ["rhi"],
    todo: ["Castles along the river", "Lorelei rock viewpoint", "Small wine villages"],
    food: ["Riesling wine tasting", "German sausages and pretzels"] },

  { id: "munich", name: "Munich", country: "Germany", flag: "🇩🇪", wiki: "Munich", article: "Munich",
    lat: 48.14, lng: 11.58, onRoute: true, leg: "contiki", stops: ["mun"],
    todo: ["Hofbräuhaus beer hall", "English Garden beer garden", "Spring beer festival (Frühlingsfest)", "Therme Erding spa and saunas", "Neuschwanstein Castle day trip"],
    food: ["Pretzels and weisswurst", "Schnitzel", "Apple strudel"],
    tip: "Ask your brother for his favourite spots." },

  { id: "venice", name: "Venice", country: "Italy", flag: "🇮🇹", wiki: "Venice", article: "Venice",
    lat: 45.44, lng: 12.33, onRoute: true, leg: "contiki", stops: ["ven"],
    todo: ["Cicchetti bar crawl", "Murano and Burano by water bus", "St Mark's Square and Basilica", "Rialto Bridge at sunset", "Get lost in the back streets"],
    food: ["Cicchetti (Venetian tapas)", "Spritz", "Tiramisu (it was invented nearby)"],
    tip: "There may be a day visitor fee. It does not apply if you stay the night." },

  { id: "lucerne", name: "Lucerne", country: "Switzerland", flag: "🇨🇭", wiki: "Lucerne", article: "Lucerne",
    lat: 47.05, lng: 8.31, onRoute: true, leg: "contiki", stops: ["luc"],
    todo: ["Chapel Bridge and old town", "Cable car up Mount Pilatus", "Rigi train, walk part way down", "Lake cruise"],
    food: ["Swiss chocolate shops", "Fondue", "Rösti"],
    tip: "Switzerland is pricey. Eat a big lunch and a cheap dinner." },

  { id: "paris", name: "Paris", country: "France", flag: "🇫🇷", wiki: "Eiffel Tower", article: "Paris",
    lat: 48.86, lng: 2.35, onRoute: true, leg: "contiki", stops: ["par"],
    todo: ["The Louvre", "Eiffel Tower at night", "Montmartre", "Disneyland Paris coasters", "Seine river walk"],
    food: ["Croissants and pastries", "Macarons", "Crêpes"],
    tip: "Book Louvre tickets a day or two ahead." },

  { id: "bruges", name: "Bruges and Brussels", country: "Belgium", flag: "🇧🇪", wiki: "Bruges", article: "Bruges",
    lat: 51.21, lng: 3.22, onRoute: true, leg: "solo", stops: ["bel"],
    todo: ["Fairy tale old town and canals", "Climb the Belfry", "Grand Place in Brussels", "Chocolate shop crawl"],
    food: ["Belgian waffles", "Chocolate", "Fries", "Belgian beer"],
    tip: "2 hours from London by Eurostar." },

  { id: "rome", name: "Rome", country: "Italy", flag: "🇮🇹", wiki: "Colosseum", article: "Rome",
    lat: 41.90, lng: 12.50, onRoute: true, leg: "solo", stops: ["rom"],
    todo: ["Colosseum and Roman Forum", "Vatican Museums and Sistine Chapel", "Trevi Fountain and Pantheon", "Trastevere at night"],
    food: ["Cacio e pepe and carbonara", "Pizza al taglio", "Gelato"],
    tip: "Vatican tickets sell out. Book ahead." },

  { id: "florence", name: "Florence", country: "Italy", flag: "🇮🇹", wiki: "Florence Cathedral", article: "Florence",
    lat: 43.77, lng: 11.26, onRoute: true, leg: "solo", stops: ["flo"],
    todo: ["Uffizi Gallery", "Statue of David", "Climb the Duomo", "Sunset at Piazzale Michelangelo"],
    food: ["Mercato Centrale food hall", "Bistecca alla fiorentina", "Schiacciata sandwiches"],
    tip: "Uffizi tickets sell out. Book ahead." },

  { id: "garda", name: "Lake Garda", country: "Italy", flag: "🇮🇹", wiki: "Lake Garda", article: "Lake Garda",
    lat: 45.45, lng: 10.71, onRoute: true, leg: "solo", stops: ["gar"],
    todo: ["Gardaland roller coasters", "Mountain biking at Riva del Garda", "Aquaria thermal spa in Sirmione", "Boat between lake towns"],
    food: ["Lake fish", "Aperol spritz by the water"],
    tip: "Check Gardaland is open. Some parks only open around Easter." },

  { id: "hongkong", name: "Hong Kong", country: "Hong Kong", flag: "🇭🇰", wiki: "Victoria Harbour", article: "Hong Kong",
    lat: 22.30, lng: 114.17, onRoute: true, leg: "home", stops: ["hkg"],
    todo: ["Ocean Park or Disneyland", "Victoria Peak tram", "Star Ferry across the harbour", "Symphony of Lights show"],
    food: ["Dim sum", "Egg tarts", "Roast goose"],
    tip: "A rest stop for my back before the last flight." },

  { id: "interlaken", name: "Interlaken", country: "Switzerland", flag: "🇨🇭", wiki: "Lauterbrunnen", article: "Interlaken",
    lat: 46.69, lng: 7.86, onRoute: false,
    todo: ["Paragliding over the lakes", "Lauterbrunnen waterfalls walk", "Jungfraujoch train (about NZ$300+)"],
    food: ["Swiss chocolate", "Raclette"] },

  { id: "milan", name: "Milan", country: "Italy", flag: "🇮🇹", wiki: "Milan Cathedral", article: "Milan",
    lat: 45.46, lng: 9.19, onRoute: false,
    todo: ["Duomo rooftop", "QC Termemilano spa", "Football at San Siro", "Aperitivo buffet"],
    food: ["Aperitivo (drink plus free buffet)", "Risotto alla milanese"] },

  { id: "amalfi", name: "Amalfi Coast", country: "Italy", flag: "🇮🇹", wiki: "Positano", article: "Amalfi Coast",
    lat: 40.63, lng: 14.60, onRoute: false,
    todo: ["Path of the Gods walk", "Pompeii ruins", "Boat along the coast"],
    food: ["Real Neapolitan pizza at L'Antica Pizzeria da Michele", "Limoncello"] },

  { id: "europapark", name: "Europa-Park", country: "Germany", flag: "🇩🇪", wiki: "Europa-Park", article: "Europa-Park",
    lat: 48.27, lng: 7.72, onRoute: false,
    todo: ["Some of Europe's best roller coasters", "Rulantica water park next door"] },

  { id: "berlin", name: "Berlin", country: "Germany", flag: "🇩🇪", wiki: "Brandenburg Gate", article: "Berlin",
    lat: 52.52, lng: 13.40, onRoute: false,
    todo: ["Berlin Wall and East Side Gallery", "Museum Island", "Famous nightlife"],
    food: ["Currywurst", "Döner kebab"] },

  { id: "budapest", name: "Budapest", country: "Hungary", flag: "🇭🇺", wiki: "Hungarian Parliament Building", article: "Budapest",
    lat: 47.50, lng: 19.04, onRoute: false,
    todo: ["Széchenyi thermal baths", "Ruin bars", "Danube at night"],
    food: ["Chimney cake", "Goulash", "Lángos"] },

  { id: "barcelona", name: "Barcelona", country: "Spain", flag: "🇪🇸", wiki: "Sagrada Família", article: "Barcelona",
    lat: 41.39, lng: 2.17, onRoute: false,
    todo: ["Sagrada Família", "Beach and nightlife", "PortAventura theme park"],
    food: ["Tapas", "La Boqueria market"] },

  { id: "kingsday", name: "Amsterdam King's Day", country: "Netherlands", flag: "🇳🇱", wiki: "Koningsdag", article: "Koningsdag",
    lat: 52.37, lng: 4.90, onRoute: false,
    todo: ["Tue 27 April 2027", "Orange street parties and canal boat parties", "Whole city becomes a street market"],
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
