// ============================================================
// GradeSelect — "What is your current grade?"
// Step 2 of onboarding. DevOpsX dark theme. No emojis.
// Flow: Onboarding (track) → GradeSelect (grade) → Dashboard
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Users, CheckCircle2, ArrowRight,
  ArrowLeft, BookMarked, Video, FileText, ClipboardList,
  Brain, Terminal, Code2, Database, Cpu, Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/ui/BrandLogo';

// ── Grade definitions with features from the flowchart ──
const grades = [
  {
    id: 'grade-5-8',
    icon: BookMarked,
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,.12)',
    label: 'Class 5 – 8',
    sublabel: 'Middle School',
    desc: 'Foundation-level courses, guided learning, AI tools exploration',
    features: [
      'Ebooks & Study Material',
      'Video Courses',
      'Assignments & Quizzes',
      'AI Art Gallery',
      'Artscane Projects',
      'AI Agent Comparison',
      'AI Agent Projects',
      'AI Chatbots Practice',
      'AI Automation Basics',
      'Prompt Libraries',
      'Learning Support',
    ],
    accent: '#34d399',
  },
  {
    id: 'grade-9-12',
    icon: GraduationCap,
    iconColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,.12)',
    label: 'Class 9 – 12',
    sublabel: 'High School',
    desc: 'Syllabus-aligned courses, AI tools, advanced projects & exam prep',
    features: [
      'Ebooks & Courses',
      'Assignments & Syllabus',
      'Video Courses',
      'AI Tool Access',
      'Learning Kit',
      'Prompt Libraries',
      'AI Chatbots',
      'AI Automation',
      'Peer Learning Tool',
      'Learning Support',
    ],
    accent: '#60a5fa',
  },
  {
    id: 'college',
    icon: Users,
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,.12)',
    label: 'College / Graduate',
    sublabel: 'Undergraduate & above',
    desc: 'Advanced AI, Machine Learning, Python, real-world projects & certifications',
    features: [
      'Ebooks & Courses',
      'Video Lectures',
      'Masters Programs',
      'Learning Kit',
      'Advanced AI Projects',
      'Machine Learning',
      'ULMs & LLM Projects',
      'Python Language Models',
      'AI Automation',
      'Project Portfolio',
    ],
    accent: '#a78bfa',
  },
];

// Feature icon mapping
function featureIcon(label) {
  const map = {
    'Video': Video, 'Ebook': BookOpen, 'Book': BookOpen,
    'Assignment': ClipboardList, 'Syllabus': FileText,
    'AI': Brain, 'Python': Code2, 'Machine': Cpu,
    'Learning Kit': Layers, 'Prompt': Terminal,
    'Project': Database, 'Masters': GraduationCap,
    'ULM': Brain, 'Automation': Terminal,
  };
  for (const [key, Icon] of Object.entries(map)) {
    if (label.includes(key)) return Icon;
  }
  return BookOpen;
}

