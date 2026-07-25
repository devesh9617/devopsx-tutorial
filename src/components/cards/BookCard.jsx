import { motion } from 'framer-motion';
import { Download, BookOpen, Star, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function BookCard({ book, index = 0 }) {
  const { isDark } = useTheme();

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
        flexDirection: 'column',
        position: 'relative',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,.3)' : '0 2px 10px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.04)',
        transition: 'all 0.25s ease',
      }}
      whileHover={{
        transform: 'translateY(-4px)',
        borderColor: isDark ? 'rgba(59,130,246,.4)' : 'rgba(59,130,246,.55)',
        boxShadow: isDark
          ? '0 12px 32px rgba(0,0,0,.5), 0 0 20px rgba(59,130,246,.15)'
          : '0 8px 24px rgba(59,130,246,.16), 0 2px 6px rgba(0,0,0,.04)',
      }}
    >
      {/* Cover Image (3:4 Book Aspect Ratio) */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: isDark ? '#0a1020' : '#e0e7ff' }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.3) 0%, transparent 40%, rgba(0,0,0,.8) 100%)', pointerEvents: 'none' }} />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {book.isNew && (
            <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
              NEW
            </span>
          )}
          <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600, color: '#fff', background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(6px)' }}>
            {book.category}
          </span>
        </div>

        {/* Download Count */}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.68rem', color: '#fff', background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)' }}>
          <Download size={10} color="#60a5fa" /> {(book.downloads / 1000).toFixed(1)}K
        </div>
      </div>

      {/* Content Body */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title */}
        <h3 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.35, margin: '0 0 4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {book.title}
        </h3>

        {/* Author */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          By {book.author}
        </p>

        {/* Meta Row: Rating, Pages, Year */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px', marginTop: 'auto' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={11} color={isDark ? '#fbbf24' : '#d97706'} fill={isDark ? '#fbbf24' : '#d97706'} />
            <strong style={{ color: isDark ? '#fbbf24' : '#d97706' }}>{book.rating}</strong>
          </span>
          <span>{book.pages} pages</span>
          <span>{book.year}</span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '12px' }} />

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => window.open(book.readUrl, '_blank')}
            style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
              padding: '7px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700,
              color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59,130,246,.25)', transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Eye size={12} /> Read
          </button>
          <button
            onClick={() => window.open(book.downloadUrl, '_blank')}
            title="Download PDF"
            style={{
              padding: '7px 10px', borderRadius: '10px',
              background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-brand)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
          >
            <Download size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
