import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Facebook, Youtube, Send, ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "No Subject",
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again later or email directly.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Editorial Header */}
      <div className="bg-bg-paper-dark py-24 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent">Inquiries & Dialogue</span>
            <div className="h-[1px] w-8 bg-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-2"
          >
            رابطہ کریں
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/50"
          >
            GET IN TOUCH & LEAVE A MESSAGE
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Back navigation */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brand-primary/50 hover:text-brand-accent transition-colors text-[10px] font-sans tracking-[0.4em] uppercase group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Leave Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#5A2C16] border border-[#3D1C0B] p-8 md:p-12 shadow-2xl relative"
          >
            {/* Fine natural paper pattern texture inside form */}
            <div className="absolute inset-0 opacity-[0.015] bg-texture pointer-events-none" />

            <div className="relative z-10 text-right mb-10" dir="rtl">
              <h2 className="urdu-header text-3xl md:text-4.5xl text-[#FFF8EB] mb-3">
                پیغام بھیجیں
              </h2>
              <p className="urdu-text text-[#EAD8C3]/70 text-sm">
                ادبی علمی خدمات، کتب پر تبصرہ اور دیگر معلوماتی گفتگو کے لیے اپنی قیمتی آرا یہاں ارسال فرمائیں۔
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 bg-emerald-500/10 border border-emerald-500/25 p-8 text-center flex flex-col items-center justify-center space-y-4"
              >
                <CheckCircle2 size={48} className="text-emerald-400" />
                <div dir="rtl">
                  <h3 className="urdu-body text-2xl text-white font-bold mb-2">پیغام کامیابی سے موصول ہو گیا ہے</h3>
                  <p className="text-[#EAD8C3]/80 text-xs font-sans tracking-wide mb-4">
                    Thank you for your message! Professor Nasir Ali Syed will get back to you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-emerald-400 text-xs font-sans tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 bg-red-500/10 border border-red-500/25 p-8 text-center flex flex-col items-center justify-center space-y-4"
              >
                <XCircle size={48} className="text-red-400" />
                <div dir="rtl">
                  <h3 className="urdu-body text-2xl text-white font-bold mb-2">پیغام بھیجنے میں نقص</h3>
                  <p className="text-[#EAD8C3]/80 text-xs font-sans tracking-wide mb-2">
                    {errorMessage}
                  </p>
                  <p className="text-[#EAD8C3]/60 text-xs font-sans tracking-wide mb-4">
                    Error sending message. Please try again or email directly at nasiralisyed@gmail.com
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-red-400 text-xs font-sans tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase font-bold">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="اپنا نام"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors urdu-body text-right" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase font-bold">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="ای میل ایڈریس"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors text-right" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase font-bold">
                    Subject / عنوان
                  </label>
                  <input 
                    type="text" 
                    placeholder="موضوع"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors urdu-body text-right" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-sans tracking-widest text-[#EAD8C3]/60 uppercase font-bold">
                    Message / پیغام
                  </label>
                  <textarea 
                    rows={6}
                    required
                    placeholder="اپنا پیغام یہاں تفصیل سے تحریر کریں..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#4A2411]/50 border border-[#3D1C0B]/40 px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors urdu-body resize-none text-right"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4.5 bg-brand-accent hover:bg-white hover:text-brand-primary text-white font-bold uppercase tracking-[0.25em] text-[10px] transition-all transform active:scale-95 duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      Send Message / پیغام ارسال کریں
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Nasir Ali Syed Section (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            {/* Biography Profile Widget */}
            <div className="bg-white border border-brand-primary/10 p-8 shadow-md">
              <div className="text-right" dir="rtl">
                <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-brand-accent font-bold inline-block border-b border-brand-accent/20 pb-1 mb-5">
                  LITERARY PROFILE
                </span>
                
                <h3 className="urdu-body text-3xl text-brand-primary font-bold mb-3">
                  پروفیسر ناصر علی سید
                </h3>
                <p className="text-[10px] font-sans tracking-widest text-brand-primary/50 font-bold uppercase mb-4">
                  SCHOLAR, POET, ESSAYIST
                </p>
                
                <p className="urdu-text text-base text-brand-primary/75 leading-relaxed text-justify">
                  پروفیسر ناصر علی سید اردو شعر و نثر کے ایک نامور معمار ہیں۔ وہ گزشتہ کئی دہائیوں سے ادبی جریدوں اور کالموں کے ذریعے علمی شعور بیدار کرنے کے سفر پر گامزن ہیں۔
                </p>
              </div>
            </div>

            {/* Email & Location details */}
            <div className="bg-white border border-brand-primary/10 p-8 shadow-md space-y-6">
              <div className="flex items-start md:flex-row-reverse gap-4 justify-between" dir="rtl">
                <div className="w-12 h-12 bg-brand-accent/5 border border-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
                  <Mail size={20} />
                </div>
                <div className="text-right flex-1">
                  <h4 className="text-[10px] font-sans tracking-[0.2em] text-brand-primary/40 font-bold uppercase mb-1">
                    Direct Email
                  </h4>
                  <p className="urdu-body text-2xl text-brand-primary font-semibold mb-1">
                    ای میل رابطہ
                  </p>
                  <a 
                    href="mailto:nasiralisyed@gmail.com" 
                    className="text-xs sm:text-sm font-sans text-brand-accent font-bold hover:text-brand-primary transition-colors break-all"
                  >
                    nasiralisyed@gmail.com
                  </a>
                </div>
              </div>

              <div className="h-[1px] w-full bg-brand-primary/5" />

              <div className="flex items-start md:flex-row-reverse gap-4 justify-between" dir="rtl">
                <div className="w-12 h-12 bg-brand-accent/5 border border-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="text-right flex-1">
                  <h4 className="text-[10px] font-sans tracking-[0.2em] text-brand-primary/40 font-bold uppercase mb-1">
                    Address
                  </h4>
                  <p className="urdu-body text-2xl text-brand-primary font-semibold mb-1">
                    مقام
                  </p>
                  <p className="text-xs font-sans text-brand-primary/65 leading-relaxed font-semibold">
                    Peshawar, Khyber Pakhtunkhwa, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Social Medias Grid */}
            <div className="bg-white border border-brand-primary/10 p-8 shadow-md">
              <div className="text-right mb-6" dir="rtl">
                <h4 className="text-[10px] font-sans tracking-[0.2em] text-brand-primary/40 font-bold uppercase mb-1">
                  Social Medias
                </h4>
                <p className="urdu-body text-2xl text-brand-primary font-semibold">
                  سوشل میڈیا روابط
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://web.facebook.com/nasir.a.syed.90"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4.5 border border-[#3A1C0E]/10 bg-bg-paper-dark hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm font-sans tracking-[0.2em] uppercase text-[10px] font-bold text-brand-primary"
                >
                  <Facebook size={14} className="text-brand-accent" />
                  Facebook
                </a>

                <a
                  href="https://www.youtube.com/@afrazalisyed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4.5 border border-[#3A1C0E]/10 bg-bg-paper-dark hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm font-sans tracking-[0.2em] uppercase text-[10px] font-bold text-brand-primary"
                >
                  <Youtube size={14} className="text-brand-accent" />
                  YouTube
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
