/* The single lesson manifest for the whole site.
 * Previously duplicated three ways: `lessonsData` + `lessonsDataEn` in index.html
 * and `var LESSONS` inside every one of the 12 lesson files.
 * Adding a lesson now means adding one entry here (plus the HTML file itself). */
window.LESSONS = [
    {
        id: "0001-high-level-llm-pipeline",
        num: "01",
        duration: "15 min",
        bn: "LLM Pipeline-এর High-Level Intuition",
        en: "High-Level Intuition of the LLM Pipeline",
        bnDesc: "একটি মানুষের লেখা বাক্য বা প্রম্পট কীভাবে ধাপে ধাপে টোকেনাইজড হয়ে ভেক্টরে রূপ নেয় এবং মডেলের ভেতর দিয়ে প্রসেস হয়ে পরবর্তী শব্দ অনুমান করে তার সামগ্রিক রূপরেখা।",
        enDesc: "An overview of how a human-written sentence or prompt is tokenized step-by-step, converted to embedding vectors, and processed through a model to predict the next word."
    },
    {
        id: "0002-tokens-embeddings-positional-encoding",
        num: "02",
        duration: "20 min",
        bn: "Tokens, Embeddings এবং Positional Encoding",
        en: "Tokens, Embeddings, and Positional Encoding",
        bnDesc: "কম্পিউটারের সংখ্যা চেনার পেছনের মূল ভিত্তি। টোকেনাইজেশনের BPE অ্যালগরিদম, শব্দের গাণিতিক অর্থ ধারণকারী সেমান্টিক ভেক্টর স্পেস ও সমান্তরাল প্রসেসিংয়ে শব্দের অবস্থান সংরক্ষণের ট্রাইগনোমেট্রিক এনকোডিং পদ্ধতি।",
        enDesc: "The foundation of computer word recognition. BPE tokenization algorithm, semantic vector spaces representing word meanings, and trigonometric encoding representing word positions for parallel processing."
    },
    {
        id: "0003-self-attention-mechanism",
        num: "03",
        duration: "25 min",
        bn: "Self-Attention Mechanism",
        en: "Self-Attention Mechanism",
        bnDesc: "শব্দের প্রসঙ্গের সংকট সমাধানের জাদুকরী কৌশল। YouTube-এর সার্চ অ্যালগরিদমের আদলে Query (Q), Key (K) ও Value (V) ভেক্টরের ডট প্রোডাক্ট, স্কেলিং ও সফটম্যাক্সের সাহায্যে মনোযোগ বন্টন।",
        enDesc: "The magic solution to word context ambiguity. Query (Q), Key (K), and Value (V) vector dot product, scaling, and Softmax attention distribution based on search engine analogies."
    },
    {
        id: "0004-multi-head-attention-layer-stacking",
        num: "04",
        duration: "20 min",
        bn: "Multi-Head Attention এবং Layer Stacking",
        en: "Multi-Head Attention and Layer Stacking",
        bnDesc: "ভাষা আরও নিখুঁতভাবে অনুধাবনের উপায়। একাধিক মনোযোগের ধারা দিয়ে একই শব্দের বহুমাত্রিক সম্পর্ক ক্যাপচার করার Dimension Splitting প্র্যাকটিস ও লেয়ার স্ট্যাকিংয়ের মাধ্যমে গভীর ফিচার তৈরির স্তর বিন্যাস।",
        enDesc: "Enhancing language understanding. Capturing multi-dimensional relationships using multiple attention heads via Dimension Splitting, and layer stacking to build hierarchal deep features."
    },
    {
        id: "0005-ffn-residual-connections-layer-norm",
        num: "05",
        duration: "25 min",
        bn: "FFN, Residual Connections ও Layer Normalization",
        en: "FFN, Residual Connections, and Layer Normalization",
        bnDesc: "ফিড-ফরোয়ার্ড নেটওয়ার্কের মাধ্যমে নলেজ রিপ্রেজেন্টেশন, এবং গভীর স্তরে সিগন্যাল হারিয়ে যাওয়া রোধ করতে Skip Connections ও ট্রেনিং দ্রুত-স্থিতিশীল করতে Pre-LN লেয়ার নরমালাইজেশন পদ্ধতি।",
        enDesc: "Representing factual knowledge through Feed-Forward Networks, preventing signal vanishing using Skip Connections, and stabilizing deep training with Pre-LN layer normalization."
    },
    {
        id: "0006-decoder-only-vs-encoder-decoder",
        num: "06",
        duration: "20 min",
        bn: "Decoder-Only Architecture ও Causal Masking",
        en: "Decoder-Only Architecture and Causal Masking",
        bnDesc: "মডার্ন জেনারেটিভ এআই-এর চালিকাশক্তি। ঐতিহ্যবাহী Seq2Seq আর্কিটেকচারের সাথে ChatGPT/Claude-এর মতো অটো-রিগ্রেসিভ জেনারেটর ডিকোডারের পার্থক্য এবং ভবিষ্যৎ শব্দ আড়াল করার Causal Attention মাস্কিং।",
        enDesc: "The engine of modern generative AI. Differences between Seq2Seq architectures and ChatGPT/Claude-style autoregressive decoders, and Causal Attention masking to hide future words."
    }
];

