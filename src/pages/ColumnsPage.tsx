import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Newspaper, Calendar, Search, BookOpen, Clock, ArrowRight, CornerDownLeft, X, LayoutGrid, Grid2X2, Grid3X3 } from "lucide-react";
import articlesData from "../data/articles.json";

interface ColumnEntry {
  id: string;
  year: string;
  title: string;
  text: string;
}

// Basic Urdu to Latin transliteration mapping
const urduToLatin: Record<string, string> = {
  "ا": "a", "آ": "aa", "ب": "b", "پ": "p", "ت": "t", "ٹ": "tt",
  "ث": "s", "ج": "j", "چ": "ch", "ح": "h", "خ": "kh", "د": "d",
  "ڈ": "dd", "ذ": "z", "ر": "r", "ڑ": "rr", "ز": "z", "ژ": "zh",
  "س": "s", "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z",
  "ع": "a", "غ": "gh", "ف": "f", "ق": "q", "ک": "k", "گ": "g",
  "ل": "l", "م": "m", "ن": "n", "ں": "n", "و": "o", "ہ": "h",
  "ھ": "h", "ی": "y", "ے": "e", "ء": "", "ٔ": "", "ٓ": "",
  "ؑ": "", "ؐ": "", "ؒ": "", "ؓ": "", "ؔ": "", "ؕ": "",
  "ٍ": "", "ٌ": "", "ً": "", "ُ": "", "ِ": "", "َ": "",
  "ْ": "", "ّ": "", "ۂ": "h", "ۓ": "e"
};

function transliterateUrdu(text: string): string {
  let result = "";
  for (const char of text) {
    result += urduToLatin[char] || char;
  }
  return result;
}

function generateSlug(title: string, id: string): string {
  // Transliterate Urdu title to Latin
  const transliterated = transliterateUrdu(title);
  
  // Clean up: remove non-alphanumeric except hyphens and spaces
  const cleaned = transliterated
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  
  // Limit length and lowercase
  const slug = cleaned.substring(0, 60).toLowerCase();
  
  // If transliteration produced nothing usable, use the ID
  if (!slug || slug.length < 3) {
    const idParts = id.split("_");
    return idParts.length > 2 ? idParts.slice(2).join("-") : id;
  }
  
  return slug;
}

