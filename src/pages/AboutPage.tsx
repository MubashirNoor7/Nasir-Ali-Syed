import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Bio } from "../components/Bio";

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>زندگی و خدمات | About - پروفیسر ناصر علی سید</title>
        <meta name="description" content="پروفیسر ناصر علی سید کی زندگی، تعلیم، تدریسی کیریئر، ادبی خدمات اور ایوارڈز۔ Born 1948, 31 years teaching, 5 published books, numerous awards." />
        <meta property="og:title" content="About Professor Nasir Ali Syed" />
        <meta property="og:description" content="Biography, career, awards and literary journey of Professor Nasir Ali Syed." />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://nasiralisyed.com/about" />
      </Helmet>
    <div className="min-h-screen bg-bg-paper">
      {/* Premium Standalone Header */}
      <div className="bg-bg-paper-dark py-24 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent">Life & Timeline</span>
            <div className="h-[1px] w-8 bg-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-2"
          >
            تعارف و ادبی خدمات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/50"
          >
            ABOUT & LITERARY CONTRIBUTIONS
          </motion.p>
        </div>
      </div>

      <main>
        <Bio />
      </main>
    </div>
    </>
  );
}
