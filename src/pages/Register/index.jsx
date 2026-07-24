// ============================================================
// Register Page — DevOpsX (Split Layout — Branded Left + Form Right)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertTriangle, Loader2,
  CheckCircle2, Server, Brain, Shield, Terminal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import BrandLogo from '../../components/ui/BrandLogo';

const perks = [
  { icon: Server,   label: '500+ Free Courses',    desc: 'DevOps, Cloud, Web Dev, AI & more' },
  { icon: CheckCircle2, label: 'Verified Certificates', desc: 'Recognized by top tech companies' },
  { icon: Brain,    label: 'AI Career Mentor',     desc: 'Personalized learning paths for you' },
  { icon: Shield,   label: 'Lifetime Access',      desc: 'Download books, notes & video content' },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPw, setShowPw] = useState({ password: false, confirmPassword: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name)    errs.name = 'Full name is required';
    if (!form.email)   errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (form.password && form.password.length < 8) errs.password = 'Minimum 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/onboarding');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = (name) => ({
    width: '100%', boxSizing: 'border-box',
    paddingLeft: '44px',
    paddingRight: (name === 'password' || name === 'confirmPassword') ? '44px' : '16px',
    paddingTop: '12px', paddingBottom: '12px',
    borderRadius: '14px', fontSize: '0.875rem', outline: 'none',
    background: focused === name ? 'rgba(59,130,246,.08)' : 'rgba(255,255,255,.04)',
    border: `1px solid ${errors[name] ? 'rgba(248,113,113,.5)' : focused === name ? 'rgba(59,130,246,.5)' : 'rgba(255,255,255,.1)'}`,
    color: '#f1f5f9',
    boxShadow: focused === name ? '0 0 0 3px rgba(59,130,246,.12)' : 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', overflow: 'hidden', background: '#060d1f', fontFamily: 'var(--font-sans)' }}>

      {/* ── LEFT PANEL — Branding ── */}
      <div
        className="auth-left-panel"
        style={{
          flex: '0 0 45%',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #07112e 0%, #0b1d4a 45%, #060d1f 100%)',
          display: 'none', flexDirection: 'column',
        }}
      >
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '-120px', left: '-120px', background: 'radial-gradient(circle, rgba(59,130,246,.4) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bottom: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(6,182,212,.35) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 44px' }}>
          {/* Logo */}
          <div style={{ marginBottom: '52px' }}>
            <BrandLogo size="lg" />
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
              Join 10,000+<br />
              <span style={{ background: 'linear-gradient(135deg,#60a5fa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Engineers
              </span> learning
            </h1>
            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 36px', maxWidth: '310px' }}>
              DevOpsX is the most comprehensive platform for engineering students & professionals in India.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: 'auto' }}>
            {perks.map(({ icon: Icon, label, desc }, i) => (
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

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: '1px', background: 'rgba(255,255,255,.07)', borderRadius: '16px', overflow: 'hidden', marginTop: '40px' }}>
            {[['500+', 'Courses', '#60a5fa'], ['10K+', 'Students', '#34d399'], ['Free', 'Forever', '#fbbf24']].map(([val, lbl, clr]) => (
              <div key={lbl} style={{ flex: 1, background: 'rgba(7,17,46,.65)', padding: '16px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: clr, fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>{val}</p>
                <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '0.68rem', margin: '4px 0 0' }}>{lbl}</p>
              </div>
            ))}
          </motion.div>

          <p style={{ color: 'rgba(255,255,255,.2)', fontSize: '0.7rem', marginTop: '20px', textAlign: 'center' }}>© 2025 DevOpsX Learning Inc.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Register Form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: 'var(--bg-primary)', position: 'relative', overflowY: 'auto' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 2 }}
        >
          {/* Mobile Logo */}
          <div className="auth-mobile-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <BrandLogo size="md" />
          </div>

          <div style={{ background: 'rgba(13,22,48,0.9)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,.09)', borderRadius: '24px', padding: '36px', boxShadow: '0 32px 80px rgba(0,0,0,.7)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                Create your account
              </h2>
              <p style={{ color: 'rgba(148,163,184,.6)', fontSize: '0.875rem', margin: 0 }}>
                Start learning for free — no credit card needed
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)', marginBottom: '7px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'name' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input type="text" value={form.name} placeholder="Your full name"
                    onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: '' })); }}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    style={fieldStyle('name')} />
                </div>
                {errors.name && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={11} /> {errors.name}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)', marginBottom: '7px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input type="email" value={form.email} placeholder="you@example.com"
                    onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: '' })); }}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={fieldStyle('email')} />
                </div>
                {errors.email && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={11} /> {errors.email}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)', marginBottom: '7px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'password' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input type={showPw.password ? 'text' : 'password'} value={form.password} placeholder="Min 8 characters"
                    onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: '' })); }}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    style={fieldStyle('password')} />
                  <button type="button" onClick={() => setShowPw((p) => ({ ...p, password: !p.password }))}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(148,163,184,.5)', padding: '4px' }}>
                    {showPw.password ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={11} /> {errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,.65)', marginBottom: '7px' }}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'confirmPassword' ? '#60a5fa' : 'rgba(148,163,184,.35)', pointerEvents: 'none' }} />
                  <input type={showPw.confirmPassword ? 'text' : 'password'} value={form.confirmPassword} placeholder="Repeat your password"
                    onChange={(e) => { setForm((p) => ({ ...p, confirmPassword: e.target.value })); setErrors((p) => ({ ...p, confirmPassword: '' })); }}
                    onFocus={() => setFocused('confirmPassword')} onBlur={() => setFocused('')}
                    style={fieldStyle('confirmPassword')} />
                  <button type="button" onClick={() => setShowPw((p) => ({ ...p, confirmPassword: !p.confirmPassword }))}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(148,163,184,.5)', padding: '4px' }}>
                    {showPw.confirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.confirmPassword && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={11} /> {errors.confirmPassword}</p>}
              </div>

              <p style={{ fontSize: '0.73rem', color: 'rgba(148,163,184,.45)', marginBottom: '20px', lineHeight: 1.5 }}>
                By creating an account you agree to our{' '}
                <Link to="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>{' '}and{' '}
                <Link to="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>.
              </p>

              <motion.button type="submit" disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', borderRadius: '14px', border: 'none',
                  background: loading ? 'rgba(59,130,246,.5)' : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(59,130,246,.45)',
                }}>
                {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account…</> : <>Create Free Account <ArrowRight size={16} /></>}
              </motion.button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(148,163,184,.5)', margin: '20px 0 0' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
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
