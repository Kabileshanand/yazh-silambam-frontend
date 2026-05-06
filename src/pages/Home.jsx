import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import CircularFeatures from '../components/CircularFeatures';
import AboutUsSection from '../components/AboutUsSection';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
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
                imageSrc: "/Barehand Techniques.jpeg",
                description: "Master the fundamental bare hand techniques of Silambam. Build agility, speed, and focus without weapons.",
            },
            {
                title: "Stick Fencing",
                link: "/stick-fencing",
                imageSrc: "/Stick Fencing.jpeg",
                description: "Learn the core art of Tamil stick fencing. Discover dynamic strikes, blocks, and footwork essential to Silambam.",
            },
            {
                title: "Weaponry Training",
                link: "/weaponry-training",
                imageSrc: "/Weaponry Training.jpeg",
                description: "Train with traditional Tamil weapons. Master advanced techniques and deepen your cultural martial arts practice.",
            },
        ],
        []
    );


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
                    <CircularFeatures features={features} />
                </div>
            </section>

            <AboutUsSection />

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
