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
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease-in-out',
        }}
        whileHover={{
          transform: 'translateY(-3px)',
          borderColor: isDark ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.4)',
          boxShadow: isDark ? '0 6px 16px rgba(0,0,0,0.35)' : '0 6px 16px rgba(0,0,0,0.08)',
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
            style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, margin: '0 0 6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', cursor: 'pointer' }}
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCardClick}
              style={{
                flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600,
                color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              <Eye size={13} /> View Description Page
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              title="Quick Popup Preview"
              style={{
                padding: '8px 10px', borderRadius: '6px',
                background: 'transparent', border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.borderColor = '#2563eb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
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

