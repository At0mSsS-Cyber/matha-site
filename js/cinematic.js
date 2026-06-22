/* Matha Computers & CCTV — cinematic scroll sequence
   Hybrid hero: a short, clean JPG sequence carries only the *camera approach*
   (floating CCTV slowly zooming in — frames that compress sharply). The whole
   lens-dive + radar scan + surveillance-light network is rendered PROCEDURALLY
   on a canvas, so it is crisp at any resolution with zero JPEG banding, loads
   light, and persists as the page's living red backdrop. No dependencies. */
(function () {
  'use strict';

  /* Frames cover only the clean camera approach; everything red/abstract is procedural. */
  var FRAME_COUNT = 50;
  var PATH = function (i) { return 'assets/sequence/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg'; };
  var REVEAL_AT = 14;

  var FRAME_END_P = 0.34;   // camera frames play across this slice of the hero scroll
  var CROSS_START = 0.26;   // procedural lens-dive starts taking over (masks the last frames)
  var CROSS_END   = 0.40;   // …frames fully gone, procedural owns the screen

  var seqCanvas = document.getElementById('seqCanvas');
  var netCanvas = document.getElementById('netCanvas');
  var section   = document.getElementById('hero');
  if (!seqCanvas || !section) return;

  var ctx = seqCanvas.getContext('2d', { alpha: false });
  var nctx = netCanvas ? netCanvas.getContext('2d') : null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====================================================================
     FRAME SEQUENCE — camera approach only
     ==================================================================== */
  var frames = new Array(FRAME_COUNT);
  var ready = new Array(FRAME_COUNT);
  var loadedCount = 0, firstReady = false;

  function onFrameLoad(idx) {
    ready[idx] = true; loadedCount++;
    if (!firstReady && idx === 0) { firstReady = true; renderFrames(true); }
    if (loadedCount === REVEAL_AT || idx === 0) hideLoader();
    if (loadedCount === FRAME_COUNT) document.body.classList.add('seq-ready');
  }
  for (var i = 0; i < FRAME_COUNT; i++) {
    (function (idx) {
      var img = new Image(); img.decoding = 'async';
      img.onload = function () { onFrameLoad(idx); };
      img.onerror = function () { ready[idx] = false; loadedCount++; if (idx === 0) hideLoader(); };
      img.src = PATH(idx + 1); frames[idx] = img;
    })(i);
  }
  function resolveFrame(idx) {
    idx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    if (ready[idx]) return frames[idx];
    for (var d = 1; d < FRAME_COUNT; d++) {
      if (idx - d >= 0 && ready[idx - d]) return frames[idx - d];
      if (idx + d < FRAME_COUNT && ready[idx + d]) return frames[idx + d];
    }
    return null;
  }

  var vw = 0, vh = 0, dpr = 1;
  function sizeSeq() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    vw = window.innerWidth; vh = window.innerHeight;
    seqCanvas.width = Math.round(vw * dpr); seqCanvas.height = Math.round(vh * dpr);
    seqCanvas.style.width = vw + 'px'; seqCanvas.style.height = vh + 'px';
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  }
  function drawCover(img) {
    var cw = seqCanvas.width, ch = seqCanvas.height;
    var iw = img.naturalWidth || 1280, ih = img.naturalHeight || 720;
    var s = Math.max(cw / iw, ch / ih), w = iw * s, h = ih * s;
    ctx.drawImage(img, 0, 0, iw, ih, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  var lastDrawn = -1, displayed = 0;
  function renderFrames(force) {
    var fp = Math.min(progress() / FRAME_END_P, 1);
    var target = fp * (FRAME_COUNT - 1);
    displayed += (target - displayed) * (reduceMotion ? 1 : 0.22);
    if (Math.abs(target - displayed) < 0.04) displayed = target;
    var idx = Math.round(displayed);
    if (force || idx !== lastDrawn) { var img = resolveFrame(idx); if (img) { drawCover(img); lastDrawn = idx; } }
  }

  /* ====================================================================
     PROCEDURAL: lens-dive radar  +  surveillance-light network
     dive = scroll position through the procedural region [CROSS_START..end].
       scan  (radar rings/crosshair/core)  strong early, gone by mid-dive
       net   (perspective dot field)        grows in and persists
       burst (white lens flash)             peaks at the hand-off
     ==================================================================== */
  var NEAR = 0.72, FAR = 9.0;
  var dots = [], sprite = null, NW = 0, NH = 0, ndpr = 1;
  var netTime = 0, bloom = 0, dive = 0, currentPush = 0;

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }

  function makeSprite() {
    var r = 48, s = document.createElement('canvas'); s.width = s.height = r * 2;
    var g = s.getContext('2d'), rg = g.createRadialGradient(r, r, 0, r, r, r);
    rg.addColorStop(0.0, 'rgba(255,176,176,1)');
    rg.addColorStop(0.16, 'rgba(255,64,72,0.95)');
    rg.addColorStop(0.5, 'rgba(228,22,34,0.32)');
    rg.addColorStop(1.0, 'rgba(210,12,20,0)');
    g.fillStyle = rg; g.beginPath(); g.arc(r, r, r, 0, 7); g.fill();
    sprite = s;
  }
  function newDot(z) {
    var sign = Math.random() < 0.5 ? -1 : 1;
    return {
      x: (Math.random() * 2 - 1) * 1.75,
      y: sign * (0.16 + Math.random() * 1.25),
      z: z, w: 0.6 + Math.random() * 1.7, ph: Math.random() * 6.283,
      sp: 0.7 + Math.random() * 0.7, hard: Math.random() < 0.22,
      duty: 0.32 + Math.random() * 0.4, streak: Math.random() < 0.16
    };
  }
  function seedDots() {
    var n = NW < 700 ? 200 : NW < 1200 ? 330 : 460;
    dots = []; for (var i = 0; i < n; i++) dots.push(newDot(NEAR + Math.random() * (FAR - NEAR)));
  }
  function sizeNet() {
    if (!netCanvas) return;
    ndpr = Math.min(window.devicePixelRatio || 1, 1.6);
    NW = window.innerWidth; NH = window.innerHeight;
    netCanvas.width = Math.round(NW * ndpr); netCanvas.height = Math.round(NH * ndpr);
    netCanvas.style.width = NW + 'px'; netCanvas.style.height = NH + 'px';
    if (!sprite) makeSprite();
    if (!dots.length) seedDots();
  }
  function updateNet(dt) {
    netTime += dt;
    var sp = (0.5 + currentPush * 1.9) * dt;
    for (var i = 0; i < dots.length; i++) {
      var p = dots[i]; p.z -= sp * p.sp;
      if (p.z <= NEAR) dots[i] = newDot(FAR - (NEAR - p.z));
    }
    if (bloom > 0.001) bloom *= Math.pow(0.05, dt); else bloom = 0;
  }

  function drawNet() {
    if (!nctx) return;
    var W = netCanvas.width, H = netCanvas.height, cx = W * 0.5, cy = H * 0.5, f = H * 0.62;
    var scan = clamp01(dive / 0.06) * clamp01((0.60 - dive) / 0.40);
    var net = clamp01((dive - 0.26) / 0.45);
    var burst = Math.exp(-Math.pow((dive - 0.46) / 0.12, 2));

    nctx.globalCompositeOperation = 'source-over';
    nctx.fillStyle = '#000'; nctx.fillRect(0, 0, W, H);
    nctx.globalCompositeOperation = 'lighter';

    /* central core — the lens light, flares at the hand-off */
    var coreA = 0.16 + scan * 0.30 + burst * 0.85 + bloom * 0.35;
    var coreR = H * (0.05 + burst * 0.5 + scan * 0.05);
    if (coreA > 0.01) {
      var hot = Math.round(120 + burst * 130);
      var cg = nctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, 'rgba(255,' + hot + ',' + hot + ',' + Math.min(1, coreA) + ')');
      cg.addColorStop(0.32, 'rgba(255,54,60,' + (coreA * 0.7) + ')');
      cg.addColorStop(1, 'rgba(255,30,40,0)');
      nctx.fillStyle = cg; nctx.fillRect(0, 0, W, H);
    }

    /* network horizon glow + bright horizon band (grows in with the dots) */
    if (net > 0.01) {
      var hg = nctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.66);
      hg.addColorStop(0, 'rgba(255,42,50,' + (net * 0.26) + ')');
      hg.addColorStop(0.42, 'rgba(196,14,22,' + (net * 0.10) + ')');
      hg.addColorStop(1, 'rgba(0,0,0,0)');
      nctx.fillStyle = hg; nctx.fillRect(0, 0, W, H);
    }
    var hbA = net * 0.42 + scan * 0.35 + burst * 0.4;
    if (hbA > 0.01) {
      var hb = nctx.createLinearGradient(0, cy - H * 0.06, 0, cy + H * 0.06);
      hb.addColorStop(0, 'rgba(255,46,54,0)');
      hb.addColorStop(0.5, 'rgba(255,96,100,' + Math.min(0.9, hbA) + ')');
      hb.addColorStop(1, 'rgba(255,46,54,0)');
      nctx.fillStyle = hb; nctx.fillRect(0, cy - H * 0.06, W, H * 0.12);
    }

    /* radar — concentric rings diving outward + targeting crosshair */
    if (scan > 0.01) {
      var maxR = Math.sqrt(W * W + H * H) * 0.5;
      var rings = 6, phase = (dive * 2.6 + netTime * 0.05) % 1;
      for (var k = 0; k < rings; k++) {
        var norm = ((k / rings) + phase) % 1;
        var rr = norm * maxR * 0.92 + H * 0.015;
        var edge = Math.sin(norm * Math.PI);
        var a = scan * edge;
        if (a < 0.015) continue;
        nctx.globalAlpha = a * 0.45;
        nctx.lineWidth = Math.max(1.5, H * 0.012 * (0.4 + edge));
        nctx.strokeStyle = 'rgba(255,40,48,1)';
        nctx.beginPath(); nctx.arc(cx, cy, rr, 0, 6.2832); nctx.stroke();
        nctx.globalAlpha = a * 0.85;
        nctx.lineWidth = Math.max(1, H * 0.0026);
        nctx.strokeStyle = 'rgba(255,128,132,1)';
        nctx.beginPath(); nctx.arc(cx, cy, rr, 0, 6.2832); nctx.stroke();
      }
      nctx.globalAlpha = scan * 0.32; nctx.strokeStyle = 'rgba(255,74,80,1)';
      nctx.lineWidth = Math.max(1, H * 0.0022);
      nctx.beginPath(); nctx.moveTo(cx, 0); nctx.lineTo(cx, H);
      nctx.moveTo(0, cy); nctx.lineTo(W, cy); nctx.stroke();
    }

    /* surveillance-light network — perspective field of blinking dots */
    if (net > 0.01) {
      for (var i = 0; i < dots.length; i++) {
        var p = dots[i];
        var sx = cx + (p.x / p.z) * f, sy = cy + (p.y / p.z) * f;
        if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) continue;
        var scale = f / p.z;
        var depth = 1 - (p.z - NEAR) / (FAR - NEAR); depth *= depth;
        var b;
        if (p.hard) { var t = ((netTime * 0.9 + p.ph) % 6.283) / 6.283; b = t < p.duty ? 1 : 0.12; }
        else b = 0.42 + 0.58 * (0.5 + 0.5 * Math.sin(netTime * 1.3 + p.ph));
        var a = depth * b * net;
        if (a < 0.02) continue;
        var vis = Math.max(1.4, scale * 0.013 * p.w);
        if (p.streak && depth > 0.4 && a > 0.35) {
          nctx.globalAlpha = a * 0.22; nctx.strokeStyle = 'rgba(255,70,76,1)';
          nctx.lineWidth = Math.max(0.6, vis * 0.18);
          nctx.beginPath(); nctx.moveTo(sx, sy);
          nctx.lineTo(cx + (sx - cx) * 0.62, cy + (sy - cy) * 0.62); nctx.stroke();
        }
        nctx.globalAlpha = Math.min(1, a);
        var d = vis * 3.0; nctx.drawImage(sprite, sx - d, sy - d, d * 2, d * 2);
      }
    }

    nctx.globalAlpha = 1; nctx.globalCompositeOperation = 'source-over';
  }

  var netActive = false, netRAF = null, lastNow = 0;
  function netLoop(now) {
    if (!netActive) { netRAF = null; return; }
    var dt = (now - lastNow) / 1000; if (!(dt > 0) || dt > 0.05) dt = 0.016; lastNow = now;
    updateNet(dt); drawNet();
    netRAF = requestAnimationFrame(netLoop);
  }
  function startNet() { if (netRAF === null && !document.hidden) { lastNow = performance.now(); netRAF = requestAnimationFrame(netLoop); } }

  /* ====================================================================
     SCROLL → progress, crossfade, panels, scrim
     ==================================================================== */
  function progress() {
    var rect = section.getBoundingClientRect();
    var track = section.offsetHeight - vh;
    if (track <= 0) return 0;
    return Math.min(Math.max(-rect.top / track, 0), 1);
  }
  function envelope(p, a, b, c, d) {
    if (p < a || p > d) return 0;
    if (p < b) return clamp01((p - a) / (b - a));
    if (p > c) return clamp01((d - p) / (d - c));
    return 1;
  }

  var panels = [];
  function paintPanels(p) {
    for (var k = 0; k < panels.length; k++) {
      var el = panels[k];
      var o = envelope(p, +el.dataset.a, +el.dataset.b, +el.dataset.c, +el.dataset.d);
      el.style.opacity = o.toFixed(3);
      el.style.transform = 'translateY(' + ((1 - o) * 26).toFixed(1) + 'px)';
      el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
    }
  }
  var scrim = document.getElementById('seqScrim');
  function paintScrim() {
    if (!scrim) return;
    var introEnd = section.offsetTop + section.offsetHeight - vh;
    var t = clamp01(((window.scrollY || window.pageYOffset) - introEnd) / (vh * 1.1));
    scrim.style.opacity = (0.12 + t * 0.46).toFixed(3);
  }

  function applyState(p) {
    if (document.body) document.body.classList.toggle('seq-scrolled', p > 0.02);
    var act = clamp01((p - CROSS_START) / (CROSS_END - CROSS_START));
    seqCanvas.style.opacity = (1 - act).toFixed(3);
    if (netCanvas) netCanvas.style.opacity = act.toFixed(3);
    dive = clamp01((p - CROSS_START) / (1 - CROSS_START));
    currentPush = clamp01((dive - 0.22) / 0.78);
    if (act > 0 && !netActive) { netActive = true; bloom = 1; startNet(); }
    else if (act <= 0 && netActive) { netActive = false; }
    paintPanels(p); paintScrim();
  }

  var rafId = null;
  function loop() {
    var p = progress();
    applyState(p);
    renderFrames(false);
    var target = Math.min(p / FRAME_END_P, 1) * (FRAME_COUNT - 1);
    if (Math.abs(target - displayed) > 0.04) rafId = requestAnimationFrame(loop);
    else rafId = null;
  }
  function kick() { if (rafId === null) rafId = requestAnimationFrame(loop); }

  /* ---------- Loader ---------- */
  var loader = document.getElementById('seqLoader'), loaderHidden = false;
  function hideLoader() {
    if (loaderHidden || !loader) return;
    loaderHidden = true; loader.classList.add('is-hidden');
    setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
  }
  setTimeout(hideLoader, 4500);

  /* ---------- Resize / visibility ---------- */
  function resizeAll() { sizeSeq(); sizeNet(); renderFrames(true); applyState(progress()); if (netActive) drawNet(); }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (netRAF) { cancelAnimationFrame(netRAF); netRAF = null; } }
    else if (netActive) startNet();
  });

  /* ---------- Init ---------- */
  panels = Array.prototype.slice.call(document.querySelectorAll('.cine__panel'));
  sizeSeq(); sizeNet();

  if (reduceMotion) {
    var still = new Image();
    still.onload = function () { sizeSeq(); var img = resolveFrame(0); if (img) drawCover(img); };
    still.src = PATH(1);
    panels.forEach(function (el) { el.style.opacity = el.classList.contains('cine__panel--intro') ? '1' : '0'; });
    if (netCanvas) netCanvas.style.opacity = '0';
    hideLoader();
    window.addEventListener('resize', function () { sizeSeq(); var img = resolveFrame(0); if (img) drawCover(img); });
    return;
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', function () { resizeAll(); kick(); });
  applyState(progress());
  kick();
})();
