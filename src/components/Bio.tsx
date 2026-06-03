import { motion } from "motion/react";
import { bio, timelineEvents, images } from "../data";
import { Award, BookOpen, User } from "lucide-react";

export function Bio() {
  return (
    <section id="about" className="py-32 bg-bg-paper-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
         <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-primary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Portrait Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-brand-accent/10 rounded-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl border-4 border-white">
                <img 
                  src={images.hero[4]} 
                  width="410"
                  height="513"
                  className="w-full h-full object-cover transition-all duration-1000" 
                  referrerPolicy="no-referrer" 
                />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-brand-primary p-8 shadow-2xl hidden md:block">
               <div className="text-white urdu-header text-4xl mb-1">50+</div>
               <div className="text-white/60 text-[10px] font-sans tracking-widest uppercase">Years of Literary Service</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-8 bg-brand-accent" />
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-accent">Biography</span>
            </div>
            
            <h2 className="urdu-header text-5xl md:text-6xl text-brand-primary mb-10 leading-tight">
              تعارف: {bio.name}
            </h2>
            
            <div className="space-y-8 mb-8">
               <p className="urdu-body text-xl md:text-2xl text-brand-primary/70 text-justify leading-relaxed">
                {bio.name} اردو، پشتو اور ہندکو ادب کے ممتاز اور ہمہ جہت ادبی شخصیت ہیں۔ انہوں نے نصف صدی سے زائد عرصے پر محیط تخلیقی سفر میں کہانی نویسی، شاعری، تنقید، کمپئرنگ، ڈرامہ نگاری اور تدریس جیسے شعبوں میں گراں قدر خدمات سرانجام دیں۔
               </p>
               <p className="urdu-body text-xl md:text-2xl text-brand-primary/70 text-justify leading-relaxed">
                ان کی تحریروں میں معاشرتی مسائل کا گہرا ادراک اور انسانی نفسیات کی باریکیاں نمایاں ہیں۔ وہ پشاور کی ادبی فضاؤں کا ایک روشن ستارہ ہیں جنہوں نے نسلوں کی ادبی آبیاری کی۔
               </p>
            </div>

            {/* Premium callout card to fill space and look highly professional */}
            <div className="border-l-4 border-brand-accent bg-brand-accent/5 p-6 mb-12 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-10 opacity-[0.08] pointer-events-none select-none">
                <span className="nastaliq text-7xl text-brand-accent">قلم</span>
              </div>
              <p className="urdu-body text-lg md:text-xl text-brand-accent leading-relaxed italic text-right" dir="rtl">
                "ادب زندگی کا آئینہ ہی نہیں بلکہ زندگی کو نکھارنے اور سنوارنے کا ایک فکری عمل بھی ہے۔"
              </p>
              <div className="h-[1px] w-8 bg-brand-accent/30 my-3 ml-auto" />
              <div className="text-right">
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-accent/70 leading-none">
                  — Literature as a vehicle for social change
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-white border border-brand-primary/5 shadow-sm">
                 <div className="text-brand-accent urdu-header text-xl mb-2">پیدائش</div>
                 <div className="text-brand-primary/60 text-sm font-serif">{bio.birthYear} — {bio.birthPlace}</div>
              </div>
              <div className="p-6 bg-white border border-brand-primary/5 shadow-sm">
                 <div className="text-brand-accent urdu-header text-xl mb-2">تعلیمی پس منظر</div>
                 <div className="text-brand-primary/60 text-sm">{bio.education}</div>
              </div>
              <div className="p-6 bg-white border border-brand-primary/5 shadow-sm">
                 <div className="text-brand-accent urdu-header text-xl mb-2">موجودہ ذمہ داری</div>
                 <div className="text-brand-primary/60 text-sm">{bio.currentRole}</div>
              </div>
            </div>

            {/* Timeline / History */}
            <div className="mt-20">
               <div className="flex items-center gap-6 mb-12">
                  <h3 className="urdu-header text-4xl text-brand-primary">ادبی سفر کا سنگِ میل</h3>
                  <div className="h-[1px] flex-grow bg-brand-primary/5" />
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
                       
                       <div className="bg-white p-8 border border-brand-primary/5 shadow-sm group-hover:shadow-md transition-all duration-500">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                             <h4 className="urdu-header text-2xl text-brand-primary group-hover:text-brand-accent transition-colors duration-500">{event.title}</h4>
                             <span className="text-xs font-serif font-bold text-brand-accent tracking-[0.2em]">{event.year}</span>
                          </div>
                          <p className="urdu-body text-xl text-brand-primary/60 leading-relaxed">{event.description}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Awards Section - Professional List */}
        <div className="mt-32 border-t border-brand-primary/10 pt-24">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <h3 className="urdu-header text-4xl text-brand-primary">اعزازات و اعتراف</h3>
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-primary/40">Awards & Honors</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bio.awards.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-white border border-brand-primary/5 shadow-sm group hover:border-brand-accent/50 transition-all duration-500"
                >
                   <Award className="text-brand-accent mb-6 opacity-40 group-hover:opacity-100 transition-opacity" size={32} />
                   <h4 className="urdu-body text-2xl text-brand-primary mb-2">{award.urdu}</h4>
                   <p className="text-[10px] font-sans tracking-widest text-brand-primary/40 uppercase">{award.english}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
