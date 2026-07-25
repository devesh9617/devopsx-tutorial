// ============================================================
// Course Details Page — DevOpsX (Fixed Premium Player & Details Theme-Aware)
// ============================================================

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock, Users, Star, BookOpen, Award, CheckCircle, PlayCircle,
  ChevronDown, Globe, Shield, ArrowLeft, Heart, Share2
} from 'lucide-react';
import { getCourseBySlug } from '../../data/courses';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LevelBadge } from '../../components/ui/Badge';
import StarRating from '../../components/ui/StarRating';
import Button from '../../components/ui/Button';
import { reviews } from '../../data/reviews';
import ReviewCard from '../../components/cards/ReviewCard';
import PageWrapper from '../../components/ui/PageWrapper';

export default function CourseDetails() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const { user, isEnrolled, toggleWishlist, isWishlisted } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!course) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Course Not Found</h2>
          <Button onClick={() => navigate('/courses')}>Browse All Courses</Button>
        </div>
      </PageWrapper>
    );
  }

  const enrolled = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);
  const courseReviews = reviews.filter((r) => r.courseId === course.id);
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <PageWrapper>
      {/* Back button */}
      <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '16px' }}>
        <ArrowLeft size={16} /> Back to Recorded Classes
      </Link>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '20px', alignItems: 'start', width: '100%' }}>

        {/* Left Column: Player + Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>

          {/* Header Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
            borderRadius: '20px', padding: '24px',
            boxShadow: isDark ? 'none' : '0 4px 16px rgba(15,23,42,.05)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <LevelBadge level={course.level} />
              <span style={{ fontSize: '0.72rem', padding: '2px 10px', borderRadius: '999px', background: isDark ? 'rgba(59,130,246,.15)' : 'rgba(59,130,246,.1)', color: 'var(--text-accent)', border: '1px solid rgba(59,130,246,.25)', fontWeight: 600 }}>
                {course.category}
              </span>
              {course.isFree && (
                <span style={{ fontSize: '0.72rem', padding: '2px 10px', borderRadius: '999px', background: isDark ? '#10b981' : '#059669', color: '#fff', fontWeight: 800 }}>FREE</span>
              )}
            </div>

            <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.25 }}>
              {course.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 16px' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <StarRating rating={course.rating} showCount count={course.ratingCount} size={14} />
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={14} />{course.students.toLocaleString()} students</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} />{course.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><BookOpen size={14} />{course.lessons} lessons</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Globe size={14} />{course.language}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={course.instructor.avatar} alt={course.instructor.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59,130,246,.4)' }} />
              <div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{course.instructor.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0 }}>Instructor</p>
              </div>
            </div>
          </div>

          {/* Video Player Box */}
          <div style={{ background: '#000', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: '0 12px 32px rgba(0,0,0,.5)' }}>
            {showVideo ? (
              <iframe
                src="https://www.youtube.com/embed/Nftif8BrGMo?autoplay=1"
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                allow="autoplay; fullscreen"
                title="Recorded Class Video"
              />
            ) : (
              <div
                style={{ position: 'relative', aspectRatio: '16/9', cursor: 'pointer' }}
                onClick={() => setShowVideo(true)}
              >
                <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,.5)' }}>
                    <PlayCircle size={36} color="#fff" fill="#fff" />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', background: 'rgba(0,0,0,.6)', padding: '6px 16px', borderRadius: '999px', backdropFilter: 'blur(8px)' }}>
                    Click to Play Recorded Class Preview
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* What you'll learn */}
          <div style={{
            background: 'var(--bg-card)',
            border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
            borderRadius: '20px', padding: '24px',
            boxShadow: isDark ? 'none' : '0 4px 16px rgba(15,23,42,.05)',
          }}>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 16px' }}>What You'll Learn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {course.skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={15} color={isDark ? '#34d399' : '#059669'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div style={{
            background: 'var(--bg-card)',
            border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
            borderRadius: '20px', padding: '24px',
            boxShadow: isDark ? 'none' : '0 4px 16px rgba(15,23,42,.05)',
          }}>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 16px' }}>Class Curriculum</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {course.curriculum.map((section, i) => (
                <div key={i} style={{ borderRadius: '14px', border: '1px solid var(--border-subtle)', background: 'var(--bg-glass)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenSection(openSection === i ? -1 : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem' }}>{section.section}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <span>{section.lessons} lessons</span>
                      <ChevronDown size={14} style={{ transform: openSection === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>
                  </button>
                  {openSection === i && (
                    <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px 16px', background: isDark ? 'rgba(0,0,0,.2)' : 'rgba(59,130,246,.03)' }}>
                      {Array.from({ length: Math.min(section.lessons, 4) }, (_, li) => (
                        <div key={li} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <PlayCircle size={14} color="#3b82f6" />
                          <span style={{ color: 'var(--text-secondary)' }}>Lesson {li + 1}: {section.section} – Part {li + 1}</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.72rem' }}>{Math.ceil(parseInt(section.duration) / section.lessons)}m</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Enrollment Box */}
        <div style={{ width: '300px', flexShrink: 0, position: 'sticky', top: '80px' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)',
            borderRadius: '20px', overflow: 'hidden', padding: '20px',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 4px 20px rgba(15,23,42,.06)',
          }}>
            {/* Price tag */}
            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              {course.isFree ? (
                <div style={{ fontSize: '2rem', fontWeight: 800, color: isDark ? '#34d399' : '#059669' }}>Free Access</div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{course.price.toLocaleString()}</span>
                  <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.9rem' }}>₹{course.originalPrice.toLocaleString()}</span>
                  <span style={{ color: isDark ? '#34d399' : '#059669', fontSize: '0.75rem', fontWeight: 700 }}>{discount}% off</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {enrolled ? (
                <Button fullWidth variant="success" onClick={() => navigate('/my-learning')}>
                  Resume Recorded Class
                </Button>
              ) : (
                <Button fullWidth onClick={() => user ? navigate('/my-learning') : navigate('/register')}>
                  {user ? 'Enroll Now' : 'Sign Up & Enroll Free'}
                </Button>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => user && toggleWishlist(course.id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '8px', borderRadius: '12px', background: 'var(--bg-glass)',
                    border: `1px solid ${wishlisted ? '#ef4444' : 'var(--border-subtle)'}`,
                    color: wishlisted ? '#ef4444' : 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer',
                  }}
                >
                  <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} /> Wishlist
                </button>
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', borderRadius: '12px', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer' }}>
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            {/* Course Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, margin: '0 0 4px' }}>This class includes:</p>
              {[
                [Clock, `${course.duration} on-demand video`],
                [BookOpen, `${course.lessons} recorded lessons`],
                [Shield, 'Full lifetime access'],
                [Award, 'Certificate of completion'],
                [Globe, `${course.language} language`],
              ].map(([Icon, text], idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Icon size={14} color="#3b82f6" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
