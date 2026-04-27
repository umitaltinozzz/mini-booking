/**
 * AKRAN Sunum Modu - Ana Script
 * Otomatik sayfa gezme, imleç animasyonu ve açıklamalar
 */

(function () {
    'use strict';

    // ===== YAPILANDIRMA =====
    const CONFIG = {
        cursorSpeed: 800,        // İmleç hareket süresi (ms)
        scrollOffset: 250,       // Scroll offset (px) - artırıldı
        defaultWait: 4000,       // Varsayılan bekleme süresi
        tooltipOffset: { x: 40, y: 20 }
    };

    // ===== DURUM =====
    let state = {
        currentStep: 0,
        isPaused: false,
        isRunning: false,
        cursor: null,
        tooltip: null,
        controls: null
    };

    // ===== YARDIMCI FONKSİYONLAR =====

    function loadStyles() {
        if (document.getElementById('sunum-styles')) return;
        const link = document.createElement('link');
        link.id = 'sunum-styles';
        link.rel = 'stylesheet';
        link.href = '/presentation/presentation.css';
        document.head.appendChild(link);
    }

    function loadSteps() {
        return new Promise((resolve) => {
            if (window.SUNUM_STEPS) {
                resolve(window.SUNUM_STEPS);
                return;
            }
            const script = document.createElement('script');
            script.src = '/presentation/steps.js';
            script.onload = () => resolve(window.SUNUM_STEPS);
            document.head.appendChild(script);
        });
    }

    function createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'sunum-cursor';
        cursor.style.left = '50%';
        cursor.style.top = '50%';
        document.body.appendChild(cursor);
        return cursor;
    }

    function createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'sunum-tooltip';
        tooltip.innerHTML = `
            <div class="sunum-tooltip-title"></div>
            <div class="sunum-tooltip-content"></div>
            <div class="sunum-tooltip-step">
                <span class="sunum-step-info"></span>
                <div class="sunum-tooltip-progress">
                    <div class="sunum-tooltip-progress-bar"></div>
                </div>
            </div>
        `;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    function createControls() {
        const controls = document.createElement('div');
        controls.className = 'sunum-controls';
        controls.innerHTML = `
            <button class="sunum-control-btn" data-action="prev" title="Önceki">⏮️</button>
            <button class="sunum-control-btn" data-action="pause" title="Duraklat/Devam">⏸️</button>
            <button class="sunum-control-btn" data-action="next" title="Sonraki">⏭️</button>
            <button class="sunum-control-btn" data-action="stop" title="Durdur">⏹️</button>
        `;

        controls.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.dataset.action;
            switch (action) {
                case 'prev':
                    // Önceki adıma git (her zaman çalışsın)
                    state.currentStep = Math.max(0, state.currentStep - 2);
                    state.isPaused = true; // Duraklatarak manuel kontrol ver
                    runNextStep();
                    controls.querySelector('[data-action="pause"]').textContent = '▶️';
                    break;
                case 'pause':
                    state.isPaused = !state.isPaused;
                    btn.textContent = state.isPaused ? '▶️' : '⏸️';
                    if (!state.isPaused) runNextStep();
                    break;
                case 'next':
                    // Sonraki adıma git (her zaman çalışsın)
                    state.isPaused = true; // Duraklatarak manuel kontrol ver
                    runNextStep();
                    controls.querySelector('[data-action="pause"]').textContent = '▶️';
                    break;
                case 'stop':
                    stopPresentation();
                    break;
            }
        });

        document.body.appendChild(controls);
        return controls;
    }

    function findElement(selector) {
        // Birden fazla selector dene
        const selectors = selector.split(',').map(s => s.trim());
        for (const sel of selectors) {
            try {
                const el = document.querySelector(sel);
                if (el && el.offsetParent !== null) return el;
            } catch (e) {
                console.warn('Selector hatası:', sel);
            }
        }
        return null;
    }

    function moveCursorTo(element) {
        if (!element || !state.cursor) return;

        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        state.cursor.style.left = x + 'px';
        state.cursor.style.top = y + 'px';
    }

    function scrollToElement(element) {
        if (!element) return Promise.resolve();

        return new Promise(resolve => {
            const rect = element.getBoundingClientRect();
            const targetY = window.scrollY + rect.top - CONFIG.scrollOffset;

            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
            });

            setTimeout(resolve, 600);
        });
    }

    function showTooltip(step, stepIndex, totalSteps) {
        if (!state.tooltip) return;

        const element = findElement(step.selector);
        const rect = element ? element.getBoundingClientRect() : { right: window.innerWidth / 2, top: window.innerHeight / 2 };

        // Tooltip pozisyonu
        let x = rect.right + CONFIG.tooltipOffset.x;
        let y = rect.top + CONFIG.tooltipOffset.y;

        // Ekran sınırlarını kontrol et
        if (x + 400 > window.innerWidth) {
            x = rect.left - 400 - CONFIG.tooltipOffset.x;
        }
        if (x < 0) x = 20;
        if (y + 200 > window.innerHeight) {
            y = window.innerHeight - 220;
        }
        if (y < 80) y = 80;

        state.tooltip.style.left = x + 'px';
        state.tooltip.style.top = y + 'px';

        state.tooltip.querySelector('.sunum-tooltip-title').textContent = step.title;
        state.tooltip.querySelector('.sunum-tooltip-content').textContent = step.content;
        state.tooltip.querySelector('.sunum-step-info').textContent = `${stepIndex + 1} / ${totalSteps}`;
        state.tooltip.querySelector('.sunum-tooltip-progress-bar').style.width =
            ((stepIndex + 1) / totalSteps * 100) + '%';

        state.tooltip.classList.add('visible');
    }

    function hideTooltip() {
        if (state.tooltip) {
            state.tooltip.classList.remove('visible');
        }
    }

    function highlightElement(element) {
        if (!element) return;
        element.classList.add('sunum-highlight');
    }

    function removeHighlight(element) {
        if (!element) return;
        element.classList.remove('sunum-highlight');
    }

    function simulateClick(element) {
        if (!element) return Promise.resolve();

        return new Promise(resolve => {
            state.cursor.classList.add('clicking');

            setTimeout(() => {
                state.cursor.classList.remove('clicking');
                element.click();
                resolve();
            }, 200);
        });
    }

    function simulateHover(element) {
        if (!element) return Promise.resolve();

        return new Promise(resolve => {
            element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            setTimeout(() => {
                element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                resolve();
            }, 2500);
        });
    }

    // ===== ANA SUNUM AKIŞI =====

    async function runStep(step, stepIndex, totalSteps) {
        const element = findElement(step.selector);

        // Element yoksa sonraki adıma geç
        if (!element && !step.final && !step.navigateTo) {
            console.warn('Element bulunamadı:', step.selector);
            return;
        }

        // Scroll ve imleç hareketi
        if (element) {
            await scrollToElement(element);
            moveCursorTo(element);
            highlightElement(element);
        }

        // Tooltip göster
        await new Promise(r => setTimeout(r, CONFIG.cursorSpeed));
        showTooltip(step, stepIndex, totalSteps);

        // Aksiyon varsa çalıştır
        if (step.action && element) {
            await new Promise(r => setTimeout(r, 1500));

            if (step.action === 'click') {
                await simulateClick(element);
            } else if (step.action === 'hover') {
                await simulateHover(element);
            } else if (step.action === 'type' && step.typeText) {
                await simulateType(element, step.typeText);
            }
        }

        // Sayfa değişimi varsa
        if (step.navigateTo) {
            await new Promise(r => setTimeout(r, 1000));
            window.location.href = step.navigateTo;
            return; // Sayfa değişecek, devam etme
        }

        // Bekleme süresi
        await new Promise(r => setTimeout(r, step.wait || CONFIG.defaultWait));

        // Temizlik
        hideTooltip();
        if (element) removeHighlight(element);
    }

    // Yazma simülasyonu
    function simulateType(element, text) {
        return new Promise(resolve => {
            element.focus();
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.value += text[i];
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    async function runNextStep() {
        if (!state.isRunning || state.isPaused) return;

        const steps = window.SUNUM_STEPS;
        if (state.currentStep >= steps.length) {
            stopPresentation();
            return;
        }

        const step = steps[state.currentStep];
        await runStep(step, state.currentStep, steps.length);

        state.currentStep++;

        if (!step.final && state.isRunning && !state.isPaused) {
            runNextStep();
        } else if (step.final) {
            setTimeout(stopPresentation, 3000);
        }
    }

    function showIntro() {
        return new Promise(resolve => {
            const intro = document.createElement('div');
            intro.className = 'sunum-intro';
            intro.innerHTML = `
                <div class="sunum-intro-logo">AKRAN <span>Randevu</span></div>
                <div class="sunum-intro-text">Proje Sunumu</div>
                <button class="sunum-intro-start">Sunumu Başlat</button>
            `;

            document.body.appendChild(intro);

            intro.querySelector('.sunum-intro-start').addEventListener('click', () => {
                intro.classList.add('sunum-fade-out');
                setTimeout(() => {
                    intro.remove();
                    resolve();
                }, 500);
            });

            // 3 saniye sonra otomatik başla
            setTimeout(() => {
                if (intro.parentNode) {
                    intro.classList.add('sunum-fade-out');
                    setTimeout(() => {
                        if (intro.parentNode) intro.remove();
                        resolve();
                    }, 500);
                }
            }, 5000);
        });
    }

    // ===== PUBLIC API =====

    async function startPresentation() {
        if (state.isRunning) return;

        console.log('🎬 AKRAN Sunum Modu başlatılıyor...');

        // Kaynakları yükle
        loadStyles();
        await loadSteps();

        // UI oluştur
        state.cursor = createCursor();
        state.tooltip = createTooltip();
        state.controls = createControls();

        // Intro göster
        await showIntro();

        // Sunumu başlat
        state.isRunning = true;
        state.currentStep = 0;
        state.isPaused = false;

        // Sayfanın başına git
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await new Promise(r => setTimeout(r, 800));

        runNextStep();
    }

    function stopPresentation() {
        state.isRunning = false;
        state.isPaused = false;

        // Temizlik
        if (state.cursor) {
            state.cursor.remove();
            state.cursor = null;
        }
        if (state.tooltip) {
            state.tooltip.remove();
            state.tooltip = null;
        }
        if (state.controls) {
            state.controls.remove();
            state.controls = null;
        }

        // Highlight'ları temizle
        document.querySelectorAll('.sunum-highlight').forEach(el => {
            el.classList.remove('sunum-highlight');
        });

        // Sayfa başına geri dön
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Butonu tekrar göster
        setTimeout(createStartButton, 1000);

        console.log('🎬 Sunum tamamlandı!');
    }

    // Global erişim
    window.startPresentation = startPresentation;
    window.stopPresentation = stopPresentation;

    // ===== SUNUM BAŞLAT BUTONU =====
    function createStartButton() {
        // Zaten varsa ekleme
        if (document.getElementById('sunum-start-btn')) return;

        loadStyles();

        const btn = document.createElement('button');
        btn.id = 'sunum-start-btn';
        btn.className = 'sunum-start-button';
        btn.innerHTML = '<span class="icon">🎬</span> Sunum Modu';
        btn.onclick = () => {
            btn.remove();
            startPresentation();
        };

        document.body.appendChild(btn);
        console.log('✅ Sunum Modu butonu eklendi (sağ alt köşe)');
    }
    // Sayfa yüklendiğinde kontrol et
    function onPageLoad() {
        const urlParams = new URLSearchParams(window.location.search);

        // Brands sayfasında sunum devamı
        if (urlParams.get('sunum') === 'continue' && window.BRANDS_STEPS) {
            console.log('🎬 Sunum devam ediyor (Brands sayfası)...');
            loadStyles();

            // Kısa bekle ve başla
            setTimeout(() => {
                startBrandsPresentation();
            }, 1000);
        } else {
            // Normal buton göster
            createStartButton();
        }
    }

    // Brands sayfası sunumu
    async function startBrandsPresentation() {
        state.isRunning = true;
        state.isPaused = false;
        state.currentStep = 0;

        state.cursor = createCursor();
        state.tooltip = createTooltip();
        state.controls = createControls();

        runBrandsStep();
    }

    async function runBrandsStep() {
        if (!state.isRunning || state.isPaused) return;

        const steps = window.BRANDS_STEPS;
        if (state.currentStep >= steps.length) {
            // Sunum bitti - ana sayfaya dön
            setTimeout(() => {
                window.location.href = '/tr';
            }, 2000);
            return;
        }

        const step = steps[state.currentStep];
        await runStep(step, state.currentStep, steps.length);

        state.currentStep++;

        if (!step.final && state.isRunning && !state.isPaused) {
            runBrandsStep();
        } else if (step.final) {
            // Final - ana sayfaya dön
            setTimeout(() => {
                stopPresentation();
                window.location.href = '/tr';
            }, 3000);
        }
    }

    if (document.readyState === 'complete') {
        onPageLoad();
    } else {
        window.addEventListener('load', onPageLoad);
    }

})();
