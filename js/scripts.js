/* ============================================================
   ishtiaquezafar.com — vanilla JS, no dependencies
   ============================================================ */

(() => {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Nav: scrolled state + mobile menu ---------- */

    const nav = document.getElementById("site-nav");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    navToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.addEventListener("click", (e) => {
        if (e.target.closest("a")) {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    /* ---------- Footer year ---------- */

    document.getElementById("year").textContent = new Date().getFullYear();

    /* ---------- Scroll reveal ---------- */

    const revealEls = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => observer.observe(el));
    }

    /* ---------- Hero word rotator (typewriter) ---------- */

    const rotator = document.getElementById("rotator");
    if (rotator && !reducedMotion) {
        const words = JSON.parse(rotator.dataset.words);
        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = true;

        const HOLD = 2200;   // pause on a full word
        const TYPE = 70;     // ms per character typed
        const ERASE = 40;    // ms per character erased

        const tick = () => {
            const word = words[wordIndex];
            if (deleting) {
                charIndex--;
                rotator.textContent = word.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(tick, ERASE);
            } else {
                charIndex++;
                rotator.textContent = words[wordIndex].slice(0, charIndex);
                if (charIndex === words[wordIndex].length) {
                    deleting = true;
                    setTimeout(tick, HOLD);
                } else {
                    setTimeout(tick, TYPE);
                }
            }
        };

        setTimeout(tick, HOLD);
    }

    /* ---------- Hero canvas: particle constellation ---------- */

    const canvas = document.getElementById("hero-canvas");
    if (canvas && !reducedMotion) {
        const ctx = canvas.getContext("2d");
        const ACCENT = "245, 165, 36";
        const DIM = "110, 108, 104";
        const LINK_DIST = 130;
        const MOUSE_DIST = 160;

        let particles = [];
        let mouse = { x: null, y: null };
        let rafId = null;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const { offsetWidth: w, offsetHeight: h } = canvas;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(110, Math.floor((w * h) / 14000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6,
            }));
        };

        const step = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
            }

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < LINK_DIST) {
                        ctx.strokeStyle = `rgba(${DIM}, ${0.12 * (1 - dist / LINK_DIST)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of particles) {
                let near = 0;
                if (mouse.x !== null) {
                    const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                    if (d < MOUSE_DIST) near = 1 - d / MOUSE_DIST;
                }
                ctx.fillStyle = near > 0
                    ? `rgba(${ACCENT}, ${0.35 + near * 0.65})`
                    : `rgba(${DIM}, 0.5)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r + near * 1.5, 0, Math.PI * 2);
                ctx.fill();

                if (mouse.x !== null && near > 0.15) {
                    ctx.strokeStyle = `rgba(${ACCENT}, ${near * 0.25})`;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            rafId = requestAnimationFrame(step);
        };

        const hero = canvas.parentElement;
        hero.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        hero.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });

        // pause the animation when the hero is off-screen
        new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!rafId) rafId = requestAnimationFrame(step);
            } else {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }).observe(hero);

        window.addEventListener("resize", resize);
        resize();
        rafId = requestAnimationFrame(step);
    }
})();
