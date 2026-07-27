// ============================================================
// All Courses Page — DevOpsX (Refined Professional Filters)
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, X, SlidersHorizontal, BookOpen, Layers, Check, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { courses } from '../../data/courses';
import CourseCard from '../../components/cards/CourseCard';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { useDebounce } from '../../hooks/index';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper, { PageHeader } from '../../components/ui/PageWrapper';

const COURSES_PER_PAGE = 8;
const levels = ['All Segments', 'Basic', 'Intermediate', 'Advanced'];
const priceFilters = ['All', 'Free', 'Paid'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function AllCourses() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState('All Segments');
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get('filter') === 'free' ? 'Free' : 'All'
  );
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  const debouncedSearch = useDebounce(search, 300);
  const categoryNames = ['All', ...new Set(courses.map((c) => c.category))];

  const filtered = useMemo(() => {
    let result = courses;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== 'All') result = result.filter((c) => c.category === selectedCategory);
    if (selectedLevel !== 'All Segments') result = result.filter((c) => c.level === selectedLevel);
    if (selectedPrice === 'Free') result = result.filter((c) => c.isFree);
    if (selectedPrice === 'Paid') result = result.filter((c) => !c.isFree);

    switch (sortBy) {
      case 'newest': result = [...result].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      default: result = [...result].sort((a, b) => b.students - a.students);
    }

    return result;
  }, [debouncedSearch, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * COURSES_PER_PAGE, currentPage * COURSES_PER_PAGE);

  const resetFilters = () => {
    setSearch(''); setSelectedCategory('All'); setSelectedLevel('All Segments'); setSelectedPrice('All'); setSortBy('popular');
  };
  const hasFilters = search || selectedCategory !== 'All' || selectedLevel !== 'All Segments' || selectedPrice !== 'All';

  return (
    <PageWrapper>
      {/* Header */}
      <PageHeader
        icon={BookOpen}
        iconColor="#3b82f6"
        badge="EXPLORE COURSES"
        title="Cloud Computing & AI Courses"
        subtitle={`Showing ${filtered.length} courses organized by Basic, Intermediate & Advanced segments`}
      />

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px minmax(0, 1fr)',
        gap: '24px',
        alignItems: 'start',
        width: '100%',
      }}>

        {/* Desktop Sidebar Filter Panel */}
        <div className="hidden lg:block" style={{ width: '240px', flexShrink: 0 }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '20px',
            position: 'sticky',
            top: '80px',
            boxShadow: '0 8px 32px rgba(0,0,0,.3)',
          }}>

            {/* Sidebar Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
                <SlidersHorizontal size={15} color="#3b82f6" /> Refine Search
              </span>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  title="Reset all filters"
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={11} /> Reset
                </button>
              )}
            </div>

            {/* Keyword Search Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Keywords
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Search course title..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    paddingLeft: '34px', paddingRight: search ? '28px' : '12px',
                    paddingTop: '9px', paddingBottom: '9px',
                    borderRadius: '12px', fontSize: '0.78rem',
                    background: 'var(--bg-input)', border: '1px solid var(--border-muted)',
                    color: 'var(--text-primary)', outline: 'none', transition: 'all 0.15s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,.15)'; }}
                  onBlur={(e)  => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>            {/* Categories Menu */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Categories
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {categoryNames.slice(0, 9).map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '7px 10px', borderRadius: '10px', fontSize: '0.78rem',
                        background: active ? (isDark ? 'rgba(59,130,246,.18)' : 'rgba(59,130,246,.12)') : 'transparent',
                        color: active ? (isDark ? '#60a5fa' : '#1d4ed8') : 'var(--text-secondary)',
                        fontWeight: active ? 700 : 500,
                        border: 'none', cursor: 'pointer', transition: 'all 0.12s ease',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.05)' : 'rgba(59,130,246,.06)'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat}</span>
                      {active && <Check size={12} color={isDark ? '#60a5fa' : '#1d4ed8'} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Course Segment Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Course Segment
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {levels.map((lvl) => {
                  const active = selectedLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => { setSelectedLevel(lvl); setCurrentPage(1); }}
                      style={{
                        padding: '7px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: active ? 700 : 500,
                        textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s ease',
                        background: active
                          ? (isDark ? 'linear-gradient(135deg, rgba(59,130,246,.25), rgba(6,182,212,.15))' : 'rgba(59,130,246,.12)')
                          : (isDark ? 'rgba(255,255,255,.03)' : 'rgba(59,130,246,.04)'),
                        color: active ? (isDark ? '#93c5fd' : '#1d4ed8') : 'var(--text-secondary)',
                        border: `1px solid ${active ? 'rgba(59,130,246,.4)' : 'var(--border-subtle)'}`,
                      }}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Access Type Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Access Type
              </label>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px',
                background: isDark ? 'rgba(0,0,0,.3)' : 'rgba(59,130,246,.06)',
                padding: '3px', borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}>
                {priceFilters.map((p) => {
                  const active = selectedPrice === p;
                  return (
                    <button
                      key={p}
                      onClick={() => { setSelectedPrice(p); setCurrentPage(1); }}
                      style={{
                        padding: '6px 0', borderRadius: '9px', fontSize: '0.72rem', fontWeight: active ? 700 : 500,
                        textAlign: 'center', cursor: 'pointer', border: 'none', transition: 'all 0.15s ease',
                        background: active ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'transparent',
                        color: active ? '#fff' : 'var(--text-muted)',
                        boxShadow: active ? '0 2px 8px rgba(59,130,246,.3)' : 'none',
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div style={{ minWidth: 0, flex: 1 }}>

          {/* Controls Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '12px 18px', borderRadius: '16px', boxShadow: isDark ? 'none' : '0 2px 8px rgba(15,23,42,.04)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{paginated.length}</strong> of <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> courses
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', borderRadius: '10px', padding: '6px 12px', fontSize: '0.78rem', outline: 'none', cursor: 'pointer',
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: isDark ? '#0f1929' : '#ffffff', color: isDark ? '#ffffff' : '#0f172a' }}>{opt.label}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div style={{ display: 'flex', gap: '4px', background: isDark ? 'rgba(0,0,0,.2)' : 'rgba(59,130,246,.06)', padding: '3px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '5px 10px', borderRadius: '8px', border: 'none',
                    background: viewMode === 'grid' ? (isDark ? 'rgba(59,130,246,.25)' : 'rgba(59,130,246,.15)') : 'transparent',
                    color: viewMode === 'grid' ? (isDark ? '#60a5fa' : '#1d4ed8') : 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700,
                  }}
                >
                  <Grid3X3 size={13} /> Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '5px 10px', borderRadius: '8px', border: 'none',
                    background: viewMode === 'list' ? (isDark ? 'rgba(59,130,246,.25)' : 'rgba(59,130,246,.15)') : 'transparent',
                    color: viewMode === 'list' ? (isDark ? '#60a5fa' : '#1d4ed8') : 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700,
                  }}
                >
                  <List size={13} /> List
                </button>
              </div>
            </div>
          </div>

          {/* Grid or List Display */}
          {paginated.length === 0 ? (
            <EmptyState
              icon="search"
              title="No courses found"
              description="Try different search keywords or clear your active filters."
              action={resetFilters}
              actionLabel="Reset All Filters"
            />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(260px, 1fr))' : '1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              {paginated.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
