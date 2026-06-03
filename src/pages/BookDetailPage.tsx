import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { books, Book } from "../data";
import { ArrowLeft, BookOpen, Calendar, Building2, Tag, Eye, Download, ChevronRight } from "lucide-react";

export function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundBook = books.find((b) => b.id === bookId);
    if (foundBook) {
      setBook(foundBook);
    } else {
      navigate("/books");
    }
  }, [bookId, navigate]);

  if (!book) {
    return (
      <div className="min-h-screen bg-bg-paper flex items-center justify-center">
        <div className="text-brand-primary/60">Loading...</div>
      </div>
    );
  }

  // Build absolute URL for OG tags
  const canonicalUrl = `https://nasiralisyed.com/books/${book.id}`;
  const coverImageUrl = book.cover 
    ? `https://nasiralisyed.com${book.cover}` 
    : "https://nasiralisyed.com/images/nasir%20sb%20logo.png";

  return (
    <>
      <Helmet>
        <title>{`${book.title} - ${book.titleEnglish} | پروفیسر ناصر علی سید`}</title>
        <meta name="description" content={`${book.description} - ${book.descriptionEnglish} Published ${book.year} by ${book.publisher}.`} />
        <meta name="keywords" content={`${book.title}, ${book.titleEnglish}, ${book.genre}, ${book.genreEnglish}, Professor Nasir Ali Syed, Urdu Literature, ${book.year}`} />
        
        {/* Open Graph for Facebook/WhatsApp */}
        <meta property="og:type" content="book" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${book.titleEnglish} - ${book.title}`} />
        <meta property="og:description" content={book.descriptionEnglish} />
        <meta property="og:image" content={coverImageUrl} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:locale" content="ur_PK" />
        <meta property="book:author" content="Professor Nasir Ali Syed" />
        <meta property="book:isbn" content="" />
        <meta property="book:release_date" content={book.year} />
        <meta property="book:tag" content={book.genreEnglish} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${book.titleEnglish} - ${book.title}`} />
        <meta name="twitter:description" content={book.descriptionEnglish} />
        <meta name="twitter:image" content={coverImageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            "name": book.titleEnglish,
            "inLanguage": "ur",
            "author": {
              "@type": "Person",
              "name": "Professor Nasir Ali Syed"
            },
            "datePublished": book.year,
            "publisher": book.publisherEnglish,
            "genre": book.genreEnglish,
            "description": book.descriptionEnglish,
            "image": coverImageUrl,
            "url": canonicalUrl
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-bg-paper">
        {/* Header Banner */}
        <div className="bg-bg-paper-dark py-20 border-b border-brand-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-6 text-sm text-brand-primary/60"
            >
              <Link to="/books" className="hover:text-brand-accent transition-colors">
                کتابیں
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-accent">{book.title}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="urdu-header text-4xl md:text-6xl text-brand-primary leading-normal"
            >
              {book.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-primary/70 font-body italic mt-4"
            >
              {book.titleEnglish}
            </motion.p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Book Cover */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] bg-bg-paper-dark rounded-lg shadow-2xl overflow-hidden border border-brand-primary/10">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    width="600"
                    height="800"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-primary/40">
                    <BookOpen className="w-24 h-24" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right - Book Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Genre Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm">
                <Tag className="w-4 h-4" />
                <span>{book.genre}</span>
                <span className="text-brand-accent/60">|</span>
                <span>{book.genreEnglish}</span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-xl text-brand-primary leading-relaxed font-body-urdu">
                  {book.description}
                </p>
                <p className="text-lg text-brand-primary/70 leading-relaxed font-body italic">
                  {book.descriptionEnglish}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-brand-primary/10">
                <div className="flex items-center gap-3 text-brand-primary/80">
                  <Calendar className="w-5 h-5 text-brand-accent" />
                  <div>
                    <p className="text-xs text-brand-primary/50 uppercase tracking-wider">Year</p>
                    <p className="font-medium">{book.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-brand-primary/80">
                  <Building2 className="w-5 h-5 text-brand-accent" />
                  <div>
                    <p className="text-xs text-brand-primary/50 uppercase tracking-wider">Publisher</p>
                    <p className="font-medium">{book.publisher}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(`/books/read/${book.id}`)}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-accent transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>Read Online</span>
                </button>
                
                {book.pdf && (
                  <a
                    href={book.pdf}
                    download
                    className="flex items-center gap-2 px-6 py-3 border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>

              {/* Back Button */}
              <button
                onClick={() => navigate("/books")}
                className="flex items-center gap-2 text-brand-primary/60 hover:text-brand-accent transition-colors mt-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Books</span>
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
