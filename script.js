/* ========================================
   SHAWON AHMED — CYBER PORTFOLIO SCRIPTS
   ======================================== */

// ── MOBILE NAV HAMBURGER ──
function closeDrawer() {
  document.getElementById('mobile-drawer').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
}
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-drawer').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('active');
});

// ── CUSTOM CURSOR ──
const cur = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .skill-card, .tool-item, .t-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform   = 'translate(-50%,-50%) scale(2.2)';
    cur.style.borderColor = '#ff4ecd';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform   = 'translate(-50%,-50%) scale(1)';
    cur.style.borderColor = 'var(--blue)';
  });
});

// ── DEEP SPACE + NEBULA BACKGROUND ──
(function () {
  const c   = document.getElementById('bg-canvas');
  const ctx = c.getContext('2d');

  function resize() {
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    draw();
  }

  function draw() {
    // Deep space gradient
    const g = ctx.createRadialGradient(
      c.width * 0.35, c.height * 0.4, 0,
      c.width * 0.5,  c.height * 0.5, c.width * 0.9
    );
    g.addColorStop(0,   '#001535');
    g.addColorStop(0.3, '#000a20');
    g.addColorStop(0.6, '#00050f');
    g.addColorStop(1,   '#000205');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);

    // Nebula 1 — blue
    const n1 = ctx.createRadialGradient(
      c.width * 0.2, c.height * 0.3, 0,
      c.width * 0.2, c.height * 0.3, c.width * 0.4
    );
    n1.addColorStop(0,   'rgba(0,80,220,0.14)');
    n1.addColorStop(0.5, 'rgba(40,10,180,0.07)');
    n1.addColorStop(1,   'transparent');
    ctx.fillStyle = n1;
    ctx.fillRect(0, 0, c.width, c.height);

    // Nebula 2 — purple
    const n2 = ctx.createRadialGradient(
      c.width * 0.78, c.height * 0.55, 0,
      c.width * 0.78, c.height * 0.55, c.width * 0.32
    );
    n2.addColorStop(0,   'rgba(100,0,220,0.12)');
    n2.addColorStop(0.5, 'rgba(0,80,200,0.06)');
    n2.addColorStop(1,   'transparent');
    ctx.fillStyle = n2;
    ctx.fillRect(0, 0, c.width, c.height);

    // Nebula 3 — cyan at bottom
    const n3 = ctx.createRadialGradient(
      c.width * 0.5, c.height * 0.9, 0,
      c.width * 0.5, c.height * 0.9, c.width * 0.35
    );
    n3.addColorStop(0, 'rgba(0,150,220,0.09)');
    n3.addColorStop(1, 'transparent');
    ctx.fillStyle = n3;
    ctx.fillRect(0, 0, c.width, c.height);

    // ── SPIDER-MAN WEB PATTERN ──
    // Radial web: multiple anchor points across the screen,
    // each shoots out spokes, connected by concentric arcs.
    const webAnchors = [
      { x: c.width * 0.18, y: c.height * 0.12 },
      { x: c.width * 0.72, y: c.height * 0.08 },
      { x: c.width * 0.05, y: c.height * 0.55 },
      { x: c.width * 0.92, y: c.height * 0.42 },
      { x: c.width * 0.38, y: c.height * 0.88 },
      { x: c.width * 0.82, y: c.height * 0.78 },
    ];

    webAnchors.forEach(anchor => {
      const spokeCount = 12;
      const ringCount  = 7;
      const maxRadius  = Math.min(c.width, c.height) * 0.28;

      // Draw spokes
      for (let s = 0; s < spokeCount; s++) {
        const angle = (s / spokeCount) * Math.PI * 2;
        const ex    = anchor.x + Math.cos(angle) * maxRadius;
        const ey    = anchor.y + Math.sin(angle) * maxRadius;

        const grad = ctx.createLinearGradient(anchor.x, anchor.y, ex, ey);
        grad.addColorStop(0,   'rgba(0,180,255,0.25)');
        grad.addColorStop(0.5, 'rgba(0,150,220,0.12)');
        grad.addColorStop(1,   'rgba(0,100,180,0.0)');

        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      // Draw concentric web rings between spokes
      for (let r = 1; r <= ringCount; r++) {
        const radius = (r / ringCount) * maxRadius;
        const alpha  = 0.18 - r * 0.018;

        ctx.beginPath();
        for (let s = 0; s <= spokeCount; s++) {
          const angle = (s / spokeCount) * Math.PI * 2;
          const px    = anchor.x + Math.cos(angle) * radius;
          const py    = anchor.y + Math.sin(angle) * radius;

          // Spider-Man web uses straight segments between spoke points,
          // not smooth arcs — gives that classic angular web look
          const prevAngle = ((s - 1) / spokeCount) * Math.PI * 2;
          const ppx = anchor.x + Math.cos(prevAngle) * radius;
          const ppy = anchor.y + Math.sin(prevAngle) * radius;

          if (s === 0) {
            ctx.moveTo(px, py);
          } else {
            // Midpoint for very slight curve (Spider-Man web is slightly curved)
            const midAngle = ((s - 0.5) / spokeCount) * Math.PI * 2;
            const cr       = radius * 1.04;
            const cpx      = anchor.x + Math.cos(midAngle) * cr;
            const cpy      = anchor.y + Math.sin(midAngle) * cr;
            ctx.quadraticCurveTo(cpx, cpy, px, py);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,170,255,${Math.max(0, alpha)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }

      // Glowing center node
      const nodeGrad = ctx.createRadialGradient(anchor.x, anchor.y, 0, anchor.x, anchor.y, 4);
      nodeGrad.addColorStop(0, 'rgba(0,220,255,0.7)');
      nodeGrad.addColorStop(1, 'rgba(0,120,220,0)');
      ctx.beginPath();
      ctx.arc(anchor.x, anchor.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = nodeGrad;
      ctx.fill();
    });

    // ── CONNECTING THREADS between anchor points ──
    // Long diagonal silk lines linking the webs together
    const threadPairs = [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4], [0, 3]
    ];
    threadPairs.forEach(([a, b]) => {
      const ax = webAnchors[a].x, ay = webAnchors[a].y;
      const bx = webAnchors[b].x, by = webAnchors[b].y;
      // Slight sag in thread (gravity effect)
      const mx  = (ax + bx) / 2;
      const my  = (ay + by) / 2 + Math.hypot(bx - ax, by - ay) * 0.08;
      const grd = ctx.createLinearGradient(ax, ay, bx, by);
      grd.addColorStop(0,   'rgba(0,180,255,0.0)');
      grd.addColorStop(0.3, 'rgba(0,180,255,0.14)');
      grd.addColorStop(0.7, 'rgba(0,180,255,0.14)');
      grd.addColorStop(1,   'rgba(0,180,255,0.0)');
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(mx, my, bx, by);
      ctx.strokeStyle = grd;
      ctx.lineWidth   = 0.55;
      ctx.stroke();
    });
  }

  resize();
  window.addEventListener('resize', resize);
})();

// ── FLOATING PARTICLE NETWORK ──
(function () {
  const c   = document.getElementById('particle-canvas');
  const ctx = c.getContext('2d');

  function resize() {
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const N   = 60;
  const pts = Array.from({ length: N }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    vx:    (Math.random() - 0.5) * 0.4,
    vy:    (Math.random() - 0.5) * 0.4,
    r:     Math.random() * 1.6 + 0.4,
    pulse: Math.random() * Math.PI * 2,
    color: Math.random() > 0.55 ? '0,180,255' : '123,92,255'
  }));

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    // Connections between nearby particles
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 145) {
          ctx.strokeStyle = `rgba(0,120,230,${(1 - d / 145) * 0.16})`;
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // Particles
    pts.forEach(p => {
      p.pulse += 0.018;
      const a = 0.3 + 0.35 * Math.sin(p.pulse);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${a})`;
      ctx.fill();
      // Soft glow halo on larger particles
      if (p.r > 1.4) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${a * 0.15})`;
        ctx.fill();
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > c.width)  p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── TYPEWRITER ──
(function () {
  const el     = document.getElementById('typed-title');
  const titles = [
    'ETHICAL HACKER',
    'PENETRATION TESTER',
    'CTF COMPETITOR',
    'VULNERABILITY RESEARCHER',
    'SECURITY ANALYST'
  ];
  let ti = 0, ci = 0, del = false;

  function type() {
    const current = titles[ti];
    if (!del) {
      el.innerHTML = current.slice(0, ci + 1) + '<span class="cursor-blink"></span>';
      ci++;
      if (ci === current.length) { del = true; setTimeout(type, 1800); return; }
      setTimeout(type, 80);
    } else {
      el.innerHTML = current.slice(0, ci - 1) + '<span class="cursor-blink"></span>';
      ci--;
      if (ci === 0) { del = false; ti = (ti + 1) % titles.length; setTimeout(type, 300); return; }
      setTimeout(type, 40);
    }
  }
  setTimeout(type, 600);
})();

// ── ANIMATED TERMINAL ──
(function () {
  const out   = document.getElementById('terminal-output');
  const lines = [
    { html: '<span class="t-prompt">┌──(shawon㉿kali)-[~]</span>' },
    { html: '<span class="t-prompt">└─$ </span><span class="t-cmd">whoami</span>' },
    { html: '<span class="t-out blue">shawon // ethical_hacker</span>' },
    { html: '' },
    { html: '<span class="t-prompt">└─$ </span><span class="t-cmd">cat mission.txt</span>' },
    { html: '<span class="t-out">Break things ethically.</span>' },
    { html: '<span class="t-out">Fix them permanently.</span>' },
    { html: '' },
    { html: '<span class="t-prompt">└─$ </span><span class="t-cmd">nmap -sV target.local</span>' },
    { html: '<span class="t-out cyan">Scanning 192.168.1.0/24...</span>' },
    { html: '<span class="t-out">PORT    STATE  SERVICE   VERSION</span>' },
    { html: '<span class="t-out">22/tcp  open   ssh       OpenSSH 8.9</span>' },
    { html: '<span class="t-out red">80/tcp  open   http      Apache 2.4.41</span>' },
    { html: '<span class="t-out yellow">443/tcp open   https     nginx 1.18.0</span>' },
    { html: '' },
    { html: '<span class="t-prompt">└─$ </span><span class="t-cmd">_</span>' },
  ];
  let i = 0;

  function addLine() {
    if (i >= lines.length) return;
    const d     = document.createElement('div');
    d.className = 't-line';
    d.innerHTML = lines[i].html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
    i++;
    setTimeout(addLine, 110 + Math.random() * 130);
  }
  setTimeout(addLine, 900);
})();

// ── BUILD SKILLS GRID ──
const skillsData = [
  { icon: '🔍', name: 'Penetration Testing', desc: 'Full-stack pentesting across network, web, and mobile attack surfaces.', pct: 88 },
  { icon: '🌐', name: 'Web App Security',    desc: 'OWASP Top 10, API exploitation, injection attacks, auth bypass.',        pct: 91 },
  { icon: '🔒', name: 'Network Security',    desc: 'Traffic analysis, firewall evasion, MITM, wireless attacks.',            pct: 80 },
  { icon: '🧬', name: 'Malware Analysis',    desc: 'Static/dynamic analysis, reverse engineering, sandbox detonation.',      pct: 72 },
  { icon: '🐍', name: 'Python / Scripting',  desc: 'Custom exploit tools, automation scripts, offensive tooling.',           pct: 87 },
  { icon: '🗺️', name: 'OSINT & Recon',       desc: 'Passive intel gathering, social engineering, footprinting.',            pct: 84 },
];

const sg = document.getElementById('skills-grid');
skillsData.forEach((s, idx) => {
  const delay = idx + 1;
  sg.innerHTML += `
    <div class="skill-card reveal reveal-delay-${delay}">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <p class="skill-desc">${s.desc}</p>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-pct="${s.pct}"></div>
      </div>
      <div class="skill-pct">${s.pct}% PROFICIENCY</div>
    </div>`;
});

// ── BUILD TOOLS GRID ──
const tools = [
  { e: '🛡️', n: 'Kali Linux'     }, { e: '🔬', n: 'BurpSuite'      }, { e: '🗺️', n: 'Nmap'          },
  { e: '🕸️', n: 'Wireshark'      }, { e: '💉', n: 'SQLMap'          }, { e: '🔑', n: 'Metasploit'     },
  { e: '🧱', n: 'Hashcat'        }, { e: '📡', n: 'Aircrack-ng'     }, { e: '🔎', n: 'Gobuster'       },
  { e: '🧨', n: 'Exploit-DB'     }, { e: '🐉', n: 'Hydra'           }, { e: '📦', n: 'John The Ripper' },
  { e: '🕵️', n: 'OSINT Fwk'      }, { e: '🌩️', n: 'Shodan'          }, { e: '🔧', n: 'Ghidra'         },
  { e: '🐍', n: 'Python'         }, { e: '⚡', n: 'Bash/Zsh'        }, { e: '📋', n: 'Nuclei'         },
];

const tg = document.getElementById('tools-grid');
tools.forEach((t, idx) => {
  const delay = Math.min(idx + 1, 6);
  tg.innerHTML += `
    <div class="tool-item reveal reveal-delay-${delay}">
      <span class="ti">${t.e}</span>
      <div class="tool-name">${t.n}</div>
    </div>`;
});

// ── COUNT-UP ANIMATION ──
function countUp() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let current  = 0;
    const step   = Math.max(1, Math.floor(target / 40));
    const id     = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (target >= 100 ? '+' : '');
      if (current >= target) clearInterval(id);
    }, 30);
  });
}

