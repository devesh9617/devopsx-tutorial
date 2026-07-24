import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, CheckCircle, Circle, Target, Trophy, ChevronRight } from 'lucide-react';
import { practiceQuestions } from '../../data/assignments';
import PageWrapper, { PageHeader, FilterPill } from '../../components/ui/PageWrapper';

const diffColor = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };
const allCategories = ['All', ...new Set(practiceQuestions.map((q) => q.category))];

export default function Practice() {
  const [catFilter,  setCatFilter]  = useState('All');
  const [diffFilter, setDiffFilter] = useState('All');

  const filtered = practiceQuestions.filter((q) =>
    (catFilter  === 'All' || q.category   === catFilter) &&
    (diffFilter === 'All' || q.difficulty === diffFilter)
  );

  const solved   = practiceQuestions.filter((q) => q.solved).length;
  const totalPts = practiceQuestions.filter((q) => q.solved).reduce((s, q) => s + q.points, 0);

  return (
    <PageWrapper>
      <PageHeader
        icon={Code2}
        iconColor="#60a5fa"
        title="Practice Questions"
        subtitle="Sharpen your skills with real interview & exam questions"
      />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
        {[
          { emoji: '✅', label: 'Solved',       value: `${solved}/${practiceQuestions.length}`, color: '#10b981' },
          { emoji: '🏆', label: 'Points Earned', value: totalPts,                               color: '#f59e0b' },
          { emoji: '🔥', label: 'Day Streak',    value: '3 days',                               color: '#3b82f6' },
        ].map(({ emoji, label, value, color }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '22px' }}>{emoji}</span>
            <div>
              <p style={{ color, fontWeight: 800, fontSize: '1.2rem', margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '3px 0 0' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
        {allCategories.map((cat) => (
          <FilterPill key={cat} label={cat} active={catFilter === cat} onClick={() => setCatFilter(cat)} />
        ))}
        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 4px' }} />
        {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
          <FilterPill key={d} label={d} active={diffFilter === d} onClick={() => setDiffFilter(d)}
            color={d !== 'All' ? diffColor[d] : undefined} />
        ))}
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '12px' }}>
        Showing <span style={{ color: '#fff', fontWeight: 700 }}>{filtered.length}</span> questions
      </p>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.3)'; e.currentTarget.style.background = 'rgba(15,25,41,.9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >
            {/* Solved indicator */}
            {q.solved
              ? <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
              : <Circle      size={18} style={{ color: '#374151',  flexShrink: 0 }} />
            }

            {/* Title + tags */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: q.solved ? 'var(--text-muted)' : '#fff', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 6px', textDecoration: q.solved ? 'line-through' : 'none' }}>
                {q.title}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{q.category}</span>
                {q.tags.slice(0, 2).map((tag) => (
                  <span key={tag} style={{ fontSize: '0.65rem', padding: '1px 8px', borderRadius: '999px', background: 'rgba(59,130,246,.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: `${diffColor[q.difficulty]}18`, color: diffColor[q.difficulty] }}>
                {q.difficulty}
              </span>
              <span style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 800, minWidth: '32px', textAlign: 'right' }}>
                {q.points}pt
              </span>
              <button style={{ padding: '6px 14px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                {q.solved ? 'Review' : 'Solve'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
