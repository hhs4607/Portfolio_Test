# Building a Portfolio Website with an AI Digital Twin Chatbot

## A Complete Beginner's Guide

This tutorial walks you through every part of this portfolio website project — from the technologies used, to the high-level architecture, to a line-by-line code review of every file. By the end, you will understand how a modern frontend application is built, how it connects to an AI API, and how all the pieces fit together.

---

## Table of Contents

1. [Technology Summary](#1-technology-summary)
2. [Project Structure Overview](#2-project-structure-overview)
3. [High-Level Walkthrough](#3-high-level-walkthrough)
4. [Detailed Code Review](#4-detailed-code-review)
   - [4.1 Configuration Files](#41-configuration-files)
   - [4.2 Layout and Global Styles](#42-layout-and-global-styles)
   - [4.3 The Main Page (Assembling Components)](#43-the-main-page-assembling-components)
   - [4.4 UI Components](#44-ui-components)
   - [4.5 The AI Chat API Route (Backend)](#45-the-ai-chat-api-route-backend)
   - [4.6 The AI Chat Component (Frontend)](#46-the-ai-chat-component-frontend)
5. [How the AI Chat Works End-to-End](#5-how-the-ai-chat-works-end-to-end)
6. [Key Concepts for Beginners](#6-key-concepts-for-beginners)
7. [Deployment](#7-deployment)

---

## 1. Technology Summary

This project uses several modern web technologies. Here's what each one does and why it was chosen:

### Next.js (v14)

**What it is:** A React framework built by Vercel that adds server-side features on top of React.

**Why we use it:** Plain React only runs in the browser (the "client"). Next.js gives us:
- **Server-side API routes** — We can write backend code (like calling the Gemini API) without setting up a separate server. The file `src/app/api/chat/route.ts` is a server-side endpoint, which means the code runs on the server, not in the user's browser. This is critical for keeping our API key secret.
- **File-based routing** — Instead of configuring routes manually, every file inside `src/app/` automatically becomes a page or API endpoint. For example, `src/app/page.tsx` becomes the homepage (`/`), and `src/app/api/chat/route.ts` becomes the API endpoint `/api/chat`.
- **Built-in optimizations** — Automatic code splitting, image optimization, and font loading.

### React (v18)

**What it is:** A JavaScript library for building user interfaces using "components."

**Why we use it:** React lets us break the UI into reusable, self-contained pieces. For example, the `<Hero />` component handles the hero section, `<Career />` handles the career timeline, and `<AiChat />` handles the chatbot. Each component manages its own state (data) and rendering (what it looks like).

### TypeScript

**What it is:** A superset of JavaScript that adds type annotations.

**Why we use it:** TypeScript catches errors before the code runs. For example, if we define that a `Message` must have a `role` and `content`, TypeScript will tell us immediately if we forget one of those fields. Every `.tsx` file in this project is TypeScript + JSX (React's HTML-like syntax).

### Tailwind CSS (v3.4)

**What it is:** A "utility-first" CSS framework where you style elements by adding classes directly in your HTML/JSX.

**Why we use it:** Instead of writing separate CSS files with class names like `.hero-title { font-size: 3rem; font-weight: bold; }`, Tailwind lets you write `className="text-5xl font-bold"` directly on the element. This keeps styles co-located with the markup and eliminates the need to invent class names.

**Example comparison:**

```css
/* Traditional CSS */
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: white;
}
```

```jsx
{/* Tailwind CSS — same result, written inline */}
<h1 className="text-5xl font-bold tracking-tight text-white">...</h1>
```

### Framer Motion

**What it is:** An animation library for React.

**Why we use it:** It makes complex animations simple. Instead of writing CSS keyframes and JavaScript timers, you describe the animation declaratively:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}   // Start invisible, 30px below
  animate={{ opacity: 1, y: 0 }}     // Animate to visible, original position
  transition={{ duration: 0.6 }}     // Over 0.6 seconds
>
```

### Google Gemini API (2.5 Flash)

**What it is:** Google's AI language model API.

**Why we use it:** Gemini 2.5 Flash provides fast, intelligent responses at low cost. We use it to power the "digital twin" chatbot that can answer questions about the portfolio owner's career. The model receives a detailed system prompt containing all career information, so it can respond as if it *is* that person.

---

## 2. Project Structure Overview

```
Portfolio_Test/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # SERVER-SIDE: Gemini API endpoint
│   │   ├── fonts/                    # Local font files (Geist)
│   │   ├── globals.css               # Global styles + Tailwind config
│   │   ├── layout.tsx                # Root HTML layout (wraps all pages)
│   │   └── page.tsx                  # Homepage (assembles all components)
│   │
│   └── components/                   # Reusable UI components
│       ├── Navbar.tsx                # Navigation bar
│       ├── Hero.tsx                  # Hero/landing section
│       ├── About.tsx                 # About section with bio
│       ├── Career.tsx                # Career timeline
│       ├── Publications.tsx          # Research publications & patents
│       ├── Skills.tsx                # Technical skills grid
│       ├── Portfolio.tsx             # Featured projects
│       ├── Contact.tsx               # Contact information
│       ├── Footer.tsx                # Page footer
│       └── AiChat.tsx                # CLIENT-SIDE: AI chatbot widget
│
├── .env.local                        # Environment variables (API key) — NOT committed to git
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies and scripts
```

### The key distinction: Server vs. Client

| File | Runs on... | Why? |
|------|-----------|------|
| `src/app/api/chat/route.ts` | **Server** (Node.js) | Keeps the API key secret; never sent to browser |
| `src/components/AiChat.tsx` | **Client** (Browser) | Handles user interaction, sends requests to our API route |
| `src/app/page.tsx` | **Server** (for initial render) | Assembles components; Next.js renders it server-side first, then "hydrates" on the client |
| Files with `"use client"` at the top | **Client** (Browser) | Tells Next.js this component needs browser features (useState, onClick, etc.) |

---

## 3. High-Level Walkthrough

Here's how the entire application works, from a user opening the page to chatting with the AI:

### Step 1: User visits the website

1. The browser requests the homepage (`/`)
2. Next.js runs `src/app/layout.tsx` to set up the HTML skeleton (`<html>`, `<body>`, fonts)
3. Inside that layout, Next.js renders `src/app/page.tsx`, which assembles all the section components

### Step 2: The page renders

Each component renders its section:

```
┌──────────────────────────────────────────┐
│  Navbar (fixed at top)                   │
├──────────────────────────────────────────┤
│  Hero (full-screen landing)              │
├──────────────────────────────────────────┤
│  About (bio + education)                 │
├──────────────────────────────────────────┤
│  Career (work experience timeline)       │
├──────────────────────────────────────────┤
│  Publications (journals + patents)       │
├──────────────────────────────────────────┤
│  Skills (technical skills grid)          │
├──────────────────────────────────────────┤
│  Portfolio (featured projects)           │
├──────────────────────────────────────────┤
│  Contact (email, phone, location)        │
├──────────────────────────────────────────┤
│  Footer                                  │
├──────────────────────────────────────────┤
│  AiChat (floating button, bottom-right)  │  <-- This is the new AI feature
└──────────────────────────────────────────┘
```

### Step 3: User clicks the chat button

1. The `AiChat` component's `open` state toggles from `false` to `true`
2. Framer Motion animates the chat panel into view
3. The user sees a welcome message and suggestion buttons

### Step 4: User sends a message

1. The user types a question or clicks a suggestion
2. `AiChat` calls `fetch("/api/chat", ...)` — a POST request to our own server
3. On the server, `route.ts` receives the messages
4. `route.ts` calls the Gemini API with:
   - The conversation history (all messages so far)
   - A **system prompt** containing all career data
5. Gemini responds with an answer
6. `route.ts` extracts the text and returns `{ reply: "..." }` to the client
7. `AiChat` adds the reply to the `messages` state, which triggers a re-render showing the new message

```
Browser (AiChat)                    Server (route.ts)                Google (Gemini)
     │                                    │                              │
     │──── POST /api/chat ──────────────>│                              │
     │     { messages: [...] }           │                              │
     │                                    │──── POST generateContent ──>│
     │                                    │     { contents, system... } │
     │                                    │                              │
     │                                    │<── { candidates: [...] } ───│
     │                                    │                              │
     │<── { reply: "I am a..." } ────────│                              │
     │                                    │                              │
```

---

## 4. Detailed Code Review

### 4.1 Configuration Files

#### `package.json` — Project Dependencies

```json
{
  "name": "portfolio-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "framer-motion": "^12.34.3",
    "next": "14.2.35",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

**Line-by-line:**
- `"scripts"` — Commands you can run with `npm run <name>`:
  - `"dev"` — Starts the development server with hot reload (changes show instantly)
  - `"build"` — Creates an optimized production build
  - `"start"` — Runs the production build locally
  - `"lint"` — Checks code for common errors
- `"dependencies"` — Libraries your application needs to run:
  - `next`, `react`, `react-dom` — The core framework
  - `framer-motion` — Animations
  - `@heroicons/react` — Icon library (though we mostly use inline SVGs)
- `"devDependencies"` — Libraries only needed during development:
  - `@types/*` — TypeScript type definitions
  - `eslint` — Code linting
  - `tailwindcss`, `postcss` — CSS toolchain
  - `typescript` — The TypeScript compiler

#### `tailwind.config.ts` — Custom Design Tokens

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#00d4ff",    // Cyan — the site's primary accent color
          dark: "#0066ff",       // Blue — used for gradients
          glow: "#00d4ff33",     // Transparent cyan — used for glows/shadows
        },
        surface: {
          DEFAULT: "#111111",    // Dark card backgrounds
          light: "#1a1a1a",
          lighter: "#222222",
        },
      },
      // ... animations defined here (gradient-x, float, pulse-glow, etc.)
    },
  },
};
```

**What this does:**
- `content` tells Tailwind which files to scan for class names. Tailwind only generates CSS for classes it actually finds in your code, keeping the CSS bundle small.
- `theme.extend.colors` adds custom color names. After this config, you can write `text-accent` or `bg-accent-dark` or `border-accent/20` (the `/20` means 20% opacity) in any component.
- Custom `animation` and `keyframes` define reusable animations like the floating gradient orbs and the text gradient shimmer.

#### `next.config.mjs` — Next.js Configuration

```js
const nextConfig = {};
export default nextConfig;
```

This is empty because the defaults work for our project. Next.js has sensible defaults for most cases.

#### `.env.local` — Environment Variables

```
GEMINI_API_KEY=AIzaSy...your_key_here
```

**Critical concept:** This file stores secrets. It is listed in `.gitignore` (see the line `.env*.local`), so it is **never committed to git** and **never pushed to GitHub**. For production on Vercel, you set this same variable in the Vercel dashboard under Settings > Environment Variables.

---

### 4.2 Layout and Global Styles

#### `src/app/layout.tsx` — The Root HTML Shell

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
```

- `Metadata` — A TypeScript type for the page's `<title>` and `<meta>` tags
- `localFont` — Next.js's built-in font loader that self-hosts fonts (faster than Google Fonts CDN)
- `"./globals.css"` — Importing the CSS file makes it apply globally

```tsx
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
```

This loads two font files and creates CSS custom properties (`--font-geist-sans` and `--font-geist-mono`). The `variable` option means the fonts are available via CSS variables, which Tailwind references in its config (`font-sans`, `font-mono`).

```tsx
export const metadata: Metadata = {
  title: "Hyeonseok Han | Composite Structural Engineer & Researcher",
  description: "Portfolio of Hyeonseok Han — ...",
  keywords: ["composite engineering", "fatigue analysis", ...],
};
```

This becomes the `<title>` tag and `<meta name="description">` tag in the HTML `<head>`. Search engines and social media previews use these.

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050507] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
```

- `RootLayout` wraps **every page** in the app. `{children}` is where the page content goes.
- `lang="en"` — Tells browsers and screen readers the language is English
- `className="dark"` — Enables dark mode (used by some Tailwind utilities)
- `${geistSans.variable}` — Injects the font CSS variables into the body element
- `antialiased` — Smooths font rendering
- `bg-[#050507]` — Sets the background to near-black (the `[...]` syntax is Tailwind's way of using arbitrary values)
- `text-white` — Default text color is white

#### `src/app/globals.css` — Global Styles

This file has three main sections:

**1. Tailwind directives:**
```css
@tailwind base;        /* Resets and base styles */
@tailwind components;  /* Component classes (we define some below) */
@tailwind utilities;   /* Utility classes like text-white, flex, etc. */
```

**2. Custom utility classes** (inside `@layer utilities`):

- `.text-gradient` — Creates the animated cyan-to-blue gradient text effect used in headings
- `.glass` — The frosted glass effect: semi-transparent dark background + blur. This is the visual style used throughout the site for cards and panels
- `.glass-strong` — A more opaque version used for the navbar
- `.card-hover` — Lift-up effect on hover with a cyan glow
- `.grid-pattern` — Subtle grid lines in the hero background
- `.noise` — Adds a very faint noise texture overlay for visual depth

**3. Component classes** (inside `@layer components`):

- `.section-container` — Centers content with max width and responsive padding
- `.section-padding` — Vertical padding for sections
- `.section-title` / `.section-subtitle` — Consistent heading styles
- `.btn-primary` / `.btn-outline` — Button styles with hover effects

These are reusable "component" classes that combine multiple Tailwind utilities. The `@apply` directive lets you compose Tailwind classes into a single named class.

---

### 4.3 The Main Page (Assembling Components)

#### `src/app/page.tsx`

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiChat from "@/components/AiChat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative noise">
        <Hero />
        <About />
        <Career />
        <Publications />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <AiChat />
    </>
  );
}
```

**This is the simplest but most important file.** It is the homepage.

- `<>...</>` is a React "Fragment" — it groups elements without adding an extra DOM node
- `@/components/...` — The `@/` is an alias for `src/`, configured in `tsconfig.json`
- Each imported component renders one section of the page
- `<AiChat />` is placed **outside** `<main>` because it's a floating overlay (fixed position), not part of the scrolling content
- The `noise` class on `<main>` adds the subtle texture overlay
- `relative` is needed because the noise pseudo-element uses `position: absolute`

Notice there is **no `"use client"` directive** at the top. This means the page is a **Server Component** by default. Next.js renders it on the server first, then sends the HTML to the browser. However, each imported component that has `"use client"` will be "hydrated" (made interactive) on the client side.

---

### 4.4 UI Components

All the UI components follow the same pattern. Let's examine one in detail and then summarize the rest.

#### `src/components/Hero.tsx` — Detailed Breakdown

```tsx
"use client";
```

This directive tells Next.js: "This component uses browser-only features (like Framer Motion animations), so run it on the client." Without this, you would get an error because animation libraries need access to the browser's DOM.

```tsx
import { motion } from "framer-motion";
```

`motion` is Framer Motion's core — it creates animated versions of HTML elements. `motion.div` is an animated `<div>`, `motion.h1` is an animated `<h1>`, etc.

```tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
```

- `relative` — Establishes a positioning context for the absolute-positioned background elements inside
- `min-h-screen` — Makes this section at least as tall as the browser window
- `flex items-center justify-center` — Centers the content both vertically and horizontally
- `overflow-hidden` — Prevents the decorative gradient orbs from creating horizontal scrollbars

```tsx
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-dark/20 rounded-full blur-[120px] animate-float" />
```

These are purely decorative background elements:
- `absolute inset-0` — Fills the entire parent element
- `grid-pattern` — Our custom CSS class that creates the subtle grid lines
- The gradient orbs are large circles (`w-96 h-96` = 384px) with extreme blur (`blur-[120px]`) that create a soft ambient glow. `animate-float` makes them bob up and down slowly.

```tsx
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono text-white/60 tracking-wider">
          COMPOSITE STRUCTURAL ENGINEER @ 3P.COM
        </span>
      </motion.div>
```

This is the status badge at the top. It fades in and slides up (`y: 20` -> `y: 0`). The green dot (`bg-emerald-400 animate-pulse`) pulses to indicate "active" status.

The `delay` property on each subsequent `motion` element creates a staggered animation sequence: badge (0s) -> name (0.1s) -> tagline (0.2s) -> details (0.3s) -> buttons (0.4s) -> stats (0.6s).

#### Other UI Components (Summary)

Each component follows the same pattern:

| Component | Purpose | Key Pattern |
|-----------|---------|-------------|
| **Navbar** | Fixed top navigation | `useState` for scroll detection and mobile menu toggle. Uses `useEffect` to listen for scroll events. |
| **About** | Bio, education, research interests | Static data rendered with Framer Motion fade-in. Uses `useInView` to animate only when scrolled into view. |
| **Career** | Work experience + research projects | Data defined as TypeScript arrays of objects. A `TimelineCard` sub-component renders each item. |
| **Publications** | Journal papers + patents | Highlights the author's name in accent color using string splitting. |
| **Skills** | Technical skills grid | Each skill category has an SVG icon and a list of skills. Inline SVGs are used instead of an icon library for full control. |
| **Portfolio** | Future projects | Simple cards with status badges ("In Development", "Coming Soon"). |
| **Contact** | Email, phone, location | Conditional rendering: clickable `<a>` tags for email/phone, plain `<div>` for location. |
| **Footer** | Copyright + credits | Uses `new Date().getFullYear()` to always show the current year. |

**Common pattern — `useInView` for scroll-triggered animations:**

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });
```

- `useRef(null)` creates a reference to a DOM element
- `useInView` watches that element and returns `true` when it enters the viewport
- `once: true` means the animation only triggers once (doesn't re-animate when you scroll away and back)
- `margin: "-80px"` makes it trigger 80px before the element fully enters the viewport

Then in the JSX:

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
>
```

If `isInView` is true, animate to visible. Otherwise, stay at the initial state (invisible).

---

### 4.5 The AI Chat API Route (Backend)

#### `src/app/api/chat/route.ts`

This is the most important file for the AI feature. It runs on the **server**, never in the browser.

**Why a server-side route?** If we called the Gemini API directly from the browser, our API key would be visible to anyone who opens DevTools. By routing through our own API, the key stays on the server.

```tsx
import { NextRequest, NextResponse } from "next/server";
```

- `NextRequest` — A typed wrapper around the incoming HTTP request
- `NextResponse` — A helper for creating HTTP responses with JSON, status codes, etc.

#### The System Prompt

```tsx
const SYSTEM_PROMPT = `You are the AI digital twin of Hyeonseok Han. You answer questions about his career, research, skills, and background as if you are him — friendly, professional, and knowledgeable. Speak in first person. Keep answers concise but informative. If asked something you don't know, say so honestly.

Here is everything about Hyeonseok Han:

## Current Position
- Composite Structural Engineer at 3P.COM, Seoul, South Korea (Jun 2025 – Present)
...
`;
```

This is a large string containing:
1. **Behavior instructions** — Tell the AI *how* to respond (first person, friendly, concise)
2. **Complete career data** — Everything from the portfolio: positions, education, projects, publications, patents, skills, conferences, awards

This prompt is sent with every request to Gemini. The AI uses it as context to answer questions accurately. Think of it as "programming" the AI's personality and knowledge base.

#### The TypeScript Interface

```tsx
interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}
```

This defines the shape of messages that Gemini expects. Gemini uses `"model"` (not `"assistant"`) for AI responses, and wraps text in a `parts` array.

#### The POST Handler

```tsx
export async function POST(req: NextRequest) {
```

In Next.js App Router, exporting a function named `POST` from a `route.ts` file creates a POST endpoint. The file path `src/app/api/chat/route.ts` means this handles `POST /api/chat`.

#### Input Validation

```tsx
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }
```

- `await req.json()` — Parses the JSON body of the request
- `{ messages }` — Destructures out the `messages` field
- The validation checks that messages exist, are an array, and are not empty
- `status: 400` means "Bad Request" — the client sent invalid data

#### API Key Retrieval

```tsx
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.gemini_api_key ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }
```

- `process.env` accesses environment variables (from `.env.local` locally, from Vercel settings in production)
- We check three possible names because Vercel environment variable names are case-sensitive, and a user might accidentally use lowercase
- `||` is the OR operator — it tries each option and uses the first one that exists
- `status: 500` means "Internal Server Error" — the server has a configuration problem

#### Message Format Conversion

```tsx
    const geminiMessages: GeminiMessage[] = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })
    );
```

Our frontend uses the format `{ role: "user" | "assistant", content: "..." }`, but Gemini expects `{ role: "user" | "model", parts: [{ text: "..." }] }`. This `.map()` converts each message.

- `.map()` creates a new array by transforming each element
- `m.role === "assistant" ? "model" : "user"` — A ternary expression: if the role is "assistant", use "model"; otherwise use "user"

#### Calling the Gemini API

```tsx
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: geminiMessages,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      }
    );
```

This is the core API call. Let's break down each part:

- **URL** — `generativelanguage.googleapis.com` is Google's AI API. `/v1beta/models/gemini-2.5-flash:generateContent` specifies the model and the action (generate content).
- **`x-goog-api-key` header** — Google's preferred way to pass the API key. More secure than putting it in the URL (headers aren't logged in most server logs).
- **`contents`** — The conversation history (all user and AI messages so far)
- **`systemInstruction`** — The system prompt that defines the AI's behavior and knowledge
- **`generationConfig`**:
  - `temperature: 0.7` — Controls randomness (0 = very predictable, 1 = very creative). 0.7 is a good balance for conversational responses.
  - `maxOutputTokens: 1024` — Limits response length (1 token is roughly 4 characters)
  - `thinkingConfig.thinkingBudget: 0` — **Critical!** Gemini 2.5 Flash has a "thinking" feature where it reasons internally before responding. Setting this to 0 disables it, which prevents timeouts on Vercel's serverless functions (which have a 10-second limit on the free tier).

#### Error Handling for the API Response

```tsx
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", response.status, errorData);
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}` },
        { status: 500 }
      );
    }
```

