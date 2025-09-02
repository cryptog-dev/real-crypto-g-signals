import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Loader2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { blogsAPI } from "../utils/api";

// Helper: generate TOC
const generateTOC = (html) => {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3"));
  return headings.map((heading, index) => ({
    id: `heading-${index}`,
    text: heading.textContent,
    level: parseInt(heading.tagName.substring(1)),
  }));
};

// Helper: format date
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Helper: reading time
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text?.split(/\s+/).length || 0;
  return Math.ceil(wordCount / wordsPerMinute);
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTOC, setShowTOC] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        try {
          const response = await blogsAPI.getById(id);
          setBlog(response.data);
          return;
        } catch {
          console.log("Trying public endpoint...");
        }
        const publicResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs/public/${id}`
        );
        setBlog(publicResponse.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        if (err.response?.status === 404) setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral-light)]">
        <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-[var(--color-neutral-light)]">
        <h1 className="text-3xl font-bold text-contrast-high mb-4">
          Blog Not Found
        </h1>
        <p className="text-contrast-medium mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="lego-button px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const toc = generateTOC(blog.content);
  const readingTime = calculateReadingTime(blog.content);

  const handleShare = async () => {
    const url = window.location.href;
    const title = blog.title;
    const text = blog.content?.substring(0, 200) + "...";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)]">
      {/* Hero */}
      {blog.image && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img
            src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral-dark)]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white hover:text-[var(--color-neutral-light)] transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </button>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-neutral-light)]/80">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {formatDate(blog.created_at)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {readingTime} min read
                </span>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 mr-1.5 ${
                      isBookmarked ? "fill-current" : ""
                    }`}
                  />
                  {isBookmarked ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* TOC */}
          {toc.length > 0 && (
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 lego-card p-4">
                <button
                  onClick={() => setShowTOC(!showTOC)}
                  className="lg:hidden lego-button w-full mb-4"
                >
                  {showTOC ? "Hide" : "Show"} Table of Contents
                </button>
                <div className={`${showTOC ? "block" : "hidden lg:block"}`}>
                  <h3 className="text-lg font-semibold text-contrast-high mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm ${
                          item.level === 2
                            ? "text-contrast-high pl-2"
                            : "text-contrast-medium pl-4"
                        } hover:text-[var(--color-primary)] transition-colors`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}

          {/* Blog */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 lego-card overflow-hidden"
          >
            <div className="p-6 md:p-10">
              <div
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none text-contrast-high"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content?.replace(/\n/g, "<br />") ||
                      "No content available.",
                  }}
                />
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-[var(--color-border-light)]">
                  <h3 className="text-sm font-medium text-contrast-medium mb-3">
                    TAGS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-[var(--color-neutral-dark)]/10 text-contrast-high rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-[var(--color-border-light)]">
                <h3 className="text-sm font-medium text-contrast-medium mb-4">
                  SHARE THIS POST
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleShare}
                    className="lego-button w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-primary)]"
                    aria-label="Share"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="lego-button w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-accent1)]"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="lego-button w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-secondary)]"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    onClick={handleShare}
                    className={`lego-button w-10 h-10 flex items-center justify-center rounded-full ${
                      isCopied
                        ? "text-[var(--color-accent2)]"
                        : "text-contrast-medium"
                    }`}
                  >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Author */}
              <div className="mt-10 pt-6 border-t border-[var(--color-border-light)]">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                    <img
                      src="/logo.png"
                      alt="therealcryptog"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-contrast-high">
                      TheRealCryptoG
                    </h3>
                    <p className="text-contrast-medium text-sm">
                      Crypto Market Analyst
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
