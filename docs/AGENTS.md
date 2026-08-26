# Codebase Guide for AI Agents (AGENTS.md)

Welcome, agent! This document serves as a comprehensive developer and system guide to help you understand the architecture, design patterns, and constraints of this repository.

---

## 1. Overview & Purpose

This codebase is a **premium, interactive, and visually stunning web platform** designed to teach the **Transformer architecture** used in modern Large Language Models (LLMs). 

### Key Design Goals:
- **Medium of Instruction:** Bengali (বাংলা) for explanatory text, ensuring a smooth learning experience for native speakers.
- **English Technical Terms:** Technical concepts (e.g., *Self-Attention*, *Query*, *Key*, *Value*, *Causal Masking*) must remain in English and be formatted appropriately using HTML classes.
- **Intuition & Concepts:** Focus on conceptual clarity, visual animations, and metaphors rather than deep mathematical derivations or code implementation details.
- **Calm Reading Aesthetics:** A single warm ivory theme built for long study sessions — paper-like surfaces, warm near-black ink, muted accents that stay legible on a light ground, and generous line-height. Flat and quiet rather than glassy or neon.

---

## 2. Directory Structure

The repository is structured as a lightweight, static client-side web application:

```
├── assets/                 # Shared front-end, linked by all 13 pages
│   ├── theme.css           # The :root design tokens (single source of truth)
│   ├── site-nav.css        # Every navigation style: top bar, bottom bar, sheet, TOC rail
│   ├── site-nav.js         # The navigation controller for lesson pages
│   └── lessons.js          # window.LESSONS — the single lesson manifest + localStorage helpers
├── docs/                   # Developer guides and knowledge base
│   ├── AGENTS.md           # This developer/agent guide (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/docs/AGENTS.md)
│   ├── CLAUDE.md           # Instructions for Claude
│   ├── GLOSSARY.md         # Key Transformer terms dictionary (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/docs/GLOSSARY.md)
│   ├── MISSION.md          # Main mission and goals (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/docs/MISSION.md)
│   ├── NOTES.md            # User preferences and established context (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/docs/NOTES.md)
│   ├── RESOURCES.md        # Curated learning resources (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/docs/RESOURCES.md)
│   └── learning-records/   # MD files logging the user's progress for each lesson
│       ├── 0001-prior-knowledge.md
│       ├── 0002-tokens-embeddings-positional-encoding.md
│       ├── 0003-self-attention-mechanism.md
│       ├── 0004-multi-head-attention-layer-stacking.md
│       ├── 0005-ffn-residual-connections-layer-norm.md
│       └── 0006-decoder-only-vs-encoder-decoder.md
├── index.html              # Core application dashboard (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)
└── lessons/                # Standalone lesson pages (full page navigation, no iframe)
    ├── 0001-high-level-llm-pipeline.html
    ├── 0002-tokens-embeddings-positional-encoding.html
    ├── 0003-self-attention-mechanism.html
    ├── 0004-multi-head-attention-layer-stacking.html
    ├── 0005-ffn-residual-connections-layer-norm.html
    └── 0006-decoder-only-vs-encoder-decoder.html
```

> ⚠️ **BILINGUAL PARITY RULE (must follow):** Every lesson exists as a Bangla (`NNNN-name.html`) and English (`NNNN-name-en.html`) twin with fully duplicated markup + JS. Any change to a feature, interactive widget, button, or script in one file MUST be applied to its twin in the same task — translate only the user-facing text, keep logic/IDs/structure identical. Before finishing, diff the pair (e.g. counts of `<button`, `onclick=`, `function `) to confirm parity.

---

## 3. Core Application Architecture

The platform operates as a single-page application (SPA) with a tabbed dashboard interface.

### Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)
- **Sidebar Navigation:** Let's users switch between different views:
  - `#view-dashboard`: Main hub showing global progress, an interactive **Mission Checklist** loaded from `docs/MISSION.md`, and an interactive **Roadmap Timeline**.
  - `#view-lessons`: Listing lessons, displaying duration and progress trackers, and navigating to a lesson file.
  - `#view-glossary`: Interactive search and category filters for terminology (synchronized with `glossaryData`).
  - `#view-resources`: Curated card list of links to articles, papers, videos, and machine learning communities.
  - `#view-quiz`: A final assessment to test the user's overall knowledge.