function UrduTextRenderer({ text }: { text: string }) {
  const lines = useMemo(() => {
    return text
      .split(/\r?\n/)
      .map((l) => l.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, "").trim());
  }, [text]);

  const blocks = useMemo(() => {
    const res: string[][] = [];
    let currentBlock: string[] = [];
    for (const line of lines) {
      if (!line) {
        if (currentBlock.length > 0) {
          res.push(currentBlock);
          currentBlock = [];
        }
      } else {
        currentBlock.push(line);
      }
    }
    if (currentBlock.length > 0) {
      res.push(currentBlock);
    }
    return res;
  }, [lines]);

  return (
    <div className="space-y-8 text-right font-serif" dir="rtl">
      {blocks.map((block, bIdx) => {
        const isPoetry =
          block.length <= 2 &&
          block.every((line) => line.length < 75 && line.split(/\s+/).length <= 13);

        if (isPoetry) {
          return (
            <div
              key={bIdx}
              className="my-6 sm:my-10 py-4 sm:py-6 px-4 sm:px-8 bg-brand-accent/[0.03] border-y border-dashed border-brand-accent/20 flex flex-col items-center justify-center space-y-3 sm:space-y-4 w-full md:max-w-xl md:mx-auto rounded-none shadow-sm animate-fade-in"
            >
              {block.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className="urdu-body text-lg sm:text-2xl md:text-3xl text-brand-primary font-semibold text-center leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          );
        }

        return (
          <p
            key={bIdx}
            className="urdu-body text-base sm:text-xl md:text-2xl text-brand-primary/95 leading-loose md:leading-extra-loose text-justify whitespace-pre-wrap select-text selection:bg-brand-accent/20 w-full"
          >
            {block.join("\n")}
          </p>
        );
      })}
    </div>
  );
}

export function ColumnsPage() {
  const navigate = useNavigate();
  const articles = useMemo(() => articlesData as ColumnEntry[], []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(articles.map((d) => d.year))) as string[];
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [articles]);

  const [activeYear, setActiveYear] = useState<string>("");

  useEffect(() => {
    if (!activeYear && years.length > 0) {
      setActiveYear(years[0]);
    }
  }, [years, activeYear]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeEntryId, setActiveEntryId] = useState<string>("");
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"large" | "compact" | "grid">("large");

  useEffect(() => {
    setSearchQuery("");
    setActiveEntryId("");
    setIsReaderOpen(false);
  }, [activeYear]);

  const entriesForYear = useMemo(() => {
    return articles.filter((d) => d.year === activeYear);
  }, [articles, activeYear]);

  useEffect(() => {
    if (activeEntryId) return;
    if (!entriesForYear.length) return;
    setActiveEntryId(entriesForYear[0].id);
  }, [activeEntryId, entriesForYear]);

  const visibleEntriesForYear = useMemo(() => {
    if (!searchQuery.trim()) return entriesForYear;
    const q = searchQuery.trim().toLowerCase();
    return entriesForYear.filter((e) => e.title.toLowerCase().includes(q));
  }, [entriesForYear, searchQuery]);

  const activeEntry = useMemo(
    () => entriesForYear.find((e) => e.id === activeEntryId),
    [entriesForYear, activeEntryId]
  );

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Page Editorial Header */}
      <div className="bg-bg-paper-dark py-28 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-5"
          >
            <div className="h-[1px] w-12 bg-brand-accent/60" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent font-semibold">JOURNALISM & ESSAYS</span>
            <div className="h-[1px] w-12 bg-brand-accent/60" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-3"
          >
            روزنامچہ کالم و ادبی مضامین
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.35em] uppercase text-brand-primary/60 font-semibold"
          >
            NEWSPAPER COLUMNS & LITERARY CARD ARCHIVE
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Year Selection Index (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 mb-2 border-b border-brand-primary/10 pb-3">
              <Newspaper size={18} className="text-brand-accent" />
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-brand-primary/50 font-bold">Archives Index</span>
            </div>

            <p className="text-xs font-sans text-brand-primary/60 leading-relaxed mb-4">
              Browse through decades of profound columns, literary reviews, and social critiques. Select a publishing year below:
            </p>

            <div className="space-y-3">
              {years.map((year, idx) => {
                const isActive = activeYear === year;
                return (
                  <motion.button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    whileHover={{ x: isActive ? 0 : 5 }}
                    className={`w-full p-5 text-left flex justify-between items-center transition-all duration-300 rounded-none cursor-pointer border ${
                      isActive
                        ? "bg-brand-primary border-brand-primary text-white shadow-xl"
                        : "bg-bg-paper border-brand-primary/10 text-brand-primary hover:border-brand-accent hover:bg-bg-paper-dark"
                    }`}
                  >
                    <div>
                      <h3 className={`urdu-header text-2xl mb-1 text-right leading-none ${isActive ? "text-white" : "text-brand-primary"}`}>
                        {year}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-2">
                        <span className={`text-[9px] font-sans tracking-widest uppercase font-semibold ${isActive ? "text-brand-accent" : "text-brand-primary/40"}`}>
                          Vol {year}
                        </span>
                        <span className="text-brand-primary/20">•</span>
                        <span className={`text-[9px] font-sans font-medium ${isActive ? "text-white/70" : "text-brand-primary/50"}`}>
                          {articles.filter((d) => d.year === year).length} columns
                        </span>
                      </div>
                    </div>
                    <div className={`text-[10px] font-sans tracking-widest border px-2 py-1 ml-4 ${
                      isActive ? "border-white/25 text-white/90" : "border-brand-accent/25 text-brand-accent"
                    }`}>
                      0{idx + 1}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Column Cards List (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Section Search Toolbar */}
                <div className="bg-bg-paper-dark border border-brand-primary/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Available Essays */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-primary/50 font-bold">AVAILABLE ESSAYS</span>
                    <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] font-sans font-bold">{visibleEntriesForYear.length}</span>
                  </div>
                  
                  {/* Center: Search input */}
                  <div className="relative w-full md:w-64">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-primary/30">
                      <Search size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search essays..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-brand-primary/10 text-xs font-sans tracking-wider text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Right: Grid Switcher (Premium Layout switcher added for columns page) */}
                  <div className="flex items-center bg-[#FAF4E9] border border-brand-primary/10 p-1 rounded-none shrink-0 self-center md:self-auto">
                    {/* Detailed (2 Columns) */}
                    <button
                      onClick={() => setViewMode("large")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                        viewMode === "large"
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-brand-primary/60 hover:text-brand-primary"
                      }`}
                      title="Detailed View (2 Columns)"
                    >
                      <LayoutGrid size={11} />
                      <span className="hidden sm:inline">Detailed (2x)</span>
                    </button>

                    {/* Standard (3 Columns) */}
                    <button
                      onClick={() => setViewMode("compact")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                        viewMode === "compact"
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-brand-primary/60 hover:text-brand-primary"
                      }`}
                      title="Standard View (3 Columns)"
                    >
                      <Grid2X2 size={11} />
                      <span className="hidden sm:inline">Standard (3x)</span>
                    </button>

                    {/* Compact (4 Columns) */}
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-sans tracking-widest uppercase font-bold transition-all cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-brand-primary/60 hover:text-brand-primary"
                      }`}
                      title="Compact View (4 Columns)"
                    >
                      <Grid3X3 size={11} />
                      <span className="hidden sm:inline">Compact (4x)</span>
                    </button>
                  </div>
                </div>

                {/* Literary Columns Cards Grid with multi-mode layout views */}
                <div className={`grid gap-6 transition-all duration-500 ${
                  viewMode === "large" 
                    ? "grid-cols-1 md:grid-cols-2" 
                    : viewMode === "compact" 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                }`}>
                  {visibleEntriesForYear.map((doc) => {
                    const excerptLength = viewMode === "large" ? 140 : viewMode === "compact" ? 70 : 0;
                    const excerpt = excerptLength > 0 && doc.text
                      ? doc.text.substring(0, excerptLength) + "..."
                      : "";

                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => {
                          const slug = generateSlug(doc.title, doc.id);
                          navigate(`/columns/${doc.year}/${slug}`);
                        }}
                        className={`bg-white border border-brand-primary/10 hover:border-brand-accent shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                          viewMode === "grid" ? "p-4.5" : "p-6"
                        }`}
                      >
                        <div className="text-right" dir="rtl">
                          <span className="text-[8px] font-sans tracking-[0.3em] uppercase text-brand-accent font-bold inline-block border-b border-brand-accent/20 pb-1 mb-4">
                            COLUMN ENTRY
                          </span>
                          
                          <h3 className={`urdu-body font-bold leading-normal mb-3 group-hover:text-brand-primary transition-colors ${
                            viewMode === "large" 
                              ? "text-2xl md:text-3xl text-amber-600" 
                              : viewMode === "compact" 
                                ? "text-xl md:text-2.5xl text-amber-600" 
                                : "text-lg md:text-xl text-amber-600 line-clamp-2"
                          }`}>
                            {doc.title}
                          </h3>
                          
                          {excerptLength > 0 && (
                            <p className="urdu-text text-sm text-brand-primary/60 leading-relaxed text-justify mb-5 line-clamp-3">
                              {excerpt}
                            </p>
                          )}
                        </div>

                        <div className="border-t border-brand-primary/5 pt-4 mt-auto flex items-center justify-between gap-2">
                          <span className="text-[9px] font-sans tracking-widest text-brand-primary/40 font-semibold flex items-center gap-1.5 uppercase shrink-0">
                            <Clock size={11} className="text-brand-accent" />
                            {doc.year} INDEX
                          </span>

                          <span
                            className={`text-[9px] font-sans tracking-widest text-brand-accent uppercase font-bold flex items-center gap-1 group-hover:text-brand-primary transition-colors cursor-pointer ${
                              viewMode === "grid" ? "hidden sm:flex" : "flex"
                            }`}
                          >
                            Read Full Column
                            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Redesigned Immersive Reading Cabinet Modal */}
      <AnimatePresence>
        {isReaderOpen && activeEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-primary/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsReaderOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-6xl bg-bg-paper border border-brand-accent/20 shadow-2xl relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Natural paper fine pattern texture overlay */}
              <div className="absolute inset-0 opacity-[0.015] bg-texture pointer-events-none" />

              {/* Reader Cabinet Header */}
              <div className="p-6 md:p-8 bg-bg-paper-dark border-b border-brand-primary/10 flex items-start justify-between gap-6 relative z-10">
                <div className="text-right w-full" dir="rtl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-brand-accent/15 text-brand-accent text-[9px] font-sans tracking-widest uppercase font-bold">
                      VOLUME {activeEntry.year}
                    </span>
                    <span className="text-[10px] font-sans text-brand-primary/40 uppercase font-medium tracking-widest flex items-center gap-1">
                      <Calendar size={11} />
                      ANNUAL RECORD
                    </span>
                  </div>
                  
                  <h3 className="urdu-header text-3xl md:text-5xl text-amber-600 leading-normal font-bold">
                    {activeEntry.title}
                  </h3>
                </div>

                <button
                  onClick={() => setIsReaderOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-brand-primary/10 text-brand-primary/50 hover:border-brand-accent hover:text-brand-accent transition-colors cursor-pointer bg-white"
                  aria-label="Close Reader"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Reader Cabinet Core Content Area - Full width on mobile */}
              <div className="p-4 sm:p-6 md:p-14 overflow-y-auto bg-bg-paper relative z-10 flex-1 custom-scroll">
                <div className="w-full max-w-none md:max-w-5xl md:mx-auto">
                  <UrduTextRenderer text={activeEntry.text} />
                  
                  {/* Decorative end mark signature */}
                  <div className="mt-16 flex items-center justify-center space-x-3 text-brand-accent/30 select-none">
                    <div className="h-[1px] w-12 bg-current" />
                    <CornerDownLeft size={16} />
                    <div className="h-[1px] w-12 bg-current" />
                  </div>
                </div>
              </div>

              {/* Footer control panel */}
              <div className="px-6 py-4 bg-bg-paper-dark border-t border-brand-primary/5 flex justify-between items-center relative z-10">
                <span className="text-[9px] font-sans tracking-widest text-brand-primary/40 font-bold uppercase">
                  PROF. NASIR ALI SYED
                </span>
                
                <button
                  onClick={() => setIsReaderOpen(false)}
                  className="px-6 py-2.5 bg-brand-primary text-white text-[9px] font-sans tracking-widest uppercase hover:bg-brand-accent transition-colors font-bold cursor-pointer"
                >
                  Return to Archive
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
