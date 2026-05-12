import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  CalendarDays,
  Trophy,
  Phone,
  LogIn,
  AlignJustify,
} from 'lucide-react';

const navItems = [
  { label: 'Home',         path: '/',             icon: Home },
  { label: 'Events',       path: '/events',       icon: CalendarDays },
  { label: 'Achievements', path: '/achievements', icon: Trophy },
  { label: 'Contact',      path: '/contact',      icon: Phone },
  { label: 'Login',        path: '/login',        icon: LogIn },
];

export default function MobileMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsExpanded(false);
  };

  return (
    <div className="mobile-bubble-nav" aria-label="Mobile Navigation">
      <div className="mobile-bubble-stack">
        {/* Toggle bubble — always visible */}
        <button
          className="bubble-item bubble-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle menu"
        >
          <AlignJustify size={22} />
        </button>

        {/* Nav bubbles — slide out when expanded */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`bubble-item bubble-nav-item ${active ? 'bubble-active' : ''}`}
              onClick={() => handleNavigate(item.path)}
              aria-label={item.label}
              style={{
                transform: isExpanded
                  ? `translateY(-${(index + 1) * 56}px)`
                  : 'translateY(0px)',
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transitionDelay: isExpanded
                  ? `${index * 40}ms`
                  : `${(navItems.length - index) * 20}ms`,
              }}
            >
              <Icon size={20} />
              {isExpanded && (
                <span className="bubble-label">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
