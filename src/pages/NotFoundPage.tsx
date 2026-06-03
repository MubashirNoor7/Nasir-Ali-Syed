import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-paper flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-cinzel text-brand-primary/20 font-bold tracking-wider">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="urdu-header text-3xl md:text-4xl text-brand-primary mb-4" dir="rtl">
            صفہ نہیں ملا
          </h1>
          <h2 className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/60 mb-6">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-brand-primary/70 mb-8 leading-relaxed max-w-md mx-auto" dir="rtl">
            معذرت، آپ جس صفحے کو تلاش کر رہے ہیں وہ موجود نہیں ہے۔ شاید یہ ہٹا دیا گیا ہو یا پتہ تبدیل ہو گیا ہو۔
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group flex items-center gap-3 px-8 py-4 bg-brand-primary text-white text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-brand-accent transition-all duration-300 shadow-lg"
            >
              <Home size={14} />
              Back to Home
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 border border-brand-primary/20 text-brand-primary text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-brand-primary hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
