// ── Language toggle ───────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// ── Navbar scroll shadow ──────────────────────────────────
const nav = document.getElementById('mainNav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
});

// ── Close mobile nav on link click ───────────────────────
document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
        const c = document.querySelector('.navbar-collapse');
        if (c?.classList.contains('show')) bootstrap.Collapse.getInstance(c)?.hide();
    });
});

// ── Highlight current page nav link ──────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(l => {
    const href = l.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        l.classList.add('active');
    }
});

// ── Cookie consent banner ─────────────────────────────────
(function () {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    setTimeout(() => banner.classList.add('show'), 800);
    document.getElementById('cookieAccept')?.addEventListener('click', () => banner.classList.remove('show'));
    document.getElementById('cookieDecline')?.addEventListener('click', () => banner.classList.remove('show'));
})();

// ── AOS (Animate On Scroll) ───────────────────────────────
// Map existing class system to data-aos attributes, then init
document.querySelectorAll('.rv, .rl, .rr').forEach(el => {
    if (el.hasAttribute('data-aos')) return; // skip if already set

    const anim = el.classList.contains('rl') ? 'fade-right'
               : el.classList.contains('rr') ? 'fade-left'
               : 'fade-up';

    const delay = el.classList.contains('d5') ? 500
                : el.classList.contains('d4') ? 400
                : el.classList.contains('d3') ? 300
                : el.classList.contains('d2') ? 200
                : el.classList.contains('d1') ? 100
                : 0;

    el.setAttribute('data-aos', anim);
    el.setAttribute('data-aos-duration', '750');
    el.setAttribute('data-aos-easing', 'ease-out-quart');
    if (delay) el.setAttribute('data-aos-delay', String(delay));

    // Strip equipment.css initial-state classes so AOS fully manages visibility
    el.style.opacity = '';
    el.style.transform = '';
    el.classList.remove('rv', 'rl', 'rr');
});

if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        offset: 80,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
}