- `response.ok` is `true` if the status code is 200-299
- If the API returns an error (e.g., invalid key, quota exceeded), we log the details server-side and return a user-friendly error

#### Parsing the Response

```tsx
    const data = await response.json();

    // Extract the non-thinking text part from the response
    const parts = data.candidates?.[0]?.content?.parts;
    let reply = "Sorry, I couldn't generate a response.";
    if (parts && Array.isArray(parts)) {
      const textPart = parts.find(
        (p: { thought?: boolean; text?: string }) => !p.thought && p.text
      );
      if (textPart) {
        reply = textPart.text;
      }
    }
```

Gemini's response structure is:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          { "thought": true, "text": "internal reasoning..." },
          { "text": "The actual response to show the user" }
        ]
      }
    }
  ]
}
```

- `?.` is "optional chaining" — if any part is `undefined`, it short-circuits to `undefined` instead of throwing an error
- `parts.find(...)` searches the array for the first part where `thought` is NOT true and `text` exists
- This correctly filters out any internal "thinking" content and gets only the user-facing response

#### The Outer Try-Catch

```tsx
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
```

This catches any unexpected errors (network failures, JSON parsing errors, etc.) and returns a clean error response instead of crashing.

---

### 4.6 The AI Chat Component (Frontend)

#### `src/components/AiChat.tsx`

This is the client-side chat widget — the UI the user interacts with.

#### Imports and Type Definition

```tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
```

- `"use client"` — This component needs browser features (state, refs, event handlers)
- `useState` — React hook for managing state (data that changes over time)
- `useRef` — React hook for referencing DOM elements (for scrolling and focusing)
- `useEffect` — React hook for side effects (running code after render)
- `useCallback` — React hook for memoizing functions (prevents unnecessary re-renders)
- `AnimatePresence` — Framer Motion component that animates elements when they are added/removed from the DOM

```tsx
interface Message {
  role: "user" | "assistant";
  content: string;
}
```

A TypeScript interface defining the shape of a chat message. Each message has:
- `role` — Either `"user"` (the visitor) or `"assistant"` (the AI)
- `content` — The text of the message

```tsx
const SUGGESTIONS = [
  "What is your research about?",
  "Tell me about your work experience",
  "What are your technical skills?",
  "What projects have you worked on?",
];
```

Pre-written questions shown to first-time users as clickable buttons.

#### State Management

```tsx
export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
```

Each `useState` call creates a piece of state and a function to update it:

| State | Purpose | Initial Value |
|-------|---------|---------------|
| `open` | Whether the chat panel is visible | `false` |
| `messages` | Array of all chat messages | `[]` (empty) |
| `input` | Current text in the input field | `""` (empty) |
| `loading` | Whether we're waiting for the AI to respond | `false` |

The `useRef` hooks create references to DOM elements so we can programmatically scroll to the bottom of the chat and focus the input field.

#### Side Effects

```tsx
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
```

- **First `useEffect`** — Whenever `messages` changes (new message added), smoothly scroll to the bottom of the chat. `messagesEndRef` points to an invisible `<div>` at the bottom of the messages list.
- **Second `useEffect`** — When the chat panel opens, automatically focus the input field so the user can start typing immediately.

The `[messages, scrollToBottom]` and `[open]` arrays are "dependency arrays" — they tell React to only re-run the effect when those specific values change.

#### The Send Message Function

```tsx
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
```

Guard clause: don't send if the text is empty (or only whitespace) or if we're already waiting for a response.

```tsx
    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
