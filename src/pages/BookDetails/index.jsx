// ============================================================
// BookDetails Page — DevOpsX Full Book Description Page (Image Reference Style)
// ============================================================

import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingCart, PlayCircle, Star, CheckCircle, ExternalLink, BookOpen, Layers, GraduationCap, Calendar, Users, Award, Sparkles } from 'lucide-react';
import { getBookById } from '../../data/books';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const recommendedGradesData = [
  {
    id: 'grade-5-8',
    label: 'Class 5 – 8',
    sublabel: 'Middle School',
    desc: 'Foundation-level courses, guided learning, AI tools & textbook practice',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop',
    accent: '#059669',
    badge: 'Class 5-8',
    details: [
      { label: 'Classes', val: 'Class 5th to 8th' },
      { label: 'Duration', val: 'Flexible / Guided' },
      { label: 'Learners', val: '4-5 Learners per batch' },
      { label: 'Curriculum', val: 'CBSE, ICSE, State Boards' },
    ],
    features: [
      'Ebooks & Study Material',
      'Video Courses',
      'Assignments & Quizzes',
      'AI Art Gallery',
      'AI Agent Projects',
      'AI Chatbots Practice',
    ],
  },
  {
    id: 'grade-9-12',
    label: 'Class 9 – 12',
    sublabel: 'High School',
    desc: 'Syllabus-aligned courses, AI tools, advanced projects & board exam prep',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop',
    accent: '#2563eb',
    badge: 'Class 9-12',
    details: [
      { label: 'Classes', val: 'Class 9th to 12th' },
      { label: 'Duration', val: 'Term / Semester' },
      { label: 'Learners', val: '8-10 Learners per batch' },
      { label: 'Curriculum', val: 'Board & High School Syllabus' },
    ],
    features: [
      'Ebooks & Courses',
      'Assignments & Syllabus',
      'Video Courses',
      'AI Tool Access',
      'Prompt Libraries',
      'Learning Support',
    ],
  },
  {
    id: 'college',
    label: 'College / Graduate',
    sublabel: 'Undergraduate & above',
    desc: 'Advanced AI, Machine Learning, Python, real-world projects & DevOps certifications',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop',
    accent: '#7c3aed',
    badge: 'College & Above',
    details: [
      { label: 'Classes', val: 'Undergraduate & Graduate' },
      { label: 'Duration', val: 'Self-Paced / Guided' },
      { label: 'Learners', val: '10-15 Learners per batch' },
      { label: 'Curriculum', val: 'DevOps & AI Industry Standard' },
    ],
    features: [
      'Ebooks & Courses',
      'Video Lectures',
      'Advanced AI Projects',
      'Python Language Models',
      'Project Portfolio',
    ],
  },
];

