// ============================================================
// Dashboard Page — DevOpsX Student Dashboard (Theme-Aware)
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, Award, TrendingUp, Calendar, Star,
  BarChart3, Target, Flame, ArrowRight, Trophy, Lightbulb, Rocket, BookMarked
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import { assignments } from '../../data/assignments';

const activityData = [
  { day: 'Mon', hours: 1.5 }, { day: 'Tue', hours: 2.8 }, { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 3.5 }, { day: 'Fri', hours: 2.1 }, { day: 'Sat', hours: 4.2 }, { day: 'Sun', hours: 0.8 },
];
const progressData = [{ name: 'Completed', value: 65, fill: '#3b82f6' }];

function StatCard({ icon: Icon, label, value, color, trend, delay = 0, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      style={{
        padding: '20px', borderRadius: '18px', minWidth: 0,
        background: isDark ? 'var(--bg-card)' : '#ffffff',
        border: isDark ? '1px solid var(--border-subtle)' : `1px solid ${color}22`,
        boxShadow: isDark
          ? '0 2px 12px rgba(0,0,0,.3)'
          : `0 4px 20px ${color}18, 0 1px 4px rgba(0,0,0,.06)`,
        flex: '1 1 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top accent bar */}
      {!isDark && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: '18px 18px 0 0',
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '13px',
          background: isDark ? `${color}20` : `${color}15`,
          border: `1.5px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend && (
          <span style={{
            fontSize: '0.7rem', color: '#10b981', fontWeight: 700,
            background: isDark ? 'rgba(16,185,129,.12)' : 'rgba(16,185,129,.1)',
            padding: '3px 9px', borderRadius: '999px',
            border: '1px solid rgba(16,185,129,.2)',
          }}>
            +{trend}%
          </span>
        )}
      </div>
      <p style={{
        color: isDark ? '#fff' : '#0f172a',
        fontSize: '1.65rem', fontWeight: 800,
        fontFamily: 'var(--font-display)', margin: '0 0 4px', lineHeight: 1,
      }}>
        {value}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{label}</p>
    </motion.div>
  );
}

function Bar({ value, isDark, color = 'linear-gradient(90deg,#3b82f6,#06b6d4)' }) {
  return (
    <div style={{
      flex: 1, height: '6px',
      background: isDark ? 'rgba(255,255,255,.08)' : 'rgba(59,130,246,.1)',
      borderRadius: '999px', overflow: 'hidden',
    }}>
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
  const { isDark } = useTheme();

  const enrolledCourses = courses.filter((c) => user?.enrolledCourses?.includes(c.id));
  const displayCourses = enrolledCourses.length ? enrolledCourses : courses.slice(0, 8);
  const pendingAssignments = assignments.filter((a) => a.status === 'pending').slice(0, 3);
  const progressMap = {
    [courses[0]?.id]: 65, [courses[1]?.id]: 32, [courses[2]?.id]: 88,
    [courses[3]?.id]: 45, [courses[4]?.id]: 72, [courses[5]?.id]: 20,
    [courses[6]?.id]: 55, [courses[7]?.id]: 90,
  };

  const diffColor = (d) => d === 'Hard' ? '#ef4444' : d === 'Medium' ? '#f59e0b' : '#10b981';

  // Theme-aware helpers
  const cardBg    = isDark ? 'var(--bg-card)'               : '#ffffff';
  const cardBorder= isDark ? '1px solid var(--border-subtle)': '1px solid rgba(59,130,246,.12)';
  const cardShadow= isDark ? '0 2px 12px rgba(0,0,0,.25)'   : '0 4px 20px rgba(59,130,246,.08), 0 1px 4px rgba(0,0,0,.05)';
  const headingColor = isDark ? '#ffffff' : '#0f172a';
  const subHeadColor = isDark ? '#93c5fd' : '#2563eb';
  const itemBg    = isDark ? 'rgba(255,255,255,.03)' : 'rgba(59,130,246,.04)';
  const itemBorder= isDark ? '1px solid rgba(255,255,255,.05)' : '1px solid rgba(59,130,246,.1)';
  const chartGrid = isDark ? 'rgba(255,255,255,.05)' : 'rgba(59,130,246,.08)';
  const chartTick = isDark ? '#64748b' : '#94a3b8';
  const tooltipBg = isDark ? '#0f1929' : '#ffffff';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(59,130,246,.2)';
  const tooltipColor  = isDark ? '#fff' : '#0f172a';
  const radialBg  = isDark ? 'rgba(255,255,255,.06)' : 'rgba(59,130,246,.08)';
  const viewAllHover = isDark ? 'rgba(255,255,255,.04)' : 'rgba(59,130,246,.06)';

  return (
    <div style={{
      minHeight: '100vh', width: '100%', boxSizing: 'border-box',
      padding: '28px 20px 60px',
      background: 'var(--bg-primary)',
      overflowX: 'hidden',
      transition: 'background 0.25s ease',
    }}>

      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
        <h1 style={{
          color: headingColor,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
          fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em',
        }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Learner'} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          Here's your learning overview for today.
        </p>
      </motion.div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatCard isDark={isDark} icon={BookOpen} label="Enrolled Courses" value={user?.enrolledCourses?.length || 3} color="#3b82f6" trend={12} delay={0.05} />
        <StatCard isDark={isDark} icon={Clock}    label="Learning Hours"   value="24.5h"                               color="#06b6d4" trend={8}  delay={0.1}  />
        <StatCard isDark={isDark} icon={Award}    label="Certificates"     value={user?.certificates?.length || 1}     color="#8b5cf6"            delay={0.15} />
        <StatCard isDark={isDark} icon={Flame}    label="Day Streak"       value="7 days"                              color="#f59e0b"            delay={0.2}  />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 260px', gap: '16px', alignItems: 'start', width: '100%' }}>

        {/* ── Left Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '20px', overflow: 'hidden', boxShadow: cardShadow }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: headingColor, fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <BarChart3 size={16} color="#3b82f6" /> Weekly Activity
              </h2>
              <span style={{
                fontSize: '0.7rem', color: subHeadColor, fontWeight: 600,
                background: isDark ? 'rgba(59,130,246,.12)' : 'rgba(59,130,246,.08)',
                padding: '3px 10px', borderRadius: '999px',
                border: '1px solid rgba(59,130,246,.2)',
              }}>This week</span>
            </div>
            <div style={{ width: '100%', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={isDark ? 0.25 : 0.18} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: chartTick, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: chartTick, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: tooltipBg, border: tooltipBorder, borderRadius: '10px', color: tooltipColor, fontSize: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}
                    formatter={(v) => [`${v}h`, 'Study time']}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: '#3b82f6', r: 3.5, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '20px', boxShadow: cardShadow }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ color: headingColor, fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <TrendingUp size={16} color="#3b82f6" /> Continue Learning
              </h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{displayCourses.length} courses</span>
            </div>

            {/* Horizontal scroll */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {displayCourses.map((course, i) => {
                const prog = progressMap[course.id] ?? [65, 32, 88, 45, 72, 20, 55, 90][i] ?? 50;
                const progColor = prog >= 70
                  ? 'linear-gradient(90deg,#10b981,#059669)'
                  : 'linear-gradient(90deg,#3b82f6,#06b6d4)';
                const progText  = prog >= 70 ? '#10b981' : '#3b82f6';
                return (
                  <Link
                    to={`/courses/${course.slug}`}
                    key={course.id}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: '10px',
                      minWidth: '190px', maxWidth: '210px', flexShrink: 0,
                      padding: '12px', borderRadius: '14px', textDecoration: 'none',
                      background: itemBg, border: itemBorder,
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.07)' : 'rgba(59,130,246,.08)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = isDark
                        ? '0 12px 30px rgba(0,0,0,.35)'
                        : '0 8px 24px rgba(59,130,246,.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = itemBg;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ width: '100%', height: '108px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        color: isDark ? '#f1f5f9' : '#0f172a',
                        fontSize: '0.78rem', fontWeight: 600, margin: '0 0 4px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {course.title}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.67rem', margin: '0 0 8px' }}>{course.duration}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Bar isDark={isDark} value={prog} color={progColor} />
                        <span style={{ color: progText, fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                          {prog}%
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/my-learning"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                marginTop: '14px', padding: '10px', borderRadius: '12px',
                border: cardBorder,
                color: subHeadColor, fontSize: '0.78rem', fontWeight: 600,
                textDecoration: 'none', transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = viewAllHover}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              View all courses <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* ── Right Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '260px', flexShrink: 0 }}>

          {/* Progress Radial */}
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '18px', boxShadow: cardShadow }}
          >
            <h3 style={{ color: headingColor, fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 4px' }}>
              <Target size={14} color="#3b82f6" /> Overall Progress
            </h3>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '140px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="62%" outerRadius="88%" data={progressData} startAngle={90} endAngle={-270}>
                    <RadialBar background={{ fill: radialBg }} dataKey="value" cornerRadius={6} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
                <p style={{ color: isDark ? '#fff' : '#1e3a8a', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>65%</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', margin: '4px 0 0' }}>Completion</p>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Assignments */}
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '18px', boxShadow: cardShadow }}
          >
            <h3 style={{ color: headingColor, fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 14px' }}>
              <Calendar size={14} color="#3b82f6" /> Upcoming
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingAssignments.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '10px', borderRadius: '12px',
                    background: itemBg, border: itemBorder,
                  }}
                >
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: diffColor(a.difficulty), flexShrink: 0, marginTop: '4px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: isDark ? '#f1f5f9' : '#0f172a',
                      fontSize: '0.75rem', fontWeight: 600, margin: '0 0 3px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {a.title}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: 0 }}>Due {a.dueDate}</p>
                  </div>
                  <span style={{ color: subHeadColor, fontSize: '0.68rem', fontWeight: 700, flexShrink: 0 }}>{a.points}pts</span>
                </div>
              ))}
            </div>
            <Link
              to="/assignments"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', fontSize: '0.75rem', color: subHeadColor, fontWeight: 600, textDecoration: 'none' }}
            >
              View all <ArrowRight size={11} />
            </Link>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}
            style={{ background: cardBg, border: cardBorder, borderRadius: '18px', padding: '18px', boxShadow: cardShadow }}
          >
            <h3 style={{ color: headingColor, fontWeight: 700, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 14px' }}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" /> Achievements
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { icon: Target,     label: 'First Course',  color: '#3b82f6' },
                { icon: Flame,      label: '7-Day Streak',  color: '#ef4444' },
                { icon: Trophy,     label: 'Top Learner',   color: '#f59e0b' },
                { icon: BookMarked, label: 'Bookworm',      color: '#10b981' },
                { icon: Lightbulb,  label: 'Problem Solver',color: '#8b5cf6' },
                { icon: Rocket,     label: 'Fast Starter',  color: '#06b6d4' },
              ].map(({ icon: BIcon, label, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '6px', padding: '10px 4px', borderRadius: '12px', textAlign: 'center',
                    background: isDark ? 'rgba(255,255,255,.04)' : `${color}08`,
                    border: isDark ? '1px solid rgba(255,255,255,.06)' : `1px solid ${color}20`,
                  }}
                >
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '9px',
                    background: `${color}20`,
                    border: `1.5px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <BIcon size={14} style={{ color }} />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', lineHeight: 1.3, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
