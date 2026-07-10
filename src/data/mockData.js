export const entries = [
  {
    id: "piglet",
    word: "Piglet",
    pronunciation: "/pig-let/",
    category: "People",
    created: "2026",
    isFavorite: true,
    definition: "Someone who quietly became part of an ordinary chapter until the chapter was no longer ordinary.",
    story: "It started with a simple message and a nickname that just stuck. Piglet wasn't supposed to mean anything profound, just a funny little name. But over time, it became a shorthand for comfortable silences, late-night conversations, and the kind of understanding you don't really have to explain. Sometimes the most important people sneak into your life when you aren't looking.",
    gallery: [
      { type: "image", url: "/images/photo1.jpg", caption: "The crew 🤞" },
      { type: "image", url: "/images/photo2.jpg", caption: "Low angle vibes" },
      { type: "image", url: "/images/photo3.jpg", caption: "Full squad 😂" },
      { type: "image", url: "/images/photo4.jpg", caption: "The serious version" }
    ],
    music: {
      title: "She's Lookin' For Me",
      artist: "Unknown"
    },
    timeline: [
      { date: "March 12, 2026", title: "First Conversation", details: "Talked for 3 hours straight." },
      { date: "April 5, 2026", title: "First Joke", details: "The moment the nickname was born." },
      { date: "May 20, 2026", title: "Birthday", details: "Celebrated with a small cake and big laughs." },
      { date: "June 15, 2026", title: "Museum Plan", details: "Getting lost in the modern art section." },
      { date: "July 9, 2026", title: "Latest Conversation", details: "Still talking about everything and nothing." }
    ],
    mood: ["😊", "😅", "🤍", "💭", "🌧️"],
    locations: [
      { name: "Nairobi", coordinates: { lat: -1.2921, lng: 36.8219 } },
      { name: "Campus", coordinates: { lat: -1.3000, lng: 36.8000 } },
      { name: "Museum", coordinates: { lat: -1.2736, lng: 36.8147 } }
    ],
    weather: {
      condition: "Sunny",
      temp: "23°C",
      icon: "🌤️"
    },
    related: ["whatscookin", "4pm", "norway", "latenightthoughts", "skybox"],
    quote: "Some people don't become important overnight. They become familiar, one ordinary conversation at a time."
  },
  {
    id: "whatscookin",
    word: "What's Cookin'",
    pronunciation: "/hwots kook-in/",
    category: "Inside Jokes",
    created: "2026",
    isFavorite: false,
    definition: "The universal greeting when you know something is up but you're pretending everything is normal.",
    story: "Used exclusively when entering a room where someone is clearly plotting something.",
    gallery: [],
    timeline: [],
    mood: ["😅", "👀"],
    locations: [],
    related: ["piglet"],
    quote: "It's never about the food."
  },
  {
    id: "4pm",
    word: "4PM",
    pronunciation: "/fohr-pee-em/",
    category: "Moments",
    created: "2026",
    isFavorite: true,
    definition: "That specific time of day when the light hits just right and the world seems to pause.",
    story: "A moment of stillness. The golden hour of the afternoon.",
    gallery: [],
    timeline: [],
    mood: ["🤍", "💭"],
    locations: [],
    related: ["piglet", "latenightthoughts"],
    quote: "Time is just a measure of how much light we have left."
  },
  {
    id: "norway",
    word: "Norway",
    pronunciation: "/nawr-wey/",
    category: "Places",
    created: "2026",
    isFavorite: false,
    definition: "A place we talked about going to, even if we never do. The symbol of 'someday'.",
    story: "It started as a joke about escaping the heat, and turned into a recurring dream of cabins and fjords.",
    gallery: [],
    timeline: [],
    mood: ["❄️", "🏔️"],
    locations: [],
    related: ["piglet"],
    quote: "Sometimes the best trips are the ones you only take in your mind."
  },
  {
    id: "hibernation",
    word: "Hibernation",
    pronunciation: "/hahy-ber-ney-shuhn/",
    category: "Thoughts",
    created: "2026",
    isFavorite: false,
    definition: "The act of retreating from the world to recharge your social battery.",
    story: "A necessary phase. Do not disturb.",
    gallery: [],
    timeline: [],
    mood: ["😴", "🛌"],
    locations: [],
    related: [],
    quote: "Rest is not a luxury, it's a requirement."
  }
];

export const categories = [
  "📖 People",
  "🎵 Songs",
  "🌍 Places",
  "💭 Thoughts",
  "😂 Inside Jokes",
  "📷 Memories",
  "📝 Quotes",
  "❤️ Moments"
];