// ── INTERSECTION OBSERVER — scroll fade + skill bars + count-up ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    // Trigger count-up for stats bar (only on enter)
    if (entry.isIntersecting && entry.target.classList.contains('stats-bar')) {
      countUp();
    }

    // Animate skill bars when #skills enters view; reset when leaving
    if (entry.target.id === 'skills') {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = entry.isIntersecting ? bar.dataset.pct + '%' : '0%';
        bar.style.transition = entry.isIntersecting
          ? 'width 1.2s cubic-bezier(.2,.8,.3,1)'
          : 'none';
      });
    }

    // Fade-in / fade-out for .reveal elements — triggers every scroll
    if (entry.target.classList.contains('reveal')) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    }
  });
}, { threshold: 0.12 });

// Observe stats bar
document.querySelectorAll('.stats-bar').forEach(el => observer.observe(el));

// Observe the skills section (to trigger bar animations)
const skillsSection = document.getElementById('skills');
if (skillsSection) observer.observe(skillsSection);

// Observe all .reveal elements (cards, items, headers)
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Make section headers fade in too
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ============================================================
   SPIDER ANIMATIONS — HERO SECTION ONLY
   ============================================================ */

(function () {

  // ── Shared helpers ──────────────────────────────────────────

  const heroEl = document.getElementById('hero');

  // Draw a spider matching the reference image silhouette:
  // compact rounded body, 8 long splayed legs fanning wide (4 up, 4 down),
  // tapered to fine points. Keeps the same blue color palette.
  function drawSpider(ctx, cx, cy, angle, size, bodyColor, legColor, eyeColor) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const s = size;

    // ── 8 LEGS — matching the photo: 4 fan upward-outward, 4 fan downward-outward ──
    // Each leg: thick at shoulder, tapers to a sharp tip (drawn as tapering stroke via lineWidth change)
    // Template: [shoulderX, shoulderY, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, tipX, tipY]
    const legs = [
      // ── LEFT side, top 4 (fan upward) ──
      [-s*0.35, -s*0.1,   -s*1.1, -s*1.2,  -s*1.9, -s*1.6,   -s*2.4, -s*1.0],  // L1 — far upper-left
      [-s*0.35, -s*0.05,  -s*1.0, -s*0.5,  -s*1.8, -s*0.5,   -s*2.6,  s*0.1],  // L2 — mid-upper-left
      [-s*0.35,  s*0.1,   -s*1.0,  s*0.5,  -s*1.8,  s*0.8,   -s*2.4,  s*1.4],  // L3 — mid-lower-left
      [-s*0.30,  s*0.25,  -s*0.9,  s*1.3,  -s*1.3,  s*2.0,   -s*1.6,  s*2.8],  // L4 — far lower-left
      // ── RIGHT side, top 4 (mirror) ──
      [ s*0.35, -s*0.1,    s*1.1, -s*1.2,   s*1.9, -s*1.6,    s*2.4, -s*1.0],  // R1
      [ s*0.35, -s*0.05,   s*1.0, -s*0.5,   s*1.8, -s*0.5,    s*2.6,  s*0.1],  // R2
      [ s*0.35,  s*0.1,    s*1.0,  s*0.5,   s*1.8,  s*0.8,    s*2.4,  s*1.4],  // R3
      [ s*0.30,  s*0.25,   s*0.9,  s*1.3,   s*1.3,  s*2.0,    s*1.6,  s*2.8],  // R4
    ];

    legs.forEach(([sx, sy, c1x, c1y, c2x, c2y, tx, ty]) => {
      // Draw leg as a filled tapered shape: thick at shoulder, pointed at tip
      const perp = Math.atan2(ty - sy, tx - sx) + Math.PI / 2;
      const w = s * 0.13; // shoulder half-width

      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(perp) * w, sy + Math.sin(perp) * w);
      ctx.bezierCurveTo(c1x + Math.cos(perp)*w*0.5, c1y + Math.sin(perp)*w*0.5,
                        c2x + Math.cos(perp)*w*0.15, c2y + Math.sin(perp)*w*0.15,
                        tx, ty);
      ctx.bezierCurveTo(c2x - Math.cos(perp)*w*0.15, c2y - Math.sin(perp)*w*0.15,
                        c1x - Math.cos(perp)*w*0.5,  c1y - Math.sin(perp)*w*0.5,
                        sx - Math.cos(perp) * w, sy - Math.sin(perp) * w);
      ctx.closePath();
      ctx.fillStyle   = legColor;
      ctx.shadowColor = bodyColor;
      ctx.shadowBlur  = s * 0.5;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    // ── ABDOMEN (large teardrop, below body center — matching the reference) ──
    ctx.save();
    ctx.translate(0, s * 1.05);
    ctx.scale(0.82, 1.2);
    const abdGrad = ctx.createRadialGradient(-s*0.1, -s*0.2, s*0.05, 0, 0, s*0.75);
    abdGrad.addColorStop(0, 'rgba(100,180,255,0.28)');
    abdGrad.addColorStop(1, bodyColor);
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.78, 0, Math.PI * 2);
    ctx.fillStyle   = abdGrad;
    ctx.shadowColor = bodyColor;
    ctx.shadowBlur  = s * 1.4;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // ── CEPHALOTHORAX (compact pentagon-ish front body — matching reference) ──
    ctx.save();
    ctx.translate(0, -s * 0.1);
    const cGrad = ctx.createRadialGradient(-s*0.08, -s*0.12, s*0.03, 0, 0, s*0.48);
    cGrad.addColorStop(0, 'rgba(140,215,255,0.35)');
    cGrad.addColorStop(1, bodyColor);
    // Draw as a slightly pointed-top pentagon to match reference
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.52);              // top point
    ctx.bezierCurveTo( s*0.38, -s*0.4,  s*0.52,  s*0.1,  s*0.32, s*0.5);
    ctx.bezierCurveTo( s*0.1,   s*0.7, -s*0.1,   s*0.7, -s*0.32, s*0.5);
    ctx.bezierCurveTo(-s*0.52,  s*0.1, -s*0.38, -s*0.4,  0,      -s*0.52);
    ctx.closePath();
    ctx.fillStyle   = cGrad;
    ctx.shadowColor = bodyColor;
    ctx.shadowBlur  = s * 0.9;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // ── EYES — 2 small bright dots on front of cephalothorax ──
    ctx.fillStyle   = eyeColor;
    ctx.shadowColor = eyeColor;
    ctx.shadowBlur  = s * 0.7;
    [[-s*0.13, -s*0.32], [s*0.13, -s*0.32]].forEach(([ex, ey]) => {
      ctx.beginPath();
      ctx.arc(ex, ey, s * 0.075, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // ── PEDIPALPS (small front feelers — visible in reference image) ──
    ctx.strokeStyle = legColor;
    ctx.lineWidth   = s * 0.07;
    ctx.lineCap     = 'round';
    ctx.beginPath(); ctx.moveTo(-s*0.18, -s*0.48); ctx.quadraticCurveTo(-s*0.35, -s*0.72, -s*0.22, -s*0.88); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( s*0.18, -s*0.48); ctx.quadraticCurveTo( s*0.35, -s*0.72,  s*0.22, -s*0.88); ctx.stroke();

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════
  //  1. CURSOR-FOLLOWING SPIDER  (entire page)
  // ══════════════════════════════════════════════════════════
  (function () {
    const canvas = document.getElementById('spider-cursor-canvas');
    const ctx    = canvas.getContext('2d');

    // Mouse position in viewport coordinates
    let mouseX = -300, mouseY = -300;
    let spiderX = -300, spiderY = -300;
    const trail = [];
    const MAX_TRAIL = 28;
    let legPhase = 0;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse across the whole document
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function drawWebThread(ctx) {
      if (trail.length < 2) return;
      ctx.save();
      ctx.strokeStyle = 'rgba(100,200,255,0.25)';
      ctx.lineWidth   = 0.8;
      ctx.shadowColor = 'rgba(0,180,255,0.3)';
      ctx.shadowBlur  = 3;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        const mx = (trail[i-1].x + trail[i].x) / 2;
        const my = (trail[i-1].y + trail[i].y) / 2;
        ctx.quadraticCurveTo(trail[i-1].x, trail[i-1].y, mx, my);
      }
      ctx.stroke();
      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      spiderX += (mouseX - spiderX) * 0.1;
      spiderY += (mouseY - spiderY) * 0.1;

      // Update trail
      trail.push({ x: spiderX, y: spiderY });
      if (trail.length > MAX_TRAIL) trail.shift();

      // Draw silk thread
      drawWebThread(ctx);

      // Direction angle
      const dx    = mouseX - spiderX;
      const dy    = mouseY - spiderY;
      const angle = Math.atan2(dy, dx) + Math.PI / 2;

      legPhase += 0.12;

      // Draw cursor spider — size 14
      drawSpider(ctx, spiderX, spiderY, angle, 14,
        '#003a5c',
        'rgba(0,180,255,0.9)',
        '#00f0ff'
      );

      requestAnimationFrame(loop);
    }
    loop();
  })();

  // ══════════════════════════════════════════════════════════
  //  2. VERTICAL WEB + CLIMBING SPIDER (right side of hero)
  // ══════════════════════════════════════════════════════════
  (function () {
    const canvas = document.getElementById('spider-web-canvas');
    const ctx    = canvas.getContext('2d');

    let W = 400, H = heroEl.offsetHeight || window.innerHeight;
    let climbY  = 60;
    let climbDir = 1;
    const SPEED = 0.8;
    // 2.5 inches ≈ 240px from the right edge → SPIDER_X = canvas width - 240 - small offset
    // Canvas is 400px wide, so spider sits at 400 - 240 = 160px from left (= 240px from right)
    const SPIDER_X = 160;

    function resize() {
      W = 400;
      H = heroEl.offsetHeight || window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Web structure ──────────────────────────────────────
    // The vertical "main line" runs down the center of the canvas.
    // Horizontal rungs cross it at intervals.
    // A few diagonal braces add structure.

    function drawWeb(ctx, W, H, spiderY) {
      const cx     = SPIDER_X;   // vertical line x
      const TOP    = 30;
      const BOTTOM = H - 30;

      ctx.save();
      ctx.strokeStyle = 'rgba(100,200,255,0.22)';
      ctx.lineWidth   = 0.7;
      ctx.shadowColor = 'rgba(0,180,255,0.18)';
      ctx.shadowBlur  = 4;

      // Main vertical silk thread
      ctx.beginPath();
      ctx.moveTo(cx, TOP);
      ctx.lineTo(cx, BOTTOM);
      ctx.stroke();

      // Horizontal rungs at regular intervals
      const RUNG_SPACING = 38;
      const NUM_RUNGS = Math.floor((BOTTOM - TOP) / RUNG_SPACING);
      for (let i = 0; i <= NUM_RUNGS; i++) {
        const ry  = TOP + i * RUNG_SPACING;
        // Rungs get slightly wider toward the middle
        const hw  = 28 + Math.sin((i / NUM_RUNGS) * Math.PI) * 30;

        ctx.strokeStyle = 'rgba(100,200,255,0.18)';
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(cx - hw, ry);
        ctx.lineTo(cx + hw, ry);
        ctx.stroke();

        // Diagonal braces from rung to next rung (zigzag)
        if (i < NUM_RUNGS) {
          const ny = TOP + (i + 1) * RUNG_SPACING;
          const nhw = 28 + Math.sin(((i+1) / NUM_RUNGS) * Math.PI) * 30;
          ctx.strokeStyle = 'rgba(100,200,255,0.10)';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(cx - hw,  ry);
          ctx.lineTo(cx + nhw, ny);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx + hw,  ry);
          ctx.lineTo(cx - nhw, ny);
          ctx.stroke();
        }
      }

      // Silk drop from top anchor to canvas top edge
      ctx.strokeStyle = 'rgba(100,200,255,0.35)';
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, TOP);
      ctx.stroke();

      // Spider's current silk thread (from spider down to bottom anchor)
      ctx.strokeStyle = 'rgba(150,220,255,0.3)';
      ctx.lineWidth   = 0.8;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, spiderY);
      ctx.lineTo(cx, BOTTOM);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }

    // ── Dew drops on web ──────────────────────────────────
    // Pre-generate fixed dew drop positions
    const dewDrops = [];
    for (let i = 0; i < 18; i++) {
      const rung = Math.floor(Math.random() * 12);
      const side = Math.random() > 0.5 ? 1 : -1;
      const hw   = 28 + Math.sin((rung / 12) * Math.PI) * 30;
      dewDrops.push({
        x: SPIDER_X + side * (Math.random() * hw),
        y: 30 + rung * 38 + Math.random() * 20,
        r: 1.2 + Math.random() * 1.4,
      });
    }

    function drawDewDrops(ctx) {
      dewDrops.forEach(d => {
        const g = ctx.createRadialGradient(d.x - d.r*0.3, d.y - d.r*0.3, 0.2, d.x, d.y, d.r);
        g.addColorStop(0, 'rgba(200,240,255,0.9)');
        g.addColorStop(1, 'rgba(0,150,220,0.3)');
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
    }

    // ── Silk thread the web spider is on ──────────────────
    function drawSpiderThread(ctx, spiderY) {
      ctx.save();
      ctx.strokeStyle = 'rgba(180,230,255,0.45)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(SPIDER_X, 30);
      ctx.lineTo(SPIDER_X, spiderY);
      ctx.stroke();
      ctx.restore();
    }

    // ── Main animation loop ───────────────────────────────
    function loop() {
      ctx.clearRect(0, 0, W, H);

      // Move spider
      climbY += SPEED * climbDir;
      if (climbY > H - 80) climbDir = -1;
      if (climbY < 80)     climbDir =  1;

      // Draw web structure
      drawWeb(ctx, W, H, climbY);

      // Dew drops
      drawDewDrops(ctx);

      // Silk from top to spider
      drawSpiderThread(ctx, climbY);

      // Draw climbing spider using drawSpider() — size 33, blue theme
      // Head faces down when descending (angle=0), up when ascending (angle=π)
      const angle = climbDir === 1 ? 0 : Math.PI;
      drawSpider(ctx, SPIDER_X, climbY, angle, 33,
        '#002244',
        'rgba(0,180,255,0.85)',
        '#00efff'
      );

      requestAnimationFrame(loop);
    }
    loop();
  })();

})(); // end spider IIFE
