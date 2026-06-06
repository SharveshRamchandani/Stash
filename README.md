# Submission Document: Stash

This document outlines the submission materials for the **First Investment App Prototype Hackathon**.

---

## 1. Problem Statement

*   **Who is the user?**
    **Abhishek**, a 20-year-old college student who has some extra pocket money (₹200–₹500/month) but has never invested before. He sees financial memes and stocks on social media but is intimidated by the fear of losing his money.
*   **What stops them from investing?**
    1.  **Financial Jargon:** Ticker screens, candlestick charts, and complex terms (e.g. limit orders, collateral, margins) alienate beginners.
    2.  **Fear of Market Downturns:** Abhishek assumes a market drop means his entire balance immediately goes to zero.
    3.  **Choice Overload:** Standard apps overwhelm users with thousands of choices, leading to analysis paralysis.
*   **What would success look like in 90 days?**
    Abhishek completes his first mock investment journey on Stash, feels an emotional shift from fear to curiosity, and sets up a real weekly micro-investment of ₹100 in an index fund on a registered app.
*   **What we chose NOT to solve:**
    -   Real PAN card verification or KYC.
    -   Real payment gateways or bank account integrations.
    -   Stock search bars, watchlists, or multi-asset portfolio tracking.

---

## 2. User Stories

1.  **As** a first-time investor, **I want** to compare simple, curated choices (like Fixed Deposit, Mutual Fund SIP, and Digital Gold) side-by-side, **so that** I don't feel overwhelmed by thousands of options. *(Must)*
2.  **As** an anxious beginner, **I want** to adjust my monthly investment amount and time horizon with sliders, **so that** I can see realistic projections of both my gains *and* possible losses in a downturn. *(Must)*
3.  **As** a student practicing investing, **I want** to see the setup process (KYC and bank linking) simulated automatically in front of me, **so that** I know what to expect in the real world without needing to link my real money or PAN card. *(Must)*
4.  **As** a visual learner, **I want** to click suggestions cards on the home page to read more about each option in a focused popup modal, **so that** I can understand how they work in single-sentence explanations with a clear way to back out. *(Should)*
5.  **As** a proud beginner, **I want** a share card with a simple copy text option showing I Bet on Myself, **so that** I can share my compounding milestone with close friends. *(Could)*

---

## 3. Working Web Prototype

*   **Hosted Link:** `[YOUR_DEPLOYED_URL_HERE]` *(e.g. https://stash-first-invest.vercel.app)*

---

## 4. Product Note

### The User & Problem
We built Stash for **Abhishek**. He wants to grow his savings but finds traditional brokers like Zerodha too transaction-heavy. Stash acts as a **pre-broker companion**, easing the user into long-term compounding habits by removing trading screens.

### What We Built
-   **Homepage Suggestions:** Interactive, card-based starting guides (Automatic Micro-Savings, Rainy Day Buffer, Smart Inflation Guard) that open in a focused modal card, blurring the background to eliminate distractions.
-   **Why Invest Visualizer:** A screen comparing "money kept in hand" (losing to inflation) vs "money invested gently" (growing slowly).
-   **Realistic Projections:** Sliders that calculate compounding, showing a dedicated, highlighted **"Bad Scenario"** in red text (a simulated 5% annual loss) to normalize the reality of market drawdowns.
-   **Simulated Setup Pipeline:** An animated, automated progress checklist that simulates Choosing, Amount lock, Mock KYC, and Bank linking step-by-step.
-   **Milestone Success screen:** A celebration state featuring an initial confetti pop and a clean investment summary card highlighting both upside and downside boundaries, completed by a **Back to home** reset loop.

### What We Cut
-   We cut the traditional "dashboard" home screen. A first-time user doesn't need to see green/red tickers when they first open the app.
-   We cut intraday charts, candles, and fast checkout flows. Speed is the enemy of thoughtful, long-term investing habits.

### What We Would Build Next
1.  **Stash Playgrounds:** Small, simulated scenarios where the user can fast-forward 10 years of market history (e.g. simulating the 2008 crash or 2020 recovery) to see how an index fund behaves.
2.  **Bite-sized visual lessons:** Micro-stories explaining concepts like compounding, risk profiles, and expense ratios in comic-strip format.

### How We Used AI
We pair-programmed with AI to build the layout, implement the step timers and loaders for the automated setup checklists, align projection scenario values consistently across screens, configure typography themes, and verify mobile layout integrity.
