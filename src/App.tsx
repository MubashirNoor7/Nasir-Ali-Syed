import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { useState, useEffect, useRef, Suspense, lazy } from "react";

// Lazy load page components for code splitting (handle named exports)
const GalleryPage = lazy(() => import("./pages/GalleryPage").then(m => ({ default: m.GalleryPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const BooksPage = lazy(() => import("./pages/BooksPage").then(m => ({ default: m.BooksPage })));
const PoetryPage = lazy(() => import("./pages/PoetryPage").then(m => ({ default: m.PoetryPage })));
const ColumnsPage = lazy(() => import("./pages/ColumnsPage").then(m => ({ default: m.ColumnsPage })));
const BookReaderPage = lazy(() => import("./pages/BookReaderPage").then(m => ({ default: m.BookReaderPage })));
const BookDetailPage = lazy(() => import("./pages/BookDetailPage").then(m => ({ default: m.BookDetailPage })));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage").then(m => ({ default: m.ArticleDetailPage })));
const VideosPage = lazy(() => import("./pages/VideosPage").then(m => ({ default: m.VideosPage })));
const VideoDetailPage = lazy(() => import("./pages/VideoDetailPage").then(m => ({ default: m.VideoDetailPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
import { AnimatePresence, motion } from "motion/react";
import { bio, books, images, timelineEvents } from "./data";
import { ChevronRight, Calendar, BookOpen, Quote, Image, Tv } from "lucide-react";

// Global Scroll Reset component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Intersection-Observer based lightweight CountUp component
function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

function HomePage() {
  const navigate = useNavigate();
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  // Show all books on Homepage as requested
  const previewBooks = books;

  return (
    <>
      {/* Hero Welcome */}
      <Hero />

      {/* Videos Dynamic Preview Section */}
      <section className="py-16 bg-[#FAF4E9] border-b border-brand-primary/5 relative overflow-hidden">
        {/* Fine texture pattern */}
        <div className="absolute inset-0 opacity-[0.015] bg-texture pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Professional Video Framed Thumbnail / Live Player */}
          <div className="w-full md:w-[44%] max-w-sm flex justify-center shrink-0">
            <div className="relative w-full aspect-video bg-white border border-brand-primary/5 p-2.5 md:p-3 shadow-2xl rounded-none relative group">
              {/* Elegant double wire thin border detail */}
              <div className="absolute inset-1.5 md:inset-2 border border-brand-primary/5 pointer-events-none" />
              
              <div className="w-full h-full relative overflow-hidden bg-[#4A2411] border border-brand-primary/5 aspect-video">
                {isPlayerActive ? (
                  <iframe
                    src="https://www.youtube.com/embed/Uzxexs3839s?autoplay=1"
                    title="Featured Video Preview"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    onClick={() => setIsPlayerActive(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black cursor-pointer relative group"
                  >
                    {/* Visual video cover art backdrop */}
                    <img 
                      src="/images/thumbnails/ادبی نشست_ پروفیسر ناصر علی سید کا منتخب کلام.jpg"
                      alt="Featured Video Cover"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

                    {/* Pulsating play ring system */}
                    <div className="relative flex items-center justify-center w-16 h-14 z-10">
                      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-brand-accent/30 opacity-75"></span>
                      <div className="relative w-12 h-12 rounded-full border border-brand-accent bg-brand-accent flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-white group-hover:text-brand-primary transition-all duration-300 shadow-lg">
                        <span className="ml-0.5 text-xs font-sans font-bold text-[#4A2411]">▶</span>
                      </div>
                    </div>
                    
                    {/* Minimalist bilingual title tag inside preview card */}
                    <span className="relative z-10 urdu-header text-xl text-[#FFF8EB] mt-3 font-semibold leading-normal group-hover:text-brand-accent transition-colors">
                      ادبی نشست اور پوڈ کاسٹ
                    </span>
                    <span className="relative z-10 text-[7px] font-sans tracking-[0.25em] text-white/70 uppercase mt-0.5">
                      Click to play / کلامِ ناصر
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Side: Quick Text and Button */}
          <div className="w-full md:w-[56%] text-center md:text-right" dir="rtl">
            <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
              <div className="h-[1px] w-6 bg-brand-accent" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-accent font-bold">Featured Broadcast</span>
            </div>
            
            <h2 className="urdu-header text-3xl md:text-4.5xl text-brand-primary font-bold leading-tight mb-3">
              تازہ ترین گفتگو و انٹرویو
            </h2>
            <p className="urdu-text text-base text-brand-primary/75 mb-6 leading-relaxed text-justify">
              پروفیسر ناصر علی سید کے ادبی سیمینارز، ریڈیو نشریات، اور خصوصی ٹی وی انٹرویوز پر مشتمل گرانقدر گفتگو ویڈیو فارمیٹ میں ملاحظہ فرمائیں۔
            </p>
            
            <button
              onClick={() => {
                navigate("/videos");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center justify-center gap-2.5 px-8 py-3 bg-brand-primary text-white text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-brand-accent transition-all duration-300 shadow-md cursor-pointer mr-auto md:mr-0"
            >
              <Tv size={12} />
              ویڈیو گیلری دیکھیں
              <ChevronRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* About Brief Preview */}
      <section className="py-28 bg-bg-paper relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden shadow-2xl border border-brand-primary/5">
            <img src={images.hero[4]} alt="Professor Nasir Ali Syed" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-8 bg-brand-accent" />
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">About the Author</span>
            </div>
            <h2 className="urdu-header text-5xl md:text-6xl text-brand-primary mb-8 leading-tight">تعارف</h2>
            <p className="urdu-body text-xl md:text-2xl text-brand-primary/70 mb-6 leading-relaxed text-justify">
              پروفیسر ناصر علی سید اردو، پشتو اور ہندکو ادب کے ممتاز اور ہمہ جہت ادبی شخصیت ہیں۔ انہوں نے نصف صدی سے زائد عرصے پر محیط تخلیقی سفر میں کہانی نویسی، شاعری، تنقید، کمپئرنگ، ڈرامہ نگاری اور تدریس جیسے شعبوں میں گراں قدر خدمات سرانجام دیں۔
            </p>
            <button
              onClick={() => navigate("/about")}
              className="mt-8 self-start group flex items-center gap-3 px-10 py-4.5 bg-brand-primary text-white text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-brand-accent transition-all duration-300"
            >
              Read Full Biography <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Milestone Section - "ادبی سفر کا سنگِ میل" rendered directly on homepage */}
      <section className="py-24 bg-bg-paper-dark border-t border-brand-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="urdu-header text-4xl text-brand-primary">ادبی سفر کا سنگِ میل</h2>
            <div className="h-[1px] flex-grow bg-brand-primary/10" />
            <span className="text-[9px] font-sans tracking-[0.4em] uppercase text-brand-primary/40">Chronicle</span>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-5 before:w-[1px] before:bg-brand-primary/5">
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16 group"
              >
                <div className="absolute left-0 top-1 w-10 h-10 bg-white border border-brand-primary/10 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:border-brand-accent transition-colors duration-500">
                  <div className="w-2 h-2 bg-brand-primary/20 group-hover:bg-brand-accent rounded-full transition-colors duration-500" />
                </div>
                
                <div className="bg-white p-6 md:p-8 border border-brand-primary/5 shadow-sm group-hover:shadow-md transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="urdu-header text-2xl text-brand-primary group-hover:text-brand-accent transition-colors duration-500">{event.title}</h3>
                    <span className="text-xs font-serif font-bold text-brand-accent tracking-[0.2em]">{event.year}</span>
                  </div>
                  <p className="urdu-body text-xl text-brand-primary/60 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded 5-metric counting stats section starting from zero */}
      <section className="py-32 bg-bg-paper-dark relative overflow-hidden border-y border-brand-primary/5">
         <div className="absolute inset-0 opacity-[0.02] bg-texture pointer-events-none" />
         <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <div className="mb-20">
               <div className="w-12 h-[1px] bg-brand-accent/40 mx-auto mb-8" />
               <h2 className="urdu-header text-5xl text-brand-primary mb-4 leading-normal">ادبی خدمات کا ایک تسلسل</h2>
               <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">A Continuum of Literary Service</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
               {bio.stats.map((stat, idx) => (
                 <div key={idx} className="flex flex-col items-center p-6 bg-white shadow-xs border border-brand-primary/[0.03]">
                    <span className="text-4xl md:text-5xl font-serif text-brand-accent mb-3 font-semibold">
                      <CountUp end={stat.value} />
                    </span>
                    <h3 className="urdu-header text-xl text-brand-primary mb-1">{stat.label}</h3>
                    <p className="text-[9px] font-sans tracking-widest text-brand-primary/50 uppercase mb-2">{stat.labelEnglish}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Publications Preview Panel */}
      <section className="py-28 bg-bg-paper">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-brand-accent"></span>
                <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">Publications Showcase</span>
              </div>
              <h2 className="urdu-header text-5xl md:text-6xl text-brand-primary mb-2 leading-tight">ادبی تصانیف</h2>
              <p className="text-brand-primary/40 font-serif italic text-sm md:text-base">"A curated preview of published critical and poetic masterpieces."</p>
            </div>
            <button
              onClick={() => navigate("/books")}
              className="group flex items-center gap-3 px-8 py-3.5 border border-brand-primary/10 text-brand-primary text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-500"
            >
              Explore Full Archive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {previewBooks.map((book) => (
              <div key={book.titleEnglish} onClick={() => navigate("/books")} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-bg-paper-dark shadow-xl">
                  {book.cover ? (
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: book.color }}>
                      <span className="urdu-header text-3xl text-white mb-2">{book.title}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-brand-primary text-white text-[8px] font-sans tracking-widest px-2.5 py-1">
                    {book.year}
                  </div>
                </div>
                <h3 className="urdu-header text-2xl text-brand-primary group-hover:text-brand-accent transition-colors mb-1">{book.title}</h3>
                <span className="text-[9px] font-sans tracking-widest uppercase text-brand-primary/40">{book.titleEnglish}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poetry Featured Panel */}
      <section className="py-28 bg-bg-paper-dark border-t border-brand-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.02] text-[20rem] font-serif pointer-events-none select-none">✒️</div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="flex flex-col items-center mb-16">
            <Quote className="text-brand-accent mb-6" size={24} />
            <h2 className="urdu-header text-5xl text-brand-primary mb-2">دیوانِ کلام</h2>
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">Featured Couplet</p>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl mb-12 border border-brand-primary/5">
            <p className="nastaliq text-2xl md:text-3.5xl text-brand-primary leading-loose mb-4">
              یہ اور بات کہ موجود اپنے گھر میں ہوں
            </p>
            <p className="nastaliq text-2xl md:text-3.5xl text-brand-primary leading-loose">
              میں اس کے باوجود مسلسل سفر میں ہوں
            </p>
          </div>

          <button
            onClick={() => navigate("/poetry")}
            className="group flex items-center gap-3 px-10 py-4.5 bg-brand-primary text-white text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-brand-accent transition-all duration-300 mx-auto"
          >
            Read Selected Poetry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Gallery Brief Showcase */}
      <section className="py-28 bg-bg-paper">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-brand-accent"></span>
                <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">Moments Archive</span>
              </div>
              <h2 className="urdu-header text-5xl md:text-6xl text-brand-primary mb-2 leading-tight">تصویری البم</h2>
              <p className="text-brand-primary/40 font-serif italic text-sm md:text-base">"A look at lifetime achievements and literary gatherings."</p>
            </div>
            <button
              onClick={() => navigate("/gallery")}
              className="group flex items-center gap-3 px-8 py-3.5 border border-brand-primary/10 text-brand-primary text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-500"
            >
              View Full Album <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.gallery.slice(0, 3).map((item, idx) => (
              <div key={idx} onClick={() => navigate("/gallery")} className="group cursor-pointer aspect-4/3 overflow-hidden shadow-md">
                <img src={item.src} alt={item.captionEnglish || item.caption || ""} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact With Us Quick Banner Section (Positioned professionally just above Leave Msg section!) */}
      <section className="py-12 bg-bg-paper border-t border-b border-brand-primary/5 relative overflow-hidden">
        {/* Abstract subtle background decoration */}
        <div className="absolute inset-0 opacity-[0.01] bg-texture pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-accent font-bold">Contact With Us</span>
            </div>
            <h2 className="urdu-header text-3xl sm:text-4xl text-brand-primary leading-none font-bold">
              ہمارے ساتھ رابطہ کریں
            </h2>
            <p className="text-[11px] sm:text-xs font-sans text-brand-primary/50 tracking-wide mt-2 max-w-xl text-center md:text-left leading-relaxed">
              If you wish to share a personal thought, send a literary request, or discuss collaborations, feel free to visit our dedicated contact page.
            </p>
          </div>
          
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#5A2C16] border border-[#3D1D0E] text-white text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-brand-accent hover:border-brand-accent hover:scale-102 transition-all duration-300 shadow-md cursor-pointer font-bold"
          >
            <span>Send Message / رابطہ کریں</span>
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Relocated Contact Form Section - Positioned below Gallery and above Footer */}
      <section id="contact-form-section" className="py-24 bg-[#FAF4E9] border-t border-[#3A1C0E]/10 relative overflow-hidden">
        {/* Soft background warm amber glow to match hero easel styling */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent block mb-3">Inquiries</span>
            <h2 className="urdu-header text-5xl text-brand-primary mb-4">پیغام بھیجیں</h2>
            <p className="text-brand-primary/60 font-serif italic text-sm">"Get in touch for literary inquiries, collaborations, and academic lectures."</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#5A2C16] border border-[#3D1C0B] p-8 md:p-12 shadow-2xl rounded-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase">Full Name</label>
                     <input 
                       type="text" 
                       placeholder="نام"
                       className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/35 focus:outline-none focus:border-brand-accent transition-colors urdu-body" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase">Email Address</label>
                     <input 
                       type="email" 
                       placeholder="ای میل"
                       className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/35 focus:outline-none focus:border-brand-accent transition-colors urdu-body" 
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="اپنا پیغام یہاں لکھیں..."
                    className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/35 focus:outline-none focus:border-brand-accent transition-colors urdu-body resize-none"
                  ></textarea>
               </div>
               <button className="w-full py-4.5 bg-brand-accent hover:bg-white hover:text-brand-primary text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all transform active:scale-95 duration-300 shadow-md cursor-pointer">
                  Send Message / ارسال کریں
               </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg-paper overflow-x-hidden relative w-full max-w-full">
        <AnimatePresence>
          {loading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        <main className={`${loading ? "hidden" : "block"} overflow-x-hidden w-full max-w-full relative`}>
          <Navigation />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="overflow-x-hidden w-full max-w-full relative"
          >
            <Suspense fallback={<div className="min-h-screen bg-bg-paper flex items-center justify-center"><LoadingScreen /></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:bookId" element={<BookDetailPage />} />
                <Route path="/books/read/:bookId" element={<BookReaderPage />} />
                <Route path="/columns" element={<ColumnsPage />} />
                <Route path="/columns/:year/:slug" element={<ArticleDetailPage />} />
                <Route path="/poetry" element={<PoetryPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/videos/:videoId" element={<VideoDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </motion.div>
        </main>
      </div>
    </Router>
    </HelmetProvider>
  );
}