export default function BookDetails() {
  const { id } = useParams();
  const book = getBookById(id);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!book) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>Book Not Found</h2>
          <button
            onClick={() => navigate('/textbooks')}
            style={{ marginTop: '16px', padding: '10px 20px', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
          >
            Back to Library
          </button>
        </div>
      </PageWrapper>
    );
  }

  const handleDownload = () => {
    toast.success(`Downloading PDF for "${book.title}"...`);
    if (book.downloadUrl && book.downloadUrl !== '#') {
      window.open(book.downloadUrl, '_blank');
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added "${book.title}" to cart!`);
  };

  const handleWatchVideo = () => {
    toast.success(`Opening video tutorial for "${book.title}"...`);
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Top Navigation / Breadcrumb */}
        <div style={{ marginBottom: '20px' }}>
          <Link
            to="/textbooks"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none', transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ArrowLeft size={16} /> Back to TextBook Library
          </Link>
        </div>

        {/* Main Full Description Page Card Container */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}>
        {/* 2-Column Responsive Layout matching User Reference Image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* LEFT COLUMN: Book Cover Image & "About the Book!" */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '380px' }}>
            {/* Book Cover Frame (Selected Book Image) */}
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              background: isDark ? '#111827' : '#f8fafc',
              boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            }}>
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* About the Book Section (Positioned under the left book image as in reference image) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 800,
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                About the Book!
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {book.description}
              </p>

              {book.whatYoullLearn && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                  {book.whatYoullLearn.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Grade Label, Title, Subtitle, Price, Actions, Rating Stats, Explore Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Category / Grade Label */}
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {book.gradeLabel || `${book.category} • Grade Level`}
            </span>

            {/* Book Main Title */}
            <h1 style={{
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              {book.title}
            </h1>

            {/* Subtitle Line */}
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}>
              {book.subtitle || book.description}
            </p>

            {/* Meta Info Row */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px',
              fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600,
            }}>
              <span>{book.edition || 'English Edition'}</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>By {book.author}</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>Format {book.format || 'PDF'}</span>
            </div>

            {/* Created By Row */}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Created by <strong style={{ color: 'var(--text-primary)' }}>{book.publisher || 'DevOpsX Learning'}</strong>
            </span>

            {/* Price Tag */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>From</span>
              <span style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                ₹{(book.price || 500).toFixed(2)}
              </span>
              {book.originalPrice && (
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{(book.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Action Buttons Stack (Reference Image Style) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '6px 0 10px' }}>
              <button
                onClick={handleDownload}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '13px 22px', borderRadius: '10px', border: 'none',
                  background: '#2563eb', color: '#fff', fontSize: '0.95rem', fontWeight: 800,
                  cursor: 'pointer', transition: 'all 0.15s ease', boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
              >
                <Download size={18} /> Download PDF
              </button>

              <button
                onClick={handleAddToCart}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '12px 22px', borderRadius: '10px',
                  background: 'transparent', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.borderColor = '#2563eb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <ShoppingCart size={17} /> Add To Cart
              </button>

              <button
                onClick={handleWatchVideo}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '11px 22px', borderRadius: '10px', background: 'transparent',
                  border: 'none', color: '#2563eb', fontSize: '0.92rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <PlayCircle size={18} color="#2563eb" /> Watch Video Tutorial
              </button>
            </div>

            {/* Ratings & Learners Counter Row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '36px',
              padding: '16px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {book.rating || 4.6}
                  </span>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {(book.ratingsCount || 2609).toLocaleString()} ratings
                </span>
              </div>

              <div style={{ height: '30px', width: '1px', background: 'var(--border-subtle)' }} />

              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {(book.learnersCount || 33243).toLocaleString()}
                </span>
                <br />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>learners</span>
              </div>
            </div>

            {/* Explore More Content for This Book Section */}
            <div style={{ marginTop: '10px' }}>
              <h3 style={{
                color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 14px',
              }}>
                Explore more content for this book
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px',
              }}>
                {(book.exploreMoreContent || [
                  'Ebook', 'Courses', 'Assignments', 'Syllabus', 'Videos',
                  'AI Art gallery', 'AI tool and Comparison', 'AI small projects', 'AI Chatbots overview and creation'
                ]).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#2563eb', fontWeight: 900, fontSize: '1.1rem' }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* RECOMMENDED GRADES SECTION (Positioned Below as in Image) */}
        {/* ============================================================ */}
        <div style={{
          marginTop: '48px',
          paddingTop: '36px',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <GraduationCap size={20} color="#2563eb" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>
                RECOMMENDED GRADE TRACKS
              </span>
            </div>
            <h2 style={{
              color: 'var(--text-primary)', fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em',
            }}>
              Recommended Grades for "{book.title}"
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '6px 0 0' }}>
              This book is curated for students in the following grade levels. Pick a grade track to get started!
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {recommendedGradesData.map((grade) => {
              const isMatched = (
                (book.gradeLabel || '').toLowerCase().includes(grade.id.replace('grade-', '')) ||
                (grade.id === 'grade-5-8' && (book.title.includes('5-8') || book.gradeLabel?.includes('5-8'))) ||
                (grade.id === 'grade-9-12' && (book.gradeLabel?.includes('9-12') || book.gradeLabel?.includes('12'))) ||
                (grade.id === 'college' && (book.gradeLabel?.includes('College') || book.gradeLabel?.includes('Professional')))
              );

              return (
                <div
                  key={grade.id}
                  style={{
                    position: 'relative',
                    background: 'var(--bg-card)',
                    border: `2px solid ${isMatched ? grade.accent : 'var(--border-subtle)'}`,
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isMatched
                      ? `0 0 0 3px ${grade.accent}25, 0 10px 28px rgba(0,0,0,0.12)`
                      : '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {/* Top Banner Image */}
                  <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: isDark ? '#111827' : '#e2e8f0' }}>
                    <img
                      src={grade.image}
                      alt={grade.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800,
                      color: '#fff', background: isMatched ? grade.accent : 'rgba(17,24,39,0.85)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}>
                      {isMatched ? '★ RECOMMENDED FOR THIS BOOK' : grade.badge}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 900, margin: '0 0 4px' }}>
                      {grade.label}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 14px', lineHeight: 1.45 }}>
                      {grade.desc}
                    </p>

                    {/* Grade details list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', marginTop: 'auto' }}>
                      {grade.details.map((d, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{d.label}:</span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{d.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features list */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                      {grade.features.map((f, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px',
                          background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)', fontWeight: 600,
                        }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>

                    {/* Grade Select Action Button */}
                    <button
                      onClick={() => {
                        localStorage.setItem('devopsx_grade', grade.id);
                        toast.success(`Selected ${grade.label} track!`);
                        navigate('/grade-select');
                      }}
                      style={{
                        width: '100%', padding: '11px', borderRadius: '9px', border: 'none',
                        background: isMatched
                          ? 'linear-gradient(135deg, #2563eb, #0284c7)'
                          : 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: '#fff', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer',
                        boxShadow: isMatched ? '0 4px 14px rgba(37,99,235,0.3)' : '0 4px 14px rgba(234,88,12,0.25)',
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {isMatched ? '✓ Selected Grade Track' : 'Select Grade Track'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);
}


