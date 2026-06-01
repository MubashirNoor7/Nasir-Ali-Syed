import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { books } from "../data";
import { ChevronLeft, ChevronRight, Home, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

function buildPageSrc(folder: string, prefix: string, n: number, suffix: string) {
  const raw = `${folder}/${prefix}${n}${suffix}`;
  try {
    return encodeURI(decodeURI(raw));
  } catch {
    return encodeURI(raw);
  }
}

export function BookReaderPage() {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.bookId;

  const book = useMemo(() => books.find((b) => b.id === bookId), [bookId]);
  const reader = book?.reader;

  const [pageIndex, setPageIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  // Smooth Viewport Reset when Zooming back to 100%
  useEffect(() => {
    if (zoom === 1) {
      setPanX(0);
      setPanY(0);
    }
  }, [zoom]);

  // Centering reset when Page changes (PRESERVES sticky zoom settings!)
  useEffect(() => {
    setPanX(0);
    setPanY(0);
  }, [pageIndex]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setStartX(e.clientX - panX);
    setStartY(e.clientY - panY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    const newPanX = e.clientX - startX;
    const newPanY = e.clientY - startY;

    // Generous, super-smooth boundary limits proportional to zoom factor
    const limitX = (containerRef.current?.clientWidth || 800) * (zoom - 0.35);
    const limitY = (containerRef.current?.clientHeight || 600) * (zoom - 0.35);
    setPanX(Math.min(Math.max(newPanX, -limitX), limitX));
    setPanY(Math.min(Math.max(newPanY, -limitY), limitY));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.clientX - panX);
    setStartY(touch.clientY - panY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newPanX = touch.clientX - startX;
    const newPanY = touch.clientY - startY;

    const limitX = (containerRef.current?.clientWidth || 800) * (zoom - 0.35);
    const limitY = (containerRef.current?.clientHeight || 600) * (zoom - 0.35);
    setPanX(Math.min(Math.max(newPanX, -limitX), limitX));
    setPanY(Math.min(Math.max(newPanY, -limitY), limitY));
  };

  const onMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const totalPages = reader ? reader.end - reader.start + 1 : 0;

  const currentPageNumber = reader ? reader.start + pageIndex : 0;
  const currentSrc = reader
    ? buildPageSrc(reader.folder, reader.pagePrefix, currentPageNumber, reader.pageSuffix)
    : "";

  const canPrev = pageIndex > 0;
  const canNext = reader ? pageIndex < totalPages - 1 : false;

  useEffect(() => {
    setPageIndex(0);
    setHasError(false);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setIsFocusMode(false);
  }, [bookId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (canPrev) setPageIndex((p) => Math.max(0, p - 1));
      }
      if (e.key === "ArrowRight") {
        if (canNext) setPageIndex((p) => p + 1);
      }
      if (e.key === "Escape") {
        setIsFocusMode(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canPrev, canNext]);

  if (!book || !reader) {
    return (
      <div className="min-h-screen bg-bg-paper flex items-center justify-center px-6">
        <div className="max-w-xl w-full bg-white border border-brand-primary/5 shadow-xl p-10">
          <h1 className="urdu-header text-3xl text-brand-primary mb-3 text-right">کتاب دستیاب نہیں</h1>
          <p className="text-sm font-sans text-brand-primary/60 mb-8">
            This book reader is not configured yet.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/books")}
              className="px-6 py-3 bg-brand-primary text-white text-[10px] font-sans tracking-widest uppercase hover:bg-brand-accent transition-colors"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-screen h-screen bg-bg-paper-dark flex flex-col overflow-hidden relative select-none transition-all duration-300 ${
      isFocusMode 
        ? "fixed inset-0 z-[100] pt-0" 
        : "pt-20 sm:pt-24 md:pt-[100px]"
    }`}>
      {/* Background elegant details */}
      <div className="absolute inset-0 opacity-[0.025] bg-texture pointer-events-none" />

      {/* Top Single Header Toolbar (Fully mobile-optimized) */}
      <header className="h-auto sm:h-20 border-b border-brand-primary/10 bg-white/95 px-4 sm:px-6 py-3 sm:py-0 flex flex-row items-center justify-between gap-3 relative z-20 shadow-md shrink-0">
        
        {/* Left Section: Back button and Focus Mode Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate("/books")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-brand-primary/10 text-brand-primary/60 hover:text-brand-accent hover:border-brand-accent transition-all text-[9px] font-sans tracking-widest uppercase font-bold cursor-pointer bg-white"
          >
            <ChevronLeft size={13} /> Back
          </button>

          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all text-[9px] font-sans tracking-widest uppercase font-bold cursor-pointer ${
              isFocusMode 
                ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-accent hover:border-brand-accent" 
                : "border-brand-primary/10 text-brand-primary/60 hover:text-brand-accent hover:border-brand-accent bg-white"
            }`}
            title={isFocusMode ? "Exit Focus Mode (Esc)" : "Focus Mode Layout"}
          >
            {isFocusMode ? (
              <>
                <Minimize2 size={13} />
                <span className="hidden sm:inline">Exit Focus</span>
              </>
            ) : (
              <>
                <Maximize2 size={13} />
                <span className="hidden sm:inline">Focus Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Center Section: Book Name inside the header toolbar to maximize vertical viewport space! */}
        <div className="flex flex-col text-center max-w-[40vw] sm:max-w-[50vw]">
          <h1 className="urdu-header text-base sm:text-2xl text-brand-primary leading-none font-bold truncate">
            {book.title}
          </h1>
          <p className="text-[8px] font-sans tracking-widest uppercase text-brand-primary/40 leading-none mt-1 hidden md:block truncate">
            {book.titleEnglish}
          </p>
        </div>

        {/* Right Section: Zoom Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            disabled={zoom <= 0.5}
            className={`w-8 h-8 sm:w-9 sm:h-9 border flex items-center justify-center transition-all ${
              zoom > 0.5
                ? "border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:text-brand-accent cursor-pointer bg-white"
                : "border-brand-primary/5 text-brand-primary/25 cursor-not-allowed bg-white/50"
            }`}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>

          <div className="text-[9px] sm:text-[10px] font-sans text-brand-primary/60 min-w-[1.8rem] sm:min-w-[2.2rem] text-center font-bold select-none">
            {Math.round(zoom * 100)}%
          </div>

          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            disabled={zoom >= 3}
            className={`w-8 h-8 sm:w-9 sm:h-9 border flex items-center justify-center transition-all ${
              zoom < 3
                ? "border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:text-brand-accent cursor-pointer bg-white"
                : "border-brand-primary/5 text-brand-primary/25 cursor-not-allowed bg-white/50"
            }`}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>

          {zoom !== 1 && (
            <button
              onClick={() => setZoom(1)}
              className="w-8 h-8 sm:w-9 sm:h-9 border border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:text-brand-accent cursor-pointer transition-colors flex items-center justify-center bg-white"
              title="Reset Zoom"
            >
              <RotateCcw size={11} />
            </button>
          )}
        </div>
      </header>

      {/* Main Reading Frame Section (Takes up all remaining height, scroll-free) */}
      <main className="flex-1 w-full flex flex-col items-center justify-start p-4 md:p-6 overflow-hidden select-none">
        
        {/* Immersive centered book page view frame (Flawless Hardware-Accelerated Pan/Zoom Viewport) */}
        <div 
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseLeaveOrUp}
          onMouseLeave={onMouseLeaveOrUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseLeaveOrUp}
          className={`bg-neutral-950 shadow-2xl relative rounded-sm border border-neutral-900 select-none flex-1 max-w-[800px] w-full mb-16 overflow-hidden ${
            zoom > 1 ? "cursor-grab" : ""
          } ${isDragging ? "cursor-grabbing" : ""}`}
        >
          {/* Centering viewport wrapper */}
          <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 w-full h-full relative overflow-hidden">
            <img
              key={currentSrc}
              src={currentSrc}
              alt={`${book.titleEnglish} page ${pageIndex + 1}`}
              className="object-contain shadow-md select-none pointer-events-none max-h-full max-w-full"
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                height: "100%",
                width: "auto",
              }}
              loading="eager"
              onError={() => setHasError(true)}
              onLoad={() => setHasError(false)}
            />
          </div>
        </div>

        {/* Dynamic page index slider docked at the bottom with unified arrow navigators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-brand-primary/10 px-4 py-2.5 z-10 shadow-xl flex items-center gap-3.5 max-w-sm w-[90vw]">
          <button
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className={`w-8 h-8 border flex items-center justify-center transition-all shrink-0 ${
              canPrev
                ? "border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:text-brand-accent cursor-pointer bg-white"
                : "border-brand-primary/5 text-brand-primary/25 cursor-not-allowed bg-white/50"
            }`}
            title="Previous Page"
          >
            <ChevronLeft size={14} />
          </button>

          <input
            type="range"
            min={0}
            max={Math.max(0, totalPages - 1)}
            value={pageIndex}
            onChange={(e) => setPageIndex(Number(e.target.value))}
            className="flex-1 accent-[var(--brand-accent,#B45309)] cursor-pointer"
          />

          <button
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={!canNext}
            className={`w-8 h-8 border flex items-center justify-center transition-all shrink-0 ${
              canNext
                ? "border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:text-brand-accent cursor-pointer bg-white"
                : "border-brand-primary/5 text-[#EAD8C3]/50 cursor-not-allowed bg-white/50"
            }`}
            title="Next Page"
          >
            <ChevronRight size={14} />
          </button>

          <span className="text-[10px] font-sans font-bold text-brand-primary/70 shrink-0 select-none">
            {pageIndex + 1} / {totalPages}
          </span>
        </div>

        {hasError && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/80 px-6 py-4 text-center border border-brand-accent/20">
            <p className="text-xs font-sans text-brand-accent font-semibold">
              This page image could not be loaded.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
