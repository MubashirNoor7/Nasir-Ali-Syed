/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { images } from "../data";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextImg = () => {
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % images.gallery.length);
    }
  };

  const prevImg = () => {
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + images.gallery.length) % images.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-bg-paper">
      <main className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 text-brand-primary/40 hover:text-brand-accent transition-colors text-[10px] font-sans tracking-[0.4em] uppercase mb-8 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Link>
              <h1 className="urdu-header text-6xl md:text-8xl text-brand-primary mb-4">یادگاریں</h1>
              <p className="text-brand-accent font-sans uppercase tracking-[0.4em] text-[10px]">ALBUM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.gallery.map((imgObj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedImg(idx)}
                className="relative aspect-square md:aspect-[4/5] group overflow-hidden bg-bg-paper-dark cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={imgObj.src} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-primary/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImg}
              className="absolute left-4 md:left-10 text-white/30 hover:text-white transition-colors p-2"
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              onClick={nextImg}
              className="absolute right-4 md:right-10 text-white/30 hover:text-white transition-colors p-2"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl w-full flex flex-col items-center justify-center"
            >
              <div className="relative p-2 bg-white shadow-2xl">
                <img 
                  src={images.gallery[selectedImg].src} 
                  className="max-w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
