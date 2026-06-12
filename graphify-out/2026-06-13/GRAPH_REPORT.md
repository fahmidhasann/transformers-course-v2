# Graph Report - Transformers 2  (2026-06-11)

## Corpus Check
- 13 files · ~73,605 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 122 nodes · 143 edges · 21 communities (10 shown, 11 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `458a1650`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Architecture & UI|Project Architecture & UI]]
- [[_COMMUNITY_Self-Attention Mechanism|Self-Attention Mechanism]]
- [[_COMMUNITY_Transformer Block Components|Transformer Block Components]]
- [[_COMMUNITY_Learning Foundation & Resources|Learning Foundation & Resources]]
- [[_COMMUNITY_LLM Input Processing Pipeline|LLM Input Processing Pipeline]]
- [[_COMMUNITY_Architecture Variants & Generation|Architecture Variants & Generation]]
- [[_COMMUNITY_Claude Settings & Plugins|Claude Settings & Plugins]]
- [[_COMMUNITY_Local Dev Config|Local Dev Config]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]

## God Nodes (most connected - your core abstractions)
1. `Transformer Architecture Glossary` - 18 edges
2. `Transformer Architecture` - 12 edges
3. `AGENTS.md - Codebase Guide for AI Agents` - 9 edges
4. `Self-Attention Mechanism` - 9 edges
5. `Codebase Guide for AI Agents (AGENTS.md)` - 7 edges
6. `Codebase Guide for AI Agents (AGENTS.md)` - 7 edges
7. `Mission: Transformer Architecture Learning` - 7 edges
8. `Decoder-Only Architecture (GPT, LLaMA)` - 7 edges
9. `Multi-Head Attention` - 6 edges
10. `Transformer Architecture Glossary` - 5 edges

## Surprising Connections (you probably didn't know these)
- `User Preferences` --semantically_similar_to--> `Mission: Transformer Architecture Learning`  [INFERRED] [semantically similar]
  NOTES.md → MISSION.md
- `Learning Record: Prior Knowledge` --semantically_similar_to--> `User Preferences`  [INFERRED] [semantically similar]
  learning-records/0001-prior-knowledge.md → NOTES.md
- `Interactive Attention Simulator (SVG connection lines)` --conceptually_related_to--> `Self-Attention Mechanism`  [INFERRED]
  AGENTS.md → GLOSSARY.md
- `Paper: Attention Is All You Need (Vaswani et al.)` --references--> `Transformer Architecture`  [EXTRACTED]
  RESOURCES.md → AGENTS.md
- `Article: The Illustrated Transformer (Jay Alammar)` --references--> `Transformer Architecture`  [EXTRACTED]
  RESOURCES.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Transformer Block Core Components (Attention + FFN + Residual + LayerNorm)** — concept_self_attention, concept_ffn, concept_residual_connection, concept_layer_norm [EXTRACTED 1.00]
- **Input Processing Pipeline (Tokenization → Embedding → Positional Encoding)** — concept_tokenization, concept_embedding, concept_positional_encoding [EXTRACTED 1.00]
- **Self-Attention Computation (Q, K, V → Attention Weights)** — concept_query_key_value, concept_attention_weights, concept_self_attention [EXTRACTED 1.00]
- **Transformer Block Internal Components (FFN + Residual + LayerNorm + Multi-Head Attention)** — concept_ffn, concept_residual_connection, concept_layer_norm, concept_multi_head_attention, concept_transformer_block [EXTRACTED 1.00]
- **LLM Pipeline Sequential Flow (Tokenization → Embedding → Transformer → Softmax)** — concept_tokenization, concept_token_embedding, concept_transformer_block, concept_softmax_next_token, concept_llm_pipeline [EXTRACTED 1.00]
- **Three Transformer Architecture Variants (Encoder-Only, Decoder-Only, Encoder-Decoder)** — concept_encoder_only_architecture, concept_decoder_only_architecture, concept_encoder_decoder_architecture [EXTRACTED 1.00]

## Communities (21 total, 11 thin omitted)

