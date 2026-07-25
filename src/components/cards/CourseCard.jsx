import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Heart, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function CourseCard({ course, index = 0, viewMode = 'grid' }) {
  const { user, isEnrolled, toggleWishlist, isWishlisted } = useAuth();
  const { isDark } = useTheme();

  const enrolled   = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);
  const discount   = Math.round((1 - course.price / course.originalPrice) * 100);

  const levelColors = {
    Beginner:     { bg: isDark ? 'rgba(16,185,129,.15)' : 'rgba(16,185,129,.12)', text: isDark ? '#34d399' : '#047857', border: 'rgba(16,185,129,.25)' },
    Intermediate: { bg: isDark ? 'rgba(245,158,11,.15)' : 'rgba(245,158,11,.12)', text: isDark ? '#fbbf24' : '#b45309', border: 'rgba(245,158,11,.25)' },
    Advanced:     { bg: isDark ? 'rgba(239,68,68,.15)'  : 'rgba(239,68,68,.12)',  text: isDark ? '#f87171' : '#b91c1c', border: 'rgba(239,68,68,.25)'  },
  };
  const lc = levelColors[course.level] || levelColors.Beginner;

  const isList = viewMode === 'list';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
      style={{
        background: 'var(--bg-card)',
        border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        position: 'relative',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,.3)' : '0 2px 10px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.04)',
        transition: 'all 0.25s ease',
      }}
      whileHover={{
        transform: 'translateY(-3px)',
        borderColor: isDark ? 'rgba(59,130,246,.4)' : 'rgba(59,130,246,.55)',
        boxShadow: isDark
          ? '0 12px 32px rgba(0,0,0,.45), 0 0 20px rgba(59,130,246,.15)'
          : '0 8px 24px rgba(59,130,246,.16), 0 2px 6px rgba(0,0,0,.04)',
      }}
    >
      {/* ── Thumbnail ── */}
      <div style={{
        position: 'relative',
        width: isList ? '240px' : '100%',
        aspectRatio: isList ? '16/10' : '16/9',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
          loading="lazy"
        />
        {/* Subtle shadow overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.3) 0%, transparent 40%, rgba(0,0,0,.7) 100%)', pointerEvents: 'none' }} />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {course.isNew && (
            <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
              NEW
            </span>
          )}
          {course.isFree && (
            <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, color: '#fff', background: '#10b981' }}>
              FREE
            </span>
          )}
          {course.isBestseller && (
            <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, color: '#111', background: '#fbbf24' }}>
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); user && toggleWishlist(course.id); }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '32px', height: '32px', borderRadius: '50%',
            background: wishlisted ? 'rgba(239,68,68,.9)' : 'rgba(0,0,0,.6)',
            backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          <Heart size={14} fill={wishlisted ? '#fff' : 'none'} color="#fff" />
        </button>

        {/* Bottom thumbnail info */}
        {enrolled && (
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: 'rgba(16,185,129,.85)', backdropFilter: 'blur(6px)' }}>
            <Award size={11} /> Enrolled
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.68rem', color: '#fff', background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(6px)' }}>
          <Clock size={10} /> {course.duration}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        {/* Category & Level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
            {course.level}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {course.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/courses/${course.slug}`} style={{ textDecoration: 'none', marginBottom: '8px' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.35, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {course.title}
          </h3>
        </Link>

        {/* Instructor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <img src={course.instructor.avatar} alt={course.instructor.name} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {course.instructor.name}
          </span>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '14px', marginTop: 'auto' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={11} color={isDark ? '#fbbf24' : '#d97706'} fill={isDark ? '#fbbf24' : '#d97706'} />
            <strong style={{ color: isDark ? '#fbbf24' : '#d97706' }}>{course.rating}</strong>
            <span>({(course.ratingCount / 1000).toFixed(1)}k)</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Users size={11} /> {(course.students / 1000).toFixed(0)}K
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <BookOpen size={11} /> {course.lessons} lessons
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '12px' }} />

        {/* Price & Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          {course.isFree ? (
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#34d399' : '#059669' }}>Free</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{course.price.toLocaleString()}</span>
              {course.originalPrice > course.price && (
                <>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isDark ? '#34d399' : '#059669' }}>{discount}% off</span>
                </>
              )}
            </div>
          )}

          <Link
            to={`/courses/${course.slug}`}
            style={{
              padding: '7px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700,
              color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 12px rgba(59,130,246,.25)',
              transition: 'opacity 0.15s',
            }}
          >
            {enrolled ? 'Resume' : 'Enroll'} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
