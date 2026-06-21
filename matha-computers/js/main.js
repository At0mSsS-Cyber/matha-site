/* Matha Computers & CCTV — interactions
   Nav, mobile menu, scroll-reveal, animated counters,
   cursor-follow glow, WhatsApp lead form. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WHATSAPP_NUMBER = '919886795838'; // primary line

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Navbar shadow on scroll ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat__num');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target.toLocaleString('en-IN') + suffix; return; }
    var start = performance.now();
    var dur = 1600;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Cursor-follow glow ---------- */
  var glow = document.querySelector('.cursor-glow');
  if (glow && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    var gx = window.innerWidth / 2, gy = window.innerHeight * 0.3;
    var tx = gx, ty = gy;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(loop);
    })();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ---------- WhatsApp lead form ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var el = form.elements;
      var name = (el.namedItem('name').value || '').trim();
      var phone = (el.namedItem('phone').value || '').trim();
      var service = el.namedItem('service').value || '';
      var message = (el.namedItem('message').value || '').trim();

      var lines = [
        'Hi Matha Computers & CCTV,',
        '',
        'I would like to enquire.',
        '*Name:* ' + name,
        '*Phone:* ' + phone,
        '*Service:* ' + service
      ];
      if (message) lines.push('*Details:* ' + message);

      // Encode the whole message once so '&', spaces and newlines are safe in the URL.
      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank', 'noopener');
    });
  }

  /* ---------- Scroll-draw: neon stroke that follows scroll progress ---------- */
  var drawSection = document.getElementById('coverage');
  var drawPath = drawSection && drawSection.querySelector('.scroll-draw__path');
  if (drawPath) {
    var dot = drawSection.querySelector('.scroll-draw__dot');
    var len = drawPath.getTotalLength();
    var START = 0.12;            // line begins slightly drawn, like the reference
    drawPath.style.strokeDasharray = len;

    function placeDot(drawn) {
      if (!dot) return;
      var pt = drawPath.getPointAtLength(len * Math.max(0.0001, Math.min(drawn, 1)));
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
    }

    function targetNow() {
      var rect = drawSection.getBoundingClientRect();
      var track = drawSection.offsetHeight - window.innerHeight;
      var prog = track > 0 ? Math.min(Math.max(-rect.top / track, 0), 1) : 0;
      return START + (1 - START) * prog;
    }
    function paint(drawn) {
      drawPath.style.strokeDashoffset = len * (1 - drawn);
      placeDot(drawn);
    }

    if (reduceMotion) {
      paint(1);  // show fully drawn, no animation
    } else {
      // Continuous easing loop that runs only while the section is on-screen —
      // each frame re-reads scroll position, so it can never freeze out of sync.
      var current = targetNow();
      paint(current);
      var rafId = null;
      function frame() {
        var t = targetNow();
        current += (t - current) * 0.14;        // smooth follow
        paint(current);
        rafId = requestAnimationFrame(frame);
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && rafId === null) rafId = requestAnimationFrame(frame);
            else if (!e.isIntersecting && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
          });
        }, { threshold: 0 }).observe(drawSection);
      } else {
        rafId = requestAnimationFrame(frame);
      }
      window.addEventListener('resize', function () {
        len = drawPath.getTotalLength();
        drawPath.style.strokeDasharray = len;
      });
    }
  }
})();
