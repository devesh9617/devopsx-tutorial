// ============================================================
// Home Page Sections — AI Learning Platform (Reference Design)
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, ShoppingCart, CheckCircle2, ChevronRight,
  ChevronLeft, Mail, Send, Plus, Minus,
} from 'lucide-react';
import CourseCard from '../cards/CourseCard';
import { getFeaturedCourses } from '../../data/courses';
import { books } from '../../data/books';
import { reviews } from '../../data/reviews';
import { faqs } from '../../data/assignments';
import { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

// ─── Helpers ────────────────────────────────────────────────

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, ease: 'easeOut', delay },
  };
}

function SectionHeader({ badge, title, subtitle, link, linkLabel, center }) {
  const { isDark } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: center ? undefined : 'flex-end',
        flexDirection: center ? 'column' : undefined,
        alignItems: center ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '32px',
        textAlign: center ? 'center' : undefined,
      }}
    >
      <div>
        {badge && (
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#60a5fa' : '#2563eb', marginBottom: '6px', letterSpacing: '0.04em' }}>
            {badge}
          </p>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '6px', margin: '6px 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.82rem', fontWeight: 700,
            color: isDark ? '#60a5fa' : '#2563eb',
            textDecoration: 'none', transition: 'gap 0.15s',
            flexShrink: 0,
          }}
        >
          {linkLabel || 'View All'} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

