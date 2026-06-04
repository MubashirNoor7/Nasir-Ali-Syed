/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { sampleGhazals } from "../data";
import { Quote, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PoetrySection() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/poetry");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const ghazal = sampleGhazals[0];

  return (
    <section id="poetry" className="py-32 bg-bg-paper relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.02] text-[30rem] font-serif pointer-events-none select-none">
         ✒️
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 border border-brand-accent/20 rounded-full flex items-center justify-center mb-8"
          >
            <Quote className="text-brand-accent" size={24} />
          </motion.div>
          <h2 className="urdu-header text-5xl md:text-6xl text-brand-primary mb-4">انتخابِ کلام</h2>
          <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">Poetry Collection</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-brand-primary/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Poetry Art (Left) */}
              <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden border-r border-brand-primary/5">
                <img 
                  src={ghazal.image || "/images/Gallery/Nasir-Ali-Syed.webp"} 
                  className="w-full h-full object-cover transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-transparent" />
              </div>

              {/* Couplets (Right) */}
              <div className="lg:col-span-8 p-12 md:p-20 relative">
                 <div className="flex justify-between items-start mb-16">
                    <h3 className="urdu-header text-3xl text-brand-primary opacity-30">{ghazal.title}</h3>
                    <div className="flex gap-4">
                       <button className="text-brand-primary/40 hover:text-brand-accent transition-colors"><Heart size={18} /></button>
                       <button className="text-brand-primary/40 hover:text-brand-accent transition-colors"><Share2 size={18} /></button>
                    </div>
                 </div>

                 <div className="space-y-16 text-center">
                    {ghazal.content.map((couplet, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 + idx * 0.2 }}
                        className="space-y-6 group"
                      >
                         {couplet.map((line, lIdx) => (
                           <p key={lIdx} className="nastaliq text-3xl md:text-5xl text-brand-primary leading-normal group-hover:text-brand-accent transition-colors duration-500">
                             {line}
                           </p>
                         ))}
                         {idx < ghazal.content.length - 1 && (
                           <div className="flex justify-center gap-1 opacity-20">
                              {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-brand-accent rounded-full"></div>)}
                           </div>
                         )}
                      </motion.div>
                    ))}
                 </div>

                 <div className="mt-20 pt-10 border-t border-brand-primary/5 flex flex-col items-center">
                    <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-primary/40 mb-4">Themes</span>
                    <div className="flex gap-4">
                       <span className="urdu-body text-xl text-brand-accent">{ghazal.theme}</span>
                       <span className="text-brand-primary/20 opacity-30">/</span>
                       <span className="text-xs font-serif italic text-brand-primary/40">{ghazal.themeEnglish}</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </motion.div>

        <div className="mt-20 text-center">
           <button onClick={handleNavigate} className="group relative px-10 py-4 border border-brand-primary/10 text-brand-primary text-xs font-sans tracking-[0.4em] uppercase transition-all hover:bg-brand-primary hover:text-white cursor-pointer">
              Explore Poetry Archive
              <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500" />
           </button>
        </div>
      </div>
    </section>
  );
}
