"use client";

import { useEffect, useRef } from "react";

/**
 * HeroConstellation — the "living memory constellation" behind the hero.
 *
 * A full-size <canvas> that fills its positioned parent. Draws:
 *  - an ambient starfield (slow drift + twinkle) with faint constellation lines
 *  - a central "memory core" (gently pulsing) connected by flowing particles to
 *    one node per AI, each labelled — visualising "every AI, one memory"
 *  - subtle depth parallax that eases toward the pointer (front layer moves more)
 *
 * All motion is JS/rAF driven. Honours prefers-reduced-motion (freezes drift,
 * twinkle, pulse and parallax; the scene still renders statically).
 *
 * The parent MUST be `position: relative` (or any positioned context).
 * Usage:
 *   <section className="relative">
 *     <HeroConstellation className="absolute inset-0 z-0" />
 *     <div className="relative z-10"> ...hero copy... </div>
 *   </section>
 */
export function HeroConstellation({
  ais = ["Claude", "ChatGPT", "Grok", "Gemini", "Codex"],
  className = "",
}: {
  ais?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const SPECTRUM = ["#8B6BFF", "#6E8BFF", "#5B8DEF", "#3FB8F0", "#48D7FF"];
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hexA = (h: string, a: number) => {
      const n = parseInt(h.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };
    const qd = (a: number, b: number, c: number, t: number) => {
      const m = 1 - t;
      return m * m * a + 2 * m * t * b + t * t * c;
    };

    // Resolve the self-hosted Pretendard family (next/font emits an obfuscated
    // family name into --font-pretendard); fall back to the literal name. Read
    // once — getComputedStyle in the draw loop would thrash layout.
    const labelFont = (() => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-pretendard")
        .trim();
      return `600 12.5px ${v || '"Pretendard Variable"'}, system-ui, sans-serif`;
    })();

    let W = 0;
    let H = 0;
    let raf = 0;
    let stars: {
      x: number; y: number; r: number; tw: number; tws: number;
      vx: number; vy: number; c: string;
    }[] = [];
    let core: { x: number; y: number } | null = null;
    let nodes: { name: string; x: number; y: number; bob: number; c: string }[] = [];
    const N = 78;
    const LINK = 128;

    // eased parallax offset (target set by pointer)
    let ptx = 0, pty = 0, pcx = 0, pcy = 0;

    const build = () => {
      const rect = cv.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W < 4 || H < 4) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = [];
      for (let i = 0; i < N; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.3 + 0.5,
          tw: Math.random() * 6.28,
          tws: Math.random() * 0.7 + 0.3,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          c: SPECTRUM[(Math.random() * SPECTRUM.length) | 0],
        });
      }
      const k = ais.length;
      core = { x: W * 0.5, y: H * 0.85 };
      const R = Math.min(W * 0.42, 340);
      nodes = ais.map((name, i) => {
        const a = -Math.PI / 2 + (i - (k - 1) / 2) * (Math.PI / (k - 0.2));
        return {
          name,
          x: core!.x + Math.cos(a) * R,
          y: core!.y + Math.sin(a) * R * 0.32,
          bob: Math.random() * 6.28,
          c: SPECTRUM[i % SPECTRUM.length],
        };
      });
      return true;
    };

    const draw = (now: number) => {
      const tms = now / 1000;
      ctx.clearRect(0, 0, W, H);
      pcx += ((ptx - pcx) * 0.06);
      pcy += ((pty - pcy) * 0.06);
      const ox = reduce ? 0 : pcx;
      const oy = reduce ? 0 : pcy;

      // ── back layer: ambient starfield ──
      ctx.save();
      ctx.translate(ox, oy);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = stars[i], b = stars[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const al = (1 - Math.sqrt(d2) / LINK) * 0.1;
            ctx.strokeStyle = `rgba(120,150,225,${al})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx; s.y += s.vy;
          if (s.x < 0) s.x += W; else if (s.x > W) s.x -= W;
          if (s.y < 0) s.y += H; else if (s.y > H) s.y -= H;
        }
        ctx.globalAlpha = (reduce ? 0.7 : 0.5 + 0.5 * Math.sin(tms * s.tws + s.tw)) * 0.9;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── front layer: memory core + AI nodes (parallax 0.45×) ──
      ctx.save();
      ctx.translate(ox * 0.45, oy * 0.45);
      if (core) {
        const pulse = reduce ? 1 : 1 + 0.07 * Math.sin(tms * 1.2);
        for (const nd of nodes) {
          const ny = reduce ? nd.y : nd.y + Math.sin(tms * 0.55 + nd.bob) * 4;
          const mx = (core.x + nd.x) / 2, my = (core.y + ny) / 2 - 20;
          const g = ctx.createLinearGradient(core.x, core.y, nd.x, ny);
          g.addColorStop(0, "rgba(234,239,255,0.45)");
          g.addColorStop(1, hexA(nd.c, 0.12));
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(core.x, core.y);
          ctx.quadraticCurveTo(mx, my, nd.x, ny);
          ctx.stroke();
          if (!reduce) {
            const tt = (tms * 0.22 + nd.bob / 6.28) % 1;
            ctx.fillStyle = "rgba(234,239,255,0.9)";
            ctx.beginPath();
            ctx.arc(qd(core.x, mx, nd.x, tt), qd(core.y, my, ny, tt), 1.7, 0, 6.2832);
            ctx.fill();
          }
        }
        for (const nd of nodes) {
          const ny = reduce ? nd.y : nd.y + Math.sin(tms * 0.55 + nd.bob) * 4;
          ctx.fillStyle = hexA(nd.c, 0.16);
          ctx.beginPath();
          ctx.arc(nd.x, ny, 15, 0, 6.2832);
          ctx.fill();
          ctx.fillStyle = nd.c;
          ctx.beginPath();
          ctx.arc(nd.x, ny, 4.5, 0, 6.2832);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.beginPath();
          ctx.arc(nd.x - 1.3, ny - 1.4, 1.6, 0, 6.2832);
          ctx.fill();
          ctx.font = labelFont;
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(214,222,245,0.94)";
          ctx.fillText(nd.name, nd.x, ny + 28);
        }
        const cr = 26 * pulse;
        const rg = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, cr * 2.6);
        rg.addColorStop(0, "rgba(234,239,255,0.95)");
        rg.addColorStop(0.4, "rgba(91,141,239,0.45)");
        rg.addColorStop(1, "rgba(91,141,239,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(core.x, core.y, cr * 2.6, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = "#EAEFFF";
        ctx.beginPath();
        ctx.arc(core.x, core.y, 7 * pulse, 0, 6.2832);
        ctx.fill();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (build()) raf = requestAnimationFrame(draw);
      else raf = requestAnimationFrame(start);
    };

    const onResize = () => start();
    const onMove = (e: PointerEvent) => {
      const rr = cv.getBoundingClientRect();
      ptx = -(((e.clientX - rr.left) / rr.width) - 0.5) * 32;
      pty = -(((e.clientY - rr.top) / rr.height) - 0.5) * 24;
    };
    const onLeave = () => { ptx = 0; pty = 0; };

    start();
    window.addEventListener("resize", onResize);
    const parent = cv.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, [ais]);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
