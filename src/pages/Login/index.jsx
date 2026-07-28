// ============================================================
// Login Page — DevOpsX (Split Layout — Theme Aware)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, LogIn, Loader2, CheckCircle2,
  ArrowRight, AlertTriangle, Server, Terminal, Shield, Brain
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';
import BrandLogo from '../../components/ui/BrandLogo';

const features = [
  { icon: Server,   label: 'Cloud & AI Courses', desc: 'AWS, Azure, Python, Generative AI & MLOps' },
  { icon: Terminal, label: 'Hands-on Labs',      desc: 'Real-world projects built by experts' },
  { icon: Brain,    label: 'AI Career Mentor',   desc: 'Personalized skill roadmaps & feedback' },
  { icon: Shield,   label: 'Verified Certs',     desc: 'Industry-recognized on resume & LinkedIn' },
];

export default function Login() {
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ email: 'example1@devopsx.io', password: 'password123' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});
  const [focused, setFocused] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back to DevOpsX!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials');
      setErrors({ general: 'Invalid email or password. Use the demo credentials below.' });
    }
    setLoading(false);
  };

  const field = (name) => ({
    width: '100%', boxSizing: 'border-box',
    paddingLeft: '44px',
    paddingRight: name === 'password' ? '44px' : '16px',
    paddingTop: '13px', paddingBottom: '13px',
    borderRadius: '14px', fontSize: '0.875rem', outline: 'none',
    background: focused === name
      ? (isDark ? 'rgba(59,130,246,.12)' : '#ffffff')
      : (isDark ? 'rgba(255,255,255,.04)' : '#ffffff'),
    border: `1.5px solid ${
      errors[name]
        ? (isDark ? 'rgba(248,113,113,.6)' : '#dc2626')
        : focused === name
          ? (isDark ? 'rgba(59,130,246,.7)' : '#2563eb')
          : (isDark ? 'rgba(255,255,255,.12)' : '#cbd5e1')
    }`,
    color: isDark ? '#f1f5f9' : '#0f172a',
    boxShadow: focused === name
      ? (isDark ? '0 0 0 3px rgba(59,130,246,.25)' : '0 0 0 3px rgba(37,99,235,.18)')
      : (isDark ? 'none' : '0 1px 3px rgba(15,23,42,.04)'),
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{
      minHeight: '100vh', width: '100%', display: 'flex', overflow: 'hidden',
      background: isDark ? '#060d1f' : '#f1f5f9',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: 'var(--font-sans)',
      transition: 'background 0.2s ease',
    }}>

      {/* ── LEFT PANEL — DevOpsX Branding ── */}
      <div
        className="auth-left-panel"
        style={{
          flex: '0 0 45%',
          position: 'relative', overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(145deg, #07112e 0%, #0b1d4a 45%, #060d1f 100%)'
            : 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 50%, #f0f9ff 100%)',
          display: 'none', flexDirection: 'column',
          borderRight: isDark ? '1px solid rgba(255,255,255,.08)' : '1.5px solid #cbd5e1',
        }}
      >
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: isDark ? [0.25, 0.45, 0.25] : [0.4, 0.6, 0.4] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '-120px', left: '-120px', background: isDark ? 'radial-gradient(circle, rgba(59,130,246,.4) 0%, transparent 65%)' : 'radial-gradient(circle, rgba(59,130,246,.25) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: isDark ? [0.15, 0.3, 0.15] : [0.2, 0.4, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bottom: '-80px', right: '-80px', background: isDark ? 'radial-gradient(circle, rgba(6,182,212,.35) 0%, transparent 65%)' : 'radial-gradient(circle, rgba(6,182,212,.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: isDark ? 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)' : 'linear-gradient(rgba(59,130,246,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 44px' }}>
          <div style={{ marginBottom: '56px' }}>
            <BrandLogo size="lg" />
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 style={{ color: isDark ? '#fff' : '#0f172a', fontFamily: 'var(--font-display)', fontSize: '2.35rem', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
              Learn Skills.<br />
              Build Projects.<br />
              <span style={{ background: isDark ? 'linear-gradient(135deg,#60a5fa,#22d3ee)' : 'linear-gradient(135deg,#1d4ed8,#0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get Hired.
              </span>
            </h1>
            <p style={{ color: isDark ? 'rgba(255,255,255,.45)' : '#334155', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '320px', fontWeight: 500 }}>
              The platform built for developers & students to master Cloud & AI — faster.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'auto' }}>
            {features.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.09 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  padding: '10px 14px', borderRadius: '14px',
                  background: isDark ? 'transparent' : '#ffffff',
                  border: isDark ? 'none' : '1.5px solid #bfdbfe',
                  boxShadow: isDark ? 'none' : '0 2px 6px rgba(37,99,235,.06)',
                }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(37,99,235,.1)', border: isDark ? '1px solid rgba(59,130,246,.2)' : '1px solid rgba(37,99,235,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={isDark ? '#60a5fa' : '#1d4ed8'} />
                </div>
                <div>
                  <p style={{ color: isDark ? '#e2e8f0' : '#0f172a', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 2px' }}>{label}</p>
                  <p style={{ color: isDark ? 'rgba(255,255,255,.35)' : '#475569', fontSize: '0.78rem', margin: 0, fontWeight: 500 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: '1px', background: isDark ? 'rgba(255,255,255,.07)' : '#cbd5e1', borderRadius: '16px', overflow: 'hidden', marginTop: '40px', border: isDark ? 'none' : '1.5px solid #cbd5e1' }}>
            {[['500+', 'Courses', isDark ? '#60a5fa' : '#1d4ed8'], ['10K+', 'Students', isDark ? '#34d399' : '#059669'], ['8K+', 'Certs', isDark ? '#fbbf24' : '#d97706']].map(([val, lbl, clr]) => (
              <div key={lbl} style={{ flex: 1, background: isDark ? 'rgba(7,17,46,.65)' : '#ffffff', padding: '16px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: clr, fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>{val}</p>
                <p style={{ color: isDark ? 'rgba(255,255,255,.35)' : '#475569', fontSize: '0.68rem', fontWeight: 600, margin: '4px 0 0' }}>{lbl}</p>
              </div>
            ))}
          </motion.div>

          <p style={{ color: isDark ? 'rgba(255,255,255,.2)' : '#64748b', fontSize: '0.7rem', marginTop: '20px', textAlign: 'center', fontWeight: 500 }}>© 2025 DevOpsX Learning Inc.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: isDark ? 'var(--bg-primary)' : '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 2 }}
        >
          {/* Mobile Logo */}
          <div className="auth-mobile-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <BrandLogo size="md" />
          </div>

          {/* Form Card */}
          <div style={{
            background: isDark ? 'rgba(13,22,48,0.9)' : '#ffffff',
            backdropFilter: isDark ? 'blur(28px)' : 'none',
            border: isDark ? '1px solid rgba(255,255,255,.09)' : '1.5px solid #cbd5e1',
            borderRadius: '24px', padding: '36px',
            boxShadow: isDark ? '0 32px 80px rgba(0,0,0,.7)' : '0 20px 50px rgba(15,23,42,0.1)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ color: isDark ? '#fff' : '#0f172a', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                Welcome back
              </h2>
              <p style={{ color: isDark ? 'rgba(148,163,184,.6)' : '#475569', fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>
                Sign in to continue your career journey
              </p>
            </div>

            <AnimatePresence>
              {errors.general && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: 'rgba(239,68,68,.1)', border: '1.5px solid rgba(239,68,68,.3)', borderRadius: '12px', padding: '12px 14px', marginBottom: '20px', color: '#dc2626', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={14} /> {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? 'rgba(148,163,184,.65)' : '#334155', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? (isDark ? '#60a5fa' : '#2563eb') : (isDark ? 'rgba(148,163,184,.35)' : '#64748b'), pointerEvents: 'none' }} />
                  <input
                    type="email" value={form.email} placeholder="you@example.com"
                    onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: '', general: '' })); }}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={field('email')}
                  />
                </div>
                {errors.email && <p style={{ color: '#dc2626', fontSize: '0.72rem', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12} /> {errors.email}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? 'rgba(148,163,184,.65)' : '#334155' }}>Password</label>
                  <Link to="/" style={{ fontSize: '0.75rem', color: isDark ? '#60a5fa' : '#1d4ed8', textDecoration: 'none', fontWeight: 700 }}>Forgot Password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'password' ? (isDark ? '#60a5fa' : '#2563eb') : (isDark ? 'rgba(148,163,184,.35)' : '#64748b'), pointerEvents: 'none' }} />
                  <input
                    type={showPw ? 'text' : 'password'} value={form.password} placeholder="Enter your password"
                    onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: '', general: '' })); }}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    style={field('password')}
                  />
                  <button type="button" onClick={() => setShowPw((p) => !p)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: isDark ? 'rgba(148,163,184,.5)' : '#64748b', padding: '4px' }}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#dc2626', fontSize: '0.72rem', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12} /> {errors.password}</p>}
              </div>

              {/* Demo hint */}
              <div style={{
                background: isDark ? 'rgba(59,130,246,.07)' : '#eff6ff',
                border: isDark ? '1px solid rgba(59,130,246,.18)' : '1.5px solid #bfdbfe',
                borderRadius: '12px', padding: '11px 14px', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <CheckCircle2 size={14} color={isDark ? '#34d399' : '#059669'} style={{ flexShrink: 0 }} />
                <p style={{ color: isDark ? 'rgba(148,163,184,.65)' : '#334155', fontSize: '0.72rem', margin: 0, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  <strong style={{ color: isDark ? '#93c5fd' : '#1d4ed8' }}>Demo:</strong> example1@devopsx.io / password123
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit" disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', borderRadius: '14px', border: 'none',
                  background: loading ? (isDark ? 'rgba(59,130,246,.5)' : '#93c5fd') : 'linear-gradient(135deg, #2563eb, #0284c7)',
                  color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(37,99,235,.35)',
                }}
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : <><LogIn size={18} /> Sign In to DevOpsX</>}
              </motion.button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '22px 0' }}>
              <div style={{ flex: 1, height: '1.5px', background: isDark ? 'rgba(255,255,255,.07)' : '#cbd5e1' }} />
              <span style={{ color: isDark ? 'rgba(148,163,184,.35)' : '#64748b', fontSize: '0.7rem', fontWeight: 700 }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1.5px', background: isDark ? 'rgba(255,255,255,.07)' : '#cbd5e1' }} />
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
              {['Google', 'GitHub'].map((provider) => (
                <button key={provider} type="button" onClick={() => toast('Coming soon!')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,.04)' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,.1)' : '1.5px solid #cbd5e1', color: isDark ? 'rgba(255,255,255,.7)' : '#0f172a', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', boxShadow: isDark ? 'none' : '0 1px 3px rgba(15,23,42,.04)' }}>
                  {provider}
                </button>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: isDark ? 'rgba(148,163,184,.5)' : '#475569', margin: 0, fontWeight: 500 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: isDark ? '#60a5fa' : '#1d4ed8', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                Create free account <ArrowRight size={12} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .auth-left-panel { display: flex !important; }
          .auth-mobile-logo { display: none !important; }
        }
      `}</style>
    </div>
  );
}
