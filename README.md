# 🗳️ BallotBuddy — Your Premium Election Companion 

BallotBuddy is a professional-grade, high-fidelity election assistant designed to guide Indian voters through the complex registration and voting process with confidence. Built with a focus on accessibility, clarity, and official accuracy, it transforms the "confusing" election cycle into a streamlined, state-aware journey.

![BallotBuddy Hero](/public/hero.png)

## 🚀 Key Features

### 🧠 AI-Powered Assistance
*   **Contextual ChatBot**: A Gemini-powered assistant that understands ECI guidelines and provides real-time answers.
*   **Form Insights**: Intelligent analysis of registration forms to highlight common mistakes and document requirements before you submit.

### 🛣️ Smart Voting Journey
*   **Dynamic Timeline**: A state-aware roadmap that tracks your progress from Eligibility to the Polling Booth.
*   **Command Center**: A personalized homepage dashboard that surfaces your "Next Best Action" based on your actual registration status.

### 🌍 Inclusive & Accessible
*   **Bilingual Support**: Full support for English and Hindi across the entire application.
*   **Premium Dark Theme**: A high-contrast, professional navy-gradient aesthetic with glassmorphism for maximum readability and a modern feel.

### 🛡️ Official & Reliable
*   **ECI Integration Guidance**: Direct links and guidance for the official ECI Voters' Service Portal.
*   **Trust First**: Every step is based on official Election Commission of India guidelines, ensuring you only receive verified information.

---

## 🛠️ Technology Stack

*   **Frontend**: Next.js (App Router), React, Vanilla CSS (Modules)
*   **AI Engine**: Google Gemini API (`gemini-3.1-flash-lite-preview`)
*   **State Management**: React Context + LocalStorage Persistence
*   **Styling**: Premium Dark-Theme System with Glassmorphism
*   **Data Consistency**: State-aware synchronization between Timeline, Hero, and Alert systems.

---

## 🏗️ Development Workflow

The project followed a rigorous professional workflow:
1.  **Architecture Setup**: Established a robust Next.js foundation with centralized state management.
2.  **UI/UX Modernization**: Transitioned from legacy "light grey" components to a high-fidelity dark navy aesthetic.
3.  **AI Integration**: Built a context-aware RAG-lite system for election guidance using the Gemini SDK.
4.  **Localization**: Implemented a comprehensive bilingual system (EN/HI) for all core modules.
5.  **State Logic**: Connected disjointed pages into a unified, state-aware "Election Journey" using React Context.

---

## 🚦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/panja15/BallotBuddy.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root and add your Gemini API key:
```env
GEMINI_API_KEY=your_key_here
```

### 4. Run the development server
```bash
npm run dev
```

---

## 📜 Official Guidelines Disclaimer
BallotBuddy is an assistant tool. All final submissions and status verifications are performed on the official **ECI Voters' Service Portal**. This tool does not store PII and strictly follows ECI's published guidelines.
