// ============================================================
// Home Page Sections — Featured, Popular, Trending, etc.
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Clock, Users, Award, ChevronRight,
  Server, Cloud, Globe, BarChart3, Shield, Terminal, Cpu, Database, Brain, Wrench, GitBranch, Star, Flame, CheckCircle2, HelpCircle
} from 'lucide-react';
import CourseCard from '../cards/CourseCard';
import BookCard from '../cards/BookCard';
import ReviewCard from '../cards/ReviewCard';
import { getFeaturedCourses, getTrendingCourses } from '../../data/courses';
import { categories, learningPaths } from '../../data/categories';
import { books } from '../../data/books';
import { reviews } from '../../data/reviews';
import { faqs } from '../../data/assignments';
import { instructors } from '../../data/instructors';
import { useState } from 'react';

// Section Header
function SectionHeader({ eyebrow, title, description, link, linkLabel }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyBetween: 'space-between', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
      <div>
        {eyebrow && (
          <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60a5fa', display: 'block', marginBottom: '6px' }}>
            {eyebrow}
          </span>
        )}
        <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h2>
        {description && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '6px', margin: '6px 0 0', maxWidth: '560px' }}>
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', fontWeight: 700, color: '#60a5fa', textDecoration: 'none', transition: 'color 0.15s' }}
        >
          {linkLabel || 'View All'} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

// Shared section wrapper
function HomeSection({ children, bg = 'transparent' }) {
  return (
    <section style={{
      width: '100%',
      boxSizing: 'border-box',
      padding: '48px 24px',
      background: bg,
      overflowX: 'hidden',
    }}>
      {children}
    </section>
  );
}

// ── Featured Courses ──
export function FeaturedCourses() {
  return (
    <HomeSection>
      <SectionHeader
        eyebrow="Hand-picked for you"
        title="Featured Courses"
        description="Curated by our team — the most impactful courses to accelerate your career."
        link="/courses"
        linkLabel="Browse All Courses"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {getFeaturedCourses().slice(0, 4).map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── Popular Categories ──
const categoryIconMap = {
  'DevOps': Server, 'Cloud Computing': Cloud, 'Web Development': Globe, 'Data Science': BarChart3,
  'Cyber Security': Shield, 'Linux': Terminal, 'Programming': Cpu, 'Databases': Database,
  'AI & Machine Learning': Brain, 'School – Class 9-12': BookOpen, 'Engineering': Wrench, 'Version Control': GitBranch,
};

export function PopularCategories() {
  return (
    <HomeSection bg="var(--bg-secondary)">
      <SectionHeader
        eyebrow="Explore by topic"
        title="Popular Categories"
        description="Find the perfect learning path for your career goals."
        link="/categories"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
        {categories.slice(0, 12).map((cat, i) => {
          const IconComp = categoryIconMap[cat.name] || BookOpen;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/courses?category=${cat.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
                  padding: '18px 12px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,rgba(59,130,246,.2),rgba(6,182,212,.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComp size={20} color="#60a5fa" />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>{cat.courseCount} courses</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </HomeSection>
  );
}

// ── Trending Courses ──
export function TrendingCourses() {
  return (
    <HomeSection>
      <SectionHeader
        eyebrow="MOST POPULAR"
        title="Trending Right Now"
        description="What 10,000+ students are learning this week."
        link="/courses?filter=trending"
        linkLabel="All Trending"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {getTrendingCourses().slice(0, 6).map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── Learning Paths ──
const pathIcons = { Server: Server, Cloud: Cloud, Globe: Globe, Activity: BarChart3, Shield: Shield, Brain: Brain };

export function LearningPaths() {
  return (
    <HomeSection bg="var(--bg-secondary)">
      <SectionHeader
        eyebrow="Structured learning"
        title="Learning Paths"
        description="Follow a curated roadmap and go from beginner to job-ready."
        link="/categories"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {learningPaths.map((path, i) => {
          const PIcon = pathIcons[path.icon] || BookOpen;
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg,rgba(59,130,246,.2),rgba(6,182,212,.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PIcon size={20} color="#60a5fa" />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', borderRadius: '999px', padding: '3px 10px' }}>
                  {path.duration}
                </span>
              </div>

              <div>
                <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>{path.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.5, margin: 0 }}>{path.description}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {path.skills.slice(0, 4).map((skill) => (
                  <span key={skill} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(59,130,246,.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,.2)' }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{path.courses} courses</span>
                <span style={{ color: 'var(--text-muted)' }}>{path.level}</span>
                <Link to="/courses" style={{ color: '#60a5fa', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  Start <ChevronRight size={13} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </HomeSection>
  );
}

// ── Latest Books ──
export function LatestBooks() {
  return (
    <HomeSection>
      <SectionHeader
        eyebrow="Digital Library"
        title="Latest TextBooks"
        description="Free access to 300+ curated technical books and reference guides."
        link="/textbooks"
        linkLabel="Browse Library"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
        {books.slice(0, 6).map((book, i) => (
          <BookCard key={book.id} book={book} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── Top Instructors ──
export function TopInstructors() {
  return (
    <HomeSection bg="var(--bg-secondary)">
      <SectionHeader
        eyebrow="Learn from the best"
        title="Top Instructors"
        description="Industry practitioners with real-world DevOps & Cloud experience."
        link="/courses"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {instructors.slice(0, 4).map((inst, i) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
          >
            <div style={{ position: 'relative' }}>
              <img src={inst.avatar} alt={inst.name} style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59,130,246,.4)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={12} color="#fff" />
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 2px' }}>{inst.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0 }}>{inst.title}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={11} color="#fbbf24" fill="#fbbf24" /> {inst.rating}</span>
              <span>{(inst.students / 1000).toFixed(0)}K students</span>
            </div>
          </motion.div>
        ))}
      </div>
    </HomeSection>
  );
}

// ── Student Reviews ──
export function StudentReviews() {
  return (
    <HomeSection>
      <SectionHeader
        eyebrow="What students say"
        title="Student Reviews"
        description="Real feedback from real engineers who transformed their careers."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {reviews.slice(0, 4).map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

// ── FAQ ──
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', overflow: 'hidden', marginBottom: '8px' }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{faq.question}</span>
        <span style={{ color: '#60a5fa', fontSize: '1.2rem', fontWeight: 300, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
        </div>
      )}
    </motion.div>
  );
}

export function FAQ() {
  return (
    <HomeSection bg="var(--bg-secondary)">
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Got questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about DevOpsX platform."
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
