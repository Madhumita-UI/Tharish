
// Language toggle — visual only
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});
// ── Before & After category tabs ─────────────────────────
document.querySelectorAll('.ba-tab').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.ba-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.ba;
        document.querySelectorAll('.ba-item').forEach(item => {
            item.style.display = (item.dataset.baCat === cat) ? '' : 'none';
        });
    });
});
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
});

// ═══ HERO SWIPER ═══
const heroSwiper = new Swiper('#heroSlider', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 900,
    autoplay: { delay: 6000, disableOnInteraction: false },
    navigation: { prevEl: '#hsPrev', nextEl: '#hsNext' },
    pagination: {
        el: '#hsDotsCont',
        clickable: true,
        bulletClass: 'hsd',
        bulletActiveClass: 'active',
        renderBullet: (i, cls) => `<button class="${cls}" aria-label="Slide ${i + 1}"></button>`
    },
    on: {
        slideChangeTransitionStart() {
            const slide = this.slides[this.activeIndex];
            if (!slide) return;
            slide.querySelectorAll('.hero-etag, .hero-title, .hero-sub, .hslide-content .d-flex').forEach(el => {
                el.style.animation = 'none';
                el.getBoundingClientRect();
                el.style.animation = '';
            });
        },
        autoplayTimeLeft(s, timeLeft, progress) {
            const bar = document.getElementById('hsProgressBar');
            if (bar) bar.style.width = ((1 - progress) * 100) + '%';
        }
    }
});

// Reveal — powered by ScrollReveal
const sr = ScrollReveal({ reset: false, mobile: true, useDelay: 'always' });
const _up   = d => ({ origin: 'bottom', distance: '26px', duration: 720, easing: 'ease', delay: d, opacity: 0 });
const _left = d => ({ origin: 'left',   distance: '26px', duration: 720, easing: 'ease', delay: d, opacity: 0 });
const _right= d => ({ origin: 'right',  distance: '26px', duration: 720, easing: 'ease', delay: d, opacity: 0 });
sr.reveal('.rv:not(.d1):not(.d2):not(.d3):not(.d4):not(.d5)',  _up(0));
sr.reveal('.rv.d1', _up(100));  sr.reveal('.rv.d2', _up(200));
sr.reveal('.rv.d3', _up(300));  sr.reveal('.rv.d4', _up(400));  sr.reveal('.rv.d5', _up(500));
sr.reveal('.rl:not(.d1):not(.d2):not(.d3):not(.d4):not(.d5)',  _left(0));
sr.reveal('.rl.d1', _left(100)); sr.reveal('.rl.d2', _left(200));
sr.reveal('.rl.d3', _left(300)); sr.reveal('.rl.d4', _left(400)); sr.reveal('.rl.d5', _left(500));
sr.reveal('.rr:not(.d1):not(.d2):not(.d3):not(.d4):not(.d5)',  _right(0));
sr.reveal('.rr.d1', _right(100)); sr.reveal('.rr.d2', _right(200));
sr.reveal('.rr.d3', _right(300)); sr.reveal('.rr.d4', _right(400)); sr.reveal('.rr.d5', _right(500));
// Counter
function countUp(el, target, dur = 2000) {
    const start = performance.now();
    const frame = ts => {
        const p = Math.min((ts - start) / dur, 1);
        const v = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = target > 100 ? v.toLocaleString() : v;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target > 100 ? target.toLocaleString() : target;
    };
    requestAnimationFrame(frame);
}
const co = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) { x.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count)); co.unobserve(x.target) } }) }, { threshold: .5 });
document.querySelectorAll('.stat-bar,.cnt-row').forEach(el => co.observe(el));
// Treatment filter
document.querySelectorAll('.t-tab').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.t-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.querySelectorAll('.t-item').forEach(item => {
            item.style.display = (tab === 'all' || item.dataset.cat.includes(tab)) ? '' : 'none';
        });
    });
});
// Appt button
document.getElementById('apptBtn').addEventListener('click', function () {
    this.innerHTML = '<i class="fas fa-check-circle"></i> Request Sent! We\'ll Confirm Shortly.';
    this.style.background = '#2d8a3e';
    setTimeout(() => { this.innerHTML = '<i class="fas fa-calendar-check"></i>Confirm Appointment'; this.style.background = '' }, 4000);
});
// Smooth scroll — only for in-page anchor buttons (not navbar links)
document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' }) }
    });
});
// Close mobile navbar when a link is clicked
document.querySelectorAll('.nav-link:not([data-bs-toggle="dropdown"])').forEach(a => {
    a.addEventListener('click', () => {
        const c = document.querySelector('.navbar-collapse');
        if (c?.classList.contains('show')) bootstrap.Collapse.getInstance(c)?.hide();
    });
});
// Highlight current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(l => {
    const href = l.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        l.classList.add('active');
    }
});

// ═══ MOBILE MEGAMENU DROPDOWN FIX ═══
// Handle submenu expand/collapse on mobile when clicking parent items
(function () {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (!navbarCollapse) return;
    
    // Stop propagation on dropdown menu clicks to prevent navbar from closing
    const dropdownMenus = document.querySelectorAll('.treat-drop');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Handle submenu toggle on mobile (below 992px)
    const treatHasSub = document.querySelectorAll('.treat-has-sub');
    treatHasSub.forEach(item => {
        const parentLink = item.querySelector('.dropdown-item');
        const submenu = item.querySelector('.treat-submenu');
        
        if (!parentLink || !submenu) return;
        
        parentLink.addEventListener('click', (e) => {
            // Only on mobile/tablet
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other open submenus
                treatHasSub.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('expanded');
                    }
                });
                
                // Toggle current submenu
                const isExpanded = item.classList.contains('expanded');
                if (isExpanded) {
                    item.classList.remove('expanded');
                } else {
                    item.classList.add('expanded');
                }
            }
        });
        
        // Allow clicking submenu items to navigate
        submenu.querySelectorAll('.dropdown-item').forEach(subLink => {
            subLink.addEventListener('click', (e) => {
                // Only prevent closing if it's not a real link
                const href = subLink.getAttribute('href');
                if (href && href !== '#') {
                    setTimeout(() => {
                        treatHasSub.forEach(si => si.classList.remove('expanded'));
                        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (collapseInstance) {
                            collapseInstance.hide();
                        }
                    }, 100);
                }
            });
        });
    });

    // If viewport switches to desktop, clear mobile-expanded state.
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            treatHasSub.forEach(item => item.classList.remove('expanded'));
        }
    });
})();

// Cookie consent banner — always shown on every page load
(function () {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    setTimeout(() => banner.classList.add('show'), 800);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
        banner.classList.remove('show');
    });
    document.getElementById('cookieDecline')?.addEventListener('click', () => {
        banner.classList.remove('show');
    });
})();

// ═══ TESTIMONIALS SWIPER ═══
new Swiper('.testi-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: '#tsPrev', nextEl: '#tsNext' },
    pagination: { el: '#tsDots', clickable: true, dynamicBullets: false },
    breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 }
    }
});
