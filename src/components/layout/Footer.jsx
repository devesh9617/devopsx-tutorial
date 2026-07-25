// ============================================================
// Footer — DevOpsX Learning Platform (Fixed Layout & Professional CSS)
// ============================================================

import { Link } from 'react-router-dom';
import { MessageSquareShare, Video, Link2, Mail, MapPin, Phone, Code2 } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

const footerLinks = {
  courses: [
    { label: 'DevOps',          to: '/courses?category=DevOps' },
    { label: 'Cloud Computing', to: '/courses?category=cloud' },
    { label: 'Web Development', to: '/courses?category=web-development' },
    { label: 'Data Science',    to: '/courses?category=data-science' },
    { label: 'Cyber Security',  to: '/courses?category=cyber-security' },
    { label: 'Linux',           to: '/courses?category=linux' },
  ],
  resources: [
    { label: 'TextBooks',         to: '/textbooks' },
    { label: 'Notes & PDFs',      to: '/notes' },
    { label: 'Assignments',       to: '/assignments' },
    { label: 'Practice Questions',to: '/practice' },
    { label: 'Certificates',      to: '/certificates' },
  ],
  company: [
    { label: 'About Us',      to: '/about' },
    { label: 'Contact',       to: '/contact' },
    { label: 'Careers',       to: '/about' },
    { label: 'Blog',          to: '/' },
    { label: 'Privacy Policy',to: '/' },
    { label: 'Terms',         to: '/' },
  ],
};

const socials = [
  { icon: Code2,              href: 'https://github.com', label: 'GitHub' },
  { icon: MessageSquareShare, href: '#', label: 'Twitter' },
  { icon: Link2,              href: '#', label: 'LinkedIn' },
  { icon: Video,              href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}>
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '40px 24px 32px',
      }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          marginBottom: '36px',
        }}>

          {/* Brand Column (takes more space) */}
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
              <BrandLogo size="md" />
            </Link>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.6, margin: '0 0 16px', maxWidth: '320px' }}>
              The premium learning platform for DevOps, Cloud & Engineering.
              Master real-world skills with expert-led courses.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {[
                { icon: Mail,   val: 'hello@devopsx.io' },
                { icon: Phone,  val: '+91 98765 43210' },
                { icon: MapPin, val: 'Bangalore, India' },
              ].map(({ icon: Icon, val }) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={13} color="#60a5fa" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,.2)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Courses',   links: footerLinks.courses },
            { title: 'Resources', links: footerLinks.resources },
            { title: 'Company',   links: footerLinks.company },
          ].map(({ title, links }) => (
            <div key={title} style={{ minWidth: 0 }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 14px', letterSpacing: '0.02em' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Banner */}
        <div style={{
          background: 'rgba(59,130,246,.06)',
          border: '1px solid rgba(59,130,246,.2)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.925rem', fontWeight: 800, margin: '0 0 3px' }}>Stay updated with DevOpsX</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
              Get new courses, free resources, and career tips weekly.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '360px' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, minWidth: '180px',
                padding: '9px 14px', borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-muted)',
                color: 'var(--text-primary)', fontSize: '0.8rem', outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--brand-blue)'}
              onBlur={(e)  => e.target.style.borderColor = 'var(--border-muted)'}
            />
            <button
              style={{
                padding: '9px 18px', borderRadius: '10px',
                background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                color: '#fff', fontSize: '0.8rem', fontWeight: 700,
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(59,130,246,.3)',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)',
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} DevOpsX Learning Platform. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Privacy', 'Terms', 'Sitemap'].map((l) => (
              <Link key={l} to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
