import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { images } from "../data";
import { BookOpen, Newspaper, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Standard bilingual dataset for professional timed text rotator
const verses = [
  {
    label: "نعتیہ شعر",
    lines: [
      "وہ جس کی وجہ سے خوشبو کو اعتبار ملا",
      "میں اس سخی کو بھلا کیا کہوں سوائے بہار"
    ]
  },
  {
    label: "شعر",
    lines: [
      "فلک پر ہوں تو مجھ پر طنز مت کر",
      "زمیں تیرا ستارہ ڈھونڈتا ہوں"
    ]
  },
  {
    label: "شعر",
    lines: [
      "یہ اور بات کہ موجود اپنے گھر میں ہوں",
      "میں تیری سمت مگر مستقل سفر میں ہوں"
    ]
  },
  {
    label: "شعر",
    lines: [
      "تقریب تیری یاد کی کمرے میں بپا تھی",
      "میں صدر بھی، سامع بھی تھا ، خود بول رہا تھا"
    ]
  }
];

export function Hero() {
  const navigate = useNavigate();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeVerseIdx, setActiveVerseIdx] = useState(0);

  // Perfect unified synchronized transition cycle every 6.5 seconds!
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVerseIdx((prevVerse) => {
        const nextVerse = (prevVerse + 1) % verses.length;
        setActiveImageIdx((prevImg) => (prevImg + 1) % images.hero.length);
        return nextVerse;
      });
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-bg-paper-dark pt-32 pb-16 md:pt-36 md:pb-20"
    >
      {/* Background elegant details */}
      <div className="absolute inset-0 opacity-[0.025] bg-texture pointer-events-none" />
      
      {/* Abstract elegant ambient blur graphics in corners */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
        
        {/* Poetry Card - Full width on mobile, order first */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-end text-center lg:text-right order-1">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent font-bold">Welcome & Greetings</span>
            <div className="h-[1px] w-8 bg-brand-accent lg:hidden" />
          </motion.div>

          {/* Calligraphic Urdu name & English titles */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="urdu-header text-4xl sm:text-5xl md:text-7.5xl text-brand-primary leading-normal mb-3"
          >
            پروفیسر ناصر علی سید
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[10px] sm:text-xs md:text-sm font-cinzel tracking-[0.2em] sm:tracking-[0.35em] uppercase text-brand-primary/50 font-bold mb-6 border-b border-brand-primary/10 pb-3 w-full lg:w-auto"
          >
            Eminent Urdu Scholar, Poet & Essayist
          </motion.h2>

          {/* Poetry Card - Responsive sizing for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="w-full max-w-xl bg-gradient-to-br from-[#FCFBF7] to-[#F5F2EA] border border-[#3D1D0E]/15 shadow-[0_20px_50px_rgba(58,28,14,0.12)] p-4 sm:p-6 md:p-8 mb-6 relative overflow-hidden min-h-[180px] sm:min-h-[220px] flex flex-col justify-center rounded-none"
          >
            {/* Fine natural paper pattern texture inside couplet block */}
            <div className="absolute inset-0 opacity-[0.025] bg-texture pointer-events-none" />
            
            {/* Gold double thin inner border representing luxury certificate backing */}
            <div className="absolute inset-1.5 border border-brand-accent/20 pointer-events-none z-10" />
            <div className="absolute inset-2.5 border border-brand-accent/5 pointer-events-none z-10" />

            {/* Pen & Ink - Hidden on very small mobile, smaller on mobile to prevent overlap */}
            <img
              src="/images/Gallery/pen & ink.png"
              alt="Pen & Ink Decorative Accent"
              className="hidden sm:block absolute w-10 h-10 md:w-14 md:h-14 object-contain pointer-events-none select-none opacity-60 md:opacity-80 bottom-2 left-2 md:bottom-3 md:left-4 -rotate-12 z-0"
            />

            {/* Left/Right quotes layout detail */}
            <div className="absolute left-5 top-5 text-brand-accent/15 text-5xl font-serif select-none pointer-events-none z-10">“</div>
            <div className="absolute right-5 bottom-5 text-brand-accent/15 text-5xl font-serif select-none pointer-events-none z-10">”</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVerseIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="space-y-2 sm:space-y-4 flex flex-col items-center relative z-10 px-2 sm:px-10 md:px-14"
              >
                {verses[activeVerseIdx].label && (
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand-accent font-bold mb-1 border-b border-brand-accent/20 pb-0.5">
                    {verses[activeVerseIdx].label}
                  </span>
                )}
                
                <div className="space-y-2 sm:space-y-4 flex flex-col items-center">
                  <p className="nastaliq text-lg sm:text-2xl md:text-3.5xl text-brand-primary leading-relaxed sm:leading-loose tracking-wide font-semibold text-center select-text selection:bg-brand-accent/20">
                    {verses[activeVerseIdx].lines[0]}
                  </p>
                  <p className="nastaliq text-lg sm:text-2xl md:text-3.5xl text-brand-primary leading-relaxed sm:leading-loose tracking-wide font-semibold text-center select-text selection:bg-brand-accent/20">
                    {verses[activeVerseIdx].lines[1]}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Interactive Call to Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => {
                navigate("/books");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-brand-accent transition-all duration-300 shadow-lg cursor-pointer"
            >
              <BookOpen size={13} />
              Explore Books
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                navigate("/columns");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-brand-primary/10 bg-white/50 text-brand-primary text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-brand-primary hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Newspaper size={13} />
              Read Columns
            </button>
          </motion.div>
        </div>

        {/* Hero Photo - Order second on mobile */}
        <div className="lg:col-span-5 flex justify-center items-center order-2 lg:order-2 mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-full lg:w-[410px] aspect-[4/5] bg-[#FAF4E9] border-4 border-[#3D1D0E] p-4.5 sm:p-5.5 md:p-6 shadow-2xl rounded-none relative"
          >
            {/* Elegant double wire thin gold/amber border detail (Museum framing) */}
            <div className="absolute inset-3 border border-brand-accent/30 pointer-events-none" />
            <div className="absolute inset-4.5 border border-brand-accent/15 pointer-events-none" />
            
            <div className="w-full h-full relative overflow-hidden bg-bg-paper-dark border border-brand-primary/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  src={images.hero[activeImageIdx]}
                  alt="Professor Nasir Ali Syed Portrait"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full object-cover grayscale-[10%] contrast-[1.03]"
                />
              </AnimatePresence>

              {/* Sophisticated dark gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle vintage photo clip accents */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-brand-accent/10 border-x border-dashed border-brand-accent/25 backdrop-blur-[2px] shadow-sm select-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
