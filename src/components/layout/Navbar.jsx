// ============================================================
// Navbar — DevOpsX Learning Platform (Ultra-Sleek Header)
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Bell, Sun, Moon, LogIn, UserPlus, ChevronDown,
  LogOut, User, BookOpen, Award, Heart, Settings, X, Sparkles, CheckCircle2, Download, Folder, Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar } from '../../context/SidebarContext';
import SearchBar from '../ui/SearchBar';
import BrandLogo from '../ui/BrandLogo';

const dropDownMotion = {
  initial:  { opacity: 0, y: 8, scale: 0.96 },
  animate:  { opacity: 1, y: 0, scale: 1 },
  exit:     { opacity: 0, y: 8, scale: 0.96 },
  transition: { duration: 0.18, ease: 'easeOut' },
};

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { toggle } = useSidebar();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const profileRef = useRef(null);
  const notifRef   = useRef(null);
  useClickOutside(profileRef, () => setShowProfile(false));
  useClickOutside(notifRef,   () => setShowNotif(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const notifications = [
    { id: 1, text: 'New course: Kubernetes Advanced Masterclass', time: '2h ago',  unread: true },
    { id: 2, text: 'Assignment due: Docker Containerization Lab', time: '5h ago',  unread: true },
    { id: 3, text: 'Certificate issued: DevOps Engineering',      time: '1d ago', unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      {/* ── Main Top Navbar Header ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 40,
          height: 'var(--navbar-height)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isDark
            ? (scrolled ? 'rgba(6,11,24,0.97)' : 'rgba(6,11,24,0.88)')
            : (scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.90)'),
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(59,130,246,0.15)',
          boxShadow: scrolled
            ? (isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 4px 20px rgba(59,130,246,.12)')
            : 'none',
          transition: 'all 0.25s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Brand Logo + Browse Category Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* <button onClick={toggle} aria-label="Toggle sidebar"> ... </button> */}

          <Link to="/" style={{ textDecoration: 'none' }}>
            <BrandLogo size="md" />
          </Link>

          {/* Browse Categories Dropdown */}
          <Link
            to="/categories"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 12px', borderRadius: '8px',
              color: 'var(--text-secondary)', fontSize: '0.84rem', fontWeight: 600,
              textDecoration: 'none', background: 'rgba(59,130,246,0.06)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            Browse <ChevronDown size={14} />
          </Link>
        </div>

        {/* Center: Desktop Global Search Bar */}
        <div className="hidden lg:flex" style={{ flex: 1, maxWidth: '380px', margin: '0 16px' }}>
          <SearchBar size="md" className="w-full" placeholder="Search for books, courses and more..." />
        </div>

        {/* Top Header Navigation Links (Matching Reference UI) */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '20px', margin: '0 12px' }}>
          <Link to="/textbooks" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Books
          </Link>
          <Link to="/courses" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Courses
          </Link>
          <Link to="/curriculum" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Curriculum
          </Link>
          <Link to="/live-classes" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Live Classes
          </Link>
          <Link to="/resources" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Resources
          </Link>
          <Link to="/dashboard" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>

        {/* Right: Actions & User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Mobile Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="lg:hidden"
            style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}
          >
            <Search size={17} />
          </button>

          {/* Theme Toggle — premium pill style */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '999px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(251,191,36,.12), rgba(251,191,36,.06))'
                : 'linear-gradient(135deg, rgba(59,130,246,.12), rgba(6,182,212,.07))',
              border: isDark ? '1px solid rgba(251,191,36,.25)' : '1px solid rgba(59,130,246,.25)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 0 14px rgba(251,191,36,.2)'
                : '0 0 14px rgba(59,130,246,.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isDark
              ? <><Sun size={14} color="#fbbf24" /><span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24' }}>Light</span></>
              : <><Moon size={14} color="#3b82f6" /><span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b82f6' }}>Dark</span></>}
          </button>

          {user ? (
            <>
              {/* Notifications Dropdown */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotif((p) => !p)}
                  style={{
                    position: 'relative', padding: '8px', borderRadius: '10px',
                    background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex',
                  }}
                >
                  <Bell size={17} />
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: 'absolute', top: '6px', right: '6px',
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: '#ef4444', boxShadow: '0 0 6px #ef4444',
                      }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      {...dropDownMotion}
                      style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: '320px', borderRadius: '16px', overflow: 'hidden',
                        background: 'var(--bg-card)', border: '1px solid var(--border-muted)',
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,.6)' : '0 12px 36px rgba(59,130,246,.18)',
                      }}
                    >
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Notifications</h4>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: isDark ? 'rgba(59,130,246,.2)' : 'rgba(59,130,246,.12)', color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 700 }}>
                          {unreadCount} unread
                        </span>
                      </div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)',
                            background: n.unread ? (isDark ? 'rgba(59,130,246,.06)' : 'rgba(59,130,246,.05)') : 'transparent',
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                        >
                          <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{n.text}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '4px 0 0' }}>{n.time}</p>
                        </div>
                      ))}
                      <div style={{ padding: '10px', textAlign: 'center', background: isDark ? 'rgba(0,0,0,.2)' : 'rgba(59,130,246,.04)' }}>
                        <button style={{ background: 'none', border: 'none', color: isDark ? '#60a5fa' : '#2563eb', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowProfile((p) => !p)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 8px', borderRadius: '12px',
                    background: isDark ? 'rgba(255,255,255,.05)' : 'rgba(59,130,246,.07)',
                    border: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.15)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(59,130,246,.5)' }}
                  />
                  <span className="hidden sm:block" style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} style={{ color: 'var(--text-muted)', transform: showProfile ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      {...dropDownMotion}
                      style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: '210px', borderRadius: '16px', overflow: 'hidden',
                        background: 'var(--bg-card)', border: '1px solid var(--border-muted)',
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,.6)' : '0 12px 36px rgba(59,130,246,.18)',
                      }}
                    >
                      {/* User Summary */}
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', background: isDark ? 'rgba(255,255,255,.02)' : 'rgba(59,130,246,.03)' }}>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>

                      {/* Menu Links */}
                      <div style={{ padding: '6px' }}>
                        {[
                          { icon: User,     label: 'Profile',      to: '/profile' },
                          { icon: BookOpen, label: 'My Learning',  to: '/my-learning' },
                          { icon: Video,    label: 'Live Classes', to: '/live-classes' },
                          { icon: Folder,   label: 'Resources',    to: '/resources' },
                          { icon: Download, label: 'Downloads',    to: '/downloads' },
                          { icon: Award,    label: 'Achievements', to: '/achievements' },
                          { icon: Award,    label: 'Certificates', to: '/certificates' },
                          { icon: Heart,    label: 'Wishlist',     to: '/wishlist' },
                          { icon: Settings, label: 'Settings',     to: '/profile' },
                        ].map(({ icon: Icon, label, to }) => (
                          <Link
                            key={label}
                            to={to}
                            onClick={() => setShowProfile(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '8px 10px', borderRadius: '10px',
                              color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
                              textDecoration: 'none', transition: 'all 0.12s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = isDark ? 'rgba(59,130,246,.12)' : 'rgba(59,130,246,.1)';
                              e.currentTarget.style.color = isDark ? '#fff' : '#1d4ed8';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                          >
                            <Icon size={14} color={isDark ? '#60a5fa' : '#2563eb'} />
                            {label}
                          </Link>
                        ))}
                      </div>

                      {/* Sign Out */}
                      <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '6px' }}>
                        <button
                          onClick={() => { logout(); setShowProfile(false); navigate('/'); }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '8px 10px', borderRadius: '10px',
                            color: '#f87171', fontSize: '0.8rem', fontWeight: 600,
                            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                            transition: 'background 0.12s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,.12)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600,
                  color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
                  textDecoration: 'none', transition: 'all 0.15s',
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700,
                  color: '#fff', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
                  boxShadow: '0 4px 12px rgba(59,130,246,.3)', textDecoration: 'none', transition: 'all 0.15s',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px',
              background: 'rgba(6,11,24,0.98)', backdropFilter: 'blur(24px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
              <SearchBar className="flex-1" size="lg" placeholder="Search courses, books, topics..." />
              <button
                onClick={() => setShowSearch(false)}
                style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,.08)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
