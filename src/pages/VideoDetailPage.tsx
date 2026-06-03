import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { videos } from "../data";
import { ArrowLeft, Calendar, Tv, ExternalLink, Clock, ChevronRight } from "lucide-react";

interface Video {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  descriptionEnglish: string;
  url: string;
  date: string;
}

function getYoutubeVideoId(url: string): string {
  if (!url) return "";
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  }
  return videoId;
}

function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

function getYoutubeThumbnailUrl(url: string): string {
  const videoId = getYoutubeVideoId(url);
  // Try maxresdefault first, fallback to hqdefault
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
}

function getLocalThumbnailUrl(title: string): string {
  const cleanTitle = title.replace(/[:\\/*?"<>|]/g, "_").trim();
  return `/images/thumbnails/${encodeURIComponent(cleanTitle)}.jpg`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
}

export function VideoDetailPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();

  const video = useMemo(() => {
    return videos.find((v) => v.id === videoId);
  }, [videoId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  if (!video) {
    return (
      <div className="min-h-screen bg-bg-paper flex items-center justify-center">
        <div className="text-brand-primary/60">Video not found</div>
      </div>
    );
  }

  // Build URLs and meta
  const canonicalUrl = `https://nasiralisyed.com/videos/${video.id}`;
  const titleSlug = slugify(video.titleEnglish || video.title);
  const shareableUrl = `${canonicalUrl}/${titleSlug}`;
  
  // YouTube thumbnail for OG image
  const youtubeThumbUrl = getYoutubeThumbnailUrl(video.url);
  const localThumbUrl = getLocalThumbnailUrl(video.title);
  const ogImageUrl = youtubeThumbUrl || `https://nasiralisyed.com${localThumbUrl}`;
  
  // Description - use English if available, otherwise Urdu
  const description = (video.descriptionEnglish || video.description).substring(0, 200) + "...";

  return (
    <>
      <Helmet>
        <title>{`${video.titleEnglish || video.title} | Video ${video.date} | پروفیسر ناصر علی سید`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${video.title}, ${video.titleEnglish}, Video, Poetry, ${video.date}, Professor Nasir Ali Syed, Urdu Literature, مشاعرہ, کلام`} />
        
        {/* Open Graph for Facebook/WhatsApp */}
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={shareableUrl} />
        <meta property="og:title" content={video.titleEnglish || video.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:locale" content="ur_PK" />
        <meta property="video:release_date" content={video.date} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareableUrl} />
        <meta name="twitter:title" content={video.titleEnglish || video.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={shareableUrl} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.titleEnglish || video.title,
            "description": description,
            "thumbnailUrl": ogImageUrl,
            "uploadDate": video.date,
            "author": {
              "@type": "Person",
              "name": "Professor Nasir Ali Syed"
            },
            "contentUrl": video.url,
            "embedUrl": getYoutubeEmbedUrl(video.url),
            "url": shareableUrl
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-bg-paper">
        {/* Header Banner */}
        <div className="bg-bg-paper-dark py-16 border-b border-brand-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 pt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-4 text-sm text-brand-primary/60"
            >
              <Link to="/videos" className="hover:text-brand-accent transition-colors">
                ویڈیوز
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-accent">{video.date}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="urdu-header text-2xl md:text-3xl lg:text-4xl text-brand-primary leading-normal text-right mb-2"
              dir="rtl"
            >
              {video.title}
            </motion.h1>

            {video.titleEnglish && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-sans text-brand-primary/50 uppercase tracking-wider"
              >
                {video.titleEnglish}
              </motion.p>
            )}

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 mt-4 text-brand-primary/70"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span>{video.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-brand-accent" />
                <span>یوٹیوب ویڈیو</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-brand-primary/10 shadow-lg"
          >
            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${getYoutubeEmbedUrl(video.url)}?autoplay=0&rel=0`}
                title={video.titleEnglish || video.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6 md:p-8">
              <div className="text-right" dir="rtl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 bg-brand-accent/15 text-brand-accent text-[8px] font-sans tracking-widest uppercase font-bold">
                    {video.date} BROADCAST
                  </span>
                </div>

                <h2 className="urdu-body text-2xl md:text-3xl text-amber-600 font-bold mb-4">
                  {video.title}
                </h2>

                <p className="urdu-text text-base text-brand-primary/80 leading-relaxed mb-6">
                  {video.description}
                </p>
              </div>

              {video.descriptionEnglish && (
                <div className="border-t border-brand-primary/10 pt-6 mt-6">
                  <h3 className="text-xs font-sans font-bold tracking-wider text-brand-primary/50 uppercase mb-2">
                    {video.titleEnglish}
                  </h3>
                  <p className="text-sm font-sans text-brand-primary/70 leading-relaxed">
                    {video.descriptionEnglish}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-brand-primary/10">
                <button
                  onClick={() => navigate("/videos")}
                  className="flex items-center gap-2 px-5 py-2.5 border border-brand-primary/15 text-brand-primary text-xs font-sans tracking-widest uppercase hover:bg-brand-primary hover:text-white transition-all font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  واپس ویڈیوز
                </button>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-xs font-sans tracking-widest uppercase hover:bg-brand-accent transition-colors font-bold cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube پر دیکھیں
                </a>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
