import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [slideDirection, setSlideDirection] = useState(1); // 1 = up, -1 = down
    const [isCoachExpanded, setIsCoachExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener('change', update);
        return () => mql.removeEventListener('change', update);
    }, []);

    const features = useMemo(
        () => [
            {
                title: "Bare Hand Technique",
                link: "/bare-hand-techniques",
                imageSrc: "/Barehand%20Technique.png",
            },
            {
                title: "Stick Fencing",
                link: "/stick-fencing",
                imageSrc: "/Stick%20Fencing.png",
            },
            {
                title: "Weaponry Training",
                link: "/weaponry-training",
                imageSrc: "/Weaponry%20Training.png",
            },
        ],
        []
    );

    const goToFeature = (nextIndex) => {
        setActiveFeature((prev) => {
            const next = ((nextIndex % features.length) + features.length) % features.length;
            const dir = next === prev ? 1 : next > prev ? 1 : -1;
            setSlideDirection(dir);
            return next;
        });
    };
    
    return (
        <div className="home-page" style={{ position: 'relative' }}>
            {/* Cover Image Hero */}
            <div className="cover-hero-sticky">
                <img
                    src="/Home%20Page%20Cover%20Image.png"
                    alt="Yazh Silambam Academy"
                    className="cover-hero-img"
                    draggable={false}
                />
            </div>

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
                        <motion.h2 
                            className="section-title swing-text-reveal"
                            initial={{ backgroundPosition: "100% 0%" }}
                            whileInView={{ backgroundPosition: "0% 0%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            Who We Are
                        </motion.h2>
                        <p className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <span className="text-gold font-bold">Yazh Silambam Academy</span> is dedicated to preserving the ancient Tamil martial art of Silambam while building discipline, fitness, focus, and cultural pride in every student. We train children, youth, women, and adults in a safe, respectful environment, blending tradition with modern teaching methods.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What We Provide */}
            <section className="section-padding bg-dark-overlay">
                <div className="container">
                    <motion.h2 
                        className="section-title swing-text-reveal"
                        initial={{ backgroundPosition: "100% 0%" }}
                        whileInView={{ backgroundPosition: "0% 0%" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        What We Provide
                    </motion.h2>
                    <div className="relative flex items-center justify-center w-full">
                        {isMobile ? (
                            <div className="w-full" style={{ maxWidth: 520, position: 'relative', paddingBottom: 18 }}>
                                {/* subtle stacked previews behind the active card */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {[2, 1].map((depth) => {
                                        const idx = (activeFeature + depth) % features.length;
                                        const scale = depth === 1 ? 0.965 : 0.93;
                                        const y = depth === 1 ? 14 : 26;
                                        const opacity = depth === 1 ? 0.28 : 0.16;
                                        return (
                                            <div
                                                key={`${activeFeature}-${depth}`}
                                                className="glass-card feature-card feature-provide-card overflow-hidden relative"
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    minHeight: 320,
                                                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                                    opacity,
                                                    border: '1px solid rgba(235, 76, 76, 0.25)',
                                                    boxShadow: '0 0 14px rgba(235, 76, 76, 0.10)',
                                                    willChange: 'transform',
                                                }}
                                            >
                                                <img
                                                    src={features[idx].imageSrc}
                                                    alt=""
                                                    className="feature-provide-image feature-provide-image--mobile"
                                                    draggable={false}
                                                    decoding="async"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                                    <motion.div
                                        key={activeFeature}
                                        custom={slideDirection}
                                        initial={(dir) => ({ opacity: 0, y: dir > 0 ? 46 : -46 })}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={(dir) => ({ opacity: 0, y: dir > 0 ? -46 : 46 })}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        drag="y"
                                        dragConstraints={{ top: 0, bottom: 0 }}
                                        dragElastic={0.2}
                                        dragMomentum={false}
                                        onDragEnd={(_, info) => {
                                            const threshold = 60;
                                            if (info.offset.y < -threshold) {
                                                goToFeature(activeFeature + 1);
                                            } else if (info.offset.y > threshold) {
                                                goToFeature(activeFeature - 1);
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(features[activeFeature].link);
                                        }}
                                        className="glass-card feature-card feature-provide-card cursor-pointer overflow-hidden relative"
                                        style={{
                                            minHeight: 320,
                                            border: '1px solid rgba(235, 76, 76, 0.75)',
                                            boxShadow: '0 0 35px rgba(235, 76, 76, 0.35)',
                                            position: 'relative',
                                            willChange: 'transform',
                                            transform: 'translateZ(0)',
                                        }}
                                    >
                                        <img
                                            src={features[activeFeature].imageSrc}
                                            alt={features[activeFeature].title}
                                            className="feature-provide-image feature-provide-image--active feature-provide-image--mobile"
                                            draggable={false}
                                            decoding="async"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="feature-grid w-full md:pr-12 lg:pr-20">
                                {features.map((item, index) => {
                                    const isActive = activeFeature === index;

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveFeature(index);
                                                navigate(item.link);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setActiveFeature(index);
                                                    navigate(item.link);
                                                }
                                            }}
                                            layout
                                            style={{
                                                flex: isActive ? 2 : 0.8,
                                                zIndex: isActive ? 40 : 10,
                                                opacity: isActive ? 1 : 0.6,
                                                transform: isActive
                                                    ? 'perspective(1200px) scale(1) rotateY(0deg) translateZ(50px)'
                                                    : `perspective(1200px) scale(0.85) rotateY(${index < activeFeature ? '35deg' : '-35deg'}) translateZ(-100px)`,
                                                transformOrigin: index < activeFeature ? 'right center' : 'left center',
                                                minHeight: isActive ? '400px' : '300px',
                                                marginLeft: index > activeFeature ? '-4rem' : '0',
                                                marginRight: index < activeFeature ? '-4rem' : '0',
                                                boxShadow: isActive
                                                    ? '0 0 45px rgba(235, 76, 76, 0.55), 0 0 85px rgba(235, 76, 76, 0.25), inset 0 0 18px rgba(235, 76, 76, 0.22)'
                                                    : '0 0 20px rgba(235, 76, 76, 0.15)',
                                                border: isActive ? '1px solid rgba(235, 76, 76, 0.75)' : '1px solid rgba(235, 76, 76, 0.1)',
                                            }}
                                            className="glass-card feature-card feature-provide-card cursor-pointer overflow-hidden relative"
                                        >
                                            <img
                                                src={item.imageSrc}
                                                alt={item.title}
                                                className={`feature-provide-image ${isActive ? 'feature-provide-image--active' : ''}`}
                                                draggable={false}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                        <button
                            type="button"
                            className="feature-provide-arrow"
                            onClick={() => goToFeature(activeFeature + 1)}
                            aria-label="Next feature"
                        >
                            <ChevronRight size={30} strokeWidth={3} />
                        </button>
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
                        <motion.h2 
                            className="section-title swing-text-reveal"
                            initial={{ backgroundPosition: "100% 0%" }}
                            whileInView={{ backgroundPosition: "0% 0%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            Why Choose Yazh Silambam?
                        </motion.h2>
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

            {/* Coach */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass-panel coach-column"
                    >
                        <h2 className="coach-title">Coach</h2>
                        <div className="coach-layout">
                            <div className="coach-image-placeholder" aria-label="Coach image placeholder">
                                <span>Coach image coming soon</span>
                            </div>
                            <div className="coach-side-card">
                                <p className="coach-subtitle">Meet Our Coach</p>
                                <h3 className="coach-name">Karthikeyan Kannan</h3>
                                <p className="coach-role">Founder &amp; Head Coach</p>
                                <button
                                    type="button"
                                    className="coach-read-more"
                                    onClick={() => setIsCoachExpanded((prev) => !prev)}
                                >
                                    {isCoachExpanded ? 'Read less' : 'Read more'}
                                </button>
                            </div>
                        </div>

                        {isCoachExpanded && (
                            <div className="coach-read-content">
                                <p className="coach-description">
                                    With over 20 years of dedicated practice in the ancient Tamil martial art of Silambam,
                                    Karthikeyan Kannan brings unmatched passion, depth, and authenticity to Yazh Silambam Academy.
                                </p>
                                <p className="coach-description">
                                    He began his journey at the tender age of 5, growing up under the traditional training system.
                                    Today, with more than 8 years of teaching experience, he has trained hundreds of students from
                                    young children to adults helping them build discipline, fitness, self-defense skills, and a deep
                                    connection to Tamil cultural heritage.
                                </p>
                                <p className="coach-description">
                                    As a competitive athlete, Karthikeyan has proudly represented Tamil Nadu at the National Level
                                    Silambam Championship, winning two National Medals in 2018 and 2019. His personal achievements,
                                    combined with his patient and structured teaching style, make him a highly respected coach in the
                                    Silambam community.
                                </p>
                                <p className="coach-description">
                                    Under his guidance, students not only learn powerful Silambam techniques but also develop strong
                                    character, focus, and respect for tradition.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Contact />
        </div>
    );
};

export default Home;