export default function GradeSelect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(null);

  const firstName = user?.name?.split(' ')[0] || 'there';

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 650));
    navigate('/dashboard');
  };

  const selectedGrade = grades.find((g) => g.id === selected);

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(145deg, #060d1f 0%, #09152e 55%, #060d1f 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'flex-start', padding: '36px 20px 48px',
      fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.32, 0.18] }} transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'absolute', width: '550px', height: '550px', borderRadius: '50%', top: '-180px', right: '-160px', background: 'radial-gradient(circle, rgba(167,139,250,.3) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        style={{ position: 'absolute', width: '480px', height: '480px', borderRadius: '50%', bottom: '-150px', left: '-140px', background: 'radial-gradient(circle, rgba(59,130,246,.25) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.025) 1px, transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ marginBottom: '36px', position: 'relative', zIndex: 2 }}>
        <BrandLogo size="lg" />
      </motion.div>

      {/* Progress Steps */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
        {['Choose Track', 'Select Grade', 'Get Started'].map((step, i) => {
          const done = i < 1;
          const active = i === 1;
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', fontSize: '0.68rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? 'rgba(52,211,153,.2)' : active ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'rgba(255,255,255,.07)',
                  border: `1.5px solid ${done ? '#34d399' : active ? '#3b82f6' : 'rgba(255,255,255,.12)'}`,
                  color: done ? '#34d399' : active ? '#fff' : 'rgba(148,163,184,.3)',
                }}>
                  {done ? <CheckCircle2 size={13} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: active ? 700 : 500, color: active ? '#fff' : done ? '#34d399' : 'rgba(148,163,184,.3)' }}>
                  {step}
                </span>
              </div>
              {i < 2 && <div style={{ width: '32px', height: '1.5px', background: done ? '#34d399' : 'rgba(255,255,255,.1)', borderRadius: '2px' }} />}
            </div>
          );
        })}
      </motion.div>

      {/* Headline */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.38 }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 2 }}>
        <p style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>
          Step 2 of 2
        </p>
        <h1 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 10px', lineHeight: 1.1 }}>
          What is your current grade?
        </h1>
        <p style={{ color: 'rgba(148,163,184,.55)', fontSize: '0.875rem', margin: 0 }}>
          We will personalize your dashboard, resources and courses accordingly
        </p>
      </motion.div>

      {/* Grade Cards — side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        width: '100%', maxWidth: '860px',
        position: 'relative', zIndex: 2,
        marginBottom: '32px',
      }}>
        {grades.map((grade, i) => {
          const Icon = grade.icon;
          const isSelected = selected === grade.id;
          return (
            <motion.button
              key={grade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
              onClick={() => { setSelected(grade.id); setShowFeatures(grade.id); }}
              style={{
                position: 'relative',
                background: isSelected
                  ? `linear-gradient(145deg, ${grade.accent}12, ${grade.accent}08)`
                  : 'rgba(13,22,52,0.88)',
                border: `1.5px solid ${isSelected ? grade.accent + '55' : 'rgba(255,255,255,.07)'}`,
                borderRadius: '22px',
                padding: '24px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                boxShadow: isSelected
                  ? `0 0 0 3px ${grade.accent}22, 0 16px 40px rgba(0,0,0,.45)`
                  : '0 8px 28px rgba(0,0,0,.35)',
                transition: 'all 0.22s ease',
                outline: 'none',
              }}
              whileHover={{ y: -4, boxShadow: '0 22px 52px rgba(0,0,0,.5)' }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    <CheckCircle2 size={20} color={grade.accent} fill={grade.accent + '22'} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: grade.iconBg, border: `1px solid ${grade.iconColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={24} color={grade.iconColor} strokeWidth={1.75} />
              </div>

              {/* Labels */}
              <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 900, margin: '0 0 3px', letterSpacing: '-0.02em' }}>
                {grade.label}
              </h3>
              <p style={{ color: grade.accent, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>
                {grade.sublabel}
              </p>
              <p style={{ color: 'rgba(148,163,184,.55)', fontSize: '0.8rem', margin: '0 0 18px', lineHeight: 1.5 }}>
                {grade.desc}
              </p>

              {/* Feature count pill */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', background: isSelected ? grade.accent + '18' : 'rgba(255,255,255,.05)', border: `1px solid ${isSelected ? grade.accent + '35' : 'rgba(255,255,255,.08)'}`, fontSize: '0.72rem', fontWeight: 700, color: isSelected ? grade.accent : 'rgba(148,163,184,.5)' }}>
                {grade.features.length} features unlocked
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feature Preview Panel — shows when a grade is selected */}
      <AnimatePresence>
        {selectedGrade && (
          <motion.div
            key={selectedGrade.id}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%', maxWidth: '860px', marginBottom: '32px',
              background: `linear-gradient(135deg, ${selectedGrade.accent}0f, rgba(13,22,52,.9))`,
              border: `1px solid ${selectedGrade.accent}30`,
              borderRadius: '20px', padding: '22px 24px',
              position: 'relative', zIndex: 2, overflow: 'hidden',
            }}
          >
            <p style={{ color: selectedGrade.accent, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 14px' }}>
              What you get with {selectedGrade.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
              {selectedGrade.features.map((feature, i) => {
                const FIcon = featureIcon(feature);
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}
                  >
                    <FIcon size={14} color={selectedGrade.accent} style={{ flexShrink: 0 }} />
                    <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 600 }}>{feature}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/onboarding')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 22px', borderRadius: '12px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(148,163,184,.7)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <motion.button
            onClick={handleContinue}
            disabled={!selected || loading}
            whileHover={selected && !loading ? { scale: 1.02 } : {}}
            whileTap={selected && !loading ? { scale: 0.98 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 36px', borderRadius: '12px', border: 'none',
              background: selected ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'rgba(255,255,255,.07)',
              color: selected ? '#fff' : 'rgba(255,255,255,.2)',
              fontWeight: 800, fontSize: '0.95rem', cursor: selected ? 'pointer' : 'not-allowed',
              boxShadow: selected ? '0 8px 24px rgba(59,130,246,.4)' : 'none',
              transition: 'all 0.22s ease',
            }}
          >
            {loading ? 'Setting up your dashboard…' : 'Enter DevOpsX Learning'}
            {!loading && <ArrowRight size={16} />}
          </motion.button>
        </div>

        <p style={{ color: 'rgba(148,163,184,.3)', fontSize: '0.73rem', textAlign: 'center' }}>
          Your grade can be updated anytime from your Profile settings
        </p>
      </motion.div>
    </div>
  );
}
