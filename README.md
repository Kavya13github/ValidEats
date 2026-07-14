# 🥗 ValidEats — AI-Powered Food Health Analyzer

> Built with React + Node.js + AI  
> A full-stack web application that scans packaged food products using OCR + AI to deliver health scores, ingredient insights, risk tags, and personalized dietary recommendations — instantly.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🔥 Frontend (User Interface) | [https://valid-eats.vercel.app](https://valid-eats.vercel.app) |
| ⚡ Backend (API Server) | [https://valideats-backend.onrender.com](https://valideats-backend.onrender.com) |

---

## 🤔 What Is This Project?

**ValidEats** is a food-tech AI application for health-conscious users. A user either manually enters nutrition data or uploads a photo of a food package label, and the system:

1. **Extracts** raw nutrition info and ingredients from the image using **Google Gemini Vision (OCR)**
2. **Analyzes** extracted data using a custom **health scoring algorithm** (calories, sugar, sodium, fat, fiber, etc.)
3. **Generates** AI-powered insights via **Google Gemini API**, including:
   - **Health Score** (0–100) — based on nutritional composition
   - **Health Verdict** — Excellent / Good / Moderate / Poor / Harmful
   - **Health Tags** — e.g. 🔴 High Sugar, 🟡 High Sodium, 🟢 Good Fiber
   - **Ingredient-level breakdown** — additives & preservative detection
   - **General Rating** — objective nutritional score for any user
   - **Personalized Rating** — score adjusted for user's **age** and **health conditions** (diabetes, hypertension, obesity, etc.)
   - **Recommendation** — tailored dietary advice
4. **Saves** results to **MongoDB Atlas** for future reference
5. Supports **Scan Mode** (upload food package image) and **Manual Mode** (enter nutrition values)

---

## ✨ Key Features

- 📸 **Image Scan Mode** — upload a food package photo; OCR extracts all data automatically
- ✍️ **Manual Entry Mode** — enter nutrition values directly for instant analysis
- 🤖 **AI Health Analysis** — powered by Google Gemini for deep nutritional insights
- ⭐ **General Rating** — universal health score for the product
- 👤 **Personalized Rating** — adjusted for your age and medical conditions
- ⚠️ **Risk Tags & Warnings** — visual flags for high sugar, sodium, trans fat, etc.
- 🧪 **Ingredient & Additive Detection** — identifies preservatives and artificial additives
- 📊 **Nutrition Breakdown** — calories, sugar, sodium, fat, saturated fat, trans fat, protein, carbs, fiber
- 🎨 **Premium UI** — 3D ambient backgrounds, smooth Framer Motion animations, glassmorphism cards
- 📱 **Fully Responsive** — works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, Framer Motion |
| **3D / Animation** | Three.js, React Three Fiber, React Three Drei |
| **Routing** | React Router DOM v7 |
| **HTTP Client** | Axios |
| **Backend** | Node.js, Express.js v5 |
| **Database** | MongoDB Atlas, Mongoose |
| **AI & Vision** | Google Gemini API (gemini-pro + gemini-vision) |
| **Image Upload** | Multer |
| **Security** | Helmet, CORS, Express Rate Limit |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---


## 📁 Project Folder Structure

```text
ValidEats/
│
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js                  # MongoDB connection setup
│       │
│       ├── controllers/
│       │   └── analyzeController.js   # analyzeFood & scanFood business logic
│       │
│       ├── middleware/
│       │   └── upload.js              # Multer image upload middleware
│       │
│       ├── models/
│       │   └── Food.js                # Mongoose schema for food analyses
│       │
│       ├── routes/
│       │   └── analyzeRoutes.js       # POST /analyze and POST /scan
│       │
│       ├── services/
│       │   ├── aiService.js           # Gemini AI: general analysis & scan report generator
│       │   └── visionService.js       # Gemini Vision: OCR nutrition extraction from images
│       │
│       ├── utils/
│       │   ├── scoring.js             # Nutrition-based health score calculator (0-100)
│       │   ├── healthTags.js          # Risk tag generator (High Sugar, Low Sodium, etc.)
│       │   ├── verdict.js             # Score → verdict & recommendation mapper
│       │   └── response.js            # Standardized API response helpers
│       │
│       ├── app.js                     # Express app: middleware, CORS, routes
│       ├── server.js                  # HTTP server entry point
│       ├── .env                       # Environment variables (never commit!)
│       └── package.json
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── HomePage.jsx                # Landing page with hero, features, CTA
        │   ├── GeneralRatingPage.jsx       # Manual entry → general health score
        │   ├── PersonalizedRatingPage.jsx  # Manual entry + user profile → personalized score
        │   ├── ScanRatePage.jsx            # Image upload → OCR + AI scan analysis
        │   ├── ResultPage.jsx              # Full analysis result display
        │   └── AboutPage.jsx               # About the project page
        │
        ├── components/
        │   ├── Navbar.jsx              # Responsive navigation bar
        │   ├── Footer.jsx              # Site footer
        │   ├── ResultCard.jsx          # Full result display card with all AI data
        │   ├── ProductCard.jsx         # Product summary info card
        │   ├── HealthBadge.jsx         # Health score badge component
        │   ├── HealthBar.jsx           # Animated nutrition score bar
        │   ├── NutritionChip.jsx       # Per-nutrient chip with color coding
        │   ├── RatingStars.jsx         # Star rating visual display
        │   ├── ScanUploadBox.jsx       # Drag-and-drop image upload area
        │   ├── SearchBar.jsx           # Styled search/input bar
        │   ├── HeroScene.jsx           # 3D animated hero section
        │   ├── AnimatedBackground.jsx  # Full-site animated background layer
        │   ├── SiteAmbient3D.jsx       # Three.js ambient 3D canvas layer
        │   ├── AIOrb.jsx               # Animated AI orb component
        │   ├── FloatingOrbs.jsx        # Decorative floating orbs
        │   ├── LabLoader.jsx           # Lab-themed loading animation
        │   ├── GlassCard.jsx           # Glassmorphism card wrapper
        │   ├── NeonButton.jsx          # Neon glow CTA button
        │   ├── Toast.jsx               # Toast notification system
        │   └── ...and more UI primitives
        │
        ├── utils/                      # Frontend helper utilities
        ├── data/                       # Static data & constants
        ├── App.jsx                     # Router setup & animated page transitions
        ├── index.css                   # Global styles & design tokens
        └── main.jsx                    # React entry point
```

## 🧠 How the AI Pipeline Works

```
User Input (Image Upload or Manual Form)
              │
              ▼
┌─────────────────────────┐
│    visionService.js     │  ← Gemini Vision OCR extracts:
│    (Image Scan only)    │    product name, brand, calories,
└─────────────────────────┘    sugar, fat, sodium, ingredients,
              │                additives from the label image
              ▼
┌─────────────────────────┐
│       scoring.js        │  ← Custom algorithm scores nutrition:
│     (Health Score)      │    penalizes sugar/sodium/fat,
└─────────────────────────┘    rewards protein/fiber → 0–100
              │
              ▼
┌─────────────────────────┐
│     healthTags.js       │  ← Generates visual risk tags:
│      verdict.js         │    "High Sugar", "High Sodium",
└─────────────────────────┘    "Good Fiber", verdict label
              │
              ▼
┌─────────────────────────┐
│      aiService.js       │  ← Gemini Pro generates full report:
│      (Gemini AI)        │    personalized advice, ingredient
└─────────────────────────┘    warnings, health recommendations
              │
              ▼
         API Response → Frontend Result Display
```


## 👤 Created By

**Vivek Kumar**  
Full Stack Web Developer | MERN Stack | AI-Powered Apps