### Lesson Pages: `lessons/*.html`
Each lesson is a standalone HTML document. `openLesson()` in `index.html` performs a full page navigation to it — there is **no iframe**. A lesson page links `assets/theme.css` + `assets/site-nav.css` and loads `assets/lessons.js` + `assets/site-nav.js`; everything else in the file is that lesson's own content, styles, and simulator.
- **Lesson 1:** [high-level-llm-pipeline.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0001-high-level-llm-pipeline.html) - Focuses on the next token predictor. Contains the **Interactive Pipeline Simulator** (interactive tabs showing tokenization, embeddings, self-attention scores, and prediction probabilities).
- **Lesson 2:** [tokens-embeddings-positional-encoding.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0002-tokens-embeddings-positional-encoding.html) - Covers sub-word tokenization (BPE), semantic embedding vector spaces, and positional encoding trigonometry.
- **Lesson 3:** [self-attention-mechanism.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0003-self-attention-mechanism.html) - Focuses on Query, Key, and Value vectors. Contains the **Interactive Attention Simulator** (dynamic SVG connection lines showing how weights change based on context like "it" and "bank").
- **Lesson 4:** [multi-head-attention-layer-stacking.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0004-multi-head-attention-layer-stacking.html) - Explains multiple attention heads, dimension splitting, and representation aggregation.
- **Lesson 5:** [ffn-residual-connections-layer-norm.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0005-ffn-residual-connections-layer-norm.html) - Covers MLPs/FFNs, skip connections, and Pre-LN layer normalization.
- **Lesson 6:** [decoder-only-vs-encoder-decoder.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0006-decoder-only-vs-encoder-decoder.html) - Compares architecture styles and causal masking. Contains an **Interactive Autoregressive Generation Simulator**.

---

### Navigation (all of it lives in `assets/`)

The site is a linear course read mostly on a phone, so the frequent actions sit in the **thumb zone** at the bottom of the screen rather than behind a hamburger at the top.

| Layer | Where | Shown |
|---|---|---|
| `.site-nav` | markup in each lesson, styles in `site-nav.css` | always — identity, language, reading-progress hairline |
| `.reader-bar` | injected by `site-nav.js` | ≤900px — `‹ Prev · ☰ current section n/N · Next ›`, tucks away while scrolling down |
| `.reader-sheet` | injected by `site-nav.js` | ≤900px — bottom sheet with two tabs: this lesson's sections, and all lessons |
| `.toc-rail` | injected by `site-nav.js` | ≥1200px — sticky section rail beside the reading column |
| `.lesson-end` | injected by `site-nav.js` | always — "mark complete" + "next lesson" |
| hub tab bar | `index.html` restyles its own `.nav-menu` | ≤900px — five fixed bottom tabs |

**The section list is generated, not authored.** `site-nav.js` walks `.container .card > h2` and assigns `id="sec-1" … "sec-N"`. Index-based ids keep an anchor valid across the bn/en twins, which text slugs would not. So: give every content card exactly one `<h2>`, and write it as a heading worth seeing in a table of contents — that is all a new section needs.

**One breakpoint: 900px.** Above it, desktop navigation; below it, the bottom bar. Do not introduce a second nav breakpoint.

**Cascade warning.** `assets/*.css` is linked *before* each page's own inline `<style>`, so a same-specificity rule in the page wins. Where a shared rule must survive (`html body { padding-bottom }`, `html .container { margin-left }`), the extra element selector is deliberate — do not "simplify" it away.

## 4. Key Systems & State Syncing

### Theme (single warm light theme)
The site uses **one** theme — a warm ivory reading surface tuned for long study sessions. There is no dark mode and no theme toggle; do not add one unless asked.
- Every colour is defined once in [`assets/theme.css`](../assets/theme.css), linked by all 13 pages. Change a token there and it changes everywhere — there are no per-page copies any more.
- Never hardcode a colour in CSS, an inline `style`, an SVG attribute, or JS. Use the tokens below. A hardcoded hex is a bug: it will not follow the theme.
- Low-alpha overlays use ink, not white: `rgba(var(--ink-rgb), 0.08)` darkens a light surface. `rgba(255,255,255,…)` is always wrong here.
- Intensity → colour scales (heatmaps, attention weights) keep their alpha curve and vary only the base accent RGB, e.g. `rgba(14, 116, 144, ${0.15 + norm * 0.85})`.

