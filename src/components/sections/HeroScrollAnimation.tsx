import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles, FileText, Mic } from 'lucide-react';
import { SmartToy } from '../icons/StitchIcons';

const TOTAL_FRAMES = 300;

function getFramePath(index: number): string {
  const frameNum = String(Math.max(1, Math.min(TOTAL_FRAMES, index + 1))).padStart(3, '0');
  return `/images/herosection/ezgif-2f19bf63589c8dd0-png-split/ezgif-frame-${frameNum}.png`;
}

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store GPU-ready ImageBitmaps instead of HTMLImageElements
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Cache canvas context once
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  const targetFrameRef = useRef(0);
  const displayedFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const lastSizeRef = useRef({ w: 0, h: 0 });

  // ─── Draw a single ImageBitmap frame ───────────────────────────────────────
  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialise context once
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Find nearest loaded bitmap
    let bmp = bitmapsRef.current[frameIdx];
    if (!bmp) {
      for (let off = 1; off < 30; off++) {
        const prev = bitmapsRef.current[Math.max(0, frameIdx - off)];
        if (prev) { bmp = prev; break; }
        const next = bitmapsRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + off)];
        if (next) { bmp = next; break; }
      }
    }
    if (!bmp) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dw = canvas.clientWidth;
    const dh = canvas.clientHeight;

    // Resize canvas backing store only when display size changes
    if (lastSizeRef.current.w !== dw || lastSizeRef.current.h !== dh) {
      canvas.width = dw * dpr;
      canvas.height = dh * dpr;
      lastSizeRef.current = { w: dw, h: dh };
    }

    const cw = canvas.width;
    const ch = canvas.height;

    // Object-contain fit (no padding — fill the full canvas area)
    const bmpRatio = bmp.width / bmp.height;
    const canvasRatio = cw / ch;

    let rw: number, rh: number;
    if (canvasRatio > bmpRatio) {
      rh = ch;
      rw = ch * bmpRatio;
    } else {
      rw = cw;
      rh = cw / bmpRatio;
    }

    const ox = (cw - rw) / 2;
    const oy = (ch - rh) / 2;

    ctx.drawImage(bmp, ox, oy, rw, rh);
  };

  // ─── Preload all frames as ImageBitmaps ────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    // Load priority: first 30 frames immediately, then rest in parallel batches
    const loadBitmap = async (idx: number) => {
      if (cancelled || bitmapsRef.current[idx]) return;
      try {
        const resp = await fetch(getFramePath(idx));
        if (cancelled) return;
        const blob = await resp.blob();
        if (cancelled) return;
        const bmp = await createImageBitmap(blob);
        if (cancelled) { bmp.close(); return; }
        bitmapsRef.current[idx] = bmp;
        loaded++;
        setLoadedCount(loaded);

        // Draw first available frame immediately
        if (idx === 0 || displayedFrameRef.current < 0) {
          displayedFrameRef.current = 0;
          drawFrame(0);
        }
      } catch {
        // ignore individual failures
      }
    };

    // Build prioritised load queue: first 40 → every 5th frame → rest
    const priorityFirst = Array.from({ length: 40 }, (_, i) => i);
    const keyFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i)
      .filter(i => i >= 40 && i % 5 === 0);
    const remaining = Array.from({ length: TOTAL_FRAMES }, (_, i) => i)
      .filter(i => i >= 40 && i % 5 !== 0);
    const queue = [...priorityFirst, ...keyFrames, ...remaining];

    // Fire off parallel fetches with a concurrency limit of 20
    const CONCURRENCY = 20;
    let qIdx = 0;

    const runWorker = async () => {
      while (!cancelled && qIdx < queue.length) {
        const idx = queue[qIdx++];
        await loadBitmap(idx);
      }
    };

    // Start N parallel workers
    const workers = Array.from({ length: CONCURRENCY }, () => runWorker());
    Promise.all(workers).catch(() => {});

    return () => {
      cancelled = true;
      // Close all bitmaps on unmount to free GPU memory
      bitmapsRef.current.forEach(b => b?.close());
      bitmapsRef.current = new Array(TOTAL_FRAMES).fill(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Scroll handler + rAF render loop ─────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = window.scrollY - container.offsetTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      setScrollProgress(progress);
      targetFrameRef.current = Math.round(progress * (TOTAL_FRAMES - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // rAF loop: jump directly to target — no lerp lag at end
    let lastFrame = -1;
    const tick = () => {
      const target = targetFrameRef.current;
      if (target !== lastFrame) {
        drawFrame(target);
        lastFrame = target;
        displayedFrameRef.current = target;
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Stage overlay opacities ───────────────────────────────────────────────
  const getOpacity = (s: number, ps: number, pe: number, e: number) => {
    if (scrollProgress < s || scrollProgress > e) return 0;
    if (scrollProgress >= ps && scrollProgress <= pe) return 1;
    if (scrollProgress < ps) return (scrollProgress - s) / (ps - s);
    return (e - scrollProgress) / (e - pe);
  };

  const op1 = getOpacity(0.0, 0.0, 0.20, 0.26);
  const op2 = getOpacity(0.26, 0.32, 0.46, 0.52);
  const op3 = getOpacity(0.52, 0.58, 0.72, 0.78);
  const op4 = getOpacity(0.78, 0.84, 1.0, 1.0);

  const loadPct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FFF9E9]"
      style={{ height: '450vh' }}
    >
      {/* Sticky Viewport */}
      <div className="sticky top-[68px] h-[calc(100vh-68px)] w-full overflow-hidden flex items-center justify-center">

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFE600]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00F5D4]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Canvas — GPU-accelerated */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ imageRendering: 'auto' }}
        />

        {/* Watermark cover — blends with page bg at bottom-right corner */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none z-10"
          style={{
            width: '220px',
            height: '60px',
            background: 'linear-gradient(to top left, #FFF9E9 30%, transparent 100%)',
          }}
        />

        {/* Loading bar */}
        {loadPct < 100 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5">
            <div className="w-48 h-1 rounded-full bg-[#CDC7AA]/40 overflow-hidden">
              <div
                className="h-full bg-[#FFE600] rounded-full transition-all duration-300"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#6A5F00]/70">Loading frames {loadPct}%</span>
          </div>
        )}

        {/* Scroll Track Dots */}
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2.5 z-30 pointer-events-none">
          {[0, 1, 2, 3].map((idx) => {
            const active =
              (idx === 0 && scrollProgress < 0.26) ||
              (idx === 1 && scrollProgress >= 0.26 && scrollProgress < 0.52) ||
              (idx === 2 && scrollProgress >= 0.52 && scrollProgress < 0.78) ||
              (idx === 3 && scrollProgress >= 0.78);
            return (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active ? 'bg-[#1E1C10] scale-125 ring-2 ring-[#FFE600]' : 'bg-[#CDC7AA]/50'
                }`}
              />
            );
          })}
        </div>

        {/* Stage 1 */}
        <div
          className="absolute bottom-8 sm:bottom-10 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-20 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-2xl"
          style={{ opacity: op1, transform: `translateY(${(1 - op1) * 15}px)`, pointerEvents: op1 > 0.4 ? 'auto' : 'none' }}
        >
          <div className="w-full sm:w-auto px-5 py-3 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-[#CDC7AA]/60 shadow-lg flex items-center justify-between sm:justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping shrink-0" />
              <SmartToy className="h-4 w-4 text-[#6A5F00] shrink-0" />
              <p className="text-xs sm:text-sm font-extrabold text-[#1E1C10] whitespace-nowrap">
                Crack Dream Campus Placements with <span className="bg-[#FFE600] px-1.5 py-0.5 rounded-md text-[#1A1A1A]">Pal-Bot</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <Link to="/register" className="px-5 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5 border border-[#CDC7AA]/40 whitespace-nowrap">
              <span>Launch Audit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <div className="hidden sm:flex items-center gap-1 px-3 py-3 rounded-full bg-white/70 backdrop-blur-md text-[#7C775F] text-[11px] font-bold border border-[#CDC7AA]/40">
              <span>Scroll</span>
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div
          className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20 max-w-md"
          style={{ opacity: op2, transform: `translateY(${(1 - op2) * -15}px)`, pointerEvents: op2 > 0.4 ? 'auto' : 'none' }}
        >
          <div className="px-5 py-3 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-[#CDC7AA]/60 shadow-lg flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#FFE600] flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-[#1A1A1A]" />
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#1E1C10]">
              Precision ATS AI · <span className="text-[#6A5F00] font-bold">Auto-matches Tier-1 Recruiter Keywords</span>
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div
          className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20 max-w-md"
          style={{ opacity: op3, transform: `translateY(${(1 - op3) * -15}px)`, pointerEvents: op3 > 0.4 ? 'auto' : 'none' }}
        >
          <div className="px-5 py-3 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-[#CDC7AA]/60 shadow-lg flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#00F5D4] flex items-center justify-center shrink-0">
              <Mic className="h-4 w-4 text-[#006B5B]" />
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#1E1C10]">
              AI Voice & Tech Mocks · <span className="text-[#006B5B] font-bold">Live pace & algorithmic feedback</span>
            </p>
          </div>
        </div>

        {/* Stage 4 */}
        <div
          className="absolute top-20 sm:top-24 right-4 sm:right-10 z-20 flex items-center gap-2.5"
          style={{ opacity: op4, transform: `translateY(${(1 - op4) * -15}px)`, pointerEvents: op4 > 0.4 ? 'auto' : 'none' }}
        >
          <Link to="/register" className="px-6 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-lg hover:shadow-xl transition-transform active:scale-95 flex items-center gap-2 border border-[#CDC7AA]/40">
            <span>Get Started Free</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a href="#mini-audit" className="px-4 py-3 rounded-full bg-white/85 hover:bg-white text-[#1E1C10] font-bold text-xs shadow-sm transition-all border border-[#CDC7AA]/40 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#6A5F00]" />
            <span>Explore ↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
