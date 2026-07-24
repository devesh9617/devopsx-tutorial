import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Tag, Search } from 'lucide-react';
import { notes } from '../../data/assignments';
import { useDebounce } from '../../hooks/index';
import PageWrapper, { PageHeader, FilterPill } from '../../components/ui/PageWrapper';

export default function Notes() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const debouncedSearch         = useDebounce(search, 300);
  const categories = ['All', ...new Set(notes.map((n) => n.category))];

  const filtered = notes.filter((n) => {
    const q = debouncedSearch.toLowerCase();
    const matchSearch = !q || n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
    return matchSearch && (category === 'All' || n.category === category);
  });

  return (
    <PageWrapper>
      <PageHeader
        icon={FileText}
        iconColor="#60a5fa"
        title="Notes & PDFs"
        subtitle={`${filtered.length} resources available — download curated notes and reference sheets`}
      />

      {/* Search + Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px' }}>
          <Search size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes, topics…"
            style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '38px', paddingRight: '12px', paddingTop: '10px', paddingBottom: '10px', borderRadius: '12px', background: 'rgba(255,255,255,.06)', border: '1px solid var(--border-muted)', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,.1)'; }}
            onBlur={(e)  => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <FilterPill key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
          <p>No notes found. Try a different search.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg,rgba(59,130,246,.2),rgba(6,182,212,.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={18} color="#60a5fa" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', margin: '0 0 3px', lineHeight: 1.3 }}>{note.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>{note.category} • {note.pages} pages • {note.format}</p>
                </div>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {note.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {note.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(59,130,246,.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  {(note.downloads / 1000).toFixed(1)}K downloads
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: '8px', background: 'rgba(255,255,255,.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; }}>
                    <Eye size={11} /> Preview
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: '8px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontSize: '0.72rem', cursor: 'pointer', border: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
