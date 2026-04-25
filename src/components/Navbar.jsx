import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBrandClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // Already on home page, scroll to section
            const element = document.getElementById('who-we-are');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Navigate to home and then scroll
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
                <a href="/" onClick={handleBrandClick} className="nav-brand">
                    <img src="/logo.png" alt="Yazh Silamba Payirchiyagam" className="nav-logo" />
                    <span className="font-tamil brand-text">Yazh</span>
                    <span className="text-gold brand-text">Silambam Academy</span>
                </a>

                {/* Desktop Menu */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/login" className="btn-primary nav-btn">
                        <span className="nav-btn-small">Portal Login</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass-panel">
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
                </div>
            )}
        </nav>
    );
};

export default Navbar;
