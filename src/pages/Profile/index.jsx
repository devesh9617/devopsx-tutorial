// ============================================================
// Profile Page — DevOpsX (Fixed Layout & Professional Icons)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Edit3, Save, X, BookOpen, Award, Heart,
  Calendar, Mail, User, LogOut, ChevronRight,
  BarChart3, Clock, Star, Trophy, Flame, Lock, ClipboardList, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProgressBar({ value }) {
  return (
    <div
      style={{
        width: '100%',
        height: '5px',
        background: 'rgba(255,255,255,.08)',
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
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lock size={32} color="#60a5fa" />
        </div>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>Sign in to view your profile</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '10px 24px', borderRadius: '12px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Sign In</button>
          <button onClick={() => navigate('/register')} style={{ padding: '10px 24px', borderRadius: '12px', background: 'rgba(255,255,255,.07)', color: 'var(--text-secondary)', border: '1px solid var(--border-muted)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Register</button>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter((c) => user.enrolledCourses?.includes(c.id));
  const progressMap = { [courses[0]?.id]: 65, [courses[1]?.id]: 32, [courses[2]?.id]: 88 };

  const handleSave = () => { updateProfile(form); setEditing(false); toast.success('Profile updated!'); };
  const handleCancel = () => { setForm({ name: user.name, email: user.email }); setEditing(false); };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '24px 20px 60px', boxSizing: 'border-box', width: '100%', overflowX: 'hidden' }}>

      {/* BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 8px 32px rgba(0,0,0,.4)',
          width: '100%',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(135deg, #0f1e45, #1a1040, #0a2245, #081830)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', backgroundImage: 'linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.6 }} />
        <div style={{ position: 'absolute', width: '180px', height: '180px', top: '-50px', right: '8%', background: 'radial-gradient(circle, rgba(59,130,246,.3), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '80px 24px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '16px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '18px', overflow: 'hidden', border: '3px solid rgba(59,130,246,.5)', boxShadow: '0 8px 20px rgba(0,0,0,.5)' }}>
              <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,.4)' }}>
              <Camera size={12} />
            </button>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.8rem', margin: '2px 0 0' }}>{user.email}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,.4)', fontSize: '0.72rem' }}>
                <Calendar size={10} /> Joined {user.joinedAt}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(59,130,246,.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,.3)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize' }}>
                <User size={9} /> {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700,
              background: editing ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'rgba(255,255,255,.1)',
              color: '#fff', border: editing ? 'none' : '1px solid rgba(255,255,255,.2)',
              cursor: 'pointer',
            }}
          >
            <Edit3 size={12} /> {editing ? 'Editing…' : 'Edit Profile'}
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
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}
          >
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'flex', width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(59,130,246,.15)', alignItems: 'center', justifyContent: 'center' }}>
                <User size={13} color="#60a5fa" />
              </span>
              Personal Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '14px' }}>
              {[
                { icon: User, label: 'Full Name',      field: 'name',  type: 'text',  ph: 'Your name' },
                { icon: Mail, label: 'Email Address',  field: 'email', type: 'email', ph: 'you@email.com' },
              ].map(({ icon: Icon, label, field, type, ph }) => (
                <div key={field} style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Icon size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: editing ? '#60a5fa' : 'var(--text-muted)', pointerEvents: 'none' }} />
                    <input
                      type={type}
                      value={form[field]}
                      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                      disabled={!editing}
                      placeholder={ph}
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        paddingLeft: '36px', paddingRight: '12px', paddingTop: '10px', paddingBottom: '10px',
                        borderRadius: '12px', fontSize: '0.8rem', outline: 'none',
                        background: editing ? 'rgba(59,130,246,.07)' : 'rgba(255,255,255,.03)',
                        border: `1px solid ${editing ? 'rgba(59,130,246,.4)' : 'rgba(255,255,255,.07)'}`,
                        color: editing ? 'var(--text-primary)' : 'var(--text-secondary)',
                        cursor: editing ? 'text' : 'default',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {editing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                  <Save size={13} /> Save Changes
                </button>
                <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
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
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', minWidth: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <span style={{ display: 'flex', width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(59,130,246,.15)', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={13} color="#60a5fa" />
                </span>
                Enrolled Courses
              </h2>
              <span style={{ background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.2)', color: '#60a5fa', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>
                {enrolledCourses.length} Courses
              </span>
            </div>

            {enrolledCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <BookOpen size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>No courses enrolled yet</p>
                <Link to="/courses" style={{ padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 600, fontSize: '0.8rem', display: 'inline-block', textDecoration: 'none' }}>
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
                        background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)',
                        transition: 'background 0.15s, transform 0.15s',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.03)'}
                    >
                      <div style={{ width: '52px', height: '38px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {course.title}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '0 0 8px' }}>{course.category}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressBar value={prog} />
                          <span style={{ color: prog >= 70 ? '#34d399' : '#60a5fa', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, minWidth: '30px', textAlign: 'right' }}>
                            {prog}%
                          </span>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem', justifyContent: 'flex-end' }}>
                          <Clock size={9} /> {course.duration}
                        </div>
                        <span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, background: prog >= 70 ? 'rgba(16,185,129,.15)' : 'rgba(59,130,246,.12)', color: prog >= 70 ? '#34d399' : '#60a5fa' }}>
                          {prog >= 100 ? 'Done' : prog >= 70 ? 'Almost!' : 'In Progress'}
                        </span>
                      </div>
                    </Link>
                  );
                })}

                <Link
                  to="/my-learning"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', marginTop: '4px' }}
                >
                  View All Courses <ChevronRight size={12} />
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
              <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BIcon size={20} style={{ color }} />
                </div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem', margin: 0 }}>{label}</p>
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
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.825rem', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <BarChart3 size={14} color="#60a5fa" /> My Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: BookOpen, label: 'Enrolled',     value: user.enrolledCourses?.length || 0, color: '#3b82f6' },
                { icon: Award,    label: 'Certificates', value: user.certificates?.length || 0,    color: '#f59e0b' },
                { icon: Heart,    label: 'Wishlist',     value: user.wishlist?.length || 0,         color: '#ef4444' },
                { icon: Star,     label: 'Avg Rating',   value: '4.9',                              color: '#8b5cf6' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                  </div>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.825rem', margin: '0 0 12px' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500, transition: 'background 0.12s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
            style={{ background: 'rgba(239,68,68,.05)', border: '1px solid rgba(239,68,68,.15)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#f87171', fontWeight: 700, fontSize: '0.825rem', margin: '0 0 12px' }}>Account</h3>
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
