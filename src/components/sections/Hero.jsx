// ============================================================
// Hero Section — DevOpsX Home Page (Ultra-Sleek Redesign)
// ============================================================

import { motion } from 'framer-motion';
import { ArrowRight, Zap, BookOpen, Users, Code2, Award, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: BookOpen, value: '500+', label: 'Courses' },
  { icon: Users,    value: '10K+', label: 'Students' },
  { icon: Code2,    value: '300+', label: 'Books' },
  { icon: Award,    value: '100+', label: 'Projects' },
];

const popularTags = ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'React', 'Python', 'AI & ML'];

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Hero() {
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
        background: 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(59,130,246,.16) 0%, transparent 70%), var(--bg-primary)',
        padding: '60px 24px 80px',
      }}
    >
      {/* Background Grid & Blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Floating Code Badges (Positioned cleanly on far edges) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '22%', left: '3%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(34,197,94,.25)', color: '#4ade80',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
          }}
        >
          <Terminal size={14} color="#4ade80" /> $ docker build -t app:v1 .
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '55%', left: '4%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59,130,246,.25)', color: '#60a5fa',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
          }}
        >
          <Terminal size={14} color="#60a5fa" /> $ kubectl apply -f deploy.yaml
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '25%', right: '3%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(168,85,247,.25)', color: '#c084fc',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
          }}
        >
          <Terminal size={14} color="#c084fc" /> $ terraform plan -out=tfplan
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="hidden xl:flex"
          style={{
            position: 'absolute', top: '60%', right: '4%',
            alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '12px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(245,158,11,.25)', color: '#fbbf24',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
          }}
        >
          <Terminal size={14} color="#fbbf24" /> $ git push origin main
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
                background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.28)',
                color: '#93c5fd', fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <Sparkles size={13} color="#fbbf24" />
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
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            Master{' '}
            <span style={{ background: 'linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DevOps, Cloud
            </span>
            <br />
            & Modern Engineering
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVar}
            style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: 1.65,
              maxWidth: '640px',
              margin: '0 auto 28px',
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
                  fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px',
                  background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,.2)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
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
                color: '#fff', fontSize: '0.925rem', fontWeight: 700,
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
                background: 'rgba(255,255,255,.06)', border: '1px solid var(--border-muted)',
                color: '#fff', fontSize: '0.925rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <Zap size={16} color="#fbbf24" /> Free Courses
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
                  background: 'rgba(15,25,41,.7)', border: '1px solid var(--border-subtle)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#60a5fa" />
                </div>
                <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                  {value}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{label}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