function HomeSection({ children, bg = 'transparent', style = {} }) {
  return (
    <section
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '56px 32px',
        background: bg,
        overflowX: 'hidden',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}

// ── 1. Trusted-By Strip ──────────────────────────────────────

const trustedLogos = [
  { name: 'Google',    color: '#4285F4', weight: 800 },
  { name: 'Microsoft', color: '#00a4ef', weight: 800 },
  { name: 'amazon',    color: '#FF9900', weight: 800 },
  { name: 'IBM',       color: '#1F70C1', weight: 900 },
  { name: 'Deloitte.', color: '#86BC25', weight: 800 },
  { name: 'Infosys',   color: '#007CC3', weight: 800 },
  { name: 'TCS',       color: '#c00', weight: 900 },
];

export function TrustedBy() {
  const { isDark } = useTheme();
  return (
    <section
      style={{
        width: '100%',
        padding: '28px 32px',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(59,130,246,0.1)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(59,130,246,0.1)',
        background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(59,130,246,0.02)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}
        >
          Trusted by Learners from Top Companies &amp; Universities
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '36px',
          }}
        >
          {trustedLogos.map((logo) => (
            <motion.span
              key={logo.name}
              {...fadeInUp(0.05)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: logo.weight,
                color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
                letterSpacing: '-0.02em',
                transition: 'color 0.2s',
                cursor: 'default',
                userSelect: 'none',
              }}
              whileHover={{ color: logo.color }}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 2. Explore Top Categories ────────────────────────────────

const topCategories = [
  { id: 1, icon: '🧠', name: 'Machine Learning',           courses: 25, color: '#8b5cf6' },
  { id: 2, icon: '🤖', name: 'Deep Learning',               courses: 15, color: '#6366f1' },
  { id: 3, icon: '💬', name: 'Natural Language Processing', courses: 15, color: '#f59e0b' },
  { id: 4, icon: '📷', name: 'Computer Vision',             courses: 12, color: '#ef4444' },
  { id: 5, icon: '✨', name: 'Generative AI',               courses: 14, color: '#06b6d4' },
  { id: 6, icon: '👥', name: 'AI for Everyone',             courses: 20, color: '#10b981' },
];

export function ExploreCategories() {
  const { isDark } = useTheme();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
    }
  };

  return (
    <HomeSection>
      <SectionHeader
        title="Explore Top Categories"
        subtitle="Choose a path and start your AI journey today"
        center
      />

      <div style={{ position: 'relative' }}>
        {/* Scroll buttons */}
        <button
          onClick={() => scroll(-1)}
          style={{
            position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(15,25,41,.95)' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(59,130,246,.2)',
            boxShadow: '0 4px 14px rgba(0,0,0,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="scrollbar-hide"
        >
          {topCategories.map((cat, i) => (
            <motion.div key={cat.id} {...fadeInUp(i * 0.05)}>
              <Link
                to={`/courses?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '10px', textAlign: 'center',
                  padding: '22px 20px', borderRadius: '16px',
                  background: 'var(--bg-card)',
                  border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(59,130,246,0.15)',
                  boxShadow: isDark ? 'none' : '0 2px 10px rgba(59,130,246,.07)',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                  minWidth: '150px', flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${cat.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(59,130,246,0.15)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 10px rgba(59,130,246,.07)';
                }}
              >
                <div
                  style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                    {cat.name}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '3px 0 0' }}>
                    {cat.courses} Courses
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          style={{
            position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(15,25,41,.95)' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(59,130,246,.2)',
            boxShadow: '0 4px 14px rgba(0,0,0,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)',
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </HomeSection>
  );
}

// ── 3. Featured Books & Courses ──────────────────────────────

function StarRating({ rating, count }) {
  const { isDark } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          fill={s <= Math.floor(rating) ? '#fbbf24' : 'none'}
          color={s <= Math.floor(rating) ? '#fbbf24' : (isDark ? '#374151' : '#cbd5e1')}
        />
      ))}
      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: '2px' }}>
        ({count?.toLocaleString()})
      </span>
    </div>
  );
}

function BookFeaturedCard({ book, index = 0 }) {
  const { isDark } = useTheme();
  const discount = book.originalPrice > book.price
    ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      style={{
        background: 'var(--bg-card)',
        border: isDark ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid rgba(59,130,246,0.18)',
        borderRadius: '14px',
        overflow: 'hidden',
        minWidth: '190px',
        maxWidth: '210px',
        flexShrink: 0,
        transition: 'all 0.2s ease',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 10px rgba(30,64,175,.08)',
        cursor: 'pointer',
      }}
      whileHover={{ y: -5, boxShadow: isDark ? '0 10px 28px rgba(0,0,0,.45)' : '0 10px 28px rgba(30,64,175,.18)' }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', background: isDark ? '#111827' : '#f3f4f6' }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }}
        />
        {(book.isFeatured || book.isNew) && (
          <span
            style={{
              position: 'absolute', top: '8px', left: '8px',
              padding: '2px 8px', borderRadius: '4px',
              fontSize: '0.62rem', fontWeight: 700,
              color: '#111', background: '#fbbf24',
            }}
          >
            {book.isNew ? 'NEW' : 'BESTSELLER'}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px' }}>
        <h4
          style={{
            color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700,
            lineHeight: 1.35, margin: '0 0 3px',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {book.title}
        </h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: '0 0 6px' }}>
          {book.author}
        </p>
        <StarRating rating={book.rating} count={book.ratingsCount} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{book.price.toLocaleString()}
            </span>
            {discount > 0 && (
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{book.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: isDark ? 'rgba(59,130,246,.2)' : 'rgba(59,130,246,.12)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ShoppingCart size={13} color="#3b82f6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedBooksAndCourses() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('books');
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
    }
  };

  const courses = getFeaturedCourses();

  return (
    <HomeSection bg={isDark ? 'var(--bg-secondary)' : 'rgba(59,130,246,.025)'}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 800, color: 'var(--text-primary)',
              letterSpacing: '-0.02em', margin: 0,
            }}
          >
            Featured Books &amp; Courses
          </h2>
          {/* Tabs */}
          <div
            style={{
              display: 'flex', gap: '4px', padding: '4px',
              borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(59,130,246,0.07)',
              border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(59,130,246,0.12)',
            }}
          >
            {['books', 'courses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '5px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: 700,
                  background: activeTab === tab
                    ? (isDark ? '#3b82f6' : '#2563eb')
                    : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <Link
          to={activeTab === 'books' ? '/textbooks' : '/courses'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.82rem', fontWeight: 700,
            color: isDark ? '#60a5fa' : '#2563eb',
            textDecoration: 'none',
          }}
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {/* Scroll container */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => scroll(-1)}
          style={{
            position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(15,25,41,.95)' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(59,130,246,.2)',
            boxShadow: '0 4px 14px rgba(0,0,0,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          style={{
            display: 'flex', gap: '16px',
            overflowX: 'auto', paddingBottom: '8px',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}
          className="scrollbar-hide"
        >
          {activeTab === 'books'
            ? books.map((book, i) => <BookFeaturedCard key={book.id} book={book} index={i} />)
            : courses.map((course, i) => (
              <div key={course.id} style={{ minWidth: '260px', maxWidth: '280px', flexShrink: 0 }}>
                <CourseCard course={course} index={i} />
              </div>
            ))
          }
        </div>

        <button
          onClick={() => scroll(1)}
          style={{
            position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(15,25,41,.95)' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(59,130,246,.2)',
            boxShadow: '0 4px 14px rgba(0,0,0,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)',
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </HomeSection>
  );
}

// ── 4. Subscription Banner ───────────────────────────────────

const subscriptionFeatures = [
  'Access to 500+ Premium Courses',
  'Download eBooks & Resources',
  'Certificates on Completion',
  'Priority Support',
  'Learn at Your Own Pace',
];

export function SubscriptionBanner() {
  const { isDark } = useTheme();
  return (
    <HomeSection>
      <motion.div
        {...fadeInUp()}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(79,70,229,.15) 0%, rgba(124,58,237,.1) 100%)'
            : 'linear-gradient(135deg, rgba(238,242,255,1) 0%, rgba(237,233,254,1) 100%)',
          border: isDark ? '1px solid rgba(99,102,241,.25)' : '1px solid rgba(99,102,241,.25)',
          borderRadius: '24px',
          padding: '36px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute', right: '-30px', bottom: '-30px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: isDark ? 'rgba(99,102,241,.08)' : 'rgba(99,102,241,.12)',
            pointerEvents: 'none',
          }}
        />

        {/* Left: Emoji + Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '4rem', lineHeight: 1 }}>📚</div>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 6px',
              }}
            >
              Unlimited Learning. Unlimited Possibilities.
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 14px', maxWidth: '380px' }}>
              Get unlimited access to all books, courses, projects, and premium resources with our subscription plans.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {subscriptionFeatures.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={13} color="#4f46e5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <Link
            to="/subscription"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: '#fff', fontSize: '0.9rem', fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(79,70,229,.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,70,229,.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,.35)';
            }}
          >
            View Plans <ArrowRight size={15} />
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0 }}>
            Starting from ₹299/month
          </p>
        </div>
      </motion.div>
    </HomeSection>
  );
}

// ── 5. Testimonials ──────────────────────────────────────────

function TestimonialCard({ review, index }) {
  const { isDark } = useTheme();
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);
  return (
    <motion.div
      {...fadeInUp(index * 0.08)}
      style={{
        background: 'var(--bg-card)',
        border: isDark ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid rgba(59,130,246,0.15)',
        borderRadius: '18px',
        padding: '22px',
        flex: '1',
        minWidth: '260px',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 10px rgba(30,64,175,.07)',
        transition: 'all 0.2s ease',
      }}
      whileHover={{ y: -4, boxShadow: isDark ? '0 12px 32px rgba(0,0,0,.4)' : '0 12px 32px rgba(30,64,175,.15)' }}
    >
      {/* Quote */}
      <p
        style={{
          color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65,
          margin: '0 0 18px', fontStyle: 'italic',
        }}
      >
        "{review.review.slice(0, 140)}{review.review.length > 140 ? '...' : ''}"
      </p>
      {/* Reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={review.avatar}
          alt={review.name}
          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(99,102,241,.35)' }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>{review.name}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0' }}>{review.role}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>{review.rating}.0</span>
            {stars.map((filled, i) => (
              <Star key={i} size={11} fill={filled ? '#fbbf24' : 'none'} color={filled ? '#fbbf24' : '#374151'} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const { isDark } = useTheme();
  return (
    <HomeSection bg={isDark ? 'var(--bg-secondary)' : 'rgba(59,130,246,.025)'}>
      <SectionHeader
        title="What Our Learners Say"
        link="/courses"
        linkLabel="View All Reviews"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {reviews.slice(0, 3).map((r, i) => (
          <TestimonialCard key={r.id} review={r} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── 6. FAQ ───────────────────────────────────────────────────

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <motion.div
      {...fadeInUp(index * 0.04)}
      style={{
        background: 'var(--bg-card)',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(59,130,246,0.15)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '10px',
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(59,130,246,.06)',
        transition: 'border-color 0.2s',
        ...(open ? { borderColor: isDark ? 'rgba(99,102,241,.35)' : '#4f46e5' } : {}),
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 18px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          gap: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <div
          style={{
            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
            background: open
              ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
              : (isDark ? 'rgba(255,255,255,.07)' : 'rgba(59,130,246,.1)'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          {open
            ? <Minus size={12} color="#fff" />
            : <Plus size={12} color={isDark ? '#94a3b8' : '#4f46e5'} />
          }
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 18px 14px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.05)' : 'rgba(59,130,246,.1)'}`, paddingTop: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.65, margin: 0 }}>
            {faq.answer}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function FAQ() {
  const { isDark } = useTheme();
  const visibleFaqs = faqs.slice(0, 4);

  return (
    <HomeSection>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.02em', margin: 0,
          }}
        >
          Frequently Asked Questions
        </h2>
        <Link
          to="/courses"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.82rem', fontWeight: 700,
            color: isDark ? '#60a5fa' : '#2563eb',
            textDecoration: 'none',
          }}
        >
          View All FAQs <ArrowRight size={14} />
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '0 24px',
        }}
      >
        {visibleFaqs.map((faq, i) => (
          <FAQItem key={faq.id} faq={faq} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── 7. Newsletter Banner ─────────────────────────────────────

export function Newsletter() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      setTimeout(() => { setSent(false); setEmail(''); }, 3000);
    }
  };

  return (
    <section
      style={{
        width: '100%',
        padding: '0 32px 56px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          {...fadeInUp()}
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)',
            borderRadius: '20px',
            padding: '36px 40px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', left: '-40px', bottom: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '-20px', top: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} />

          {/* Left: Icon + Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', zIndex: 1 }}>
            <div
              style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'rgba(255,255,255,.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Mail size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px' }}>
                Stay Updated
              </h3>
              <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '0.82rem', margin: 0 }}>
                Subscribe to get the latest updates on new courses and offers.
              </p>
            </div>
          </div>

          {/* Right: Email Input */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', zIndex: 1, flexShrink: 0 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                padding: '11px 18px', borderRadius: '10px',
                border: 'none', background: 'rgba(255,255,255,.95)',
                color: '#111', fontSize: '0.875rem', outline: 'none',
                minWidth: '240px', fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '11px 22px', borderRadius: '10px',
                background: '#fff',
                color: '#4f46e5', fontSize: '0.875rem', fontWeight: 700,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {sent ? <CheckCircle2 size={15} color="#10b981" /> : <Send size={15} />}
              {sent ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// Re-export legacy exports so other pages that import them don't break
export function FeaturedCourses() {
  const { isDark } = useTheme();
  return (
    <HomeSection>
      <SectionHeader
        eyebrow="Hand-picked for you"
        title="Featured Courses"
        description="Curated by our team — the most impactful courses to accelerate your career."
        link="/courses"
        linkLabel="Browse All Courses"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {getFeaturedCourses().slice(0, 4).map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

export function PopularCategories() { return null; }
export function TrendingCourses()   { return null; }
export function LearningPaths()     { return null; }
export function LatestBooks()       { return null; }
export function TopInstructors()    { return null; }
export function StudentReviews()    { return null; }
