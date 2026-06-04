import { motion } from "motion/react";

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-bg-paper flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Spinning circle loader */}
        <motion.div
          className="w-12 h-12 border-3 border-brand-primary/20 border-t-brand-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Loading text */}
        <motion.p
          className="text-sm font-sans text-brand-primary/60 tracking-wider uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
