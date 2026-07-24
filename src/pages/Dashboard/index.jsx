// ============================================================
// Dashboard Page — DevOpsX Student Dashboard (Clean & Professional)
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, Award, TrendingUp, Calendar, Star,
  BarChart3, Target, Flame, ArrowRight, CheckCircle2, Zap, Trophy, Lightbulb, Rocket, BookMarked
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import { assignments } from '../../data/assignments';

const activityData = [
  { day: 'Mon', hours: 1.5 }, { day: 'Tue', hours: 2.8 }, { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 3.5 }, { day: 'Fri', hours: 2.1 }, { day: 'Sat', hours: 4.2 }, { day: 'Sun', hours: 0.8 },
];
const progressData = [{ name: 'Completed', value: 65, fill: '#3b82f6' }];

function StatCard({ icon: Icon, label, value, color, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      style={{
        padding: '18px', borderRadius: '16px', minWidth: 0,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 2px 12px rgba(0,0,0,.25)',
        flex: '1 1 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={17} style={{ color }} />
        </div>
        {trend && (
          <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, background: 'rgba(52,211,153,.12)', padding: '2px 8px', borderRadius: '999px' }}>
            +{trend}%
          </span>
        )}
      </div>
      <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', margin: '0 0 4px', lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{label}</p>
    </motion.div>
  );
}

function Bar({ value, color = 'linear-gradient(90deg,#3b82f6,#06b6d4)' }) {
  return (
    <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        style={{ height: '100%', borderRadius: '999px', background: color }}
      />
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const enrolledCourses = courses.filter((c) => user?.enrolledCourses?.includes(c.id));
  const displayCourses = enrolledCourses.length ? enrolledCourses : courses.slice(0, 3);
  const pendingAssignments = assignments.filter((a) => a.status === 'pending').slice(0, 3);
  const progressMap = { [courses[0]?.id]: 65, [courses[1]?.id]: 32, [courses[2]?.id]: 88 };

  const diffColor = (d) => d === 'Hard' ? '#ef4444' : d === 'Medium' ? '#f59e0b' : '#10b981';

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      padding: '28px 20px 60px',
      background: 'var(--bg-primary)',
      overflowX: 'hidden',
    }}>

      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Learner'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          Here's your learning overview for today.
        </p>
      </motion.div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatCard icon={BookOpen} label="Enrolled Courses" value={user?.enrolledCourses?.length || 3} color="#3b82f6" trend={12} delay={0.05} />
        <StatCard icon={Clock}    label="Learning Hours"   value="24.5h"                               color="#06b6d4" trend={8}  delay={0.1}  />
        <StatCard icon={Award}    label="Certificates"     value={user?.certificates?.length || 1}     color="#8b5cf6"            delay={0.15} />
        <StatCard icon={Flame}    label="Day Streak"       value="7 days"                              color="#f59e0b"            delay={0.2}  />
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 260px',
        gap: '16px',
        alignItems: 'start',
        width: '100%',
      }}>

        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <BarChart3 size={16} color="#60a5fa" /> Weekly Activity
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>This week</span>
            </div>
            <div style={{ width: '100%', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#0f1929', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                    formatter={(v) => [`${v}h`, 'Study time']}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}
          >
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px' }}>
              <TrendingUp size={16} color="#60a5fa" /> Continue Learning
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {displayCourses.map((course, i) => {
                const prog = progressMap[course.id] ?? [65, 32, 88][i] ?? 50;
                return (
                  <Link
                    to={`/courses/${course.slug}`}
                    key={course.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '14px', textDecoration: 'none', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', transition: 'background 0.15s', overflow: 'hidden' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.03)'}
                  >
                    <div style={{ width: '52px', height: '38px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {course.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Bar value={prog} color={prog >= 70 ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#3b82f6,#06b6d4)'} />
                        <span style={{ color: prog >= 70 ? '#34d399' : '#60a5fa', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, minWidth: '28px' }}>
                          {prog}%
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>{course.duration}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/my-learning"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-subtle)', color: '#60a5fa', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              View all courses <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '260px', flexShrink: 0 }}>

          {/* Progress Radial */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 4px' }}>
              <Target size={14} color="#60a5fa" /> Overall Progress
            </h3>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '140px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="62%" outerRadius="88%" data={progressData} startAngle={90} endAngle={-270}>
                    <RadialBar background={{ fill: 'rgba(255,255,255,.06)' }} dataKey="value" cornerRadius={6} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>65%</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', margin: '4px 0 0' }}>Completion</p>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Assignments */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 14px' }}>
              <Calendar size={14} color="#60a5fa" /> Upcoming
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingAssignments.map((a) => (
                <div
                  key={a.id}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)' }}
                >
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: diffColor(a.difficulty), flexShrink: 0, marginTop: '4px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600, margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.title}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: 0 }}>Due {a.dueDate}</p>
                  </div>
                  <span style={{ color: '#60a5fa', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0 }}>{a.points}pts</span>
                </div>
              ))}
            </div>
            <Link
              to="/assignments"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}
            >
              View all <ArrowRight size={11} />
            </Link>
          </motion.div>

          {/* Achievements (Icon-based Badges) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.38 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px' }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 14px' }}>
              <Star size={14} color="#fbbf24" fill="#fbbf24" /> Achievements
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { icon: Target,     label: 'First Course', color: '#3b82f6' },
                { icon: Flame,      label: '7-Day Streak', color: '#ef4444' },
                { icon: Trophy,     label: 'Top Learner',  color: '#f59e0b' },
                { icon: BookMarked, label: 'Bookworm',     color: '#10b981' },
                { icon: Lightbulb,  label: 'Problem Solver',color: '#8b5cf6' },
                { icon: Rocket,     label: 'Fast Starter', color: '#06b6d4' },
              ].map(({ icon: BIcon, label, color }) => (
                <div
                  key={label}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 4px', borderRadius: '12px', textAlign: 'center', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BIcon size={14} style={{ color }} />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.62rem', lineHeight: 1.2 }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
