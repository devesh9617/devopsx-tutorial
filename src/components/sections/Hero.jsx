// ============================================================
// Hero Section — AI Learning Platform (Reference Design Match)
// ============================================================

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Shield, Cpu, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const featureCards = [
  {
    icon: '📗',
    title: 'Beginner Friendly',
    subtitle: 'Start from Scratch',
    color: '#4ade80',
    bg: 'rgba(74,222,128,.12)',
    border: 'rgba(74,222,128,.25)',
  },
  {
    icon: '🛠️',
    title: 'Hands-on Projects',
    subtitle: 'Build Real World Applications',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,.12)',
    border: 'rgba(96,165,250,.25)',
  },
  {
    icon: '🏅',
    title: 'Certificate Included',
    subtitle: 'Showcase Your Skills',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,.12)',
    border: 'rgba(251,191,36,.25)',
  },
  {
    icon: '♾️',
    title: 'Lifetime Access',
    subtitle: 'Learn Anytime, Anywhere',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,.12)',
    border: 'rgba(167,139,250,.25)',
  },
];

const stats = [
  { icon: '👥', value: '20,000+', label: 'Happy Learners' },
  { icon: '📚', value: '500+',    label: 'Expert Courses' },
  { icon: '⏱️', value: '10,000+', label: 'Hours of Content' },
  { icon: '🎓', value: 'Certificates', label: 'Boost Your Career' },
];

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVar = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  const { isDark } = useTheme();

  const bgColor = isDark ? '#060b18' : '#f8faff';
  const cardBg  = isDark ? 'rgba(15,25,41,0.95)' : 'rgba(255,255,255,0.98)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(59,130,246,0.18)';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '88vh',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(59,130,246,.13) 0%, transparent 65%), #060b18'
          : 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(59,130,246,.10) 0%, transparent 65%), #f8faff',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '48px 32px 56px',
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: isDark
            ? 'linear-gradient(rgba(59,130,246,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.035) 1px, transparent 1px)'
            : 'linear-gradient(rgba(59,130,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.06) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Main 3-column layout */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1280px', width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
        >
          {/* Badge */}
          <motion.div variants={itemVar} style={{ marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 14px', borderRadius: '999px',
                background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.1)',
                border: isDark ? '1px solid rgba(59,130,246,.3)' : '1px solid rgba(59,130,246,.3)',
                color: isDark ? '#93c5fd' : '#1d4ed8',
                fontSize: '0.78rem', fontWeight: 700,
              }}
            >
              #1 Platform to Learn AI Online
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVar}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: '0 0 12px',
            }}
          >
            Learn AI.<br />
            Build Skills.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shape Your Future.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVar}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
              lineHeight: 1.7,
              margin: '0 0 28px',
              maxWidth: '440px',
            }}
          >
            Access top-quality books, expert-led courses, hands-on projects,
            and resources to master AI and build a successful career.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={itemVar}
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '20px',
              marginBottom: '28px',
            }}
          >
            {stats.map(({ icon, value, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1rem' }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVar}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}
          >
            <Link
              to="/courses"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '10px',
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
              Explore Courses <ArrowRight size={15} />
            </Link>
            <Link
              to="/textbooks"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '10px',
                background: 'var(--bg-card)',
                border: isDark ? '1.5px solid rgba(255,255,255,.12)' : '1.5px solid rgba(59,130,246,.25)',
                color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.2s',
                boxShadow: isDark ? 'none' : '0 4px 14px rgba(59,130,246,.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4f46e5';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,.12)' : 'rgba(59,130,246,.25)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <BookOpen size={15} /> Browse Books
            </Link>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            variants={itemVar}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ color: '#22c55e' }}>✓</span> 7-Day Money Back Guarantee
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ color: '#22c55e' }}>✗</span> Cancel Anytime
            </span>
          </motion.div>
        </motion.div>

        {/* ── CENTER: Book Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'relative',
            width: '300px',
            flexShrink: 0,
          }}
        >
          {/* Glow platform */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(99,102,241,.4) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
          />

          {/* Book cover with 3D perspective */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              width: '200px',
              perspective: '800px',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '20px 20px 60px rgba(0,0,0,.5), -4px -4px 20px rgba(255,255,255,.05)',
                transform: 'rotateY(-8deg) rotateX(3deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&auto=format&fit=crop"
                alt="Artificial Intelligence for Beginners"
                style={{ width: '100%', display: 'block', aspectRatio: '3/4', objectFit: 'cover' }}
              />
              {/* Book title overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(15,15,40,0.65) 0%, rgba(30,30,80,0.4) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em',
                    color: '#fbbf24', textTransform: 'uppercase', marginBottom: '10px',
                  }}
                >
                  ARTIFICIAL<br />INTELLIGENCE<br />FOR BEGINNERS
                </div>
                <div
                  style={{
                    fontSize: '0.5rem', color: 'rgba(255,255,255,.7)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Learn · Build · Innovate
                </div>
              </div>
              {/* Spine effect */}
              <div
                style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: '6px',
                  background: 'linear-gradient(180deg, #4f46e5, #7c3aed)',
                }}
              />
            </div>

            {/* Author label */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px', left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.8)',
                color: '#fff',
                fontSize: '0.6rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)',
              }}
            >
              Shalendra Kumar
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Feature Cards ── */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={itemVar}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '14px',
                background: isDark ? 'rgba(15,25,41,0.9)' : 'rgba(255,255,255,0.95)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(59,130,246,0.15)'}`,
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,.3)' : '0 4px 16px rgba(59,130,246,.08)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
                cursor: 'default',
              }}
              whileHover={{ y: -2, boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.5)' : '0 8px 24px rgba(59,130,246,.15)' }}
            >
              <div
                style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.2 }}>
                  {card.title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
                  {card.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-center-book { display: none !important; }
          .hero-right-cards { display: none !important; }
          .hero-cta-row { justify-content: center !important; }
          .hero-stats-row { justify-content: center !important; }
          .hero-trust { justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
