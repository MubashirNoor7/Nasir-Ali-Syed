import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import articlesData from "../data/articles.json";
import { ArrowLeft, Calendar, User, ChevronRight, Clock } from "lucide-react";

interface Article {
  id: string;
  year: string;
  title: string;
  text: string;
}

// Basic Urdu to Latin transliteration mapping
const urduToLatin: Record<string, string> = {
  "ا": "a", "آ": "aa", "ب": "b", "پ": "p", "ت": "t", "ٹ": "tt",
  "ث": "s", "ج": "j", "چ": "ch", "ح": "h", "خ": "kh", "د": "d",
  "ڈ": "dd", "ذ": "z", "ر": "r", "ڑ": "rr", "ز": "z", "ژ": "zh",
  "س": "s", "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z",
  "ع": "a", "غ": "gh", "ف": "f", "ق": "q", "ک": "k", "گ": "g",
  "ل": "l", "م": "m", "ن": "n", "ں": "n", "و": "o", "ہ": "h",
  "ھ": "h", "ی": "y", "ے": "e", "ء": "", "ٔ": "", "ٓ": "",
  "ؑ": "", "ؐ": "", "ؒ": "", "ؓ": "", "ؔ": "", "ؕ": "",
  "ٍ": "", "ٌ": "", "ً": "", "ُ": "", "ِ": "", "َ": "",
  "ْ": "", "ّ": "", "ۂ": "h", "ۓ": "e"
};

function transliterateUrdu(text: string): string {
  let result = "";
  for (const char of text) {
    result += urduToLatin[char] || char;
  }
  return result;
}

function generateSlug(title: string, id: string): string {
  const transliterated = transliterateUrdu(title);
  const cleaned = transliterated
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const slug = cleaned.substring(0, 60).toLowerCase();
  
  if (!slug || slug.length < 3) {
    const idParts = id.split("_");
    return idParts.length > 2 ? idParts.slice(2).join("-") : id;
  }
  
  return slug;
}

export function ArticleDetailPage() {
  const { year, slug } = useParams<{ year: string; slug: string }>();
  const navigate = useNavigate();

  const articles = useMemo(() => articlesData as Article[], []);

  const article = useMemo(() => {
    // Find article by matching year and generated slug
    return articles.find((a) => {
      if (a.year !== year) return false;
      const articleSlug = generateSlug(a.title, a.id);
      return articleSlug === slug;
    });
  }, [articles, year, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [year, slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-paper flex items-center justify-center">
        <div className="text-brand-primary/60">Article not found</div>
      </div>
    );
  }

  // Build URLs and meta
  const articleSlug = generateSlug(article.title, article.id);
  const canonicalUrl = `https://nasiralisyed.com/columns/${article.year}/${articleSlug}`;
  const shareableUrl = canonicalUrl;
  
  // Extract first 200 chars for description (strip newlines)
  const description = article.text
    .replace(/\n/g, " ")
    .substring(0, 200)
    .trim() + "...";

  // Format article text with paragraphs
  const formattedText = article.text.split("\n\n").map((paragraph, idx) => (
    <p key={idx} className="mb-6 leading-relaxed text-lg">
      {paragraph}
    </p>
  ));

  return (
    <>
      <Helmet>
        <title>{`${article.title} - Column ${article.year} | پروفیسر ناصر علی سید`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${article.title}, Column, Article, ${article.year}, Professor Nasir Ali Syed, Urdu Literature, ادب, کالم`} />
        
        {/* Open Graph for Facebook/WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareableUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://nasiralisyed.com/images/nasir%20sb%20logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ur_PK" />
        <meta property="article:author" content="Professor Nasir Ali Syed" />
        <meta property="article:published_time" content={article.year} />
        <meta property="article:section" content="Columns" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareableUrl} />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://nasiralisyed.com/images/nasir%20sb%20logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={shareableUrl} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "inLanguage": "ur",
            "author": {
              "@type": "Person",
              "name": "Professor Nasir Ali Syed"
            },
            "datePublished": article.year,
            "articleSection": "Columns",
            "description": description,
            "url": shareableUrl
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-bg-paper">
        {/* Header Banner */}
        <div className="bg-bg-paper-dark py-20 border-b border-brand-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-6 text-sm text-brand-primary/60"
            >
              <Link to="/columns" className="hover:text-brand-accent transition-colors">
                کالمز
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-accent">{article.year}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-accent truncate max-w-[200px]">{article.title.substring(0, 30)}...</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="urdu-header text-3xl md:text-4xl lg:text-5xl text-brand-primary leading-normal text-right"
              dir="rtl"
            >
              {article.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 mt-6 text-brand-primary/70"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span>{article.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-accent" />
                <span>پروفیسر ناصر علی سید</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-accent" />
                <span>کالم</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            dir="rtl"
          >
            <div className="urdu-body text-xl leading-loose text-brand-primary">
              {formattedText}
            </div>
          </motion.article>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-brand-primary/10"
          >
            <button
              onClick={() => navigate("/columns")}
              className="flex items-center gap-2 text-brand-primary/60 hover:text-brand-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>واپس کالمز کی فہرست</span>
            </button>
          </motion.div>
        </main>
      </div>
    </>
  );
}
