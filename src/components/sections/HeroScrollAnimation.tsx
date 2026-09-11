import { useEffect, useRef, useState, useCallback } from 'react';
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
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // 1. Draw frame to canvas with crisp scaling
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find closest loaded image if target isn't ready
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;
    const imgRatio = imgWidth / imgHeight;

    // Add safe padding so top cap and bottom shoes never get clipped
    const padX = Math.max(12, displayWidth * 0.02);
    const padY = Math.max(16, displayHeight * 0.03);

    const availW = Math.max(0, displayWidth - padX * 2);
    const availH = Math.max(0, displayHeight - padY * 2);
    const availRatio = availW / availH;

    let renderWidth: number;
    let renderHeight: number;

    if (availRatio > imgRatio) {
      renderHeight = availH;
      renderWidth = availH * imgRatio;
    } else {
      renderWidth = availW;
      renderHeight = availW / imgRatio;
    }

    const offsetX = (displayWidth - renderWidth) / 2;
    const offsetY = (displayHeight - renderHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
  }, []);

  // 2. Preload frames
  useEffect(() => {
    let isCancelled = false;
    let localLoaded = 0;

    const priorityIndices = Array.from({ length: 25 }, (_, i) => i);
    const keyIndices = Array.from({ length: 50 }, (_, i) => Math.min(TOTAL_FRAMES - 1, i * 6));
    const allIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
    const queue = [...new Set([...priorityIndices, ...keyIndices, ...allIndices])];

    const loadNextBatch = (batchSize = 10) => {
      if (isCancelled || queue.length === 0) return;

      const batch = queue.splice(0, batchSize);
      let batchPending = batch.length;

      batch.forEach((idx) => {
        if (imagesRef.current[idx]) {
          batchPending--;
          if (batchPending === 0) loadNextBatch(batchSize);
          return;
        }

        const img = new Image();
        img.src = getFramePath(idx);

        const onDone = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          localLoaded++;
          setLoadedCount(localLoaded);

          if (idx === 0 || !isInitialReady) {
            setIsInitialReady(true);
            drawFrame(0);
          }

          batchPending--;
          if (batchPending === 0) {
            setTimeout(() => loadNextBatch(batchSize), 10);
          }
        };

        img.onload = onDone;
        img.onerror = onDone;
      });
    };

    loadNextBatch(12);

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, isInitialReady]);

  // 3. Scroll tracking & lerp
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.25;
        drawFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(currentFrameRef.current) !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(targetFrameRef.current);
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Clean opacity calculations for minimal 1-line stages
  const getStageOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (scrollProgress < start || scrollProgress > end) return 0;
    if (scrollProgress >= peakStart && scrollProgress <= peakEnd) return 1;
    if (scrollProgress < peakStart) return (scrollProgress - start) / (peakStart - start);
    return (end - scrollProgress) / (end - peakEnd);
  };

  const stage1Opacity = getStageOpacity(0.0, 0.0, 0.20, 0.26);
  const stage2Opacity = getStageOpacity(0.26, 0.32, 0.46, 0.52);
  const stage3Opacity = getStageOpacity(0.52, 0.58, 0.72, 0.78);
  const stage4Opacity = getStageOpacity(0.78, 0.84, 1.0, 1.0);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FFF9E9]"
      style={{ height: '450vh' }}
    >
      {/* Sticky Viewport under Navbar */}
      <div className="sticky top-[68px] h-[calc(100vh-68px)] w-full overflow-hidden flex items-center justify-center">
        {/* Soft Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFE600]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00F5D4]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 100% Full Unobstructed Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Loading Indicator */}
        {loadedCount < 30 && (
          <div className="absolute top-20 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#CDC7AA]/40 text-[11px] font-bold text-[#6A5F00] shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
            <span>Loading ({Math.min(100, Math.round((loadedCount / 30) * 100))}%)</span>
          </div>
        )}

        {/* Minimal Subtle Scroll Track on Right */}
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2.5 z-30 pointer-events-none">
          {[0, 1, 2, 3].map((idx) => {
            const isActive =
              (idx === 0 && scrollProgress < 0.26) ||
              (idx === 1 && scrollProgress >= 0.26 && scrollProgress < 0.52) ||
              (idx === 2 && scrollProgress >= 0.52 && scrollProgress < 0.78) ||
              (idx === 3 && scrollProgress >= 0.78);
            return (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E1C10] scale-125 ring-2 ring-[#FFE600]'
                    : 'bg-[#CDC7AA]/50'
                }`}
              />
            );
          })}
        </div>

        {/* ══════════════ 1-LINE STAGE 1: INTRO (Bottom Clean Pill) ══════════════ */}
        <div
          className="absolute bottom-8 sm:bottom-10 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-20 transition-all duration-300 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-2xl"
          style={{
            opacity: stage1Opacity,
            transform: `translateY(${(1 - stage1Opacity) * 15}px) sm:translateX(-50%)`,
            pointerEvents: stage1Opacity > 0.4 ? 'auto' : 'none',
          }}
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
            <Link
              to="/register"
              className="px-5 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5 border border-[#CDC7AA]/40 whitespace-nowrap"
            >
              <span>Launch Audit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <div className="hidden sm:flex items-center gap-1 px-3 py-3 rounded-full bg-white/70 backdrop-blur-md text-[#7C775F] text-[11px] font-bold border border-[#CDC7AA]/40">
              <span>Scroll</span>
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* ══════════════ 1-LINE STAGE 2: ATS RESUME (Top-Left Clean Pill) ══════════════ */}
        <div
          className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20 transition-all duration-300 max-w-md"
          style={{
            opacity: stage2Opacity,
            transform: `translateY(${(1 - stage2Opacity) * -15}px)`,
            pointerEvents: stage2Opacity > 0.4 ? 'auto' : 'none',
          }}
        >
          <div className="px-5 py-3 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-[#CDC7AA]/60 shadow-lg flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#FFE600] flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-[#1A1A1A]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#1E1C10]">
                Precision ATS AI · <span className="text-[#6A5F00] font-bold">Auto-matches Tier-1 Recruiter Keywords</span>
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════ 1-LINE STAGE 3: AI MOCKS (Top-Left Clean Pill) ══════════════ */}
        <div
          className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20 transition-all duration-300 max-w-md"
          style={{
            opacity: stage3Opacity,
            transform: `translateY(${(1 - stage3Opacity) * -15}px)`,
            pointerEvents: stage3Opacity > 0.4 ? 'auto' : 'none',
          }}
        >
          <div className="px-5 py-3 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-[#CDC7AA]/60 shadow-lg flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#00F5D4] flex items-center justify-center shrink-0">
              <Mic className="h-4 w-4 text-[#006B5B]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#1E1C10]">
                AI Voice & Tech Mocks · <span className="text-[#006B5B] font-bold">Live pace & algorithmic feedback</span>
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════ 1-LINE STAGE 4: FINALE (Top-Right Clean Pill - completely clears 'Thankyou Placement Pal' sign) ══════════════ */}
        <div
          className="absolute top-20 sm:top-24 right-4 sm:right-10 z-20 transition-all duration-300 flex items-center gap-2.5"
          style={{
            opacity: stage4Opacity,
            transform: `translateY(${(1 - stage4Opacity) * -15}px)`,
            pointerEvents: stage4Opacity > 0.4 ? 'auto' : 'none',
          }}
        >
          <Link
            to="/register"
            className="px-6 py-3 rounded-full bg-[#FFE600] hover:bg-[#DEC800] text-[#1A1A1A] font-black text-xs shadow-lg hover:shadow-xl transition-transform active:scale-95 flex items-center gap-2 border border-[#CDC7AA]/40"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="#mini-audit"
            className="px-4 py-3 rounded-full bg-white/85 hover:bg-white text-[#1E1C10] font-bold text-xs shadow-sm transition-all border border-[#CDC7AA]/40 flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#6A5F00]" />
            <span>Explore ↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
