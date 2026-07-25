// ============================================================
// TextBooks Page — DevOpsX Digital Library (Ultra-Professional Design)
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, X, RotateCcw } from 'lucide-react';
import { books, bookCategories } from '../../data/books';
import BookCard from '../../components/cards/BookCard';
import EmptyState from '../../components/ui/EmptyState';
import { useDebounce } from '../../hooks/index';
import PageWrapper, { PageHeader, FilterPill } from '../../components/ui/PageWrapper';

export default function TextBooks() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const debouncedSearch = useDebounce(search, 300);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'School'];

  const filtered = useMemo(() => {
    let result = books;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== 'All') result = result.filter((b) => b.category === selectedCategory);
    if (selectedLevel !== 'All') result = result.filter((b) => b.level === selectedLevel);
    return result;
  }, [debouncedSearch, selectedCategory, selectedLevel]);

  const resetFilters = () => {
    setSearch(''); setSelectedCategory('All'); setSelectedLevel('All');
  };
  const hasFilters = search || selectedCategory !== 'All' || selectedLevel !== 'All';

  return (
    <PageWrapper>
      {/* Page Header */}
      <PageHeader
        icon={BookOpen}
        iconColor="#60a5fa"
        badge="DIGITAL LIBRARY"
        title="Free TextBook Library"
        subtitle={`Access ${filtered.length} free technical books, NCERT textbooks, and reference guides. Read online or download PDF for free.`}
      />

      {/* Controls Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>

        {/* Search Input Bar */}
        <div style={{ position: 'relative', maxWidth: '520px' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title, author, or topic..."
            style={{
              width: '100%', boxSizing: 'border-box',
              paddingLeft: '40px', paddingRight: search ? '32px' : '14px',
              paddingTop: '11px', paddingBottom: '11px',
              borderRadius: '14px', fontSize: '0.875rem', outline: 'none',
              background: 'var(--bg-input)', border: '1px solid var(--border-muted)',
              color: 'var(--text-primary)', transition: 'all 0.15s ease',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,.1)'; }}
            onBlur={(e)  => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {bookCategories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Level Pills Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>Level:</span>
          {levels.map((lvl) => (
            <FilterPill
              key={lvl}
              label={lvl}
              active={selectedLevel === lvl}
              onClick={() => setSelectedLevel(lvl)}
            />
          ))}

          {hasFilters && (
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto',
                background: 'none', border: 'none', color: '#f87171', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} /> Clear filters
            </button>
          )}
        </div>

      </div>

      {/* Books Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No books found"
          description="Try a different search term or select another category."
          action={resetFilters}
          actionLabel="Clear Filters"
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '18px',
        }}>
          {filtered.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
