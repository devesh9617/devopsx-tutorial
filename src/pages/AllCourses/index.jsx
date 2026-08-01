// ============================================================
// All Courses Page — Reference Design (DITTO match)
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  Check,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { courses, courseCategories, categoryIcons } from '../../data/courses';
import CourseCard from '../../components/cards/CourseCard';
import { useTheme } from '../../context/ThemeContext';

const COURSES_PER_PAGE = 8;

const LEVELS = [
  { label: 'Beginner', id: 'Beginner' },
  { label: 'Intermediate', id: 'Intermediate' },
  { label: 'Advanced', id: 'Advanced' },
];

const DURATIONS = [
  { label: '0 - 10 Hours', min: 0, max: 10, id: 'd1' },
  { label: '10 - 30 Hours', min: 10, max: 30, id: 'd2' },
  { label: '30+ Hours', min: 30, max: 999, id: 'd3' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function AllCourses() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All Categories';
  const [search, setSearch] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);

  // Entire side panel collapsible state (true = open, false = collapsed)
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

  const toggleLevel = (val) => {
    setSelectedLevels((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
    setPage(1);
  };

  const toggleDuration = (id) => {
    setSelectedDurations((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    handleCategoryChange('All Categories');
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSort('popular');
    setPage(1);
  };

  const hasFilters =
    search ||
    selectedCategory !== 'All Categories' ||
    selectedLevels.length > 0 ||
    selectedDurations.length > 0;

  const activeFilterCount =
    (selectedCategory !== 'All Categories' ? 1 : 0) +
    selectedLevels.length +
    selectedDurations.length +
    (search ? 1 : 0);

  const filtered = useMemo(() => {
    let result = [...courses];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All Categories') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (selectedLevels.length > 0) {
      result = result.filter((c) => selectedLevels.includes(c.level));
    }

    if (selectedDurations.length > 0) {
      result = result.filter((c) => {
        const h = c.durationHours || 20;
        return selectedDurations.some((dId) => {
          const dObj = DURATIONS.find((d) => d.id === dId);
          return dObj && h >= dObj.min && h <= dObj.max;
        });
      });
    }

    result.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'newest') return b.id - a.id;
      return (b.students || 0) - (a.students || 0); // popular
    });

    return result;
  }, [search, selectedCategory, selectedLevels, selectedDurations, sort]);

  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * COURSES_PER_PAGE, page * COURSES_PER_PAGE);

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
        {/* ── Breadcrumb ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '24px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Courses</span>
          {selectedCategory !== 'All Categories' && (
            <>
              <ChevronRight size={13} />
              <span style={{ color: '#6366f1', fontWeight: 600 }}>{selectedCategory}</span>
            </>
          )}
        </div>

        {/* ── Main Layout ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
          {/* Quick Expand handle when collapsed */}
          {!isSidebarOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsSidebarOpen(true)}
              title="Expand Filters"
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

          {/* Collapsible Left Side Filter Panel */}
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
                  {/* Panel Header */}
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
                    <span
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                      }}
                    >
                      Categories
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
                        e.currentTarget.style.background = isDark
                          ? 'rgba(99,102,241,.2)'
                          : 'rgba(99,102,241,.14)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = isDark
                          ? 'rgba(255,255,255,.06)'
                          : 'rgba(99,102,241,.08)';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </div>

                  {/* Categories List */}
                  <div style={{ marginBottom: '24px' }}>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      {courseCategories.map((cat) => {
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
                                background: active
                                  ? isDark
                                    ? 'rgba(99,102,241,.18)'
                                    : 'rgba(99,102,241,.1)'
                                  : 'transparent',
                                color: active ? '#6366f1' : 'var(--text-secondary)',
                                fontSize: '0.78rem',
                                fontWeight: active ? 700 : 500,
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all .15s',
                              }}
                              onMouseEnter={(e) => {
                                if (!active)
                                  e.currentTarget.style.background = isDark
                                    ? 'rgba(255,255,255,.04)'
                                    : 'rgba(99,102,241,.06)';
                              }}
                              onMouseLeave={(e) => {
                                if (!active) e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <span
                                style={{
                                  flex: 1,
                                  lineHeight: 1.3,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {cat}
                              </span>
                              {active && (
                                <div
                                  style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#6366f1',
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: border, marginBottom: '20px' }} />

                  {/* Level Filter */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        margin: '0 0 10px',
                      }}
                    >
                      Level
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {LEVELS.map(({ label, id }) => (
                        <label
                          key={id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedLevels.includes(id)}
                            onChange={() => toggleLevel(id)}
                            style={{
                              accentColor: '#6366f1',
                              width: '14px',
                              height: '14px',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        margin: '0 0 10px',
                      }}
                    >
                      Duration
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {DURATIONS.map(({ label, id }) => (
                        <label
                          key={id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDurations.includes(id)}
                            onChange={() => toggleDuration(id)}
                            style={{
                              accentColor: '#6366f1',
                              width: '14px',
                              height: '14px',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters Button */}
                  {hasFilters && (
                    <button
                      onClick={resetFilters}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '7px 12px',
                        borderRadius: '8px',
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
                      <RotateCcw size={12} /> Reset Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── Content Area ── */}
          <div style={{ flex: 1, minWidth: 0, transition: 'all 0.28s ease' }}>
            {/* Header + Search & Sort */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '4px',
                }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  All Courses {selectedCategory !== 'All Categories' ? `— ${selectedCategory}` : ''}
                </h1>

                {/* Filter toggle button */}
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
                      ? isDark
                        ? 'rgba(99,102,241,.2)'
                        : 'rgba(99,102,241,.1)'
                      : isDark
                      ? 'rgba(255,255,255,.06)'
                      : '#ffffff',
                    border: `1px solid ${isSidebarOpen ? '#6366f1' : border}`,
                    color: isSidebarOpen ? '#6366f1' : 'var(--text-primary)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all .15s',
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
                      }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 18px' }}>
                Explore our expert-designed courses and start your learning journey
              </p>

              {/* Search + Sort Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Search Input */}
                <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '200px', maxWidth: '420px' }}>
                  <Search
                    size={15}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search courses..."
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

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                    Sort by:
                  </span>
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

            {/* Courses Grid — 4 Columns */}
            {paginated.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}
              >
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🎓</p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 6px',
                  }}
                >
                  No courses found
                </p>
                <p style={{ fontSize: '0.8rem', margin: '0 0 16px' }}>
                  Try a different search query or reset your filters
                </p>
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                  gap: '18px',
                }}
              >
                {paginated.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '28px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                  Showing {Math.min((page - 1) * COURSES_PER_PAGE + 1, filtered.length)} to{' '}
                  {Math.min(page * COURSES_PER_PAGE, filtered.length)} of {filtered.length} courses
                </p>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {renderPaginationPages().map((p, i) =>
                    p === '...' ? (
                      <span
                        key={`dot-${i}`}
                        style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}
                      >
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

        {/* ── Bottom Subscription Banner (Unlock Unlimited Learning) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '56px',
            background: isDark
              ? 'linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.12))'
              : 'linear-gradient(135deg,#f3f4f6,#eef2ff)',
            border: '1.5px solid rgba(99,102,241,.25)',
            borderRadius: '20px',
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          {/* Left 3D Cap / Icon + Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: '1 1 340px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(99,102,241,.4)',
                flexShrink: 0,
              }}
            >
              <GraduationCap size={36} color="#fff" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 6px',
                  letterSpacing: '-0.02em',
                }}
              >
                Unlock Unlimited Learning
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '420px',
                }}
              >
                Get unlimited access to all courses, books, projects, certificates and premium resources.
              </p>
            </div>
          </div>

          {/* Middle Checklist */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 24px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
            }}
          >
            {[
              'Access to 500+ Premium Courses',
              'Certificates on Completion',
              'Download E-books & Resources',
              'Priority Support',
            ].map((pt) => (
              <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="#fff" strokeWidth={3} />
                </div>
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* Right Action Button */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <button
              onClick={() => navigate('/subscription')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(99,102,241,.35)',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,.35)';
              }}
            >
              Explore Plans <ArrowRight size={16} />
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '6px 0 0' }}>
              Starting from ₹299/month
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
