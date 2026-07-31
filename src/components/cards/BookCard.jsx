import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import BookDetailModal from './BookDetailModal';

export default function BookCard({ book, index = 0 }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    navigate(`/textbooks/${book.id}`);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.25 }}
        style={{
          background: 'var(--bg-card)',
          border: isDark ? '1.5px solid rgba(255,255,255,.1)' : '1.5px solid #b3c3ea',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.25)' : '0 2px 10px rgba(30,64,175,.08)',
          transition: 'all 0.2s ease-in-out',
        }}
        whileHover={{
          y: -4,
          borderColor: isDark ? 'rgba(59,130,246,0.55)' : '#2563eb',
          boxShadow: isDark
            ? '0 8px 24px rgba(0,0,0,.4), 0 0 0 1px rgba(59,130,246,.2)'
            : '0 8px 24px rgba(30,64,175,.18), 0 0 0 1px rgba(37,99,235,.15)',
        }}
      >
        {/* Cover Image (3:4 Aspect Ratio) - Navigates to Full Description Page */}
        <div
          onClick={handleCardClick}
          style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: isDark ? '#111827' : '#f3f4f6', cursor: 'pointer' }}
        >
          <img
            src={book.cover}
            alt={book.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />

          {/* Top Badges */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {book.isNew && (
              <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, color: '#fff', background: '#2563eb' }}>
                NEW
              </span>
            )}
            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600, color: '#fff', background: 'rgba(17,24,39,0.8)' }}>
              {book.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Title - Navigates to Full Description Page */}
          <h3
            onClick={handleCardClick}
            style={{
              color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700,
              lineHeight: 1.4, margin: '0 0 6px',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0 0 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            By {book.author}
          </p>

          {/* Meta Row: Rating, Pages, Downloads */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px', marginTop: 'auto' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isDark ? '#fbbf24' : '#d97706', fontWeight: 600 }}>
              <Star size={12} color={isDark ? '#fbbf24' : '#d97706'} fill={isDark ? '#fbbf24' : '#d97706'} />
              {book.rating}
            </span>
            <span>{book.pages} pages</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Download size={11} /> {(book.downloads / 1000).toFixed(1)}K
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={handleCardClick}
              style={{
                flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '9px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(37,99,235,.3)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #2563eb)';
                e.currentTarget.style.boxShadow = '0 5px 16px rgba(29,78,216,.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(37,99,235,.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Eye size={13} /> View Details
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              title="Quick Preview"
              style={{
                padding: '9px 11px', borderRadius: '8px', flexShrink: 0,
                background: isDark ? 'rgba(255,255,255,.06)' : '#eff6ff',
                border: isDark ? '1.5px solid rgba(255,255,255,.12)' : '1.5px solid #bfdbfe',
                color: isDark ? '#93c5fd' : '#2563eb',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(59,130,246,.15)' : '#dbeafe';
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : '#eff6ff';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,.12)' : '#bfdbfe';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={13} />
            </button>
          </div>
        </div>
      </motion.article>

      {/* Quick Preview Modal */}
      <BookDetailModal
        book={book}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

