# RentLux Platform Documentation

> **The premier digital housing concierge for Federal University Dutse (FUD) scholars and NYSC Corps members.**

RentLux is a modern, single-page application (SPA) designed to bridge the gap between property owners and students in Dutse, Jigawa State. It features an immersive user experience, AI-driven assistance, and robust identity verification workflows.

---

## 📑 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Installation & Setup](#installation--setup)
- [User Workflows](#user-workflows)
- [Project Structure](#project-structure)

---

## 🏢 Overview

Finding accommodation in Jigawa State can be fragmented. RentLux centralizes this process with a focus on security and user experience. 

The application serves two primary user bases:
1.  **Students (FUD & Poly)** seeking semester-based lodges.
2.  **NYSC Corpers** seeking secure, furnished apartments near government ministries.

---

## ✨ Key Features

### 1. Immersive Onboarding (The AuthGate)
RentLux abandons traditional login screens for a cinematic entry sequence.
-   **Split-Door Animation**: A physics-based unlock sequence where a key turns, and "doors" slide open to reveal the dashboard.
-   **Security First**: Users must "unlock" the app before accessing data.

### 2. AI-Powered Concierge (LuxBot)
Integrated with **Google Gemini 2.5 Flash**, LuxBot acts as a virtual agent.
-   **Context-Aware**: Knows specific locations in Dutse (Yadi, Takur, GRA).
-   **Natural Language**: Responds in a friendly, localized Nigerian tone.
-   **Real-time Assistance**: Helps users filter properties via chat.

### 3. Identity Verification System
To ensure safety, RentLux implements a two-tier user status:
-   **Pending**: New users must upload their National Identity Number (NIN) and ID card.
-   **Verified**: Grants access to "Book Inspection" features.
-   *Note: Verification is currently simulated via the User Profile for demo purposes.*

### 4. Modern Property Discovery
-   **Glassmorphism UI**: Floating navbars and translucent modals.
-   **Split-View Modals**: Detailed property views with large immersive imagery and sticky action footers.
-   **Dynamic Filtering**: Real-time filtering by location (FUD, Corpers, Takur).

---

## 🛠 Technical Architecture

This project is built as a highly responsive Frontend Prototype.

### Core Stack
*   **Framework**: React 19 (TypeScript)
*   **Build Tool**: Vite / Custom Bundler
*   **Styling**: Tailwind CSS (Custom Color Configuration)
*   **Motion Engine**: Framer Motion (Complex orchestrated animations)
*   **AI Integration**: `@google/genai` SDK

### State Management
*   **Session Persistence**: Uses `localStorage` to persist User Profiles and Verification Status across reloads.
*   **Component State**: React Hooks (`useState`, `useEffect`, `useMemo`) for local UI logic.

### Design System
*   **Font**: *Plus Jakarta Sans* for a clean, geometric modern look.
*   **Color Palette**: 
    *   *Primary*: `Green-600` (Growth/Nigeria)
    *   *Surface*: `Slate-50` to `Slate-900`
    *   *Accents*: `Indigo-500`

---

## ⚡ Installation & Setup

### Prerequisites
-   Node.js v18.0.0 or higher
-   npm or yarn package manager

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/rentlux.git
    cd rentlux
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory (optional for AI features):
    ```env
    API_KEY=your_google_gemini_api_key
    ```

4.  **Start Development Server**
    ```bash
    npm start
    ```

---

## 🔄 User Workflows (Demo Guide)

Since this is a frontend prototype without a live backend, follow these steps to experience the full feature set:

### 1. Authentication
*   **Sign Up**: Enter a name, email, and mock NIN number. Upload any image file as an ID.
    *   *Result*: You will be logged in as a **Pending** user.
*   **Log In**: Enter any credentials.
    *   *Result*: You will be logged in as a **Verified** user (Simulated).

### 2. Admin Verification (Simulation)
If you signed up as a new user:
1.  Click your **Avatar** in the top navigation.
2.  Notice the **Orange Clock** icon (Pending Status).
3.  Click the **"Approve Verification"** button in the orange box.
4.  Your status will instantly update to **Verified** (Blue Check), unlocking full access.

### 3. Booking Inspection
1.  Select a property.
2.  Click **Book Inspection**.
3.  Confirm the prompt.
4.  See the success animation.

---

## 📂 Project Structure

```
rentlux/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyModal.tsx
│   │   ├── ProfileModal.tsx
│   │   ├── ChatWidget.tsx
│   │   └── ...
│   ├── services/
│   │   └── geminiService.ts  # AI integration logic
│   ├── types.ts          # TypeScript interfaces
│   ├── constants.ts      # Mock Data (Properties, Locations)
│   ├── App.tsx           # Main Application Controller
│   └── index.tsx         # Entry Point
├── metadata.json         # App Metadata
└── README.md             # Documentation
```

---

## 📄 License

This project is proprietary and intended for demonstration purposes.

---

**RentLux** — *Redefining Student Living in Jigawa.*
