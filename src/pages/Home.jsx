import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const gradientStyle = (progress) => {
    const pos = Math.round(progress * 120);
    return {
        backgroundImage: `linear-gradient(135deg, #EB4C4C ${pos}%, #ffffff ${pos + 40}%, #EB4C4C 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    };
};

const useScrollGradient = () => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const progress = Math.min(Math.max(1 - rect.top / vh, 0), 1);
            const pos = Math.round(progress * 120);
            el.style.backgroundImage = `linear-gradient(135deg, #EB4C4C ${pos}%, #ffffff ${pos + 40}%, #EB4C4C 100%)`;
            el.style.backgroundSize = '200% auto';
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.backgroundClip = 'text';
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return ref;
};

const GradientText = ({ as: Tag = 'p', className, style, children }) => {
    const ref = useScrollGradient();
    return (
        <Tag ref={ref} className={className} style={{ ...style, ...gradientStyle(0) }}>
            {children}
        </Tag>
    );
};

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="dashboard-bg-video"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                >
                    <source src="/videos/dashboard-hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-text-container"
                    >
                        <GradientText as="h1" className="hero-title">
                            Yazh Silambam Academy
                        </GradientText>
                        <GradientText as="p" className="hero-subtitle">
                            Knowledge · Strength · Tradition
                        </GradientText>
                        <GradientText as="p" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            Where Ancient Tamil Warrior Spirit Meets Modern Discipline
                        </GradientText>
                    </motion.div>
                </div>
            </section>

            {/* Who We Are */}
            <section id="who-we-are" className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass-panel about-panel text-center"
                    >
                        <GradientText as="h2" className="section-title">Who We Are</GradientText>
                        <GradientText as="p" className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            Yazh Silambam Academy is dedicated to preserving the ancient Tamil martial art of Silambam
                            while building discipline, fitness, focus, and cultural pride in every student. We train
                            children, youth, women, and adults in a safe, respectful environment, blending tradition
                            with modern teaching methods.
                        </GradientText>
                    </motion.div>
                </div>
            </section>

            {/* What We Provide */}
            <section className="section-padding bg-dark-overlay">
                <div className="container">
                    <GradientText as="h2" className="section-title">What We Provide</GradientText>
                    <div className="feature-grid">
                        {[
                            {
                                icon: <Shield className="feature-icon" />,
                                title: "Bare Hand Technique",
                                desc: "Master unarmed combat, footwork, blocks, strikes and self-defense rooted in ancient Tamil methods.",
                                link: "/bare-hand-techniques"
                            },
                            {
                                icon: <GripVertical className="feature-icon" />,
                                title: "Stick Fencing",
                                desc: "Intensive training in bamboo staff (silambam) spinning, strikes, defense, sparring, and forms to build speed, precision & agility.",
                                link: "/stick-fencing"
                            },
                            {
                                icon: <Sword className="feature-icon" />,
                                title: "Weaponry Training",
                                desc: "Progress to traditional weapons plus cultural performances, and demonstrations that celebrate Tamil heritage",
                                link: "/weaponry-training"
                            }
                        ].map((item, index) => {
                            const CardContent = () => (
                                <>
                                    <div className="feature-icon-wrapper">
                                        {item.icon}
                                    </div>
                                    <GradientText as="h3" className="feature-title">{item.title}</GradientText>
                                    <GradientText as="p" className="feature-desc">{item.desc}</GradientText>
                                </>
                            );

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="glass-card feature-card"
                                >
                                    {item.link ? (
                                        <Link to={item.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                            <CardContent />
                                        </Link>
                                    ) : (
                                        <CardContent />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Yazh Silambam */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                    >
                        <GradientText as="h2" className="section-title">Why Choose Yazh Silambam?</GradientText>
                        <ul className="why-choose-list" style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', textAlign: 'center' }}>
                            {[
                                "Experienced instructors",
                                "Beginner to advanced levels",
                                "Separate methods for kids / women / adults",
                                "Focus on discipline & anti-bullying confidence",
                                "Regular events, demos & competitions"
                            ].map((text, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>✓</span>
                                    <GradientText as="span">{text}</GradientText>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Join the Legacy */}
            <section className="section-padding bg-dark-overlay">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                        style={{ maxWidth: '550px', margin: '0 auto' }}
                    >
                        <GradientText as="h2" className="section-title mb-6">Ready to Begin Your Journey?</GradientText>
                        <GradientText as="p" className="about-text mb-8">
                            Join us and become part of a legacy that spans centuries. Experience the power, discipline,
                            and cultural richness of Silambam.
                        </GradientText>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <Link to="/contact" className="btn-primary hero-cta">
                                Join the Legacy
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
