// ============================================================
// Pagination Component — DevOpsX UI
// ============================================================

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  let prev = null;
  const items = [];
  showPages.forEach((p) => {
    if (prev !== null && p - prev > 1) {
      items.push('...');
    }
    items.push(p);
    prev = p;
  });

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {items.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`
              w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200
              ${currentPage === item
                ? 'text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white'
              }
            `}
            style={currentPage === item ? { background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' } : {}}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
