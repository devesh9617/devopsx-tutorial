// ============================================================
// Profile Page — DevOpsX (Fully Theme-Aware & Ultra Professional)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Edit3, Save, X, BookOpen, Award, Heart,
  Calendar, Mail, User, LogOut, ChevronRight,
  BarChart3, Clock, Star, Trophy, Flame, Lock, ClipboardList, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProgressBar({ value, isDark }) {
  return (
    <div
      style={{
        width: '100%',
        height: '6px',
        background: isDark ? 'rgba(255,255,255,.08)' : 'rgba(59,130,246,.12)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        style={{
          height: '100%',
          borderRadius: '999px',
          background: value >= 70
            ? 'linear-gradient(90deg,#10b981,#059669)'
            : 'linear-gradient(90deg,#3b82f6,#06b6d4)',
        }}
      />
    </div>
  );
}

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lock size={32} color="#3b82f6" />
        </div>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>Sign in to view your profile</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '10px 24px', borderRadius: '12px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Sign In</button>
          <button onClick={() => navigate('/register')} style={{ padding: '10px 24px', borderRadius: '12px', background: 'var(--bg-glass)', color: 'var(--text-secondary)', border: '1px solid var(--border-muted)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Register</button>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter((c) => user.enrolledCourses?.includes(c.id));
  const progressMap = { [courses[0]?.id]: 65, [courses[1]?.id]: 32, [courses[2]?.id]: 88 };

  const handleSave = () => { updateProfile(form); setEditing(false); toast.success('Profile updated!'); };
  const handleCancel = () => { setForm({ name: user.name, email: user.email }); setEditing(false); };

  // Theme-aware styles
  const cardBg     = isDark ? 'var(--bg-card)' : '#ffffff';
  const cardBorder = isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)';
  const cardShadow = isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 4px 20px rgba(15,23,42,.06), 0 1px 3px rgba(0,0,0,.04)';
  const itemBg     = isDark ? 'rgba(255,255,255,.03)' : 'rgba(59,130,246,.04)';
  const itemBorder = isDark ? '1px solid rgba(255,255,255,.06)' : '1px solid rgba(59,130,246,.12)';
  const textHeading = isDark ? '#ffffff' : '#0f172a';
  const textSubHead = isDark ? '#60a5fa' : '#1d4ed8';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '24px 20px 60px', boxSizing: 'border-box', width: '100%', overflowX: 'hidden', transition: 'background 0.25s ease' }}>

      {/* BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '20px',
          background: cardBg,
          border: cardBorder,
          boxShadow: cardShadow,
          width: '100%',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: isDark
            ? 'linear-gradient(135deg, #0f1e45, #1a1040, #0a2245, #081830)'
            : 'linear-gradient(135deg, #1e3a8a, #2563eb, #0284c7)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.6 }} />
        <div style={{ position: 'absolute', width: '180px', height: '180px', top: '-50px', right: '8%', background: 'radial-gradient(circle, rgba(255,255,255,.25), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '72px 24px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '16px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '18px', overflow: 'hidden', border: '3px solid #3b82f6', boxShadow: '0 8px 20px rgba(0,0,0,.3)' }}>
              <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,.3)' }}>
              <Camera size={12} />
            </button>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ color: textHeading, fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '2px 0 0' }}>{user.email}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 500 }}>
                <Calendar size={11} /> Joined {user.joinedAt}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: isDark ? 'rgba(59,130,246,.2)' : 'rgba(59,130,246,.12)', color: isDark ? '#93c5fd' : '#1d4ed8', border: '1px solid rgba(59,130,246,.3)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize' }}>
                <User size={10} /> {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700,
              background: editing ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : (isDark ? 'rgba(255,255,255,.1)' : 'rgba(59,130,246,.1)'),
              color: editing ? '#fff' : (isDark ? '#fff' : '#1d4ed8'),
              border: editing ? 'none' : (isDark ? '1px solid rgba(255,255,255,.2)' : '1px solid rgba(59,130,246,.3)'),
              cursor: 'pointer',
              boxShadow: editing ? '0 4px 14px rgba(59,130,246,.3)' : 'none',
            }}
          >
            <Edit3 size={13} /> {editing ? 'Editing…' : 'Edit Profile'}
          </button>
        </div>
      </motion.div>

      {/* TWO-COLUMN GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 280px',
        gap: '20px',
        alignItems: 'start',
        width: '100%',
      }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '20px', boxShadow: cardShadow }}
          >
            <h2 style={{ color: textHeading, fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'flex', width: '28px', height: '28px', borderRadius: '9px', background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.12)', alignItems: 'center', justifyContent: 'center' }}>
                <User size={14} color="#3b82f6" />
              </span>
              Personal Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '14px' }}>
              {[
                { icon: User, label: 'Full Name',      field: 'name',  type: 'text',  ph: 'Your name' },
                { icon: Mail, label: 'Email Address',  field: 'email', type: 'email', ph: 'you@email.com' },
              ].map(({ icon: Icon, label, field, type, ph }) => (
                <div key={field} style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Icon size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: editing ? '#3b82f6' : 'var(--text-muted)', pointerEvents: 'none' }} />
                    <input
                      type={type}
                      value={form[field]}
                      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                      disabled={!editing}
                      placeholder={ph}
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        paddingLeft: '36px', paddingRight: '12px', paddingTop: '10px', paddingBottom: '10px',
                        borderRadius: '12px', fontSize: '0.82rem', outline: 'none', fontWeight: 600,
                        background: editing
                          ? (isDark ? 'rgba(59,130,246,.08)' : '#f0f4ff')
                          : 'var(--bg-input)',
                        border: `1px solid ${editing ? 'var(--brand-blue)' : 'var(--border-muted)'}`,
                        color: 'var(--text-primary)',
                        cursor: editing ? 'text' : 'default',
                        transition: 'all 0.15s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {editing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', boxShadow: '0 4px 12px rgba(59,130,246,.3)' }}>
                  <Save size={13} /> Save Changes
                </button>
                <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,.06)' : 'rgba(59,130,246,.08)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                  <X size={13} /> Cancel
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '20px', minWidth: 0, boxShadow: cardShadow }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ color: textHeading, fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <span style={{ display: 'flex', width: '28px', height: '28px', borderRadius: '9px', background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.12)', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={14} color="#3b82f6" />
                </span>
                Enrolled Courses
              </h2>
              <span style={{ background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.25)', color: textSubHead, borderRadius: '999px', padding: '3px 12px', fontSize: '0.72rem', fontWeight: 700 }}>
                {enrolledCourses.length} Courses
              </span>
            </div>

            {enrolledCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <BookOpen size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>No courses enrolled yet</p>
                <Link to="/courses" style={{ padding: '9px 22px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', display: 'inline-block', textDecoration: 'none' }}>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {enrolledCourses.map((course) => {
                  const prog = progressMap[course.id] ?? 50;
                  return (
                    <Link
                      to={`/courses/${course.slug}`}
                      key={course.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px', borderRadius: '14px', textDecoration: 'none',
                        background: itemBg, border: itemBorder,
                        transition: 'all 0.18s ease',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(59,130,246,.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = itemBg;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ width: '52px', height: '38px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: textHeading, fontWeight: 700, fontSize: '0.82rem', margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {course.title}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '0 0 8px' }}>{course.category}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar value={prog} isDark={isDark} />
                          <span style={{ color: prog >= 70 ? (isDark ? '#34d399' : '#059669') : textSubHead, fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, minWidth: '30px', textAlign: 'right' }}>
                            {prog}%
                          </span>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem', justifyContent: 'flex-end' }}>
                          <Clock size={10} /> {course.duration}
                        </div>
                        <span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 9px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, background: prog >= 70 ? (isDark ? 'rgba(16,185,129,.15)' : 'rgba(16,185,129,.12)') : (isDark ? 'rgba(59,130,246,.12)' : 'rgba(59,130,246,.1)'), color: prog >= 70 ? (isDark ? '#34d399' : '#047857') : textSubHead }}>
                          {prog >= 100 ? 'Done' : prog >= 70 ? 'Almost!' : 'In Progress'}
                        </span>
                      </div>
                    </Link>
                  );
                })}

                <Link
                  to="/my-learning"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '12px', border: cardBorder, color: textSubHead, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', marginTop: '4px' }}
                >
                  View All Courses <ChevronRight size={13} />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '12px' }}
          >
            {[
              { icon: Trophy, label: 'Top Learner',  sub: 'This Month',   color: '#f59e0b' },
              { icon: Flame,  label: '7 Day Streak', sub: 'Keep Going!',  color: '#ef4444' },
              { icon: Star,   label: '4.9 Rating',   sub: 'From Reviews', color: '#8b5cf6' },
            ].map(({ icon: BIcon, label, sub, color }) => (
              <div key={label} style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', boxShadow: cardShadow }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}18`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BIcon size={20} style={{ color }} />
                </div>
                <p style={{ color: textHeading, fontWeight: 800, fontSize: '0.8rem', margin: 0 }}>{label}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>{sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px', flexShrink: 0 }}>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '18px', boxShadow: cardShadow }}
          >
            <h3 style={{ color: textHeading, fontWeight: 800, fontSize: '0.85rem', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <BarChart3 size={15} color="#3b82f6" /> My Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: BookOpen, label: 'Enrolled',     value: user.enrolledCourses?.length || 0, color: '#3b82f6' },
                { icon: Award,    label: 'Certificates', value: user.certificates?.length || 0,    color: '#f59e0b' },
                { icon: Heart,    label: 'Wishlist',     value: user.wishlist?.length || 0,         color: '#ef4444' },
                { icon: Star,     label: 'Avg Rating',   value: '4.9',                              color: '#8b5cf6' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '12px', background: itemBg, border: itemBorder }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
                  </div>
                  <span style={{ color: textHeading, fontWeight: 800, fontSize: '1rem' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '18px', boxShadow: cardShadow }}
          >
            <h3 style={{ color: textHeading, fontWeight: 800, fontSize: '0.85rem', margin: '0 0 12px' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { icon: BookOpen,         label: 'My Learning',  to: '/my-learning',  color: '#3b82f6' },
                { icon: Heart,            label: 'Wishlist',     to: '/wishlist',     color: '#ef4444' },
                { icon: Award,            label: 'Certificates', to: '/certificates', color: '#f59e0b' },
                { icon: LayoutDashboard,  label: 'Dashboard',    to: '/dashboard',    color: '#06b6d4' },
                { icon: ClipboardList,    label: 'Assignments',  to: '/assignments',  color: '#8b5cf6' },
              ].map(({ icon: QIcon, label, to, color }) => (
                <Link
                  key={label}
                  to={to}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, transition: 'background 0.12s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(59,130,246,.08)';
                    e.currentTarget.style.color = textSubHead;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <QIcon size={14} style={{ color }} />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.29 }}
            style={{
              background: isDark ? 'rgba(239,68,68,.05)' : 'rgba(239,68,68,.04)',
              border: isDark ? '1px solid rgba(239,68,68,.18)' : '1px solid rgba(239,68,68,.25)',
              borderRadius: '18px', padding: '18px', boxShadow: cardShadow,
            }}
          >
            <h3 style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', margin: '0 0 12px' }}>Account</h3>
            <button
              onClick={() => { logout(); navigate('/'); toast.success('Signed out successfully'); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: 'linear-gradient(135deg,#dc2626,#b91c1c)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.825rem', boxShadow: '0 4px 12px rgba(220,38,38,.25)' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
