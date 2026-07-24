// ============================================================
// MainLayout — Composes Navbar + Sidebar + Content + Footer
// ============================================================

import { motion } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

export default function MainLayout({ children }) {
  const { collapsed, isMobile } = useSidebar();
  const sidebarWidth = isMobile ? 0 : collapsed ? 72 : 260;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <Sidebar />

      {/* Main content — shifts right to make room for sidebar */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col"
        style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
