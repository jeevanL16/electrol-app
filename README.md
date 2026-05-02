# ElectraBot — Advanced Election Intelligence Assistant

Welcome to **ElectraBot**, a premium, production-grade election education assistant designed to elevate civic literacy and non-partisan voter awareness for the Indian electorate.

---

## 🏛️ Vertical
**Election Education & Civic Literacy**

Our mission is to empower voters with direct, non-partisan, and accurate information on constitutional provisions, voting rights, and ECI processes.

---

## 🛠️ Approach and Logic

ElectraBot adopts a modern **offline-first, zero-overhead client-side** approach.

- **Dynamic Persona Mapping**: The user maps their civic persona (Beginner, Intermediate, Advanced) on initializing. The UI and the AI context are dynamically fine-tuned to ensure age-appropriate, accessible communication.
- **Hybrid AI Execution**: It seamlessly switches between real-time inference via the Google Gemini AI API and an intelligent local knowledge base when the API is not connected.
- **Event-Driven UI**: All logic reacts directly to user interactions, ensuring zero lag.

---

## 🔄 How the Solution Works

1. **Information Routing**: Inputs are evaluated for specific civic keywords (e.g., `polling booth`, `voter ID`, `security`).
2. **AI Inference**: When an API key is connected, queries are passed to Google Gemini with a rigorous `SYSTEM_PROMPT` ensuring absolute non-partisanship.
3. **Local Fallback**: If the key is not provided, the local context matching retrieves deep, 5-step educational material instantly from the `KNOWLEDGE` registry.
4. **Interactive Suggestion & Cards**: Pre-loaded ECI topics allow users to instantly route inquiries without typing.

---

## 📋 Assumptions Made
- Users have an active internet connection when using Gemini AI.
- The Gemini API Key is provided by the end-user via the secure input bar.
- Users can utilize built-in Google Translate fallback for multilingual translations.

---

## 💎 Design and Technical Highlights

### 🎨 Code Quality: Structure, Readability, and Maintainability
- Written in strictly enforced vanilla JS (`'use strict'`).
- Highly organized, fully typed JSDoc annotations on all core routines.
- Avoids global variable pollution by utilizing scoped listeners.
- No third-party frameworks: purely built with semantic HTML, CSS, and vanilla JS.

### 🔒 Security: Safe and Responsible Implementation
- **Zero Key Persistence**: The user's Gemini API key is *never* saved to `localStorage` or hardcoded. It is saved in temporary `sessionStorage` and cleared instantly when the tab closes.
- **XSS Prevention**: Employs a multi-stage sanitizer utilizing both `DOMParser` tree walking and regex to strip all malicious tags (`<script>`, `<iframe>`) and inline attributes (`on*`).
- **Content Security Policy (CSP)**: Strict frame-ancestors, script-src, and default-src settings to mitigate malicious injections.

### ⚡ Efficiency: Optimal Use of Resources
- **Zero-Thrash Caching**: All critical DOM nodes are fetched and cached once at init.
- **Debounced Interaction**: The scroll-spy and auto-scroll routines use `requestAnimationFrame` to eliminate layout thrashing.
- **Minimal Image Weight**: Uses SVG vector visuals directly, resulting in zero external media downloads.

### 🧪 Testing: Validation of Functionality
- Built-in `test.html` validates:
  - Data integrity of the fallback knowledge registry.
  - Correct formatting of the `SYSTEM_PROMPT`.
  - Effectiveness of the `sanitizeHtml` and `esc` security handlers against XSS strings.
  - Strict non-partisanship alignment.

### ♿ Accessibility: Inclusive and Usable Design
- Full keyboard navigation support with explicitly styled `:focus-visible` outlines.
- Complete `aria-label`, `aria-hidden`, and `aria-live="polite"` annotations on dynamic regions.
- High color contrast ratio adhering to Web Content Accessibility Guidelines (WCAG).

### 🌐 Google Services: Frictionless Integration
- **Google Gemini**: Dynamic system prompts tailored to user persona.
- **Google Maps**: Keyless native embed provides immediate, real-time polling booth directions without security risks.
- **Google Calendar**: Embedded quick-add links to sync civic events and deadlines directly.
- **Google Translate**: In-built select menu hooks directly into Google's Translate infrastructure for real-time localization.
