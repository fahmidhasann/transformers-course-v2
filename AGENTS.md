# Codebase Guide for AI Agents (AGENTS.md)

Welcome, agent! This document serves as a comprehensive developer and system guide to help you understand the architecture, design patterns, and constraints of this repository.

---

## 1. Overview & Purpose

This codebase is a **premium, interactive, and visually stunning web platform** designed to teach the **Transformer architecture** used in modern Large Language Models (LLMs). 

### Key Design Goals:
- **Medium of Instruction:** Bengali (বাংলা) for explanatory text, ensuring a smooth learning experience for native speakers.
- **English Technical Terms:** Technical concepts (e.g., *Self-Attention*, *Query*, *Key*, *Value*, *Causal Masking*) must remain in English and be formatted appropriately using HTML classes.
- **Intuition & Concepts:** Focus on conceptual clarity, visual animations, and metaphors rather than deep mathematical derivations or code implementation details.
- **High-Fidelity Aesthetics:** Built with a modern dark-mode-first look (supports theme toggling), utilizing custom CSS gradients, glassmorphic cards, glow animations, and premium typography.

---

## 2. Directory Structure

The repository is structured as a lightweight, static client-side web application:

```
├── AGENTS.md               # This developer/agent guide (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/AGENTS.md)
├── GLOSSARY.md             # Key Transformer terms dictionary (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/GLOSSARY.md)
├── MISSION.md              # Main mission and goals (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/MISSION.md)
├── NOTES.md                # User preferences and established context (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/NOTES.md)
├── RESOURCES.md            # Curated learning resources (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/RESOURCES.md)
├── index.html              # Core application dashboard (clickable link: file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)
├── learning-records/       # MD files logging the user's progress for each lesson
│   ├── 0001-prior-knowledge.md
│   ├── 0002-tokens-embeddings-positional-encoding.md
│   ├── 0003-self-attention-mechanism.md
│   ├── 0004-multi-head-attention-layer-stacking.md
│   ├── 0005-ffn-residual-connections-layer-norm.md
│   └── 0006-decoder-only-vs-encoder-decoder.md
└── lessons/                # Self-contained lesson HTML pages loaded via iframe in the dashboard
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
  - `#view-dashboard`: Main hub showing global progress, an interactive **Mission Checklist** loaded from `MISSION.md`, and an interactive **Roadmap Timeline**.
  - `#view-lessons`: Listing lessons, displaying duration, progress trackers, and allowing users to launch lesson files inside an iframe.
  - `#view-glossary`: Interactive search and category filters for terminology (synchronized with `glossaryData`).
  - `#view-resources`: Curated card list of links to articles, papers, videos, and machine learning communities.
  - `#view-quiz`: A final assessment to test the user's overall knowledge.

### Lesson Pages: `lessons/*.html`
Each lesson is a standalone HTML document loaded inside an iframe in `index.html`. They inherit settings (such as the active theme) from the parent window.
- **Lesson 1:** [high-level-llm-pipeline.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0001-high-level-llm-pipeline.html) - Focuses on the next token predictor. Contains the **Interactive Pipeline Simulator** (interactive tabs showing tokenization, embeddings, self-attention scores, and prediction probabilities).
- **Lesson 2:** [tokens-embeddings-positional-encoding.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0002-tokens-embeddings-positional-encoding.html) - Covers sub-word tokenization (BPE), semantic embedding vector spaces, and positional encoding trigonometry.
- **Lesson 3:** [self-attention-mechanism.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0003-self-attention-mechanism.html) - Focuses on Query, Key, and Value vectors. Contains the **Interactive Attention Simulator** (dynamic SVG connection lines showing how weights change based on context like "it" and "bank").
- **Lesson 4:** [multi-head-attention-layer-stacking.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0004-multi-head-attention-layer-stacking.html) - Explains multiple attention heads, dimension splitting, and representation aggregation.
- **Lesson 5:** [ffn-residual-connections-layer-norm.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0005-ffn-residual-connections-layer-norm.html) - Covers MLPs/FFNs, skip connections, and Pre-LN layer normalization.
- **Lesson 6:** [decoder-only-vs-encoder-decoder.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons/0006-decoder-only-vs-encoder-decoder.html) - Compares architecture styles and causal masking. Contains an **Interactive Autoregressive Generation Simulator**.

