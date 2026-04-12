// src/data/extraProducts.js
// 200 generated catalog items (ids 11–210) — search & browse; ratings fall back to defaults in ratings.js

const UNSPLASH = [
  'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80',
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
  'https://images.unsplash.com/photo-1590080876232-9b22e7c23098?w=400&q=80',
  'https://images.unsplash.com/photo-1511381539-c7f7be6f1afa?w=400&q=80',
  'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
  'https://images.unsplash.com/photo-1575887072576-1c09900f4e38?w=400&q=80',
  'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
  'https://images.unsplash.com/photo-1614707267537-ab76c981d733?w=400&q=80',
  'https://images.unsplash.com/photo-1590080875177-4c518a14a270?w=400&q=80',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
];

const BRANDS = [
  'PepsiCo', 'Nestlé', 'Mondelez', 'Cadbury', 'Parle', 'Britannia', 'ITC', 'Haldiram',
  'Amul', 'Bikano', 'Bingo', 'Kellogg\'s', 'Hershey\'s', 'Mars', 'Ferrero', 'Lotus',
  'Unilever', 'Coca-Cola', 'Dabur', 'MTR', 'Gits', 'Sunfeast', 'McVitie\'s', 'Oreo',
  'Lay\'s India', 'Too Yumm', 'Balaji', 'Chitale', 'Mother Dairy', 'Epigamia',
];

const ADJECTIVES = [
  'Classic', 'Masala', 'Golden', 'Royal', 'Crispy', 'Zesty', 'Smoky', 'Creamy',
  'Honey', 'Dark', 'Milk', 'Double', 'Mini', 'Party', 'Family', 'Lite', 'Max',
  'Spicy', 'Sweet', 'Tangy', 'Salted', 'Butter', 'Cheese', 'Mint', 'Orange',
];

const SUFFIX = ['Bites', 'Crunch', 'Delight', 'Select', 'Gold', 'Plus', 'Wave', 'Mix', 'Bar', 'Pack', ''];

const CATEGORY_META = [
  { category: 'Chips', emoji: '🥔', salt: [1, 2.4], fat: [28, 38], sugar: [0.3, 2], cal: [480, 560], tags: [['High Salt', 'High Fat', 'Processed'], ['High Fat', 'Processed'], ['High Salt', 'Processed']] },
  { category: 'Snacks', emoji: '🍿', salt: [0.8, 2.2], fat: [18, 34], sugar: [1, 12], cal: [420, 540], tags: [['High Salt', 'Processed'], ['Spicy', 'Processed'], ['Artificial Color', 'Processed']] },
  { category: 'Biscuits', emoji: '🍪', salt: [0.4, 1.2], fat: [12, 26], sugar: [8, 32], cal: [430, 510], tags: [['High Sugar', 'Processed'], ['High Sugar', 'Low Fiber'], ['Processed', 'Refined Flour']] },
  { category: 'Chocolate', emoji: '🍫', salt: [0.1, 0.4], fat: [22, 32], sugar: [42, 58], cal: [500, 560], tags: [['High Sugar', 'High Fat'], ['High Sugar', 'Dairy'], ['High Fat', 'Dairy']] },
  { category: 'Juices', emoji: '🧃', salt: [0, 0.15], fat: [0, 0.5], sugar: [8, 28], cal: [45, 130], tags: [['Added Sugar', 'Low Fiber'], ['Preservatives'], ['Added Sugar']] },
  { category: 'Drinks', emoji: '🥤', salt: [0, 0.2], fat: [0, 1], sugar: [0, 14], cal: [5, 180], tags: [['Carbonated', 'Caffeine'], ['High Sugar'], ['Low Sugar']] },
  { category: 'Instant Food', emoji: '🍜', salt: [1.2, 2.8], fat: [12, 22], sugar: [0.5, 4], cal: [380, 480], tags: [['High Sodium', 'Refined Flour'], ['MSG', 'Processed'], ['High Sodium', 'Processed']] },
  { category: 'Namkeen', emoji: '🫘', salt: [1.4, 2.6], fat: [24, 36], sugar: [0.2, 3], cal: [480, 540], tags: [['High Salt', 'Fried'], ['High Fat', 'Fried'], ['High Salt', 'High Fat']] },
  { category: 'Candy', emoji: '🍬', salt: [0, 0.2], fat: [2, 12], sugar: [48, 72], cal: [380, 460], tags: [['Very High Sugar', 'Processed'], ['High Sugar', 'Artificial Color'], ['High Sugar']] },
  { category: 'Cookies', emoji: '🍪', salt: [0.35, 1], fat: [16, 28], sugar: [14, 36], cal: [460, 520], tags: [['High Sugar', 'High Fat'], ['Processed', 'Low Fiber'], ['High Sugar', 'Processed']] },
  { category: 'Crackers', emoji: '🧈', salt: [0.9, 2], fat: [14, 26], sugar: [1, 8], cal: [440, 500], tags: [['High Salt', 'Processed'], ['Refined Flour', 'Processed'], ['High Fat', 'Processed']] },
  { category: 'Dairy', emoji: '🥛', salt: [0.2, 0.9], fat: [3, 18], sugar: [4, 22], cal: [90, 320], tags: [['Dairy', 'Added Sugar'], ['Dairy', 'Processed'], ['Added Sugar']] },
  { category: 'Cereal', emoji: '🥣', salt: [0.3, 1.4], fat: [4, 14], sugar: [8, 28], cal: [360, 420], tags: [['Added Sugar', 'Processed'], ['Low Fiber', 'Added Sugar'], ['Processed']] },
  { category: 'Protein Bar', emoji: '💪', salt: [0.2, 0.8], fat: [10, 22], sugar: [8, 22], cal: [320, 420], tags: [['Added Sugar', 'Processed'], ['Moderate Protein'], ['Processed']] },
  { category: 'Energy Drink', emoji: '⚡', salt: [0, 0.25], fat: [0, 0], sugar: [8, 24], cal: [20, 120], tags: [['Caffeine', 'High Sugar'], ['Caffeine'], ['High Sugar']] },
  { category: 'Tea & Coffee', emoji: '☕', salt: [0, 0.15], fat: [0, 8], sugar: [0, 16], cal: [20, 180], tags: [['Added Sugar', 'Processed'], ['Caffeine'], ['Processed']] },
];

