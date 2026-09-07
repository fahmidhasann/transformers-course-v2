/* ============================================================================
 * Shared navigation controller — one implementation for all 12 lesson pages.
 *
 * Self-configures from the filename: `0003-self-attention-mechanism-en.html`
 * yields lesson id `0003-self-attention-mechanism` and language `en`.
 *
 * It injects the reading chrome (progress hairline, bottom bar, contents
 * sheet, desktop rail, end-of-lesson card) so the lesson files themselves only
 * carry the <nav> markup plus a <script src> to this file.
 *
 * Requires assets/lessons.js to be loaded first (window.LESSONS, lsGet/lsSet).
 * ==========================================================================*/
(function () {
    'use strict';

    var lastY = window.scrollY;

    var nav = document.getElementById('site-nav');
    var container = document.querySelector('.container');
    if (!nav || !container || !window.LESSONS) return;

    var K = window.LS_KEYS;
    var LESSONS = window.LESSONS;

    // --- Where are we? ------------------------------------------------------
    var file = (location.pathname.split('/').pop() || '').toLowerCase();
    var isEn = /-en\.html$/.test(file);
    var baseId = file.replace(/-en\.html$/, '').replace(/\.html$/, '');
    var idx = LESSONS.findIndex(function (l) { return l.id === baseId; });
    var suffix = isEn ? '-en.html' : '.html';
    function fileFor(id) { return id + suffix; }
    function titleOf(l) { return isEn ? l.en : l.bn; }

    function t(bn, en) { return isEn ? en : bn; }

    // Localise the static labels already in the markup (Hub / Syllabus / …).
    nav.querySelectorAll('[data-bn]').forEach(function (el) {
        el.textContent = isEn ? el.getAttribute('data-en') : el.getAttribute('data-bn');
    });

    var prevLesson = idx > 0 ? LESSONS[idx - 1] : null;
    var nextLesson = (idx > -1 && idx < LESSONS.length - 1) ? LESSONS[idx + 1] : null;

    // --- Top bar: syllabus dropdown, pager, lesson title, progress hairline --
    var menu = document.getElementById('syllabusMenu');
    if (menu) {
        LESSONS.forEach(function (l, i) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = fileFor(l.id);
            a.innerHTML = '<span class="num">' + (i + 1) + '.</span><span></span>';
            a.lastChild.textContent = titleOf(l);
            if (i === idx) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
            li.appendChild(a);
            menu.appendChild(li);
        });
    }

    function wirePager(prevEl, nextEl) {
        if (prevEl) {
            if (prevLesson) { prevEl.href = fileFor(prevLesson.id); }
            else { prevEl.classList.add('disabled'); prevEl.setAttribute('aria-disabled', 'true'); }
        }
        if (nextEl) {
            if (nextLesson) { nextEl.href = fileFor(nextLesson.id); }
            else { nextEl.classList.add('disabled'); nextEl.setAttribute('aria-disabled', 'true'); }
        }
    }
    wirePager(document.getElementById('prevLessonBtn'), document.getElementById('nextLessonBtn'));

    // Lesson title (shown in the top bar on mobile, where the brand name hides).
    var navInner = nav.querySelector('.site-nav-inner');
    var navTitle = document.createElement('div');
    navTitle.className = 'site-nav-title';
    navTitle.textContent = idx > -1 ? titleOf(LESSONS[idx]) : document.title;
    var navMenuEl = document.getElementById('siteNavMenu');
    if (navMenuEl) { navInner.insertBefore(navTitle, navMenuEl); }

    var progressBar = document.createElement('div');
    progressBar.className = 'site-nav-progress';
    nav.appendChild(progressBar);

    // --- Section outline, built from the lesson's own <h2>s ------------------
    // Every lesson is a stack of `.card`s, each opening with one <h2>. IDs are
    // index-based (sec-1, sec-2, …) so an anchor stays valid across the bn/en
    // twins, which text-derived slugs would not.
    var headings = Array.prototype.slice.call(
        container.querySelectorAll('.card > h2')
    );
    headings.forEach(function (h, i) { h.id = 'sec-' + (i + 1); });

    function buildTocList(cls) {
        var ul = document.createElement('ul');
        ul.className = 'toc-list' + (cls ? ' ' + cls : '');
        headings.forEach(function (h, i) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.dataset.sec = String(i);
            a.innerHTML = '<span class="num">' + (i + 1) + '</span><span class="txt"></span>';
            a.querySelector('.txt').textContent = h.textContent.trim();
            li.appendChild(a);
            ul.appendChild(li);
        });
        return ul;
    }

    // --- Desktop rail (>=1200px, purely CSS-gated) --------------------------
    var rail = null;
    if (headings.length) {
        rail = document.createElement('nav');
        rail.className = 'toc-rail';
        rail.setAttribute('aria-label', t('এই লেসনের সূচিপত্র', 'Contents of this lesson'));
        var railHeading = document.createElement('div');
        railHeading.className = 'toc-rail-heading';
        railHeading.textContent = t('এই লেসনে', 'In this lesson');
        rail.appendChild(railHeading);
        rail.appendChild(buildTocList());
        document.body.appendChild(rail);
    }

    // --- Bottom bar (<=900px, purely CSS-gated) -----------------------------
    var bar = document.createElement('nav');
    bar.className = 'reader-bar';
    bar.setAttribute('aria-label', t('পাঠ নেভিগেশন', 'Reading navigation'));
    bar.innerHTML =
        '<a class="reader-bar-step" id="barPrev" rel="prev">&lsaquo;<span></span></a>' +
        '<button class="reader-bar-toc" id="barToc" type="button" aria-haspopup="dialog" aria-expanded="false">' +
            '<span class="reader-bar-toc-icon" aria-hidden="true">&#9776;</span>' +
            '<span class="reader-bar-toc-label" id="barTocLabel"></span>' +
            '<span class="reader-bar-toc-count" id="barTocCount"></span>' +
        '</button>' +
        '<a class="reader-bar-step" id="barNext" rel="next"><span></span>&rsaquo;</a>';
    document.body.appendChild(bar);

    var barPrev = document.getElementById('barPrev');
    var barNext = document.getElementById('barNext');
    barPrev.querySelector('span').textContent = t('আগের', 'Prev');
    barNext.querySelector('span').textContent = t('পরের', 'Next');
    wirePager(barPrev, barNext);
    if (prevLesson) barPrev.title = titleOf(prevLesson);
    if (nextLesson) barNext.title = titleOf(nextLesson);

    var barTocLabel = document.getElementById('barTocLabel');
    var barTocCount = document.getElementById('barTocCount');
    barTocLabel.textContent = t('সূচিপত্র', 'Contents');

    // --- The contents sheet -------------------------------------------------
    var backdrop = document.createElement('div');
    backdrop.className = 'reader-sheet-backdrop';
    document.body.appendChild(backdrop);

    var sheet = document.createElement('div');
    sheet.className = 'reader-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', t('সূচিপত্র', 'Contents'));
    sheet.innerHTML =
        '<div class="reader-sheet-grip" aria-hidden="true"></div>' +
        '<div class="reader-sheet-tabs" role="tablist">' +
            '<button class="reader-sheet-tab" id="tabSections" role="tab" aria-selected="true" aria-controls="panelSections"></button>' +
            '<button class="reader-sheet-tab" id="tabLessons" role="tab" aria-selected="false" aria-controls="panelLessons"></button>' +
        '</div>' +
        '<div class="reader-sheet-body">' +
            '<div class="reader-sheet-panel" id="panelSections" role="tabpanel" aria-labelledby="tabSections"></div>' +
            '<div class="reader-sheet-panel" id="panelLessons" role="tabpanel" aria-labelledby="tabLessons" hidden></div>' +
        '</div>';
    document.body.appendChild(sheet);

    var tabSections = document.getElementById('tabSections');
    var tabLessons = document.getElementById('tabLessons');
    var panelSections = document.getElementById('panelSections');
    var panelLessons = document.getElementById('panelLessons');
    tabSections.textContent = t('এই লেসন', 'This lesson');
    tabLessons.textContent = t('সব লেসন', 'All lessons');

    if (headings.length) {
        panelSections.appendChild(buildTocList());
    } else {
        tabSections.hidden = true;
    }

    // "All lessons" panel, with a progress dot per lesson.
    var progress = window.lsGet(K.progress, {}) || {};
    var lessonUl = document.createElement('ul');
    lessonUl.className = 'sheet-lesson-list';
    LESSONS.forEach(function (l, i) {
        var status = progress[l.id] || 'not-started';
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = fileFor(l.id);
        a.innerHTML = '<span class="sheet-lesson-dot ' + status + '"></span>' +
                      '<span class="num">' + (i + 1) + '.</span><span class="txt"></span>';
        a.querySelector('.txt').textContent = titleOf(l);
        if (i === idx) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
        li.appendChild(a);
        lessonUl.appendChild(li);
    });
    panelLessons.appendChild(lessonUl);

    var links = document.createElement('div');
    links.className = 'sheet-links';
    links.innerHTML = '<a href="../index.html"></a><a href="../index.html#glossary"></a>';
    links.children[0].textContent = t('হাব', 'Hub');
    links.children[1].textContent = t('শব্দকোষ', 'Glossary');
    panelLessons.appendChild(links);

    function selectTab(which) {
        var wantSections = (which === 'sections');
        tabSections.setAttribute('aria-selected', String(wantSections));
        tabLessons.setAttribute('aria-selected', String(!wantSections));
        panelSections.hidden = !wantSections;
        panelLessons.hidden = wantSections;
    }
    tabSections.addEventListener('click', function () { selectTab('sections'); });
    tabLessons.addEventListener('click', function () { selectTab('lessons'); });

    var barToc = document.getElementById('barToc');
    var lastFocus = null;

    function openSheet() {
        lastFocus = document.activeElement;
        selectTab(headings.length ? 'sections' : 'lessons');
        sheet.classList.add('open');
        backdrop.classList.add('open');
        barToc.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        var current = panelSections.querySelector('.toc-list a.current');
        (current || tabSections).focus({ preventScroll: true });
    }
    function closeSheet() {
        sheet.classList.remove('open');
        backdrop.classList.remove('open');
        barToc.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Releasing the scroll lock fires a scroll event; without resetting the
        // baseline the bar reads it as "scrolling down" and tucks itself away
        // right when the reader is looking for it.
        lastY = window.scrollY;
        bar.classList.remove('tucked');
        // preventScroll matters: without it, restoring focus scrolls the old
        // element back into view and cancels the section jump we just made.
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function sheetIsOpen() { return sheet.classList.contains('open'); }

    barToc.addEventListener('click', openSheet);
    backdrop.addEventListener('click', closeSheet);
    sheet.addEventListener('click', function (e) {
        if (e.target.closest('.toc-list a')) closeSheet();
    });
    document.addEventListener('keydown', function (e) {
        if (!sheetIsOpen()) return;
        if (e.key === 'Escape') { closeSheet(); return; }
        if (e.key !== 'Tab') return;
        // Keep focus inside the sheet while it is modal.
        var focusable = sheet.querySelectorAll('button:not([hidden]), a[href]');
        var visible = Array.prototype.filter.call(focusable, function (el) {
            return el.offsetParent !== null;
        });
        if (!visible.length) return;
        var first = visible[0], last = visible[visible.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Swipe the sheet down to dismiss.
    var touchStartY = null;
    sheet.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    sheet.addEventListener('touchend', function (e) {
        if (touchStartY === null) return;
        var dy = e.changedTouches[0].clientY - touchStartY;
        var body = sheet.querySelector('.reader-sheet-body');
        if (dy > 70 && body.scrollTop <= 0) closeSheet();
        touchStartY = null;
    }, { passive: true });

    // --- End-of-lesson card: mark complete + go to the next lesson ----------
    if (idx > -1) {
        var end = document.createElement('div');
        end.className = 'lesson-end';
        end.innerHTML =
            '<p class="lesson-end-title"></p>' +
            '<div class="lesson-end-actions">' +
                '<button class="lesson-end-complete" id="markComplete" type="button" aria-pressed="false"></button>' +
            '</div>';
        end.querySelector('.lesson-end-title').textContent =
            t('এই লেসনটি শেষ হলো। অগ্রগতি সেভ করে পরের ধাপে যান।',
              'That is the end of this lesson. Save your progress and move on.');

        if (nextLesson) {
            var nextCard = document.createElement('a');
            nextCard.className = 'lesson-end-next';
            nextCard.href = fileFor(nextLesson.id);
            nextCard.innerHTML = '<span class="label"></span><span class="ttl"></span> &rarr;';
            nextCard.querySelector('.label').textContent = t('পরের লেসন:', 'Next lesson:');
            nextCard.querySelector('.ttl').textContent = titleOf(nextLesson);
            end.querySelector('.lesson-end-actions').appendChild(nextCard);
        }
        container.appendChild(end);

        var markBtn = document.getElementById('markComplete');
        function paintComplete(done) {
            markBtn.setAttribute('aria-pressed', String(done));
            markBtn.textContent = done
                ? t('✓ সম্পন্ন হয়েছে', '✓ Completed')
                : t('লেসন সম্পন্ন ✓', 'Mark lesson complete ✓');
        }
        paintComplete(progress[baseId] === 'completed');
        markBtn.addEventListener('click', function () {
            var store = window.lsGet(K.progress, {}) || {};
            var done = store[baseId] === 'completed';
            store[baseId] = done ? 'in-progress' : 'completed';
            window.lsSet(K.progress, store);
            paintComplete(!done);
        });
    }

    // --- Mark the panels that scroll sideways --------------------------------
    function markScrollers() {
        container.querySelectorAll('*').forEach(function (el) {
            var ov = getComputedStyle(el).overflowX;
            if (ov !== 'auto' && ov !== 'scroll') return;
            if (el.scrollWidth <= el.clientWidth + 2) {
                el.classList.remove('x-scrollable', 'at-start', 'at-end', 'at-both');
                return;
            }
            el.classList.add('x-scrollable');
            paintEdges(el);
            if (!el.dataset.xsBound) {
                el.dataset.xsBound = '1';
                el.addEventListener('scroll', function () { paintEdges(el); }, { passive: true });
            }
        });
    }
    function paintEdges(el) {
        var atStart = el.scrollLeft <= 2;
        var atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
        el.classList.toggle('at-start', atStart && !atEnd);
        el.classList.toggle('at-end', atEnd && !atStart);
        el.classList.toggle('at-both', !atStart && !atEnd);
    }
    markScrollers();
    window.addEventListener('resize', markScrollers);

    // --- Language toggle (keeps your place in the twin file) ----------------
    var langBtn = document.getElementById('langToggleBtn');
    var langLabel = document.getElementById('langToggleLabel');
    if (langBtn && langLabel) {
        langLabel.textContent = isEn ? 'বাংলা' : 'EN';
        langBtn.addEventListener('click', function () {
            var nextLang = isEn ? 'bn' : 'en';
            window.lsSet(K.lang, nextLang);
            try { localStorage.setItem('lang', nextLang); } catch (e) {}
            location.href = baseId + (isEn ? '.html' : '-en.html') +
                            '?scroll=' + Math.round(window.scrollY);
        });
    }

    // --- Restore reading position -------------------------------------------
    var params = new URLSearchParams(location.search);
    if (params.has('scroll')) {
        var pos = parseInt(params.get('scroll'), 10);
        if (!isNaN(pos)) {
            // Wait a frame so fonts/diagrams have laid out before jumping.
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { window.scrollTo(0, pos); });
            });
            try { history.replaceState({}, document.title, location.pathname); } catch (e) {}
        }
    }

    // --- Desktop syllabus dropdown ------------------------------------------
    var dropdown = document.getElementById('siteNavDropdown');
    var syllabusBtn = document.getElementById('syllabusBtn');
    if (dropdown && syllabusBtn) {
        syllabusBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = dropdown.classList.toggle('open');
            syllabusBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('click', function () {
            dropdown.classList.remove('open');
            syllabusBtn.setAttribute('aria-expanded', 'false');
        });
    }

    // --- One scroll handler: progress, current section, bar tuck, resume -----
    var tocLinks = Array.prototype.slice.call(
        document.querySelectorAll('.toc-list a')
    );
    var currentSec = -2;   // -1 is a real value (above the first heading), so start off it
    var ticking = false;
    var saveTimer = null;

    function setCurrentSection(i) {
        if (i === currentSec) return;
        currentSec = i;
        tocLinks.forEach(function (a) {
            a.classList.toggle('current', Number(a.dataset.sec) === i);
        });
        if (i > -1) {
            barTocLabel.textContent = headings[i].textContent.trim();
            barTocCount.textContent = (i + 1) + '/' + headings.length;
        } else {
            barTocLabel.textContent = t('সূচিপত্র', 'Contents');
            barTocCount.textContent = headings.length ? '1/' + headings.length : '';
        }
    }

    function onScrollFrame() {
        ticking = false;
        var y = window.scrollY;
        var max = document.documentElement.scrollHeight - window.innerHeight;

        progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';

        // Current section = the last heading whose top has passed the nav.
        var line = y + nav.offsetHeight + 24;
        var found = -1;
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].offsetTop <= line) found = i; else break;
        }
        setCurrentSection(found);

        // Tuck the bar away while reading forward; bring it back on the way up.
        // Never tuck near the very bottom, where "next lesson" is what you want.
        if (!sheetIsOpen()) {
            var goingDown = y > lastY + 4;
            var goingUp = y < lastY - 4;
            if (goingDown && y > 220 && y < max - 160) bar.classList.add('tucked');
            else if (goingUp || y <= 220 || y >= max - 160) bar.classList.remove('tucked');
        }
        lastY = y;

        // Remember where we stopped, so the hub can offer "continue reading".
        clearTimeout(saveTimer);
        saveTimer = setTimeout(saveReadingPosition, 400);
    }

    function saveReadingPosition() {
        try {
            var store = window.lsGet(K.scroll, {}) || {};
            if (typeof store !== 'object' || store === null) store = {};
            store[baseId] = Math.round(window.scrollY);
            store.__last = baseId;
            window.lsSet(K.scroll, store);
        } catch (e) {}
    }

    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); }
    }, { passive: true });
    window.addEventListener('resize', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); }
    });

    // Flush immediately on unload or when user navigates away/switches tabs
    window.addEventListener('pagehide', saveReadingPosition);
    window.addEventListener('beforeunload', saveReadingPosition);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') saveReadingPosition();
    });

    // Offset in-page jumps so the sticky nav does not cover the heading.
    document.documentElement.style.scrollPaddingTop = (nav.offsetHeight + 16) + 'px';

    // Immediately record this lesson as the last-visited lesson
    saveReadingPosition();
    onScrollFrame();
})();
