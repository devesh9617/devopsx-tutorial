// ============================================================
// TextBooks / All Books Page — Reference Design
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, RotateCcw, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { books, bookCategories, categoryIcons } from '../../data/books';
import BookCard from '../../components/cards/BookCard';
import { useTheme } from '../../context/ThemeContext';

const BOOKS_PER_PAGE = 10;

const LANGUAGES = [
  { label: 'English', value: 'English', count: 125 },
  { label: 'Hindi', value: 'Hindi', count: 26 },
  { label: 'Bilingual', value: 'Bilingual', count: 12 },
];

const PRICE_FILTERS = [
  { label: 'Free', id: 'free' },
  { label: 'Under ₹500', id: 'under500' },
  { label: '₹500 – ₹1000', id: '500to1000' },
  { label: 'Above ₹1000', id: 'above1000' },
];

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
];

function priceMatch(book, priceFilter) {
  if (!priceFilter) return true;
  if (priceFilter === 'free') return book.price === 0;
  if (priceFilter === 'under500') return book.price > 0 && book.price < 500;
  if (priceFilter === '500to1000') return book.price >= 500 && book.price <= 1000;
  if (priceFilter === 'above1000') return book.price > 1000;
  return true;
}

export default function TextBooks() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All Categories';
  const [search, setSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Entire page sidebar collapsible state (true = open, false = collapsed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat && cat !== 'All Categories') {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
    setPage(1);
  };

  const toggleLanguage = (val) => {
    setSelectedLanguages((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    handleCategoryChange('All Categories');
    setSelectedLanguages([]);
    setSelectedPrice('');
    setSort('newest');
    setPage(1);
  };

  const hasFilters =
    search ||
    selectedCategory !== 'All Categories' ||
    selectedLanguages.length > 0 ||
    selectedPrice;

  const activeFilterCount =
    (selectedCategory !== 'All Categories' ? 1 : 0) +
    selectedLanguages.length +
    (selectedPrice ? 1 : 0) +
    (search ? 1 : 0);

  const filtered = useMemo(() => {
    let result = [...books];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== 'All Categories') {
      result = result.filter((b) => b.category === selectedCategory);
    }
    if (selectedLanguages.length > 0) {
      result = result.filter((b) => selectedLanguages.includes(b.language));
    }
    if (selectedPrice) {
      result = result.filter((b) => priceMatch(b, selectedPrice));
    }
    result.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'popular') return (b.ratingsCount || 0) - (a.ratingsCount || 0);
      return b.id - a.id; // newest
    });
    return result;
  }, [search, selectedCategory, selectedLanguages, selectedPrice, sort]);

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#e9ecef';

  const renderPaginationPages = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4);
      if (page > 5) pages.push('...');
      if (page > 4 && page < totalPages - 1) pages.push(page);
      pages.push('...', totalPages);
    }
    return pages;
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 28px 56px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Books</span>
          {selectedCategory !== 'All Categories' && (
            <>
              <ChevronRight size={13} />
              <span style={{ color: '#6366f1', fontWeight: 600 }}>{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Main layout */}
        <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>

          {/* Quick Expand Button when collapsed */}
          {!isSidebarOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsSidebarOpen(true)}
              title="Expand Filter & Categories"
              style={{
                position: 'sticky',
                top: '84px',
                zIndex: 15,
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(99,102,241,.38)',
                marginRight: '16px',
                flexShrink: 0,
                transition: 'transform .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <ChevronRight size={20} />
            </motion.button>
          )}

          {/* Entire Side Filter & Category Panel (Collapsible Horizontal) */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0, marginRight: 0 }}
                animate={{ width: 220, opacity: 1, marginRight: 32 }}
                exit={{ width: 0, opacity: 0, marginRight: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  flexShrink: 0,
                  position: 'sticky',
                  top: '80px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ width: '220px' }}>
                  {/* Panel Header with Icon Collapse Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 800 }}>
                      Filter &amp; Categories
                    </span>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      title="Collapse Sidebar"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: isDark ? 'rgba(255,255,255,.06)' : 'rgba(99,102,241,.08)',
                        border: 'none',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#6366f1';
                        e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.2)' : 'rgba(99,102,241,.14)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(99,102,241,.08)';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </div>

                  {/* Categories List */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 10px', letterSpacing: '0.01em' }}>
                      Categories
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {bookCategories.map((cat) => {
                        const active = selectedCategory === cat;
                        return (
                          <li key={cat}>
                            <button
                              onClick={() => handleCategoryChange(cat)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '7px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                background: active ? (isDark ? 'rgba(99,102,241,.18)' : 'rgba(99,102,241,.1)') : 'transparent',
                                color: active ? '#6366f1' : 'var(--text-secondary)',
                                fontSize: '0.78rem',
                                fontWeight: active ? 700 : 500,
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all .15s',
                              }}
                              onMouseEnter={(e) => {
                                if (!active) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.04)' : 'rgba(99,102,241,.06)';
                              }}
                              onMouseLeave={(e) => {
                                if (!active) e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <span style={{ flex: 1, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat}</span>
                              {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: border, marginBottom: '20px' }} />

                  {/* Filter by Language */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 10px' }}>
                      Filter by
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Language
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {LANGUAGES.map(({ label, value, count }) => (
                        <label
                          key={value}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)' }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(value)}
                            onChange={() => toggleLanguage(value)}
                            style={{ accentColor: '#6366f1', width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }}
                          />
                          {label}
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginLeft: 'auto' }}>({count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter by Price */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Price
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {PRICE_FILTERS.map(({ label, id }) => (
                        <label
                          key={id}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)' }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedPrice === id}
                            onChange={() => {
                              setSelectedPrice(selectedPrice === id ? '' : id);
                              setPage(1);
                            }}
                            style={{ accentColor: '#6366f1', width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters */}
                  {hasFilters && (
                    <button
                      onClick={resetFilters}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: isDark ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.08)',
                        border: '1px solid rgba(99,102,241,.2)',
                        color: '#6366f1',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      <RotateCcw size={12} /> Reset All Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Content Area (expands to 100% when sidebar collapses) */}
          <div style={{ flex: 1, minWidth: 0, transition: 'all 0.28s ease' }}>
            {/* Title + Controls Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                  All Books {selectedCategory !== 'All Categories' ? `— ${selectedCategory}` : ''}
                </h1>

                {/* Sleek Icon Filter Toggle Button */}
                <button
                  onClick={() => setIsSidebarOpen((p) => !p)}
                  title={isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: isSidebarOpen
                      ? (isDark ? 'rgba(99,102,241,.2)' : 'rgba(99,102,241,.1)')
                      : (isDark ? 'rgba(255,255,255,.06)' : '#ffffff'),
                    border: `1px solid ${isSidebarOpen ? '#6366f1' : border}`,
                    color: isSidebarOpen ? '#6366f1' : 'var(--text-primary)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSidebarOpen) e.currentTarget.style.borderColor = border;
                  }}
                >
                  <SlidersHorizontal size={16} />
                  {activeFilterCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#6366f1',
                        color: '#fff',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(99,102,241,.4)',
                      }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 18px' }}>
                Explore our collection of AI &amp; Data Science books
              </p>

              {/* Search + Sort Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '200px', maxWidth: '420px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search books..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      paddingLeft: '36px',
                      paddingRight: '14px',
                      paddingTop: '9px',
                      paddingBottom: '9px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      background: 'var(--bg-card)',
                      border: `1px solid ${border}`,
                      color: 'var(--text-primary)',
                      transition: 'border-color .15s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                    onBlur={(e) => (e.target.style.borderColor = border)}
                  />
                </div>

                {/* Sort */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${border}`,
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {paginated.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}
              >
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📚</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>No books found</p>
                <p style={{ fontSize: '0.8rem', margin: '0 0 16px' }}>Try a different search or reset filters</p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    border: '1px solid #6366f1',
                    background: 'transparent',
                    color: '#6366f1',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(162px, 1fr))',
                  gap: '18px',
                  transition: 'all 0.28s ease',
                }}
              >
                {paginated.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                  Showing {Math.min((page - 1) * BOOKS_PER_PAGE + 1, filtered.length)} to {Math.min(page * BOOKS_PER_PAGE, filtered.length)} of {filtered.length} books
                </p>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {renderPaginationPages().map((p, i) =>
                    p === '...' ? (
                      <span key={`dot-${i}`} style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => {
                          setPage(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${page === p ? '#6366f1' : border}`,
                          background: page === p ? '#6366f1' : 'var(--bg-card)',
                          color: page === p ? '#fff' : 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          fontWeight: page === p ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all .15s',
                        }}
                        onMouseEnter={(e) => {
                          if (page !== p) e.currentTarget.style.borderColor = '#6366f1';
                        }}
                        onMouseLeave={(e) => {
                          if (page !== p) e.currentTarget.style.borderColor = border;
                        }}
                      >
                        {p}
                      </button>
                    )
                  )}
                  {page < totalPages && (
                    <button
                      onClick={() => {
                        setPage((p) => p + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        width: 'auto',
                        height: '32px',
                        padding: '0 10px',
                        gap: '3px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${border}`,
                        background: 'var(--bg-card)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = border;
                      }}
                    >
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
