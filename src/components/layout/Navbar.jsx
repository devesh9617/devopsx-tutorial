// ============================================================
// Navbar — DevOpsX Learning Platform (Ultra-Sleek Header)
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Bell, Sun, Moon, LogIn, UserPlus, ChevronDown,
  LogOut, User, BookOpen, Award, Heart, Settings, X, Sparkles, CheckCircle2
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
          background: scrolled ? 'rgba(6,11,24,0.96)' : 'rgba(6,11,24,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,.4)' : 'none',
          transition: 'all 0.25s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Sidebar Toggle + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggle}
            aria-label="Toggle sidebar"
            style={{
              padding: '8px', borderRadius: '10px',
              background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Menu size={18} />
          </button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <BrandLogo size="md" />
          </Link>
        </div>

        {/* Center: Desktop Global Search Bar */}
        <div className="hidden lg:flex" style={{ flex: 1, maxWidth: '440px', margin: '0 24px' }}>
          <SearchBar size="md" className="w-full" placeholder="Search courses, books, topics..." />
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

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {isDark ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} />}
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
                        boxShadow: '0 20px 50px rgba(0,0,0,.6)',
                      }}
                    >
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', justifyContent: 'space-between' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Notifications</h4>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(59,130,246,.2)', color: '#60a5fa', fontWeight: 700 }}>
                          {unreadCount} unread
                        </span>
                      </div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)',
                            background: n.unread ? 'rgba(59,130,246,.04)' : 'transparent',
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                        >
                          <p style={{ color: '#fff', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{n.text}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '4px 0 0' }}>{n.time}</p>
                        </div>
                      ))}
                      <div style={{ padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,.2)' }}>
                        <button style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
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
                    background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(59,130,246,.5)' }}
                  />
                  <span className="hidden sm:block" style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
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
                        boxShadow: '0 20px 50px rgba(0,0,0,.6)',
                      }}
                    >
                      {/* User Summary */}
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,.02)' }}>
                        <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>

                      {/* Menu Links */}
                      <div style={{ padding: '6px' }}>
                        {[
                          { icon: User,     label: 'Profile',     to: '/profile' },
                          { icon: BookOpen, label: 'My Learning', to: '/my-learning' },
                          { icon: Award,    label: 'Certificates',to: '/certificates' },
                          { icon: Heart,    label: 'Wishlist',    to: '/wishlist' },
                          { icon: Settings, label: 'Settings',    to: '/profile' },
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
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,.12)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                          >
                            <Icon size={14} color="#60a5fa" />
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
