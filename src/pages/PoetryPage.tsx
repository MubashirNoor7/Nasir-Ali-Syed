import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { sampleGhazals } from "../data";
import { Heart, Share2, BookOpen, Check } from "lucide-react";

interface GhazalDetail {
  id: string;
  title: string;
  titleEnglish: string;
  theme: string;
  themeEnglish: string;
  couplets: {
    urdu: [string, string];
  }[];
}

const poetryCatalog: GhazalDetail[] = sampleGhazals.map((g) => ({
  id: g.id,
  title: g.title,
  titleEnglish: g.titleEnglish,
  theme: g.theme,
  themeEnglish: g.themeEnglish,
  couplets: g.content
    .filter((c): c is [string, string] => c.length === 2)
    .map((c) => ({ urdu: c }))
}));

export function PoetryPage() {
  const [activeGhazalIndex, setActiveGhazalIndex] = useState<number>(0);
  const [likedList, setLikedList] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeGhazal = poetryCatalog[activeGhazalIndex];

  const handleLike = (id: string) => {
    if (likedList.includes(id)) {
      setLikedList(prev => prev.filter(x => x !== id));
    } else {
      setLikedList(prev => [...prev, id]);
    }
  };

  const handleCopy = (ghazal: GhazalDetail) => {
    const textToCopy = ghazal.couplets
      .map(c => `${c.urdu[0]}\n${c.urdu[1]}`)
      .join("\n\n");
    navigator.clipboard.writeText(`ناصر علی سید کلام:\n\n${textToCopy}`);
    setCopiedId(ghazal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Page Header */}
      <div className="bg-bg-paper-dark py-24 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent">Selected Verse</span>
            <div className="h-[1px] w-8 bg-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-2"
          >
            منتخب دیوانِ شاعری
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/50"
          >
            Selected Ghazals & Bilingual Couplets
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Ghazal Journals Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen size={16} className="text-brand-accent" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-primary/40 font-bold">Poetry Index</span>
            </div>
            
            {poetryCatalog.map((ghazal, idx) => (
              <motion.button
                key={ghazal.id}
                onClick={() => setActiveGhazalIndex(idx)}
                whileHover={{ x: 6 }}
                className={`w-full p-6 text-left border flex justify-between items-center transition-all duration-500 rounded-none cursor-pointer ${
                  activeGhazalIndex === idx
                    ? "bg-brand-primary border-brand-primary text-white shadow-xl"
                    : "bg-bg-paper border-brand-primary/5 text-brand-primary hover:border-brand-accent"
                }`}
              >
                <div>
                  <h3 className={`urdu-header text-2xl mb-1 ${activeGhazalIndex === idx ? "text-white" : "text-brand-primary"}`}>
                    {ghazal.title}
                  </h3>
                  <p className={`text-[9px] font-sans tracking-widest uppercase ${activeGhazalIndex === idx ? "text-brand-accent" : "text-brand-primary/40"}`}>
                    {ghazal.titleEnglish}
                  </p>
                </div>
                <div className={`text-[10px] font-sans tracking-widest border px-2 py-1 ${
                  activeGhazalIndex === idx ? "border-white/20 text-white" : "border-brand-accent/20 text-brand-accent"
                }`}>
                  0{idx + 1}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Dynamic Calligraphic Poetry Viewport (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGhazal.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-brand-primary/5 rounded-none shadow-2xl p-12 md:p-20 relative overflow-hidden"
              >
                {/* Background decorative signature overlay */}
                <div className="absolute right-10 top-10 opacity-[0.03] select-none pointer-events-none text-9xl">
                  ✒️
                </div>

                {/* Ghazal header */}
                <div className="flex justify-between items-start mb-16 border-b border-brand-primary/5 pb-8">
                  <div>
                    <span className="px-3 py-1 bg-brand-accent/15 text-brand-accent text-[9px] font-sans tracking-widest uppercase inline-block mb-3 font-semibold">
                      {activeGhazal.themeEnglish} / {activeGhazal.theme}
                    </span>
                    <h2 className="urdu-header text-4xl md:text-5xl text-brand-primary leading-normal">{activeGhazal.title}</h2>
                    <h3 className="text-xs font-sans tracking-widest uppercase text-brand-primary/40 mt-1">{activeGhazal.titleEnglish}</h3>
                  </div>

                  {/* Top Action Widgets */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleLike(activeGhazal.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        likedList.includes(activeGhazal.id)
                          ? "bg-red-500 border-red-500 text-white shadow-lg"
                          : "border-brand-primary/10 text-brand-primary/40 hover:border-brand-accent hover:text-brand-accent"
                      }`}
                    >
                      <Heart size={16} fill={likedList.includes(activeGhazal.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => handleCopy(activeGhazal)}
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-brand-primary/10 text-brand-primary/40 hover:border-brand-accent hover:text-brand-accent transition-all cursor-pointer"
                    >
                      {copiedId === activeGhazal.id ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                    </button>
                  </div>
                </div>

                {/* The Couplets */}
                <div className="space-y-16 text-center">
                  {activeGhazal.couplets.map((couplet, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 + cIdx * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-8 group border-b border-brand-primary/[0.02] pb-10 last:border-0"
                    >
                      {/* Urdu Couplet */}
                      <div className="space-y-4">
                        <p className="nastaliq text-3xl md:text-5xl text-brand-primary leading-loose tracking-wide transition-colors duration-500 group-hover:text-brand-accent">
                          {couplet.urdu[0]}
                        </p>
                        <p className="nastaliq text-3xl md:text-5xl text-brand-primary leading-loose tracking-wide transition-colors duration-500 group-hover:text-brand-accent">
                          {couplet.urdu[1]}
                        </p>
                      </div>



                      {/* Mini Divider dots */}
                      {cIdx < activeGhazal.couplets.length - 1 && (
                        <div className="flex justify-center gap-1 opacity-20 my-10">
                          {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-brand-accent rounded-full"></div>)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
