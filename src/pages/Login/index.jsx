// ============================================================
// Login Page — DevOpsX (Split Layout — Branded Left + Form Right)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, LogIn, Loader2, CheckCircle2,
  ArrowRight, AlertTriangle, Server, Cloud, Terminal, Shield, Brain
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import BrandLogo from '../../components/ui/BrandLogo';

const features = [
  { icon: Server,   label: 'DevOps & Cloud',    desc: 'Docker, Kubernetes, AWS, Terraform' },
  { icon: Terminal, label: 'Hands-on Labs',      desc: 'Real-world projects built by experts' },
  { icon: Brain,    label: 'AI Career Mentor',   desc: 'Personalized skill roadmaps & feedback' },
  { icon: Shield,   label: 'Verified Certs',     desc: 'Industry-recognized on resume & LinkedIn' },
];

export default function Login() {
  const { login } = useAuth();
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
    background: focused === name ? 'rgba(59,130,246,.08)' : 'rgba(255,255,255,.04)',
    border: `1px solid ${errors[name] ? 'rgba(248,113,113,.5)' : focused === name ? 'rgba(59,130,246,.5)' : 'rgba(255,255,255,.1)'}`,
    color: '#f1f5f9',
    boxShadow: focused === name ? '0 0 0 3px rgba(59,130,246,.12)' : 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', overflow: 'hidden', background: '#060d1f', fontFamily: 'var(--font-sans)' }}>

      {/* ── LEFT PANEL — DevOpsX Branding ── */}
      <div
        className="auth-left-panel"
        style={{
          flex: '0 0 45%',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #07112e 0%, #0b1d4a 45%, #060d1f 100%)',
          display: 'none', flexDirection: 'column',
        }}
      >
        {/* Animated gradient blob */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '-120px', left: '-120px', background: 'radial-gradient(circle, rgba(59,130,246,.4) 0%, transparent 65%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bottom: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(6,182,212,.35) 0%, transparent 65%)', pointerEvents: 'none' }}
        />
        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 44px' }}>
          <div style={{ marginBottom: '56px' }}>
            <BrandLogo size="lg" />
          </div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '2.35rem', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
              Learn Skills.<br />
              Build Projects.<br />
              <span style={{ background: 'linear-gradient(135deg,#60a5fa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get Hired.
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '320px' }}>
              The platform built for developers & students to master DevOps, Cloud, and engineering — faster.
            </p>
          </motion.div>

          {/* Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'auto' }}>
            {features.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.09 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color="#60a5fa" />
                </div>
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px' }}>{label}</p>
                  <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '0.78rem', margin: 0 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: '1px', background: 'rgba(255,255,255,.07)', borderRadius: '16px', overflow: 'hidden', marginTop: '40px' }}>
            {[['500+', 'Courses', '#60a5fa'], ['10K+', 'Students', '#34d399'], ['8K+', 'Certs', '#fbbf24']].map(([val, lbl, clr]) => (
              <div key={lbl} style={{ flex: 1, background: 'rgba(7,17,46,.65)', padding: '16px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: clr, fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>{val}</p>
                <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '0.68rem', margin: '4px 0 0' }}>{lbl}</p>
              </div>
            ))}
          </motion.div>

          {/* Footer */}
          <p style={{ color: 'rgba(255,255,255,.2)', fontSize: '0.7rem', marginTop: '20px', textAlign: 'center' }}>© 2025 DevOpsX Learning Inc.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle top glow */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 2 }}
        >
          {/* Mobile-only logo */}
          <div className="auth-mobile-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <BrandLogo size="md" />
          </div>

          {/* Form Card */}
          <div style={{ background: 'rgba(13,22,48,0.9)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,.09)', borderRadius: '24px', padding: '36px', boxShadow: '0 32px 80px rgba(0,0,0,.7)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                Welcome back
              </h2>
              <p style={{ color: 'rgba(148,163,184,.6)', fontSize: '0.875rem', margin: 0 }}>
                Sign in to continue your career journey
              </p>
            </div>

            <AnimatePresence>
              {errors.general && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', borderRadius: '12px', padding: '12px 14px', marginBottom: '20px', color: '#f87171', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={14} /> {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input
                    type="email" value={form.email} placeholder="you@example.com"
                    onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: '', general: '' })); }}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={field('email')}
                  />
                </div>
                {errors.email && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12} /> {errors.email}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)' }}>Password</label>
                  <Link to="/" style={{ fontSize: '0.75rem', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Forgot Password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'password' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input
                    type={showPw ? 'text' : 'password'} value={form.password} placeholder="Enter your password"
                    onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: '', general: '' })); }}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    style={field('password')}
                  />
                  <button type="button" onClick={() => setShowPw((p) => !p)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(148,163,184,.5)', padding: '4px' }}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12} /> {errors.password}</p>}
              </div>

              {/* Demo hint */}
              <div style={{ background: 'rgba(59,130,246,.07)', border: '1px solid rgba(59,130,246,.18)', borderRadius: '12px', padding: '11px 14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={14} color="#34d399" style={{ flexShrink: 0 }} />
                <p style={{ color: 'rgba(148,163,184,.65)', fontSize: '0.72rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
                  <strong style={{ color: '#93c5fd' }}>Demo:</strong> example1@devopsx.io / password123
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
                  background: loading ? 'rgba(59,130,246,.5)' : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(59,130,246,.45)',
                }}
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : <><LogIn size={18} /> Sign In to DevOpsX</>}
              </motion.button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '22px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,.07)' }} />
              <span style={{ color: 'rgba(148,163,184,.35)', fontSize: '0.7rem', fontWeight: 600 }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,.07)' }} />
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
              {['Google', 'GitHub'].map((provider) => (
                <button key={provider} type="button" onClick={() => toast('Coming soon!')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px', borderRadius: '12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  {provider}
                </button>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(148,163,184,.5)', margin: 0 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
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