---

## 4. Key Systems & State Syncing

### Theme Toggle System
The website features a highly polished dark-first theme system.
- Toggling is performed by adding/removing the class `light` from `document.documentElement` (`<html>`).
- Transitions are smoothed via the CSS wildcard transition rule:
  ```css
  *, *::before, *::after {
      transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }
  ```
- Lessons read the parent window's theme state on load and synchronize accordingly.
- The state is persisted in localStorage under `theme = 'light' | 'dark'`.

### LocalStorage Keys
To maintain state across page reloads:
- `theme`: `'light'` or `'dark'`.
- `checkedGoals`: A serialized JSON array of strings containing IDs of checked items on the Dashboard Mission card (e.g., `["goal-0", "goal-2"]`).
- `roadmapProgress`: A serialized JSON object mapping lesson IDs to their completion state (e.g., `{"0001-high-level-llm-pipeline": "completed", "0002-tokens-embeddings-positional-encoding": "in-progress"}`).
- `lessonsProgress`: An array tracking specific completed lessons.
- `quizScore`: Stores user scores for assessment tests.

---

## 5. Development Guidelines & Constraints

If you are asked to modify or expand this codebase, follow these rules:

1. **Language Convention:** 
   - Write standard Bengali (বাংলা) for instructions and text content.
   - Use English for technical concepts. Wrap English technical terms in a `<span class="tech-term">` tag (e.g., `<span class="tech-term">Self-Attention</span>`).
2. **Style & CSS:**
   - **Do NOT use Tailwind CSS** unless explicitly requested by the user. Use Vanilla CSS custom variables.
   - Use custom colors (HSL/RGB variables) to manage themes. Keep the glassmorphic card borders, subtle glows (`box-shadow: var(--glow)`), and radial gradients for the background.
   - Use `Outfit` (for English/headers) and `Hind Siliguri` (for Bengali text) from Google Fonts:
     ```html
     <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
     ```
3. **Interactive Elements:**
   - Keep simulators lightweight and implemented in vanilla JS inside `<script>` tags.
   - For visual connections (like in the Attention simulator), use standard `<svg>` paths. Calculate bounding boxes via `getBoundingClientRect()` dynamically to support responsive sizing on window resize events.
4. **Writing Codebase Files:**
   - Avoid writing files outside of the defined project directory.
   - Do not pollute root directory with unnecessary files; keep lessons in `/lessons` and progress records in `/learning-records`.

---

## 6. How to Add a New Lesson

To add a new lesson (e.g., Lesson 7: "KV Cache and Inference Optimization"):

1. **Create HTML Page:**
   - Add `0007-kv-cache-inference-optimization.html` inside [lessons/](file:///Users/fahmidhasantaohid/Documents/Transformers%202/lessons).
   - Implement the theme-syncing script block in the `<head>` and a toggle button.
   - Use the `<span class="tech-term">` tags for technical English terms.
   - Add a custom interactive simulator for KV cache visual progression.
2. **Register in Dashboard:**
   - Modify the `lessonsData` array inside [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html) by adding a new lesson configuration object:
     ```javascript
     {
         id: "0007-kv-cache-inference-optimization",
         num: "07",
         title: "KV Cache এবং Inference অপ্টিমাইজেশন",
         desc: "...",
         file: "lessons/0007-kv-cache-inference-optimization.html",
         duration: "20 min"
     }
     ```
3. **Create Learning Record:**
   - Add `0007-kv-cache-inference-optimization.md` inside [learning-records/](file:///Users/fahmidhasantaohid/Documents/Transformers%202/learning-records) tracking the concepts covered in this step.
4. **Update Mission Checklist / Glossary:**
   - If new glossary terms are introduced, add them to `glossaryData` in `index.html` and append them to [GLOSSARY.md](file:///Users/fahmidhasantaohid/Documents/Transformers%202/GLOSSARY.md).
