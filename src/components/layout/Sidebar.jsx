// ============================================================
// Sidebar Component — DevOpsX (Ultra User-Friendly & Sleek)
// ============================================================

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, GraduationCap, Briefcase, Code2, FileText,
  Users, Settings, ChevronDown, Server, Cloud, Shield, Terminal,
  Layers, Brain, Globe, Database, GitBranch, Cpu, ChevronRight,
  BookMarked, ClipboardList, FileQuestion, Video, Heart, Award,
  UserCircle, BarChart3, X, Sparkles, Folder
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import BrandLogo from '../ui/BrandLogo';

// Clean, organized menu structure
const menuSections = [
  {
    label: 'MAIN',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',   to: '/dashboard' },
      { icon: BookOpen,        label: 'All Courses', to: '/courses' },
      { icon: BookMarked,      label: 'My Learning', to: '/my-learning' },
    ],
  },
  {
    label: 'ACADEMICS & DEGREE',
    icon: GraduationCap,
    items: [
      { icon: Code2,     label: 'Computer Science', to: '/courses?category=Computer+Science' },
      { icon: Cpu,       label: 'Engineering',      to: '/courses?category=Engineering' },
      { icon: BookMarked,label: 'School (Class 9-12)', to: '/courses?category=School' },
    ],
  },
  {
    label: 'TECH & CLOUD',
    icon: Server,
    items: [
      { icon: Server,    label: 'DevOps & Docker',  to: '/courses?category=DevOps' },
      { icon: Cloud,     label: 'Cloud (AWS/Azure)',to: '/courses?category=Cloud+Computing' },
      { icon: Globe,     label: 'Web Development', to: '/courses?category=Web+Development' },
      { icon: Terminal,  label: 'Linux & SysAdmin',  to: '/courses?category=Linux' },
      { icon: Brain,     label: 'AI & Data Science', to: '/courses?category=Data+Science' },
      { icon: Shield,    label: 'Cyber Security',   to: '/courses?category=Cyber+Security' },
    ],
  },
  {
    label: 'STUDENT RESOURCES',
    icon: FileText,
    items: [
      { icon: BookOpen,       label: 'TextBooks',         to: '/textbooks' },
      { icon: FileText,       label: 'Notes & PDFs',      to: '/notes' },
      { icon: Video,          label: 'Recorded Classes',  to: '/courses' },
      { icon: ClipboardList,  label: 'Assignments',       to: '/assignments' },
      { icon: FileQuestion,   label: 'Practice Questions',to: '/practice' },
    ],
  },
  {
    label: 'ACCOUNT',
    icon: Users,
    items: [
      { icon: Award,      label: 'Certificates', to: '/certificates' },
      { icon: Heart,      label: 'Wishlist',     to: '/wishlist' },
      { icon: UserCircle, label: 'Profile',      to: '/profile' },
      { icon: Settings,   label: 'Settings',     to: '/profile' },
    ],
  },
];

// Single Item Component
function SidebarItem({ item, collapsed, active }) {
  const { closeMobile } = useSidebar();

  return (
    <Link
      to={item.to}
      onClick={closeMobile}
      title={collapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: collapsed ? '10px' : '8px 12px',
        borderRadius: '10px',
        fontSize: '0.825rem',
        fontWeight: active ? 700 : 500,
        textDecoration: 'none',
        color: active ? '#60a5fa' : 'var(--text-secondary)',
        background: active
          ? 'linear-gradient(135deg, rgba(59,130,246,.18), rgba(6,182,212,.1))'
          : 'transparent',
        border: active ? '1px solid rgba(59,130,246,.25)' : '1px solid transparent',
        transition: 'all 0.15s ease',
        margin: '2px 0',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255,255,255,.05)';
          e.currentTarget.style.color = '#fff';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }
      }}
    >
      <item.icon
        size={16}
        style={{ color: active ? '#60a5fa' : 'var(--text-muted)', flexShrink: 0 }}
      />
      {!collapsed && (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.label}
        </span>
      )}
      {!collapsed && active && (
        <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 6px #60a5fa', flexShrink: 0 }} />
      )}
    </Link>
  );
}

// Section Header & Items Group
function SidebarSection({ section, collapsed }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  if (!section.label || section.label === 'MAIN') {
    return (
      <div style={{ marginBottom: '12px' }}>
        {section.items.map((item) => (
          <SidebarItem
            key={item.to + item.label}
            item={item}
            collapsed={collapsed}
            active={location.pathname === item.to}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '14px' }}>
      {!collapsed && (
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 8px', borderRadius: '6px',
            fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <span>{section.label}</span>
          <ChevronDown
            size={12}
            style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s' }}
          />
        </button>
      )}

      <AnimatePresence initial={false}>
        {(open || collapsed) && (
          <motion.div
            initial={collapsed ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: 'hidden' }}
          >
            {section.items.map((item) => (
              <SidebarItem
                key={item.to + item.label}
                item={item}
                collapsed={collapsed}
                active={location.pathname === item.to || location.search.includes(encodeURIComponent(item.label.split(' ')[0]))}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Sidebar Export
export default function Sidebar() {
  const { collapsed, mobileOpen, isMobile, closeMobile } = useSidebar();

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Mobile Drawer Header */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <BrandLogo size="sm" />
          <button onClick={closeMobile} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div style={{ flex: 1, overflowY: 'auto', padding: collapsed && !isMobile ? '12px 6px' : '14px 10px' }} className="scrollbar-hide">
        {menuSections.map((section, idx) => (
          <SidebarSection key={idx} section={section} collapsed={collapsed && !isMobile} />
        ))}
      </div>

      {/* Footer Version Note */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,.15)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>
            DevOpsX Platform v1.0
          </p>
        </div>
      )}
    </div>
  );

  /* Desktop Sidebar */
  if (!isMobile) {
    return (
      <motion.aside
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          position: 'fixed', left: 0, top: 'var(--navbar-height)',
          height: 'calc(100vh - var(--navbar-height))',
          zIndex: 30, overflow: 'hidden',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
          boxSizing: 'border-box',
        }}
      >
        {sidebarContent}
      </motion.aside>
    );
  }

  /* Mobile Drawer */
  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(4px)' }}
          />
          <motion.aside
            initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
              width: '260px', background: 'var(--bg-secondary)',
              borderRight: '1px solid var(--border-subtle)',
            }}
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
