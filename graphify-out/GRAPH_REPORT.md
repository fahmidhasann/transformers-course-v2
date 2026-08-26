# Graph Report - Transformers 2  (2026-08-26)

## Corpus Check
- 17 files · ~101,003 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 106 nodes · 87 edges · 27 communities (8 shown, 19 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `630c57ac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Codebase Guide for AI Agents (AGENTS.md)
- Codebase Guide for AI Agents (AGENTS.md)
- Transformer Architecture Glossary
- Mission: Transformer Architecture used in Large Language Models (LLMs)
- site-nav.js
- Transformer Architecture Resources
- enabledPlugins
- Project Settings (Local)
- Notes
- docs/learning-records/0001-prior-knowledge.md
- 0002-tokens-embeddings-positional-encoding.md
- docs/learning-records/0003-self-attention-mechanism.md
- hooks
- User Prior Knowledge Established
- Self-Attention Mechanism
- Multi-Head Attention and Layer Stacking
- Feed-Forward Networks, Residual Connections, এবং Layer Normalization-এর ভূমিকা
- Transformers 2/CLAUDE.md
- Transformer Architecture Resources
- Notes
- Decoder-Only Architecture ও Causal Masking
- docs/learning-records/0004-multi-head-attention-layer-stacking.md
- docs/learning-records/0005-ffn-residual-connections-layer-norm.md
- docs/learning-records/0006-decoder-only-vs-encoder-decoder.md
- PreToolUse
- frontend-design@claude-plugins-official

## God Nodes (most connected - your core abstractions)
1. `Codebase Guide for AI Agents (AGENTS.md)` - 7 edges
2. `Codebase Guide for AI Agents (AGENTS.md)` - 7 edges
3. `Transformer Architecture Glossary` - 5 edges
4. `Mission: Transformer Architecture used in Large Language Models (LLMs)` - 5 edges
5. `3. Core Application Architecture` - 4 edges
6. `t()` - 3 edges
7. `setCurrentSection()` - 3 edges
8. `onScrollFrame()` - 3 edges
9. `4. Key Systems & State Syncing` - 3 edges
10. `Transformer Architecture Resources` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (27 total, 19 thin omitted)

### Community 0 - "Codebase Guide for AI Agents (AGENTS.md)"
Cohesion: 0.15
Nodes (13): 1. Overview & Purpose, 2. Directory Structure, 3. Core Application Architecture, 4. Key Systems & State Syncing, 5. Development Guidelines & Constraints, 6. How to Add a New Lesson, Codebase Guide for AI Agents (AGENTS.md), Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html) (+5 more)

### Community 1 - "Codebase Guide for AI Agents (AGENTS.md)"
Cohesion: 0.15
Nodes (12): 1. Overview & Purpose, 2. Directory Structure, 3. Core Application Architecture, 4. Key Systems & State Syncing, 5. Development Guidelines & Constraints, 6. How to Add a New Lesson, Codebase Guide for AI Agents (AGENTS.md), Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html) (+4 more)

### Community 2 - "Transformer Architecture Glossary"
Cohesion: 0.18
Nodes (7): ⚠️ Bilingual parity rule (must follow), graphify, Attention Mechanism (অ্যাটেনশন মেকানিজম), Generation & LLM Architecture (জেনারেশন ও এলএলএম আর্কিটেকচার), Input Representation (ইনপুট রিপ্রেজেন্টেশন), Model Block & Optimization (মডেল ব্লক ও অপ্টিমাইজেশন), Transformer Architecture Glossary

### Community 3 - "Mission: Transformer Architecture used in Large Language Models (LLMs)"
Cohesion: 0.33
Nodes (5): Constraints, Mission: Transformer Architecture used in Large Language Models (LLMs), Out of scope, Success looks like, Why

### Community 4 - "site-nav.js"
Cohesion: 0.20
Nodes (11): fileFor(), markScrollers(), onScrollFrame(), openSheet(), paintComplete(), paintEdges(), selectTab(), setCurrentSection() (+3 more)

### Community 5 - "Transformer Architecture Resources"
Cohesion: 0.50
Nodes (3): Knowledge, Transformer Architecture Resources, Wisdom (Communities)

### Community 18 - "Transformer Architecture Resources"
Cohesion: 0.50
Nodes (3): Knowledge, Transformer Architecture Resources, Wisdom (Communities)

## Knowledge Gaps
- **51 isolated node(s):** `Key Design Goals:`, `2. Directory Structure`, `Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)`, `Lesson Pages: `lessons/*.html``, `Navigation (all of it lives in `assets/`)` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Codebase Guide for AI Agents (AGENTS.md)` connect `Codebase Guide for AI Agents (AGENTS.md)` to `Transformer Architecture Glossary`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `Key Design Goals:`, `2. Directory Structure`, `Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._