/* localStorage keys, in one place so the hub and the lesson pages cannot drift apart. */
window.LS_KEYS = {
    lang:     'lang',
    progress: 'transformer_lessons_progress',
    scroll:   'transformer_lesson_scroll',
    goals:    'transformer_goals',
    quiz:     'transformer_quiz_score'
};

/* Shared, crash-proof localStorage helpers (private-mode Safari throws on write). */
window.lsGet = function (key, fallback) {
    try {
        var raw = localStorage.getItem(key);
        if (raw === null || raw === undefined) return fallback;
        try {
            var val = JSON.parse(raw);
            if (typeof val === 'string') {
                val = val.replace(/^["']|["']$/g, '').trim();
            }
            return (val !== null && val !== undefined) ? val : fallback;
        } catch (e) {
            if (typeof raw === 'string') {
                raw = raw.replace(/^["']|["']$/g, '').trim();
            }
            return raw || fallback;
        }
    } catch (e) { return fallback; }
};
window.lsSet = function (key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        if (key === (window.LS_KEYS && window.LS_KEYS.lang ? window.LS_KEYS.lang : 'lang')) {
            try {
                var cleanLang = (value === 'en') ? 'en' : 'bn';
                localStorage.setItem('lang', cleanLang);
            } catch (e2) {}
        }
    } catch (e) {}
};

/* Shared Collapsible Deep-Dive Component Controller */
window.toggleDeepDive = function (cardId) {
    var card = typeof cardId === 'string' ? document.getElementById(cardId) : cardId;
    if (!card) return;
    var isExpanded = card.classList.toggle('is-expanded');
    var btn = card.querySelector('.deepdive-toggle-btn');
    if (btn) {
        btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        var textSpan = btn.querySelector('.btn-text');
        var isEn = /-en\.html$/.test((location.pathname || '').toLowerCase());
        if (textSpan) {
            var openText = btn.getAttribute('data-open-text') || (isEn ? 'Collapse Visualizer' : 'ভিজ্যুয়ালাইজার সংকুচিত করুন');
            var closeText = btn.getAttribute('data-close-text') || (isEn ? 'Explore Interactive Visualizer' : 'ইন্টারেক্টিভ ভিজ্যুয়ালাইজার চালু করুন');
            textSpan.textContent = isExpanded ? openText : closeText;
        }
    }
};

window.collapseDeepDive = function (cardId) {
    var card = typeof cardId === 'string' ? document.getElementById(cardId) : cardId;
    if (!card) return;
    if (card.classList.contains('is-expanded')) {
        window.toggleDeepDive(card);
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
