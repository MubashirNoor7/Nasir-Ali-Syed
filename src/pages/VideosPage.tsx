import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { videos } from "../data";
import { Tv, Calendar, ExternalLink, ArrowLeft, LayoutGrid, Grid3X3, Grid2X2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Video {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  descriptionEnglish: string;
  url: string;
  date: string;
}

function getYoutubeVideoId(url: string): string {
  if (!url) return "";
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  }
  return videoId;
}

function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

function getYoutubeThumbnailUrl(url: string): string {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

function getLocalThumbnailUrl(title: string): string {
  // Clean title exactly the same way as our download script
  const cleanTitle = title.replace(/[:\\/*?"<>|]/g, "_").trim();
  return `/images/thumbnails/${encodeURIComponent(cleanTitle)}.jpg`;
}

export function VideosPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"large" | "compact" | "grid">("large");

  const sortedVideos = useMemo(() => {
    const getCurationScore = (vid: Video) => {
      const titleL = (vid.titleEnglish || "").toLowerCase();
      const titleU = vid.title || "";
      
      // 1. Profile Tributes & Documentaries (Top priority)
      if (titleL.includes("documentary") || titleL.includes("profile") || titleL.includes("tribute") || titleU.includes("دستاویزی") || titleU.includes("ٹریبون") || titleU.includes("خراج") || titleU.includes("تکریم")) {
        return 100;
      }
      // 2. Full Literary Interviews & Professional Dialogues
      if (titleL.includes("interview") || titleL.includes("dialogue") || titleL.includes("broadcast") || titleU.includes("انٹرویو") || titleU.includes("گفتگو") || titleU.includes("ادبی شو")) {
        return 85;
      }
      // 3. Lectures & Academic/Keynote Addresses
      if (titleL.includes("lecture") || titleL.includes("address") || titleL.includes("keynote") || titleU.includes("لیکچر") || titleU.includes("خطاب")) {
        return 70;
      }
      // 4. Large Literary Festivals & Mushairas (Public Recitals)
      if (titleL.includes("festival") || titleL.includes("mushaira") || titleU.includes("مشاعرہ") || titleU.includes("فیسٹیول")) {
        return 55;
      }
      // 5. General Poetry sessions / Devotional Recitals
      if (titleL.includes("session") || titleL.includes("recital") || titleU.includes("نشست") || titleU.includes("حمد") || titleU.includes("کلام")) {
        return 40;
      }
      return 0; // Default
    };

    return [...videos].sort((a, b) => {
      const scoreA = getCurationScore(a);
      const scoreB = getCurationScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      const yearA = parseInt(a.date) || 0;
      const yearB = parseInt(b.date) || 0;
      return yearB - yearA;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Premium Page Header */}
      <div className="bg-bg-paper-dark py-24 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent">Media & Broadcasts</span>
            <div className="h-[1px] w-8 bg-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-2"
          >
            ویڈیو لائبریری
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/50"
          >
            VIDEO LIBRARY & BROADCAST ARCHIVE
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-14">
        {/* Controls Bar: Back Navigation and Grid Layout Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-brand-primary/5 pb-8 mb-12">
          {/* Back navigation */}
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-brand-primary/50 hover:text-brand-accent transition-colors text-[10px] font-sans tracking-[0.4em] uppercase group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Home
            </Link>
          </div>

          {/* Dynamic Grid Layout Switchers */}
          <div className="flex items-center gap-4">
            <div className="flex bg-[#FAF4E9] border border-brand-primary/10 p-1 rounded-none">
              {/* Large: 2 Columns */}
              <button
                onClick={() => setViewMode("large")}
                className={`flex items-center gap-1.5 px-3 py-2 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                  viewMode === "large"
                    ? "bg-brand-primary text-white"
                    : "text-brand-primary/60 hover:text-brand-primary"
                }`}
                title="Detailed View (2 Columns)"
              >
                <LayoutGrid size={11} />
                <span className="hidden md:inline">Detailed (2x)</span>
              </button>

              {/* Compact: 3 Columns */}
              <button
                onClick={() => setViewMode("compact")}
                className={`flex items-center gap-1.5 px-3 py-2 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                  viewMode === "compact"
                    ? "bg-brand-primary text-white"
                    : "text-brand-primary/60 hover:text-brand-primary"
                }`}
                title="Standard Grid (3 Columns)"
              >
                <Grid2X2 size={11} />
                <span className="hidden md:inline">Standard (3x)</span>
              </button>

              {/* Grid: 4 Columns */}
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-2 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-brand-primary text-white"
                    : "text-brand-primary/60 hover:text-brand-primary"
                }`}
                title="Compact Grid (4 Columns)"
              >
                <Grid3X3 size={11} />
                <span className="hidden md:inline">Compact (4x)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Video Grid List with multi-mode layout views */}
        <div className={`grid gap-8 lg:gap-10 transition-all duration-500 ${
          viewMode === "large" 
            ? "grid-cols-1 lg:grid-cols-2 lg:gap-14" 
            : viewMode === "compact" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}>
          {sortedVideos.map((vid, idx) => {
            const thumbUrl = getYoutubeThumbnailUrl(vid.url);
            
            // Render LARGE View Mode (Detailed Layout)
            if (viewMode === "large") {
              return (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="bg-white border border-brand-primary/10 hover:border-brand-accent shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between rounded-none group"
                >
                  <div>
                    {/* Performance Optimized Local Thumbnail Cover Block with Play Button Overlay */}
                    <div 
                      onClick={() => navigate(`/videos/${vid.id}`)}
                      className="relative aspect-video mb-6 overflow-hidden bg-black shadow-md border border-brand-primary/5 cursor-pointer relative group"
                    >
                      {thumbUrl ? (
                        <>
                          <img 
                            src={getLocalThumbnailUrl(vid.title)} 
                            onError={(e) => {
                              e.currentTarget.src = thumbUrl;
                            }}
                            alt={vid.titleEnglish}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-brand-primary/25 group-hover:bg-brand-primary/45 transition-colors duration-300 flex items-center justify-center">
                            {/* Central premium play button */}
                            <div className="w-14 h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                              <span className="ml-1 text-sm font-sans font-bold">▶</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-8 text-center bg-bg-paper-dark">
                          <Tv size={40} className="text-brand-accent/40 mb-3 animate-pulse" />
                          <p className="text-xs font-sans text-brand-primary/40 font-bold uppercase">Video player unavailable</p>
                        </div>
                      )}
                    </div>

                    {/* Urdu description details */}
                    <div className="text-right" dir="rtl">
                      <span className="text-[8px] font-sans tracking-[0.3em] uppercase text-brand-accent font-bold inline-block border-b border-brand-accent/20 pb-1 mb-4">
                        {vid.date} BROADCAST
                      </span>
                      
                      <h3 className="urdu-body text-3xl md:text-4.5xl text-amber-600 font-extrabold leading-normal mb-4 group-hover:text-brand-primary transition-colors">
                        {vid.title}
                      </h3>
                      
                      <p className="urdu-text text-base text-brand-primary/70 leading-relaxed text-justify mb-5 line-clamp-4">
                        {vid.description}
                      </p>
                    </div>

                    {/* English description details */}
                    <div className="border-t border-brand-primary/5 pt-5 mt-5">
                      <h4 className="text-xs font-sans font-bold tracking-wider text-brand-primary/50 uppercase mb-2">
                        {vid.titleEnglish}
                      </h4>
                      <p className="text-xs font-sans text-brand-primary/60 leading-relaxed text-justify line-clamp-3">
                        {vid.descriptionEnglish}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-brand-primary/5 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[9px] font-sans tracking-widest text-brand-primary/40 font-semibold flex items-center gap-1.5 uppercase">
                      <Calendar size={11} className="text-brand-accent" />
                      YEAR {vid.date} RECORD
                    </span>

                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-sans tracking-widest text-brand-accent uppercase font-bold flex items-center gap-1.5 hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      Watch on YouTube
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </motion.div>
              );
            }

            // Render COMPACT and GRID View Modes
            const isGridView = viewMode === "grid";
            
            return (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                onClick={() => navigate(`/videos/${vid.id}`)}
                className="bg-white border border-brand-primary/10 hover:border-brand-accent shadow-xs hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between rounded-none group cursor-pointer"
              >
                <div>
                  {/* YouTube Thumbnail Cover Block with Play Button Overlay */}
                  <div className="relative aspect-video mb-4 overflow-hidden bg-black shadow-xs border border-brand-primary/5">
                    {thumbUrl ? (
                      <>
                        <img 
                          src={getLocalThumbnailUrl(vid.title)} 
                          onError={(e) => {
                            e.currentTarget.src = thumbUrl;
                          }}
                          alt={vid.titleEnglish}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/40 transition-colors duration-300 flex items-center justify-center">
                          {/* Fine custom play circle */}
                          <div className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                            <span className="ml-0.5 text-[10px] font-sans font-bold">▶</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-paper-dark">
                        <Tv size={24} className="text-brand-accent/40" />
                      </div>
                    )}
                  </div>

                  {/* Urdu & English title details */}
                  <div className="text-right" dir="rtl">
                    <span className="text-[7px] font-sans tracking-[0.25em] uppercase text-brand-accent font-bold block mb-1.5">
                      {vid.date} RECORD
                    </span>
                    
                    <h3 className={`urdu-body text-amber-600 font-extrabold leading-normal group-hover:text-brand-primary transition-colors ${
                      isGridView ? "text-xl line-clamp-1" : "text-2.5xl md:text-3.5xl line-clamp-2 mb-2.5"
                    }`}>
                      {vid.title}
                    </h3>
                  </div>

                  {/* Descriptions shown in Compact View mode but hidden in Grid View mode */}
                  {!isGridView && (
                    <div className="border-t border-brand-primary/5 pt-3 mt-3">
                      <p className="urdu-text text-xs text-brand-primary/60 leading-relaxed text-justify line-clamp-2 mb-2">
                        {vid.description}
                      </p>
                      <h4 className="text-[9px] font-sans font-bold tracking-wider text-brand-primary/40 uppercase line-clamp-1">
                        {vid.titleEnglish}
                      </h4>
                    </div>
                  )}
                </div>

                <div className="border-t border-brand-primary/5 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-[8px] font-sans tracking-widest text-brand-primary/35 font-semibold flex items-center gap-1 uppercase">
                    <Calendar size={9} className="text-brand-accent" />
                    {vid.date}
                  </span>

                  <span className="text-[8px] font-sans tracking-widest text-brand-accent uppercase font-bold flex items-center gap-1 group-hover:text-brand-primary transition-colors">
                    PLAY VIDEO
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

    </div>
  );
}
