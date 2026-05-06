import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBrandClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById('who-we-are');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById('who-we-are');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'Achievements', path: '/achievements' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">


            <div className="container nav-container glass-panel">
                <a href="/" onClick={handleBrandClick} className="nav-brand" style={{ zIndex: 10 }}>
                    <img src="/logo.png" alt="Yazh Silamba Payirchiyagam" className="nav-logo" />
                    <span className="font-tamil brand-text">Yazh</span>
                    <span className="text-gold brand-text">Silambam Academy</span>
                </a>

                {/* Desktop Menu - Neumorphic Theme */}
                <div className="nav-links-neumorphic">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link-neu ${isActive(link.path) ? 'active' : ''}`}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="neu-active-indicator"
                                    className="liquid-indicator-neu"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
                
                <Link to="/login" className="btn-primary nav-btn" style={{ zIndex: 10 }}>
                    <span className="nav-btn-small">Portal Login</span>
                </Link>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ zIndex: 10 }}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mobile-menu glass-panel"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="btn-primary mobile-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Portal Login
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
