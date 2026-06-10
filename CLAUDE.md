# CLAUDE.md

Project guide for Claude Code. Read [AGENTS.md](AGENTS.md) for full architecture, conventions, and how to add a lesson — it is the canonical developer guide.

## ⚠️ Bilingual parity rule (must follow)
Every lesson exists as a Bangla (`lessons/NNNN-name.html`) and English (`lessons/NNNN-name-en.html`) twin with fully duplicated markup + JS. Any change to a feature, widget, button, or script in one file MUST be applied to its twin in the same task — translate only user-facing text; keep logic, IDs, and structure identical. Before finishing, diff the pair (e.g. counts of `<button`, `onclick=`, `function `) to confirm parity.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