### LocalStorage Keys
To maintain state across page reloads:
- `lang`: `'bn'` or `'en'` — the active language, read by every page on load.
- `transformer_lessons_progress`: JSON map of lesson id → status.
- `transformer_goals`: JSON array of mission-goal checkbox states (`index.html`).
- `transformer_quiz_score`: numeric score from the final assessment (`index.html`).
- `transformer_lesson_scroll`: `{lessonId: offset, __last: lessonId}` — the reading position `site-nav.js` records, used by the hub's "continue reading" card.

Key names live in `window.LS_KEYS` and reads/writes go through `window.lsGet` / `window.lsSet` (both in `assets/lessons.js`), which swallow the exceptions private-mode browsers throw. Do not call `localStorage` directly in new code.

---

## 5. Development Guidelines & Constraints

If you are asked to modify or expand this codebase, follow these rules:

1. **Language Convention:** 
   - Write standard Bengali (বাংলা) for instructions and text content.
   - Use English for technical concepts. Wrap English technical terms in a `<span class="tech-term">` tag (e.g., `<span class="tech-term">Self-Attention</span>`).
2. **Style & CSS:**
   - **Do NOT use Tailwind CSS** unless explicitly requested by the user. Use Vanilla CSS custom variables.
   - Tokens live in `assets/theme.css`. Use them — never a raw colour value. Surfaces: `--bg-color` (page), `--card-bg` (raised card), `--card-bg-alt` (code, tables, sub-panels), `--panel-bg` (diagram containers). Ink: `--text-primary` (headings), `--text-body` (prose), `--text-secondary`, `--text-muted`, `--text-ghost` (masked text), `--text-on-accent` (text on a solid accent fill only). Lines: `--border-color`, `--border-strong`. Depth: `--shadow`, `--shadow-soft`, `--ring` (focus/emphasis).
   - Accents keep their historical names but are tuned for a light ground: `--accent-cyan` (teal), `--accent-purple`, `--accent-green`, `--accent-orange`, `--accent-pink`, `--accent-blue`, `--accent-red`. Each has a matching low-emphasis fill: `--tint-cyan`, `--tint-purple`, etc.
   - Flat and calm, not glassy: no `backdrop-filter`, no neon glows, no gradient clip-text headings. Signal "active" with a 2px accent border plus a `--tint-*` fill.
   - Every accent and ink token clears 4.5:1 against `--bg-color`, `--card-bg`, and `--card-bg-alt`. If you add a colour, check it.
   - Type: `--font-heading` (Outfit) for headings and chips; `--font-body` (Hind Siliguri, which supplies both Bengali and a matching Latin) for prose. Body is `1.0625rem`/`1.75`, prose `1.8`, reading column `860px`.
   - Fonts loaded from Google Fonts:
     ```html
     <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
     ```
3. **Interactive Elements:**
   - Keep simulators lightweight and implemented in vanilla JS inside `<script>` tags.
   - For visual connections (like in the Attention simulator), use standard `<svg>` paths. Calculate bounding boxes via `getBoundingClientRect()` dynamically to support responsive sizing on window resize events.
4. **Writing Codebase Files:**
   - Avoid writing files outside of the defined project directory.
   - Do not pollute root directory with unnecessary files; keep lessons in `/lessons` and progress records in `/docs/learning-records`.

---

## 6. How to Add a New Lesson

To add a new lesson (e.g. Lesson 7: "KV Cache and Inference Optimization"):

1. **Register it once** in [`assets/lessons.js`](../assets/lessons.js) by appending to `window.LESSONS`:
   ```javascript
   {
       id: "0007-kv-cache-inference-optimization",
       num: "07",
       duration: "20 min",
       bn: "KV Cache এবং Inference অপ্টিমাইজেশন",
       en: "KV Cache and Inference Optimization",
       bnDesc: "...",
       enDesc: "..."
   }
   ```
   The hub's lesson list, the syllabus dropdown, prev/next on every page, the contents sheet, and the "continue reading" card all read from here. There is nothing else to register.

2. **Create both HTML twins** in [lessons/](../lessons): `0007-kv-cache-inference-optimization.html` and `…-en.html`. Start from an existing lesson — the head links, the `<nav class="site-nav">` block, and the two `<script src="../assets/…">` tags are identical in all of them and must stay that way.

3. **Structure the content** as `.card` blocks inside `.container`, each opening with exactly one `<h2>`. Those headings become the table of contents automatically; you do not write one.

4. **Create a learning record** at [docs/learning-records/](learning-records)`/0007-kv-cache-inference-optimization.md`.

5. **Update the glossary** if new terms appear: `glossaryData` in `index.html` and [docs/GLOSSARY.md](GLOSSARY.md).
