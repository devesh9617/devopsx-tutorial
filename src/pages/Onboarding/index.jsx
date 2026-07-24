// ============================================================
// Onboarding — "What do you want to master?"
// Shown once after signup. Multi-select domain tracks. DevOpsX dark theme.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, Brain, Globe, Terminal,
  ChevronRight, ArrowRight, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/ui/BrandLogo';

const tracks = [
  {
    id: 'cloud',
    icon: Cloud,
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,.12)',
    badge: 'Popular',
    badgeColor: '#34d399',
    badgeBg: 'rgba(16,185,129,.12)',
    title: 'Cloud Infrastructure',
    desc: 'Learn AWS, Azure, GCP and how the internet really works',
    tags: ['AWS Basics', 'Azure Cloud', 'GCP', 'Kubernetes'],
    more: 3,
  },
  {
    id: 'ai',
    icon: Brain,
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,.12)',
    badge: 'Popular',
    badgeColor: '#34d399',
    badgeBg: 'rgba(16,185,129,.12)',
    title: 'Artificial Intelligence',
    desc: 'Understand how AI thinks, learns and solves real-world problems',
    tags: ['What is AI?', 'Machine Learning', 'Neural Networks'],
    more: 3,
  },
  {
    id: 'web',
    icon: Globe,
    iconColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,.12)',
    badge: 'New',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(245,158,11,.12)',
    title: 'Web Development',
    desc: 'Build websites and apps that millions can use',
    tags: ['HTML & CSS', 'JavaScript', 'React'],
    more: 3,
  },
  {
    id: 'devops',
    icon: Terminal,
    iconColor: '#2dd4bf',
    iconBg: 'rgba(45,212,191,.12)',
    badge: 'New',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(245,158,11,.12)',
    title: 'DevOps & Automation',
    desc: 'Accelerate everything — from code to deployment',
    tags: ['Linux Basics', 'Git & GitHub', 'CI/CD'],
    more: 3,
  },
];

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]); // Multi-select array
  const [loading, setLoading] = useState(false);

  const toggleTrack = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    navigate('/grade-select', { state: { tracks: selected } });
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(145deg, #060d1f 0%, #09152e 55%, #060d1f 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px 20px',
      fontFamily: 'var(--font-sans)',
      position: 'relative', overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Background ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '-150px', left: '-150px', background: 'radial-gradient(circle, rgba(59,130,246,.3) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', bottom: '-150px', right: '-120px', background: 'radial-gradient(circle, rgba(6,182,212,.25) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.03) 1px, transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ marginBottom: '20px', position: 'relative', zIndex: 2 }}>
        <BrandLogo size="md" />
      </motion.div>

      {/* Headline */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.35 }}
        style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        <p style={{ color: '#60a5fa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Welcome, {firstName}
        </p>
        <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.15 }}>
          What do you want to master?
        </h1>
        <p style={{ color: 'rgba(148,163,184,.65)', fontSize: '0.825rem', margin: 0 }}>
          Select one or multiple learning tracks (you can select all)
        </p>
      </motion.div>

      {/* Track Cards Grid — Wider & Compact */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '14px',
        width: '100%', maxWidth: '840px',
        position: 'relative', zIndex: 2,
        marginBottom: '24px',
      }}>
        {tracks.map((track, i) => {
          const Icon = track.icon;
          const isSelected = selected.includes(track.id);
          return (
            <motion.button
              key={track.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.05, duration: 0.3 }}
              onClick={() => toggleTrack(track.id)}
              style={{
                position: 'relative',
                background: isSelected
                  ? 'linear-gradient(145deg, rgba(59,130,246,.18), rgba(6,182,212,.12))'
                  : 'rgba(15,26,56,0.82)',
                border: `1.5px solid ${isSelected ? 'rgba(59,130,246,.65)' : 'rgba(255,255,255,.08)'}`,
                borderRadius: '16px',
                padding: '16px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(59,130,246,.2), 0 12px 32px rgba(0,0,0,.4)'
                  : '0 6px 20px rgba(0,0,0,.25)',
                transition: 'all 0.2s ease',
                outline: 'none',
              }}
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,.4)' }}
              whileTap={{ scale: 0.988 }}
            >
              {/* Selected checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{ position: 'absolute', top: '14px', right: '16px' }}
                  >
                    <CheckCircle2 size={18} color="#34d399" fill="rgba(16,185,129,.2)" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top row: icon + badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: track.iconBg, border: `1px solid ${track.iconColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={19} color={track.iconColor} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                      {track.title}
                    </h3>
                  </div>
                </div>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px', borderRadius: '999px', color: track.badgeColor, background: track.badgeBg, border: `1px solid ${track.badgeColor}30` }}>
                  {track.badge}
                </span>
              </div>

              {/* Description */}
              <p style={{ color: 'rgba(148,163,184,.65)', fontSize: '0.78rem', margin: '0 0 10px', lineHeight: 1.45 }}>
                {track.desc}
              </p>

              {/* Bottom Tags row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {track.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(148,163,184,.75)' }}>
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', color: 'rgba(148,163,184,.45)' }}>
                    +{track.more}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isSelected ? '#60a5fa' : 'rgba(148,163,184,.4)', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                  <ChevronRight size={13} />
                  Select
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.button
          onClick={handleContinue}
          disabled={selected.length === 0 || loading}
          whileHover={selected.length > 0 && !loading ? { scale: 1.02 } : {}}
          whileTap={selected.length > 0 && !loading ? { scale: 0.98 } : {}}
          style={{
            padding: '12px 36px', borderRadius: '12px', border: 'none',
            background: selected.length > 0
              ? 'linear-gradient(135deg, #3b82f6, #06b6d4)'
              : 'rgba(255,255,255,.07)',
            color: selected.length > 0 ? '#fff' : 'rgba(255,255,255,.25)',
            fontWeight: 800, fontSize: '0.9rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: selected.length > 0 ? '0 8px 24px rgba(59,130,246,.4)' : 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? 'Getting things ready…' : `Next: Select Your Grade (${selected.length} Selected)`}
          {!loading && <ArrowRight size={16} />}
        </motion.button>

        <p style={{ color: 'rgba(148,163,184,.35)', fontSize: '0.72rem', marginTop: '10px' }}>
          You can select all 4 or any combination you prefer
        </p>
      </motion.div>
    </div>
  );
}
