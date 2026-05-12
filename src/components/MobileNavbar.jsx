import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, CalendarDays, Trophy, Phone, LogIn,
  AlignJustify, X
} from 'lucide-react';

const navItems = [
  { label: 'Home',         path: '/',             icon: Home },
  { label: 'Events',       path: '/events',       icon: CalendarDays },
  { label: 'Achievements', path: '/achievements', icon: Trophy },
  { label: 'Contact',      path: '/contact',      icon: Phone },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-navbar-wrapper">
      {/* Liquid Glass Top Bar */}
      <nav className="mobile-navbar-bar">
        {/* Brand */}
        <Link to="/" className="mobile-nav-brand" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" alt="Logo" className="mobile-nav-logo" />
          <span className="mobile-nav-brand-text">
            <span className="font-tamil">Yazh</span>{' '}
            <span className="text-gold">Silambam</span>
          </span>
        </Link>

        {/* Right actions */}
        <div className="mobile-nav-actions">
          {/* Portal Login */}
          <Link to="/login" className="mobile-login-btn">
            <LogIn size={16} />
            <span>Login</span>
          </Link>

          {/* Bubble toggle */}
          <motion.button
            className="mobile-bubble-trigger"
            onClick={() => setIsOpen(!isOpen)}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-dropdown"
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.path}
                  className={`mobile-nav-item ${isActive(item.path) ? 'mobile-nav-active' : ''}`}
                  onClick={() => handleNav(item.path)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      className="mobile-nav-active-dot"
                      layoutId="mobile-active-dot"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
