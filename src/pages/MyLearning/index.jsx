// ============================================================
// My Learning Page — DevOpsX (Ultra-Professional Redesign)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, PlayCircle, Lock, ArrowRight, CheckCircle2, Flame, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import EmptyState from '../../components/ui/EmptyState';
import PageWrapper, { PageHeader, FilterPill } from '../../components/ui/PageWrapper';

const mockProgress = { 1: 65, 2: 32, 5: 88 };

function ProgressBar({ value, isDark }) {
  return (
    <div style={{ flex: 1, height: '6px', background: isDark ? 'rgba(255,255,255,.08)' : 'rgba(59,130,246,.12)', borderRadius: '999px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
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

export default function MyLearning() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState('in-progress');

  if (!user) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={32} color="#3b82f6" />
          </div>
          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>Sign in to view your learning dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '360px' }}>
            Access all your enrolled courses, track progress, and resume video lessons right where you left off.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '12px 28px', borderRadius: '12px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Sign In</button>
            <button onClick={() => navigate('/register')} style={{ padding: '12px 28px', borderRadius: '12px', background: 'var(--bg-glass)', color: 'var(--text-secondary)', border: '1px solid var(--border-muted)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Create Account</button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const enrolled = courses.filter((c) => user?.enrolledCourses?.includes(c.id));
  const inProgress = enrolled.filter((c) => (mockProgress[c.id] || 0) < 100);
  const completed = enrolled.filter((c) => (mockProgress[c.id] || 0) >= 100);
  const displayed = tab === 'in-progress' ? inProgress : tab === 'completed' ? completed : enrolled;

  return (
    <PageWrapper>
      {/* Page Header */}
      <PageHeader
        icon={BookOpen}
        iconColor="#3b82f6"
        badge="LEARNING DASHBOARD"
        title="My Enrolled Courses"
        subtitle={`Track your active learning journey across ${enrolled.length} enrolled courses`}
      />

      {/* Summary Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { icon: BookOpen, label: 'Enrolled Courses', value: enrolled.length, color: '#3b82f6' },
          { icon: Clock,    label: 'In Progress',      value: inProgress.length, color: '#06b6d4' },
          { icon: Award,    label: 'Completed',        value: completed.length,  color: '#10b981' },
          { icon: Flame,    label: 'Streak',           value: '7 Days',          color: '#f59e0b' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: isDark ? 'none' : '0 2px 8px rgba(15,23,42,.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '3px 0 0' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <FilterPill label={`In Progress (${inProgress.length})`} active={tab === 'in-progress'} onClick={() => setTab('in-progress')} />
        <FilterPill label={`Completed (${completed.length})`} active={tab === 'completed'} onClick={() => setTab('completed')} />
        <FilterPill label={`All Enrolled (${enrolled.length})`} active={tab === 'all'} onClick={() => setTab('all')} />
      </div>

      {/* Course List */}
      {displayed.length === 0 ? (
        <EmptyState
          icon="courses"
          title={tab === 'in-progress' ? 'No courses in progress' : 'No completed courses yet'}
          description="Browse our course catalog and start learning today."
          action={() => navigate('/courses')}
          actionLabel="Explore Courses"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {displayed.map((course, i) => {
            const progress = mockProgress[course.id] || 45;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '18px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  boxShadow: '0 4px 20px rgba(0,0,0,.25)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}
              >
                {/* Thumbnail */}
                <div style={{ width: '140px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                  <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.3)' }} />
                </div>

                {/* Info & Progress */}
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(59,130,246,.15)', color: '#60a5fa', fontWeight: 600 }}>
                      {course.category}
                    </span>
                    {progress >= 100 && (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(16,185,129,.15)', color: '#34d399', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={10} /> Completed
                      </span>
                    )}
                  </div>

                  <Link to={`/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px', lineHeight: 1.35 }}>
                      {course.title}
                    </h3>
                  </Link>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 10px' }}>
                    Instructor: {course.instructor.name}
                  </p>

                  {/* Progress Bar Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <ProgressBar value={progress} isDark={isDark} />
                    <span style={{ color: progress >= 70 ? (isDark ? '#34d399' : '#059669') : (isDark ? '#60a5fa' : '#1d4ed8'), fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, minWidth: '34px', textAlign: 'right' }}>
                      {progress}%
                    </span>
                  </div>

                  {/* Lessons & Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={11} />{course.lessons} lessons</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} />{course.duration}</span>
                  </div>
                </div>

                {/* Resume Action Button */}
                <div style={{ flexShrink: 0, marginLeft: 'auto' }}>
                  <Link
                    to={`/courses/${course.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '10px 18px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700,
                      color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(59,130,246,.3)', transition: 'opacity 0.15s',
                    }}
                  >
                    <PlayCircle size={15} fill="#fff" color="#3b82f6" /> {progress >= 100 ? 'Review Class' : 'Resume Class'}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}
