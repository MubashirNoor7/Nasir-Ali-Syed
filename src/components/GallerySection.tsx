/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { images } from "../data";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const navigate = useNavigate();

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
    <section id="album" className="py-32 bg-bg-paper-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 border border-brand-accent/20 rounded-full flex items-center justify-center mb-4"
          >
            <div className="w-1 h-1 bg-brand-accent rounded-full" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="urdu-header text-5xl md:text-6xl text-brand-primary"
          >
            تصویری جھلکیاں
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-accent font-sans uppercase tracking-[0.4em] text-[10px]"
          >
            Historical Archives & Moments
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.gallery.slice(0, 4).map((imgObj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImg(idx)}
              className="relative aspect-square group overflow-hidden bg-white border border-brand-primary/5 cursor-pointer shadow-sm"
            >
              <img 
                src={imgObj.src} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
            <button 
              onClick={() => navigate("/gallery")}
              className="px-12 py-4 border border-brand-primary/10 text-brand-primary text-[10px] font-sans tracking-[0.4em] uppercase hover:bg-brand-primary hover:text-white transition-all duration-500 flex items-center gap-4 group"
            >
              View Full Gallery
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>

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
    </section>
  );
}
