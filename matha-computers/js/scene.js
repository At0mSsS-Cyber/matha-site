/* Matha Computers & CCTV — Three.js animated network/particle field.
   Elegant, lightweight, and mouse-reactive:
   - drifting node cloud (cyan with a few orange brand accents)
   - links between nearby nodes, faded by distance
   - the constellation reaches toward the cursor (bright links + glow)
   - nodes gently repel from the cursor and spring back
   - smooth camera parallax that follows the pointer
   Capped pixel ratio, paused off-screen / on hidden tab, and disabled for
   prefers-reduced-motion. Falls back silently to the CSS background on error. */

const canvas = document.getElementById('bgCanvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduceMotion) {
  init().catch(() => { /* CSS gradient + grid remain as graceful fallback */ });
}

async function init() {
  const THREE = await import('three');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 26;

  const isMobile = window.innerWidth < 720;
  const COUNT = isMobile ? 48 : 84;     // node count (kept low on purpose)
  const SPREAD = 44;
  const LINK_DIST = 9;                   // node-to-node link distance
  const CURSOR_DIST = 13;                // cursor-to-node link distance
  const INFLUENCE = 11;                  // cursor repulsion radius

  const CYAN = new THREE.Color(0x00e5ff);
  const ORANGE = new THREE.Color(0xff7a18);
  const LINK_BLUE = new THREE.Color(0x2d6bff);

  // --- Node buffers: base position (drift) + displacement (cursor spring) ---
  const base = new Float32Array(COUNT * 3);   // drifting home position
  const bvel = new Float32Array(COUNT * 3);   // drift velocity
  const disp = new Float32Array(COUNT * 3);   // cursor-driven offset
  const dvel = new Float32Array(COUNT * 3);   // offset velocity
  const render = new Float32Array(COUNT * 3); // base + disp (what we draw)
  const pColor = new Float32Array(COUNT * 3); // per-node colour

  for (let i = 0; i < COUNT; i++) {
    base[i * 3]     = (Math.random() - 0.5) * SPREAD;
    base[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.58;
    base[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
    bvel[i * 3]     = (Math.random() - 0.5) * 0.018;
    bvel[i * 3 + 1] = (Math.random() - 0.5) * 0.018;
    bvel[i * 3 + 2] = (Math.random() - 0.5) * 0.018;
    const c = Math.random() < 0.14 ? ORANGE : CYAN;  // ~1 in 7 orange accent
    pColor[i * 3] = c.r; pColor[i * 3 + 1] = c.g; pColor[i * 3 + 2] = c.b;
  }

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(render, 3));
  pointsGeo.setAttribute('color', new THREE.BufferAttribute(pColor, 3));
  const pointsMat = new THREE.PointsMaterial({
    size: 0.5, vertexColors: true, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  scene.add(new THREE.Points(pointsGeo, pointsMat));

  // --- Links (vertex-coloured so they can fade by distance) ---
  const maxVerts = COUNT * COUNT * 2;          // generous upper bound
  const linkPos = new Float32Array(maxVerts * 3);
  const linkCol = new Float32Array(maxVerts * 3);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  linkGeo.setAttribute('color', new THREE.BufferAttribute(linkCol, 3));
  const linkMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 1,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  scene.add(new THREE.LineSegments(linkGeo, linkMat));

  // --- Cursor glow point ---
  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  const glowMat = new THREE.PointsMaterial({
    size: 1.7, color: 0x9af2ff, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const glow = new THREE.Points(glowGeo, glowMat);
  scene.add(glow);

  // --- Pointer ---
  let nmx = 0, nmy = 0;          // mouse in NDC [-1, 1]
  let px = 0, py = 0;            // smoothed parallax
  let pointerActive = false;
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z = 0 plane
  const cursor = new THREE.Vector3(9999, 9999, 9999);          // far away until moved
  const ndc = new THREE.Vector2();

  function onMove(clientX, clientY) {
    nmx = (clientX / window.innerWidth) * 2 - 1;
    nmy = -((clientY / window.innerHeight) * 2 - 1);
    pointerActive = true;
  }
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
  window.addEventListener('mouseout', () => { pointerActive = false; }, { passive: true });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let visible = true, tabActive = true;
  function updateLoop() {
    if (visible && tabActive) renderer.setAnimationLoop(frame);
    else renderer.setAnimationLoop(null);
  }
  document.addEventListener('visibilitychange', () => { tabActive = !document.hidden; updateLoop(); });

  const hero = document.getElementById('hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { visible = e.isIntersecting; updateLoop(); });
    }, { threshold: 0.01 }).observe(hero);
  }

  function frame() {
    // Smooth parallax follows the pointer
    px += (nmx - px) * 0.06;
    py += (nmy - py) * 0.06;
    camera.position.x = px * 7;
    camera.position.y = py * 5;
    camera.lookAt(0, 0, 0);

    // Project the cursor onto the z=0 plane (accurate, accounts for parallax)
    if (pointerActive) {
      ndc.set(nmx, nmy);
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(plane, cursor);
    } else {
      cursor.set(9999, 9999, 9999);
    }
    glowMat.opacity += ((pointerActive ? 0.85 : 0) - glowMat.opacity) * 0.1;
    glow.position.copy(cursor);

    // Update nodes: drift (base) + cursor repulsion spring (disp)
    for (let i = 0; i < COUNT; i++) {
      const x = i * 3, y = x + 1, z = x + 2;

      // drift with soft bounds
      base[x] += bvel[x]; base[y] += bvel[y]; base[z] += bvel[z];
      if (base[x] > SPREAD / 2 || base[x] < -SPREAD / 2) bvel[x] *= -1;
      if (base[y] > SPREAD * 0.29 || base[y] < -SPREAD * 0.29) bvel[y] *= -1;
      if (base[z] > SPREAD * 0.25 || base[z] < -SPREAD * 0.25) bvel[z] *= -1;

      // current rendered position (before this frame's spring step)
      let rx = base[x] + disp[x], ry = base[y] + disp[y], rz = base[z] + disp[z];

      // cursor repulsion
      if (pointerActive) {
        const ddx = rx - cursor.x, ddy = ry - cursor.y, ddz = rz - cursor.z;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
        if (dist < INFLUENCE && dist > 0.001) {
          const f = (1 - dist / INFLUENCE) * 0.6;
          dvel[x] += (ddx / dist) * f;
          dvel[y] += (ddy / dist) * f;
          dvel[z] += (ddz / dist) * f;
        }
      }
      // spring back to base + damping
      dvel[x] += -disp[x] * 0.045; dvel[y] += -disp[y] * 0.045; dvel[z] += -disp[z] * 0.045;
      dvel[x] *= 0.86; dvel[y] *= 0.86; dvel[z] *= 0.86;
      disp[x] += dvel[x]; disp[y] += dvel[y]; disp[z] += dvel[z];

      render[x] = base[x] + disp[x];
      render[y] = base[y] + disp[y];
      render[z] = base[z] + disp[z];
    }
    pointsGeo.attributes.position.needsUpdate = true;

    // Build links (node-to-node, faded by distance)
    let v = 0;
    for (let i = 0; i < COUNT; i++) {
      const ix = render[i * 3], iy = render[i * 3 + 1], iz = render[i * 3 + 2];
      for (let j = i + 1; j < COUNT; j++) {
        const dx = ix - render[j * 3], dy = iy - render[j * 3 + 1], dz = iz - render[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < LINK_DIST) {
          const f = (1 - d / LINK_DIST) * 0.55;
          linkPos[v] = ix; linkPos[v + 1] = iy; linkPos[v + 2] = iz;
          linkCol[v] = LINK_BLUE.r * f; linkCol[v + 1] = LINK_BLUE.g * f; linkCol[v + 2] = LINK_BLUE.b * f;
          v += 3;
          linkPos[v] = render[j * 3]; linkPos[v + 1] = render[j * 3 + 1]; linkPos[v + 2] = render[j * 3 + 2];
          linkCol[v] = LINK_BLUE.r * f; linkCol[v + 1] = LINK_BLUE.g * f; linkCol[v + 2] = LINK_BLUE.b * f;
          v += 3;
        }
      }
      // cursor-to-node links (the constellation reaches toward the pointer)
      if (pointerActive) {
        const dx = ix - cursor.x, dy = iy - cursor.y, dz = iz - cursor.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CURSOR_DIST) {
          const f = (1 - d / CURSOR_DIST) * 0.9;
          linkPos[v] = cursor.x; linkPos[v + 1] = cursor.y; linkPos[v + 2] = cursor.z;
          linkCol[v] = CYAN.r * f; linkCol[v + 1] = CYAN.g * f; linkCol[v + 2] = CYAN.b * f;
          v += 3;
          linkPos[v] = ix; linkPos[v + 1] = iy; linkPos[v + 2] = iz;
          linkCol[v] = CYAN.r * f; linkCol[v + 1] = CYAN.g * f; linkCol[v + 2] = CYAN.b * f;
          v += 3;
        }
      }
    }
    linkGeo.setDrawRange(0, v / 3);
    linkGeo.attributes.position.needsUpdate = true;
    linkGeo.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(frame);
}