```

1. Create a new message object
2. Create a new array with all existing messages plus the new one (`...messages` is the "spread" operator — it copies all elements from the existing array)
3. Update the UI immediately (optimistic update — the user sees their message before the AI responds)
4. Clear the input field
5. Show the loading indicator

```tsx
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
```

Send the entire conversation history to our API route. We send ALL messages (not just the latest) because the AI needs context from the full conversation to give relevant answers.

```tsx
      if (!res.ok || data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: `Sorry, something went wrong: ${data.error || res.statusText}. Please try again.`,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.reply },
        ]);
      }
```

If there's an error, show it in the chat (useful for debugging). Otherwise, add the AI's reply to the messages.

```tsx
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
```

- `catch` handles network failures (no internet, server unreachable)
- `finally` always runs, whether the request succeeded or failed — it stops the loading indicator

#### The Form Handler

```tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
```

- `e.preventDefault()` — Stops the form from doing a traditional full-page submit (which would reload the page). In a React app, we handle submission with JavaScript instead.

#### The Floating Chat Button

```tsx
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent-dark to-accent flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Chat"
      >
```

Key classes:
- `fixed bottom-6 right-6` — Stays in the bottom-right corner regardless of scrolling
- `z-50` — High z-index so it appears above everything else
- `bg-gradient-to-br from-accent-dark to-accent` — Blue-to-cyan gradient
- `shadow-[0_0_30px_rgba(0,212,255,0.3)]` — Cyan glow effect
- `whileHover` / `whileTap` — Framer Motion's declarative interaction animations

The button toggles between a chat bubble icon and an X (close) icon using `AnimatePresence`, which animates the transition between the two SVGs.

#### The Pulse Ring

```tsx
      {!open && messages.length === 0 && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full pointer-events-none">
          <span className="absolute inset-0 rounded-full border-2 border-accent/40 animate-ping" />
        </div>
      )}
