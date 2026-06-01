import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { books, Book } from "../data";
import { Search, Filter, BookOpen, Calendar, Award, ChevronRight, X, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BooksPage() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  // List of all genres + "All" option
  const genres = [
    "All",
    ...Array.from(new Set(books.map((b) => b.genreEnglish))).filter((g) => g && g !== "All")
  ];

  const filteredBooks = books.filter((book) => {
    const matchesGenre = selectedGenre === "All" || book.genreEnglish === selectedGenre;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genreEnglish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Header banner */}
      <div className="bg-bg-paper-dark py-24 border-b border-brand-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-brand-accent">Books</span>
            <div className="h-[1px] w-8 bg-brand-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="urdu-header text-5xl md:text-7xl text-brand-primary leading-normal mb-2"
          >
            تصانیف
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-cinzel tracking-[0.3em] uppercase text-brand-primary/50"
          >
            BOOKS
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-16 border-b border-brand-primary/5 pb-10">
          {/* Genre Filters */}
          <div className="flex flex-wrap gap-3 order-2 lg:order-1">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-5 py-2.5 text-[10px] font-sans tracking-widest uppercase transition-all duration-300 rounded-none border ${
                  selectedGenre === genre
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "border-brand-primary/10 text-brand-primary/60 hover:border-brand-accent hover:text-brand-accent"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative order-1 lg:order-2 w-full lg:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-primary/30">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-paper-dark border border-brand-primary/10 text-xs font-sans tracking-wider text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredBooks.map((book, idx) => (
            <motion.div
              key={book.titleEnglish}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              onClick={() => setActiveBook(book)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Book Sleeve Cover Panel */}
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-bg-paper-dark shadow-2xl transition-all duration-500 hover:shadow-brand-primary/10">
                  {book.cover ? (
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden"
                      style={{ backgroundColor: book.color }}
                    >
                      {/* Geometric overlay */}
                      <div className="absolute inset-0 opacity-10 bg-texture" />
                      <div className="absolute inset-6 border border-white/20" />
                      <span className="urdu-header text-4xl text-white mb-6 font-bold leading-normal">{book.title}</span>
                      <div className="w-10 h-[1px] bg-white/40 mb-6" />
                      <span className="text-[9px] tracking-[0.3em] font-sans text-white/70 uppercase">{book.genreEnglish}</span>
                    </div>
                  )}

                  {/* Hover info panel */}
                  <div className="absolute inset-0 bg-brand-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-6 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white">
                      <BookOpen size={16} />
                    </div>
                    <span className="urdu-header text-3xl text-white mb-2 leading-normal">{book.title}</span>
                    <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-brand-accent mb-6 font-semibold">{book.genreEnglish}</span>
                    <p className="urdu-body text-base text-white/70 line-clamp-3 leading-relaxed mb-6 px-4">{book.description}</p>
                    <span className="px-6 py-2.5 border border-white/20 text-white text-[9px] font-sans tracking-widest uppercase hover:bg-white hover:text-brand-primary transition-colors">
                      Read Abstract
                    </span>
                  </div>

                  {/* Elegant Year Badge */}
                  <div className="absolute top-4 right-4 bg-brand-primary text-white text-[9px] font-sans tracking-widest px-3 py-1.5 shadow-lg">
                    {book.year}
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="urdu-header text-3xl text-amber-600 group-hover:text-brand-primary transition-colors">
                      {book.title}
                    </h3>
                    <span className="text-[8px] font-sans tracking-widest text-brand-accent border border-brand-accent/20 px-2 py-0.5 uppercase">
                      {book.genre}
                    </span>
                  </div>
                  <h4 className="text-[10px] font-sans tracking-widest text-brand-primary/40 uppercase mb-4">
                    {book.titleEnglish}
                  </h4>
                  <p className="urdu-body text-lg text-brand-primary/70 mb-6 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* View Citation details button */}
              <div className="flex items-center gap-2 text-[9px] font-sans tracking-[0.25em] text-brand-accent uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                <span>View Citation & Details</span>
                <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-24 bg-bg-paper-dark border border-brand-primary/5 rounded-none">
            <span className="text-4xl">📚</span>
            <h3 className="urdu-header text-3xl text-brand-primary mt-6 mb-2">کوئی کتاب نہیں ملی</h3>
            <p className="text-xs font-serif text-brand-primary/40 italic">No publications matched your search filters.</p>
          </div>
        )}

        {/* Interactive Book Abstract Modal */}
        <AnimatePresence>
          {activeBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBook(null)}
              className="fixed inset-0 bg-brand-primary/40 backdrop-blur-md z-100 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-bg-paper max-w-4xl w-full rounded-none shadow-2xl overflow-hidden border border-brand-primary/10 relative max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveBook(null)}
                  className="absolute top-6 right-6 text-brand-primary/40 hover:text-brand-primary transition-colors p-2 z-10"
                >
                  <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Book cover / Left */}
                  <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto bg-bg-paper-dark flex items-center justify-center border-r border-brand-primary/5">
                    {activeBook.cover ? (
                      <img 
                        src={activeBook.cover} 
                        alt={activeBook.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center p-12 text-center relative"
                        style={{ backgroundColor: activeBook.color }}
                      >
                        <div className="absolute inset-4 border border-white/10" />
                        <span className="urdu-header text-4xl text-white mb-4 leading-normal">{activeBook.title}</span>
                        <div className="w-10 h-[1px] bg-white/20 mb-4" />
                        <span className="text-[9px] tracking-widest font-sans text-white/50 uppercase">{activeBook.genreEnglish}</span>
                      </div>
                    )}
                  </div>

                  {/* Metadata / Right */}
                  <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                    <div>
                      {/* Genre Tag */}
                      <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[9px] font-sans tracking-widest uppercase inline-block mb-6 font-semibold">
                        {activeBook.genreEnglish} / {activeBook.genre}
                      </span>

                      {/* Titles */}
                      <h2 className="urdu-header text-4xl md:text-5xl text-brand-primary mb-2 leading-normal">
                        {activeBook.title}
                      </h2>
                      <h3 className="text-sm font-sans tracking-[0.2em] uppercase text-brand-primary/40 mb-8 border-b border-brand-primary/5 pb-4">
                        {activeBook.titleEnglish}
                      </h3>

                      {/* Detail fields */}
                      <div className="space-y-6 mb-8">
                        <div>
                          <span className="text-[10px] font-sans tracking-widest uppercase text-brand-primary/40 block mb-1">Publisher</span>
                          <p className="urdu-body text-xl text-brand-primary mb-1">{activeBook.publisher}</p>
                          <p className="text-xs font-serif text-brand-primary/60 italic">{activeBook.publisherEnglish}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <span className="text-[10px] font-sans tracking-widest uppercase text-brand-primary/40 block mb-1">Publication Year</span>
                            <p className="text-sm font-sans font-bold text-brand-accent">{activeBook.year}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-sans tracking-widest uppercase text-brand-primary/40 block mb-1">Medium / Language</span>
                            <p className="text-xs font-sans text-brand-primary">Urdu / Classical Print</p>
                          </div>
                        </div>
                      </div>

                      {/* Synopses */}
                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-sans tracking-widest uppercase text-brand-primary/40 block mb-2">Urdu Synopsis (خلاصہ)</span>
                          <p className="urdu-body text-xl text-brand-primary/70 leading-relaxed text-justify" dir="rtl">
                            {activeBook.description}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-sans tracking-widest uppercase text-brand-primary/40 block mb-2">English Abstract</span>
                          <p className="text-sm font-sans text-brand-primary/60 leading-relaxed text-justify">
                            {activeBook.descriptionEnglish}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-brand-primary/5 flex justify-end">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        {activeBook.reader && (
                          <button
                            onClick={() => {
                              navigate(`/books/read/${activeBook.id}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-brand-primary text-white text-[9px] font-sans tracking-widest uppercase hover:bg-brand-accent transition-colors"
                          >
                            <BookOpen size={14} /> Read Book
                          </button>
                        )}

                        {activeBook.pdf && (
                          <a
                            href={activeBook.pdf}
                            download
                            className="inline-flex items-center justify-center gap-3 px-6 py-2.5 border border-brand-primary/10 text-brand-primary text-[9px] font-sans tracking-widest uppercase hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-500"
                          >
                            <Download size={14} /> Download PDF
                          </a>
                        )}
                        <button 
                          onClick={() => setActiveBook(null)}
                          className="px-6 py-2.5 bg-brand-primary text-white text-[9px] font-sans tracking-widest uppercase hover:bg-brand-accent transition-colors"
                        >
                          Close Portal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
