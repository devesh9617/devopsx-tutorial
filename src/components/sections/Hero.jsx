// ============================================================
// Hero Section — DevOpsX Home Page (Ultra-Sleek Redesign)
// ============================================================

import { motion } from 'framer-motion';
import { ArrowRight, Zap, BookOpen, Users, Code2, Award, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const stats = [
  { icon: BookOpen, value: '500+', label: 'Courses' },
  { icon: Users,    value: '10K+', label: 'Students' },
  { icon: Code2,    value: '300+', label: 'Books' },
  { icon: Award,    value: '100+', label: 'Projects' },
];

const popularTags = ['Cloud Computing', 'AWS', 'Artificial Intelligence', 'Machine Learning', 'Python', 'AI & ML'];

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(59,130,246,.16) 0%, transparent 70%), var(--bg-primary)'
          : 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(59,130,246,.12) 0%, transparent 70%), var(--bg-primary)',
        padding: '60px 24px 80px',
        transition: 'background 0.25s ease',
      }}
    >
      {/* Background Grid & Blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: isDark ? 0.4 : 0.6, backgroundImage: isDark ? 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)' : 'linear-gradient(rgba(59,130,246,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.07) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Floating Code Badges */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '22%', left: '3%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: isDark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(34,197,94,.3)' : '1px solid rgba(34,197,94,.4)',
            color: isDark ? '#4ade80' : '#15803d',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.4)' : '0 6px 20px rgba(34,197,94,.12)',
          }}
        >
          <Terminal size={14} color={isDark ? '#4ade80' : '#15803d'} /> $ docker build -t app:v1 .
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '55%', left: '4%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: isDark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(59,130,246,.3)' : '1px solid rgba(59,130,246,.4)',
            color: isDark ? '#60a5fa' : '#1d4ed8',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.4)' : '0 6px 20px rgba(59,130,246,.12)',
          }}
        >
          <Terminal size={14} color={isDark ? '#60a5fa' : '#1d4ed8'} /> $ kubectl apply -f deploy.yaml
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '25%', right: '3%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: isDark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(168,85,247,.3)' : '1px solid rgba(168,85,247,.4)',
            color: isDark ? '#c084fc' : '#7e22ce',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.4)' : '0 6px 20px rgba(168,85,247,.12)',
          }}
        >
          <Terminal size={14} color={isDark ? '#c084fc' : '#7e22ce'} /> $ terraform plan -out=tfplan
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '60%', right: '4%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: isDark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(245,158,11,.3)' : '1px solid rgba(245,158,11,.4)',
            color: isDark ? '#fbbf24' : '#b45309',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
            boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.4)' : '0 6px 20px rgba(245,158,11,.12)',
          }}
        >
          <Terminal size={14} color={isDark ? '#fbbf24' : '#b45309'} /> $ git push origin main
        </motion.div>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '840px', width: '100%', textAlign: 'center' }}>
        <motion.div variants={containerVar} initial="hidden" animate="visible">

          {/* Announcement Pill */}
          <motion.div variants={itemVar} style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <Link
              to="/courses?category=ai-ml"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '999px',
                background: isDark ? 'rgba(59,130,246,.12)' : 'rgba(59,130,246,.1)',
                border: isDark ? '1px solid rgba(59,130,246,.28)' : '1px solid rgba(59,130,246,.35)',
                color: isDark ? '#93c5fd' : '#1d4ed8', fontSize: '0.8rem', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <Sparkles size={13} color={isDark ? '#fbbf24' : '#d97706'} />
              <span>AI & ML Learning Path is live!</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVar}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Master Cloud Computing & AI
            <br />
            & Modern Engineering
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVar}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: 1.65,
              maxWidth: '640px',
              margin: '0 auto 28px',
              fontWeight: 500,
            }}
          >
            Learn from industry experts with 500+ courses, hands-on projects, and
            career-ready certificates. Join 10,000+ engineers worldwide.
          </motion.p>

          {/* Popular Tag Strip */}
          <motion.div variants={itemVar} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to={`/courses?search=${encodeURIComponent(tag)}`}
                style={{
                  fontSize: '0.72rem', padding: '5px 14px', borderRadius: '999px',
                  background: isDark ? 'rgba(255,255,255,.05)' : '#ffffff',
                  border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
                  color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600,
                  boxShadow: isDark ? 'none' : '0 2px 6px rgba(15,23,42,.04)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(59,130,246,.2)' : 'rgba(59,130,246,.12)';
                  e.currentTarget.style.color = 'var(--brand-blue)';
                  e.currentTarget.style.borderColor = 'var(--brand-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.05)' : '#ffffff';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = isDark ? 'var(--border-subtle)' : 'rgba(59,130,246,.25)';
                }}
              >
                {tag}
              </Link>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVar} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
            <Link
              to="/courses"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '14px',
                background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                color: '#fff', fontSize: '0.925rem', fontWeight: 800,
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(59,130,246,.35)',
                transition: 'all 0.15s',
              }}
            >
              <BookOpen size={16} /> Explore Courses <ArrowRight size={15} />
            </Link>
            <Link
              to="/courses?filter=free"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '14px',
                background: 'var(--bg-card)',
                border: isDark ? '1px solid var(--border-muted)' : '1px solid rgba(59,130,246,.3)',
                color: 'var(--text-primary)', fontSize: '0.925rem', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.15s',
                boxShadow: isDark ? 'none' : '0 4px 14px rgba(15,23,42,.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-blue)';
                e.currentTarget.style.background = isDark ? 'rgba(59,130,246,.1)' : 'rgba(59,130,246,.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'var(--border-muted)' : 'rgba(59,130,246,.3)';
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
            >
              <Zap size={16} color={isDark ? '#fbbf24' : '#d97706'} /> Free Courses
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVar}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
              maxWidth: '680px', margin: '0 auto',
            }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  padding: '16px 12px', borderRadius: '16px',
                  background: 'var(--bg-card)',
                  border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
                  boxShadow: isDark ? 'none' : '0 4px 16px rgba(15,23,42,.05)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#3b82f6" />
                </div>
                <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                  {value}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