```

A pulsing ring animation around the chat button that draws attention. It only shows when the chat is closed AND no messages have been sent yet (once the user has interacted, the pulse stops).

- `pointer-events-none` — Clicks pass through this element to the button behind it
- `animate-ping` — Tailwind's built-in ping animation (scales up and fades out repeatedly)

#### The Chat Panel

```tsx
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-140px)] flex flex-col rounded-2xl overflow-hidden border border-accent/15 shadow-[0_8px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,212,255,0.08)]"
            style={{ background: "rgba(10, 10, 14, 0.95)", backdropFilter: "blur(30px)" }}
          >
```

- `exit` — The animation when the panel is removed (it must be inside `AnimatePresence` for this to work)
- `bottom-24` — Positioned above the chat button (24 = 6rem)
- `w-[360px] max-w-[calc(100vw-48px)]` — 360px wide, but on small screens it shrinks to fit with 24px margins on each side
- `h-[520px] max-h-[calc(100vh-140px)]` — 520px tall, but won't overflow the viewport
- `flex flex-col` — Children stack vertically (header, messages, input — from top to bottom)
- The `style` prop sets the glass background inline because Tailwind's `bg-` and `backdrop-blur` classes can conflict with arbitrary values in some configurations

#### The Welcome Screen

```tsx
              {messages.length === 0 && (
                <div className="flex flex-col items-center text-center py-6 px-2">
                  {/* Sparkle icon */}
                  {/* Welcome text */}
                  <div className="space-y-2 w-full">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="..."
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
```

When there are no messages, show a welcome screen with clickable suggestion buttons. Each button calls `sendMessage(s)` directly, bypassing the input field.

#### Message Rendering

```tsx
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent/15 text-white/90 rounded-br-md"
                        : "bg-white/[0.04] text-white/70 rounded-bl-md border border-white/5"
                    }`}
                  >
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  </div>
                </div>
              ))}
```

- User messages align right (`justify-end`), with a cyan tinted background
- AI messages align left (`justify-start`), with a subtle white background
- `rounded-br-md` on user messages makes the bottom-right corner sharp (like a speech bubble tail)
- `rounded-bl-md` on AI messages makes the bottom-left corner sharp
- `whitespace-pre-wrap` preserves line breaks and wraps long lines

#### Loading Indicator

```tsx
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
```

Three bouncing dots with staggered animation delays (0ms, 150ms, 300ms), creating a classic "typing" indicator. This appears while waiting for the Gemini API to respond.

#### The Input Form

```tsx
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-1 focus-within:border-accent/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my career..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/25 py-2 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-1.5 rounded-lg text-accent/50 hover:text-accent hover:bg-accent/10 transition-all disabled:opacity-20 ..."
                >
                  {/* Arrow icon SVG */}
                </button>
              </div>
            </form>
```

- `<form onSubmit={handleSubmit}>` — Pressing Enter triggers the submit event
- `focus-within:border-accent/30` — When any child element is focused (the input), the container border turns cyan
- `value={input}` + `onChange={(e) => setInput(e.target.value)}` — This is a "controlled input": React controls the value, and every keystroke updates the state
- `disabled={loading}` — Prevents input while waiting for a response
- `disabled={!input.trim() || loading}` — The submit button is disabled if input is empty or loading

---

## 5. How the AI Chat Works End-to-End

Here is the complete flow with all technical details:

```
1. USER clicks the chat button
   └── AiChat: setOpen(true) → React re-renders → chat panel appears (animated)

2. USER types "What is your research about?" and presses Enter
   └── AiChat: handleSubmit(e) called
       └── e.preventDefault() (stop page reload)
       └── sendMessage("What is your research about?")
           ├── Guard: text is not empty, not loading ✓
           ├── setMessages([{ role: "user", content: "What is..." }])
           ├── setInput("") → clears input field
           ├── setLoading(true) → shows bouncing dots
           └── fetch("/api/chat", { method: "POST", body: { messages: [...] } })

3. SERVER receives POST /api/chat
   └── route.ts: POST handler
       ├── Parse JSON body → extract messages
       ├── Validate: messages array is not empty ✓
       ├── Read API key from environment variable
       ├── Convert messages to Gemini format
       │   { role: "user", content: "..." }
       │   → { role: "user", parts: [{ text: "..." }] }
       └── fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent")
           Body: {
             contents: [converted messages],
             systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
             generationConfig: { temperature: 0.7, maxOutputTokens: 1024, thinkingConfig: { thinkingBudget: 0 } }
           }

4. GEMINI processes the request
   └── Reads the system prompt (all career data)
   └── Reads the conversation history
   └── Generates a response in first person as Hyeonseok Han
   └── Returns: { candidates: [{ content: { parts: [{ text: "My research focuses on..." }] } }] }

5. SERVER processes Gemini's response
   └── route.ts:
       ├── Check response.ok ✓
       ├── Parse JSON response
       ├── Find the non-thinking text part
       └── Return: { reply: "My research focuses on..." }

6. CLIENT receives the response
   └── AiChat:
       ├── Parse JSON: data.reply = "My research focuses on..."
       ├── setMessages([...newMessages, { role: "assistant", content: "My research focuses on..." }])
       └── setLoading(false) → hides bouncing dots

7. React re-renders
   └── New message appears in the chat (left-aligned, subtle background)
   └── useEffect triggers scrollToBottom()
   └── Chat smoothly scrolls to show the new message
```

---

## 6. Key Concepts for Beginners

### What is JSX/TSX?

JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. TSX is the same thing but with TypeScript. For example:

```tsx
// This TSX:
<div className="text-white">Hello</div>

// Gets compiled to this JavaScript:
React.createElement("div", { className: "text-white" }, "Hello")
```

Note: In JSX/TSX, you use `className` instead of `class` (because `class` is a reserved word in JavaScript).

### What is `"use client"` vs Server Components?

In Next.js 14's App Router:
- **Server Components** (default) — Render on the server. They can directly access databases, read files, etc. They **cannot** use `useState`, `useEffect`, `onClick`, or other browser-only features.
- **Client Components** (`"use client"`) — Render on the client (browser). They **can** use state, effects, and event handlers. They **cannot** directly access server-only resources.

In this project:
- `page.tsx` and `layout.tsx` are Server Components (no `"use client"`)
- All files in `components/` are Client Components (they all have `"use client"` because they use animations, state, or event handlers)
- `api/chat/route.ts` is a server-side API route (not a component at all — it's a backend endpoint)

### What is State?

State is data that changes over time and causes the UI to update. When you call `setMessages(newArray)`, React re-renders the component with the new data.

```tsx
const [count, setCount] = useState(0);
// count = 0
setCount(5);
// React re-renders, now count = 5
```

### What is a REST API?

A REST API is a way for programs to communicate over HTTP. In our case:
- The **client** (browser) sends a POST request to `/api/chat` with a JSON body
- The **server** (our API route) processes it and returns a JSON response
- This is the same protocol that web browsers use to load web pages, but instead of HTML, we're sending and receiving JSON data

### What is an Environment Variable?

An environment variable is a value stored outside your code, typically for secrets or configuration that changes between environments (development vs. production). In this project, `GEMINI_API_KEY` is stored in:
- `.env.local` (for local development)
- Vercel Environment Variables (for production)

You access them with `process.env.VARIABLE_NAME` in server-side code.

---

## 7. Deployment

### How Vercel Deployment Works

This project is deployed on Vercel, which:

1. **Detects** the Next.js framework automatically
2. **Builds** the project with `npm run build`
3. **Deploys** static pages as CDN assets (fast, cached globally)
4. **Deploys** API routes as serverless functions (run on-demand when called)

### Setting Up the API Key on Vercel

Since `.env.local` is gitignored, you must manually add the API key in Vercel:

1. Go to your project on vercel.com
2. Navigate to **Settings** > **Environment Variables**
3. Add a new variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environments:** Production, Preview (check both)
4. Click **Save**
5. Go to **Deployments** > click the **...** menu on the latest deployment > **Redeploy**

The redeploy is necessary because environment variables are injected at build/deploy time, not retroactively.

### The Build Output

When you run `npm run build`, you see:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    53.1 kB         140 kB
├ ○ /_not-found                          873 B          88.2 kB
└ ƒ /api/chat                            0 B                0 B
```

- `○` means the page is statically generated (pre-rendered HTML)
- `ƒ` means the route is a dynamic serverless function (runs on each request)
- The homepage is 140 kB of JavaScript on first load (includes React, Framer Motion, all components)
- The API route shows 0 B because it runs server-side and doesn't ship any JavaScript to the browser

---

## Summary

This portfolio website is built with a modern stack:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 | Server-side rendering, routing, API routes |
| **UI Library** | React 18 | Component-based UI |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animations** | Framer Motion | Declarative animations |
| **AI Backend** | Gemini 2.5 Flash | Powers the digital twin chatbot |
| **Hosting** | Vercel | Automatic deployment from Git |

The AI chatbot feature adds just **two files** to the project:
1. `src/app/api/chat/route.ts` — Server-side proxy to Gemini (keeps API key safe)
2. `src/components/AiChat.tsx` — Client-side chat widget

And one line change to `src/app/page.tsx` to include the `<AiChat />` component.

The architecture follows a clean separation: the frontend handles UI and user interaction, the API route handles authentication and AI communication, and Gemini handles the intelligence. The system prompt contains all the career data, so the AI can answer questions accurately without a database.
