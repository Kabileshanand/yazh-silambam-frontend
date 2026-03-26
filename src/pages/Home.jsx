import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sword, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCanvas from '../components/AnimatedCanvas';

const slides = [
    {
        image: '/images/bare-hand/Suvadu Murai.jpg',
        title: 'Yazh Silambam Academy',
        subtitle: 'Knowledge · Strength · Tradition',
        tag: 'Bare Hand Techniques',
        link: '/bare-hand-techniques',
    },
    {
        image: '/images/stick-fencing/Thee Silambam.jpg',
        title: 'Thee Silambam',
        subtitle: 'Fire. Precision. Mastery.',
        tag: 'Stick Fencing',
        link: '/stick-fencing',
    },
    {
        image: '/images/stick-fencing/Sparing.jpg',
        title: 'Sparring',
        subtitle: 'Real Combat. Real Confidence.',
        tag: 'Stick Fencing',
        link: '/stick-fencing',
    },
    {
        image: '/images/weaponry/Surul.jpg',
        title: 'Weaponry Training',
        subtitle: 'Ancient Weapons. Modern Warriors.',
        tag: 'Weaponry',
        link: '/weaponry-training',
    },
    {
        image: '/images/weaponry/Vaal.jpg',
        title: 'Vaal Veechu',
        subtitle: 'The Art of the Sword.',
        tag: 'Weaponry',
        link: '/weaponry-training',
    },
];

const haptic = (pattern = [10]) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
};

const Carousel = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const dragStartX = useRef(null);
    const isDragging = useRef(false);

    const goTo = useCallback((index, dir) => {
        setDirection(dir);
        setCurrent((index + slides.length) % slides.length);
        haptic([12]);
    }, []);

    const prev = () => goTo(current - 1, -1);
    const next = () => goTo(current + 1, 1);

    const onDragStart = (e) => {
        dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        isDragging.current = true;
    };

    const onDragEnd = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - endX;
        if (Math.abs(diff) > 50) {
            haptic([8, 30, 8]);
            diff > 0 ? next() : prev();
        }
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <div
            className="carousel-wrapper"
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
            style={{ userSelect: 'none' }}
        >
            <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="carousel-slide"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="carousel-slide-img"
                        draggable={false}
                    />
                    <div className="carousel-slide-overlay" />
                    <div className="carousel-slide-content">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="carousel-tag"
                        >
                            {slides[current].tag}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="carousel-title"
                        >
                            {slides[current].title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="carousel-subtitle"
                        >
                            {slides[current].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to={slides[current].link} className="btn-primary carousel-cta">
                                Explore
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <button className="carousel-arrow carousel-arrow-left" onClick={prev}>
                <ChevronLeft size={28} />
            </button>
            <button className="carousel-arrow carousel-arrow-right" onClick={next}>
                <ChevronRight size={28} />
            </button>

            {/* Dots */}
            <div className="carousel-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === current ? 'active' : ''}`}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="home-page" style={{ position: 'relative' }}>
            <AnimatedCanvas />

            {/* Carousel Hero */}
            <Carousel />

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
                        <h2 className="section-title">Who We Are</h2>
                        <p className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <span className="text-gold font-bold">Yazh Silambam Academy</span> is dedicated to preserving the ancient Tamil martial art of Silambam while building discipline, fitness, focus, and cultural pride in every student. We train children, youth, women, and adults in a safe, respectful environment, blending tradition with modern teaching methods.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What We Provide */}
            <section className="section-padding bg-dark-overlay">
                <div className="container">
                    <h2 className="section-title">What We Provide</h2>
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
                                    <div className="feature-icon-wrapper">{item.icon}</div>
                                    <h3 className="feature-title">{item.title}</h3>
                                    <p className="feature-desc">{item.desc}</p>
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
                                    <Link to={item.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                        <CardContent />
                                    </Link>
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
                        <h2 className="section-title">Why Choose Yazh Silambam?</h2>
                        <ul className="why-choose-list" style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', textAlign: 'center' }}>
                            {[
                                { icon: "✓", text: "Experienced instructors" },
                                { icon: "✓", text: "Beginner to advanced levels" },
                                { icon: "✓", text: "Separate methods for kids / women / adults" },
                                { icon: "✓", text: "Focus on discipline & anti-bullying confidence" },
                                { icon: "✓", text: "Regular events, demos & competitions" }
                            ].map((item, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{item.icon}</span>
                                    <span style={{ color: '#e5e5e5' }}>{item.text}</span>
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
                        <h2 className="section-title mb-6">Ready to Begin Your Journey?</h2>
                        <p className="about-text mb-8">
                            Join us and become part of a legacy that spans centuries. Experience the power, discipline, and cultural richness of Silambam.
                        </p>
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
