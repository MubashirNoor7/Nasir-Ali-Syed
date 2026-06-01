/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Facebook, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../data";

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (id: string, type: "scroll" | "link") => {
    if (type === "link") {
      navigate(`/${id}`);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "About", id: "about", type: "link" },
    { name: "Books Archive", id: "books", type: "link" },
    { name: "Daily Columns", id: "columns", type: "link" },
    { name: "Poetry Selection", id: "poetry", type: "link" },
    { name: "Moments Album", id: "gallery", type: "link" },
  ];

  return (
    <footer id="contact" className="bg-brand-primary text-white pt-24 pb-14 relative overflow-hidden border-t border-brand-accent/15">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-8">
          
          {/* Brand & Socials Side (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Displaying ONLY the elegant circular calligraphy logo in footer */}
            <div className="mb-8">
               <img src={images.logo} className="h-28 w-auto brightness-0 invert filter opacity-90 hover:opacity-100 transition-opacity" alt="Logo" />
            </div>

            {/* Premium Social Media Icons for Facebook and YouTube */}
            <div className="flex gap-4 mb-10">
              <a
                href="https://web.facebook.com/nasir.a.syed.90"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent hover:bg-white/5 transition-all duration-300 shadow-xs hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.youtube.com/@afrazalisyed"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent hover:bg-white/5 transition-all duration-300 shadow-xs hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-12">
               <div className="flex flex-col">
                  <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent mb-4">Contact</span>
                  <p className="urdu-body text-xl text-white/90" dir="rtl">براہِ کرم رابطے کے لیے سرورق پر موجود فارم استعمال کریں۔</p>
                  <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-white/40 mt-3">Please use the homepage contact form.</p>
               </div>

               <div className="flex flex-col">
                  <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent mb-4">Address</span>
                  <div className="flex items-start gap-4 text-white">
                     <MapPin size={16} className="text-brand-accent mt-1" />
                     <span className="urdu-body text-xl">پشاور، خیبر پختونخوا، پاکستان</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Quick Navigation (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col pt-4 items-start md:items-end text-left md:text-right w-full"
          >
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent mb-8">Navigation</span>
            <ul className="space-y-6">
               {navLinks.map((link, idx) => (
                 <li key={idx}>
                    <button 
                      onClick={() => handleLinkClick(link.id, link.type as "scroll" | "link")}
                      className="flex items-center md:flex-row-reverse gap-4 text-white/60 hover:text-brand-accent transition-all text-sm uppercase tracking-widest group cursor-pointer"
                    >
                       <span className="h-[1px] w-0 bg-brand-accent group-hover:w-8 transition-all duration-500" />
                       <span className="group-hover:translate-x-2 md:group-hover:-translate-x-2 transition-transform duration-500">{link.name}</span>
                    </button>
                 </li>
               ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="text-xs font-sans tracking-[0.25em] uppercase text-white/80 font-medium">
                 © 2026 Professor Nasir Ali Syed. All Rights Reserved.
              </div>
              <div className="text-xs font-sans tracking-wide text-white/60 leading-relaxed">
                 Built by <strong className="font-semibold text-amber-500">Afraz Ali Syed</strong> & <a href="https://mncreative.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline font-semibold">MN Creative</a>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