### Community 0 - "Project Architecture & UI"
Cohesion: 0.29
Nodes (8): AGENTS.md - Codebase Guide for AI Agents, Bilingual Parity Rule (Bangla/English twins), Dark-Mode First Theme System (localStorage), Lesson Loading via iframe, Interactive Attention Simulator (SVG connection lines), localStorage State Persistence (theme, progress, quiz), Single-Page Application Dashboard Architecture, Vanilla CSS Glassmorphic Dark Design System

### Community 1 - "Self-Attention Mechanism"
Cohesion: 0.15
Nodes (12): 1. Overview & Purpose, 2. Directory Structure, 3. Core Application Architecture, 4. Key Systems & State Syncing, 5. Development Guidelines & Constraints, 6. How to Add a New Lesson, Codebase Guide for AI Agents (AGENTS.md), Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html) (+4 more)

### Community 2 - "Transformer Block Components"
Cohesion: 0.15
Nodes (12): 1. Overview & Purpose, 2. Directory Structure, 3. Core Application Architecture, 4. Key Systems & State Syncing, 5. Development Guidelines & Constraints, 6. How to Add a New Lesson, Codebase Guide for AI Agents (AGENTS.md), Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html) (+4 more)

### Community 3 - "Learning Foundation & Resources"
Cohesion: 0.33
Nodes (6): Paper: Attention Is All You Need (Vaswani et al.), Video: 3Blue1Brown Neural Networks & Transformers Series, Article: The Illustrated GPT-2 (Jay Alammar), Article: The Illustrated Transformer (Jay Alammar), Video: Andrej Karpathy - Let's build GPT from scratch, Transformer Architecture Resources

### Community 4 - "LLM Input Processing Pipeline"
Cohesion: 0.20
Nodes (23): Attention Weights (Softmax), Autoregressive Generation, Causal Masking (Upper-Triangular Mask), Decoder-Only Architecture (GPT, LLaMA), Dimension Splitting (Multi-Head Attention), Token Embedding (Semantic Vector Space), Feed-Forward Network (FFN), Layer Normalization (LayerNorm) (+15 more)

### Community 5 - "Architecture Variants & Generation"
Cohesion: 0.33
Nodes (5): Attention Mechanism (অ্যাটেনশন মেকানিজম), Generation & LLM Architecture (জেনারেশন ও এলএলএম আর্কিটেকচার), Input Representation (ইনপুট রিপ্রেজেন্টেশন), Model Block & Optimization (মডেল ব্লক ও অপ্টিমাইজেশন), Transformer Architecture Glossary

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (5): Constraints, Mission: Transformer Architecture used in Large Language Models (LLMs), Out of scope, Success looks like, Why

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Learning Record: Prior Knowledge, Notes, User Preferences

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (3): Knowledge, Transformer Architecture Resources, Wisdom (Communities)

### Community 18 - "Community 18"
Cohesion: 0.50
Nodes (3): Knowledge, Transformer Architecture Resources, Wisdom (Communities)

## Knowledge Gaps
- **40 isolated node(s):** `PreToolUse`, `frontend-design@claude-plugins-official`, `Key Design Goals:`, `2. Directory Structure`, `Dashboard: [index.html](file:///Users/fahmidhasantaohid/Documents/Transformers%202/index.html)` (+35 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Transformer Architecture Glossary` connect `LLM Input Processing Pipeline` to `Project Architecture & UI`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `AGENTS.md - Codebase Guide for AI Agents` connect `Project Architecture & UI` to `LLM Input Processing Pipeline`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Transformer Architecture` connect `LLM Input Processing Pipeline` to `Project Architecture & UI`, `Learning Foundation & Resources`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Transformer Architecture` (e.g. with `Decoder-Only Architecture (GPT, LLaMA)` and `Feed-Forward Network (FFN)`) actually correct?**
  _`Transformer Architecture` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Self-Attention Mechanism` (e.g. with `Interactive Attention Simulator (SVG connection lines)` and `Transformer Architecture`) actually correct?**
  _`Self-Attention Mechanism` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PreToolUse`, `frontend-design@claude-plugins-official`, `Key Design Goals:` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._