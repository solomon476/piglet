export const entries = [
  {
    id: "piglet",
    word: "Piglet",
    pronunciation: "/pig-let/",
    category: "People",
    created: "2026",
    isFavorite: true,
    targetDate: "2026-11-15T00:00:00", // Example for birthday countdown
    targetLabel: "Piglet's Birthday",
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
      artist: "Kid Cudi",
      youtubeId: "jfKfPfyJRdk" // Replaced with a working Lofi radio ID as placeholder since official music videos block embeds
    },
    voiceId: "jfKfPfyJRdk", // Lofi hip hop radio placeholder
    timeline: [
      { date: "Out of nowhere", title: "First Conversation", details: "Talked for what felt like hours. Neither of us noticed the time passing." },
      { date: "Just because", title: "First Joke", details: "The moment the nickname was born. It wasn't supposed to stick." },
      { date: "When I least expected it", title: "Birthday", details: "Small cake, big laughs. The kind of celebration that doesn't need planning." },
      { date: "Whenever we feel like it", title: "The Food Spot Run", details: "Standing outside in the sun, pretending to decide what to eat." },
      { date: "As usual", title: "Latest Conversation", details: "Still talking about everything and nothing. Somehow that never gets old." }
    ],
    mood: ["Nostalgic", "Comfortable", "Laughing", "Reflective"],
    locations: [
      { name: "Nairobi", coordinates: { lat: -1.2921, lng: 36.8219 } },
      { name: "Campus", coordinates: { lat: -1.3000, lng: 36.8000 } },
      { name: "Museum", coordinates: { lat: -1.2736, lng: 36.8147 } }
    ],
    weather: {
      condition: "A warm afternoon sun",
      temp: "Not too hot, just right",
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
    mood: ["Mischievous", "Knowing", "Suspicious"],
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
    mood: ["Peaceful", "Still", "Golden"],
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
    mood: ["Dreamy", "Cold", "Adventurous"],
    locations: [],
    related: ["piglet"],
    quote: "Sometimes the best trips are the ones you only take in your mind."
  },
  {
    id: "skybox",
    word: "Skybox",
    pronunciation: "/skahy-boks/",
    category: "Places",
    created: "2026",
    isFavorite: false,
    definition: "The highest view, looking down at the world while feeling separated from it.",
    story: "Sitting up there makes everything below look small. It's easier to think when you're looking at the big picture.",
    gallery: [],
    timeline: [],
    mood: ["Reflective", "Quiet"],
    locations: [],
    related: ["piglet", "latenightthoughts"],
    quote: "Distance gives perspective."
  },
  {
    id: "latenightthoughts",
    word: "Late Night Thoughts",
    pronunciation: "/leyt nahyt thawt/",
    category: "Thoughts",
    created: "2026",
    isFavorite: true,
    definition: "Conversations that only happen when everyone else is asleep.",
    story: "There's a specific kind of honesty that only comes out after 2 AM.",
    gallery: [],
    timeline: [],
    mood: ["Honest", "Tired", "Deep"],
    locations: [],
    related: ["piglet", "4pm", "skybox"],
    quote: "The world is quietest when the mind is loudest."
  }
];

export const categories = [
  { id: "People", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=400" },
  { id: "Songs", image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80&w=400" },
  { id: "Places", image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=400" },
  { id: "Thoughts", image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=400" },
  { id: "Inside Jokes", image: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&q=80&w=400" },
  { id: "Memories", image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=400" },
  { id: "Quotes", image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=400" },
  { id: "Moments", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" }
];

export const dailyQuotes = [
  "Some people don't become important overnight. They become familiar, one ordinary conversation at a time.",
  "Time is just a measure of how much light we have left.",
  "The world is quietest when the mind is loudest."
];

export const futureLetters = [
  { id: 1, title: "To 1 Year From Now", unlockDate: "2027-01-01", content: "I hope you are still laughing as much as you did today." },
  { id: 2, title: "To 5 Years From Now", unlockDate: "2031-01-01", content: "Did we ever make it to Norway?" },
  { id: 3, title: "To 10 Years From Now", unlockDate: "2036-01-01", content: "I wonder if you still remember all these little moments." }
];

// Mock Vault data
export const vaultEntries = [
  { id: 'v1', title: "Draft Message", content: "I typed this out but never sent it. It felt too dramatic." },
  { id: 'v2', title: "Hidden Photo", url: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=400" }
];

// Generate 30 days of mock mood data for the mood calendar
export const mockMoods = Array.from({ length: 30 }).map((_, i) => {
  const moods = ['😀', '🙂', '😐', '😔', '😂'];
  return {
    date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: moods[Math.floor(Math.random() * moods.length)]
  };
});