const AGE_POOL = [
  ['kids', 'teens'],
  ['teens', 'adults'],
  ['kids', 'teens', 'adults'],
  ['adults'],
  ['teens', 'adults'],
  ['adults', 'seniors'],
];

function rnd(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick(arr, seed) {
  return arr[Math.floor(rnd(seed) * arr.length) % arr.length];
}

function between(a, b, seed) {
  return Math.round(a + rnd(seed) * (b - a));
}

function additivesFrom(sugar, salt, fat, seed) {
  if (sugar > 35 || salt > 2) return 'High';
  if (sugar > 20 || salt > 1.3 || fat > 28) return 'Moderate';
  return pick(['Low', 'Moderate'], seed);
}

export const EXTRA_PRODUCTS = Array.from({ length: 200 }, (_, i) => {
  const id = 11 + i;
  const meta = CATEGORY_META[i % CATEGORY_META.length];
  const seed = id * 7919;
  const brand = pick(BRANDS, seed);
  const adj = pick(ADJECTIVES, seed + 1);
  const suf = pick(SUFFIX, seed + 2);
  const nameBody = suf ? `${adj} ${meta.category} ${suf}`.replace(/  +/g, ' ').trim() : `${adj} ${meta.category}`;
  const name = `${nameBody}`.replace(/Chips Chips/, 'Chips').replace(/Snacks Snacks/, 'Snacks');

  const calories = between(meta.cal[0], meta.cal[1], seed + 3);
  const fat = between(meta.fat[0], meta.fat[1], seed + 4);
  const sugar = Math.round((meta.sugar[0] + rnd(seed + 5) * (meta.sugar[1] - meta.sugar[0])) * 10) / 10;
  const salt = Math.round((meta.salt[0] + rnd(seed + 6) * (meta.salt[1] - meta.salt[0])) * 10) / 10;
  const protein = between(2, 12, seed + 7);

  return {
    id,
    name,
    brand,
    category: meta.category,
    image: UNSPLASH[id % UNSPLASH.length],
    emoji: meta.emoji,
    targetAge: pick(AGE_POOL, seed + 8),
    tags: pick(meta.tags, seed + 9),
    nutrition: {
      calories,
      fat,
      sugar,
      salt,
      protein,
      additives: additivesFrom(sugar, salt, fat, seed + 10),
    },
  };
});
