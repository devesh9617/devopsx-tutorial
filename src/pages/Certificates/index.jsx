import { motion } from 'framer-motion';
import { Award, Download, Share2, ExternalLink, CheckCircle2, Lock, Copy, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EmptyState from '../../components/ui/EmptyState';
import PageWrapper, { PageHeader } from '../../components/ui/PageWrapper';

const mockCertificates = [
  {
    id: 1,
    courseTitle: 'Complete DevOps Bootcamp 2024',
    issuedDate: 'Nov 30, 2024',
    credentialId: 'DVPX-2024-001234',
    instructor: 'Rahul Sharma',
    grade: 'Distinction (98%)',
  },
  {
    id: 2,
    courseTitle: 'AWS Solutions Architect Masterclass',
    issuedDate: 'Jan 15, 2025',
    credentialId: 'DVPX-2025-008912',
    instructor: 'Neha Verma',
    grade: 'Excellence (95%)',
  },
];

export default function Certificates() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!user) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(245,158,11,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={32} color="#f59e0b" />
          </div>
          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>Sign in to view your certificates</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '360px' }}>
            Earn industry-recognized certificates upon completing DevOpsX courses.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '12px 28px', borderRadius: '12px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Sign In</button>
            <button onClick={() => navigate('/register')} style={{ padding: '12px 28px', borderRadius: '12px', background: 'var(--bg-glass)', color: 'var(--text-secondary)', border: '1px solid var(--border-muted)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Create Account</button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const copyCred = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('Credential ID copied!');
  };

  return (
    <PageWrapper>
      {/* Header */}
      <PageHeader
        icon={Award}
        iconColor="#f59e0b"
        badge="VERIFIED CREDENTIALS"
        title="My Certificates"
        subtitle={`You have earned ${mockCertificates.length} verified certificates — share them on LinkedIn or download PDFs`}
      />

      {mockCertificates.length === 0 ? (
        <EmptyState
          icon="certificates"
          title="No certificates earned yet"
          description="Complete any course on DevOpsX to unlock your verified certificate of completion."
          action={() => navigate('/courses')}
          actionLabel="Start Learning"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {mockCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                position: 'relative',
                background: 'var(--bg-card)',
                border: isDark ? '1px solid rgba(245,158,11,.25)' : '1px solid rgba(245,158,11,.4)',
                borderRadius: '20px',
                padding: '24px',
                overflow: 'hidden',
                boxShadow: isDark ? '0 8px 32px rgba(0,0,0,.35)' : '0 4px 20px rgba(15,23,42,.06), 0 1px 3px rgba(0,0,0,.04)',
              }}
            >
              {/* Top Gold Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #f59e0b 0%, #fef08a 50%, #f59e0b 100%)' }} />

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                {/* Left: Certificate Icon & Details */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '260px' }}>
                  {/* Medal Icon Box */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(245,158,11,.25), rgba(252,211,77,.1))',
                    border: '1px solid rgba(245,158,11,.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    boxShadow: '0 4px 16px rgba(245,158,11,.2)',
                  }}>
                    <Award size={28} color={isDark ? '#fbbf24' : '#d97706'} fill="rgba(245,158,11,.3)" />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <CheckCircle2 size={13} color={isDark ? '#34d399' : '#059669'} />
                      <span style={{ fontSize: '0.72rem', color: isDark ? '#34d399' : '#059669', fontWeight: 700 }}>Verified Certificate of Completion</span>
                    </div>

                    <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.3 }}>
                      {cert.courseTitle}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span>Issued: <strong style={{ color: 'var(--text-primary)' }}>{cert.issuedDate}</strong></span>
                      <span>Instructor: <strong style={{ color: 'var(--text-primary)' }}>{cert.instructor}</strong></span>
                      <span>Grade: <strong style={{ color: isDark ? '#fbbf24' : '#d97706' }}>{cert.grade}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ID: {cert.credentialId}</span>
                      <button
                        onClick={() => copyCred(cert.credentialId)}
                        title="Copy Credential ID"
                        style={{ background: 'none', border: 'none', color: 'var(--text-accent)', cursor: 'pointer', padding: '2px', display: 'flex' }}
                      >
                        <Copy size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
                  <button
                    onClick={() => toast.success('Downloading Certificate PDF…')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '10px 18px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800,
                      color: '#111827', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,.35)',
                    }}
                  >
                    <Download size={14} /> Download PDF
                  </button>

                  <button
                    onClick={() => toast('Certificate share link copied!')}
                    title="Share Certificate"
                    style={{
                      padding: '10px 12px', borderRadius: '12px',
                      background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* LinkedIn Promo Box */}
      <div style={{
        background: isDark ? 'rgba(10,102,194,.08)' : 'rgba(10,102,194,.06)',
        border: '1px solid rgba(10,102,194,.25)',
        borderRadius: '20px',
        padding: '20px 24px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, margin: '0 0 3px' }}>Add Certificates to LinkedIn Profile</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
              Showcase your verified DevOpsX certificates on LinkedIn to catch recruiter attention.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.open('https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME', '_blank')}
          style={{
            padding: '10px 20px', borderRadius: '12px',
            background: '#0a66c2', color: '#fff', fontSize: '0.825rem', fontWeight: 700,
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(10,102,194,.4)',
            whiteSpace: 'nowrap',
          }}
        >
          Add to LinkedIn
        </button>
      </div>
    </PageWrapper>
  );
}
