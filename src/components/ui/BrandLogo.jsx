// ============================================================
// BrandLogo — DevOpsX Learning (Shared Brand Component)
// ============================================================
// Usage:
//   <BrandLogo size="md" />      → default (navbar/sidebar)
//   <BrandLogo size="lg" />      → auth pages
//   <BrandLogo size="sm" />      → footer / compact
//   <BrandLogo iconOnly />       → collapsed sidebar icon
// ============================================================

export default function BrandLogo({ size = 'md', iconOnly = false, className = '' }) {
  const sizes = {
    sm: { icon: 30, iconFont: '0.72rem', iconRadius: '9px', textSize: '1rem' },
    md: { icon: 34, iconFont: '0.82rem', iconRadius: '10px', textSize: '1.1rem' },
    lg: { icon: 42, iconFont: '0.95rem', iconRadius: '13px', textSize: '1.35rem' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: iconOnly ? 0 : '10px', textDecoration: 'none' }}
    >
      {/* Icon badge */}
      <span
        style={{
          width: s.icon, height: s.icon, borderRadius: s.iconRadius,
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 4px 16px rgba(59,130,246,.4)',
        }}
      >
        <span style={{ color: '#fff', fontWeight: 900, fontSize: s.iconFont, letterSpacing: '-0.02em' }}>Dx</span>
      </span>

      {/* Wordmark */}
      {!iconOnly && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: s.textSize,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            display: 'flex', alignItems: 'baseline', gap: '4px',
          }}
        >
          {/* "DevOpsX" */}
          <span style={{ color: '#fff' }}>
            DevOps
            <span
              style={{
                background: 'linear-gradient(90deg,#60a5fa,#22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              X
            </span>
          </span>
          {/* "learning" suffix — styled like the screenshot */}
          <span
            style={{
              fontSize: `calc(${s.textSize} * 0.72)`,
              fontWeight: 600,
              color: '#7dd3fc',
              letterSpacing: '0.01em',
              marginLeft: '1px',
            }}
          >
            learning
          </span>
        </span>
      )}
    </span>
  );
}
