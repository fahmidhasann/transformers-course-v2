# Mission: Transformer Architecture used in Large Language Models (LLMs)

## Why
LLM-এর "behind the scene" বা ভেতরের কার্যপদ্ধতি স্পষ্টভাবে বোঝা। Transformer architecture-এর concept এবং intuition নিজের আয়ত্তে আনা, যাতে পরবর্তীতে যেকোনো LLM-related কাজ বা advanced concept সহজে অনুধাবন করা যায়।

## Success looks like
- Transformer-এর core components (যেমন: Self-Attention, Multi-Head Attention, Positional Encoding, Feed-Forward Networks) কীভাবে কাজ করে তা সহজ ভাষায় ব্যাখ্যা করা।
- একটি sentence বা input text কীভাবে tokens-এ রূপান্তরিত হয়ে model-এর মধ্য দিয়ে প্রবাহিত হয় এবং output generates হয়, তার step-by-step visual বা conceptual flow বর্ণনা করা।
- Modern decoder-only Transformers (যেমন: GPT series, LLaMA) এবং traditional encoder-decoder Transformers-এর মধ্যকার পার্থক্য ও কেন decoder-only models ব্যবহার করা হয় তা স্পষ্টভাবে বুঝতে পারা।

## Constraints
- শেখার মাধ্যম হবে বাংলা (technical terms-গুলো English-এ থাকবে)।
- কোনো জটিল mathematical derivation বা complex PyTorch training pipeline-এ ফোকাস না করে, conceptual clarity এবং intuition-কে অগ্রাধিকার দেওয়া হবে।

## Out of scope
- Transformer model স্ক্র্যাচ থেকে কোড (from-scratch coding) করা (যেহেতু মূল ফোকাস conceptual understanding-এ)।
- Deep Learning বা Basic Neural Network (যেমন Backpropagation, Gradient Descent) নতুন করে শেখা (যেহেতু ব্যবহারকারীর পূর্ব-অভিজ্ঞতা আছে)।
- LLM fine-tuning বা deployment pipelines নিয়ে বিস্তারিত আলোচনা।
