import React from 'react';
import { motion } from 'framer-motion';
import FluidExpandingGrid from '../components/FluidExpandingGrid';

const majorEvents = [
    "Salem Hastampatty Muniyappan Temple",
    "Salem Chinna Pudur Mariyamman Kovil",
    "Sri Saradha Matric Higher Secondary School, Salem",
    "Sri Sarada Balamandir Boys Matric Higher Secondary School, Salem",
    "Sri Vidya Mandir Senior Secondary School, Meyyanur, Salem",
    "Senthil Public School, Salem"
];

const Events = () => {
    return (
        <div className="events-page-v2">
            <div className="events-noise-overlay"></div>
            <div className="events-mag-container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="events-mag-header"
                >
                    <div className="events-mag-title">
                        <span className="events-mag-title-top">MAJOR</span>
                        <span className="events-mag-title-bottom">EVENTS</span>
                    </div>
                    <p className="about-text events-intro-text events-header-copy" style={{ lineHeight: 1.8 }}>
                        At Yazh Silambam Academy, we don't just train students. We bring the ancient Tamil martial art of
                        Silambam alive on stage, in temples, and within school campuses. Over the years, our students have
                        proudly represented our academy at prestigious venues across Salem, mesmerizing audiences with powerful
                        performances that blend tradition, discipline, and excellence.
                        <span className="events-intro-nextline">Here are some of our most cherished performances and venues:</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginTop: '6rem', padding: '0 clamp(1rem, 4vw, 3rem)' }}
                >
                    <div className="events-mag-title" style={{ marginBottom: '1.5rem' }}>
                        <span className="events-mag-title-top" style={{ color: '#111', fontSize: 'clamp(36px, 4vw, 54px)' }}>
                            INTERACTIVE
                        </span>
                        <span className="events-mag-title-bottom" style={{ fontSize: 'clamp(32px, 3.5vw, 46px)' }}>
                            SHOWCASE
                        </span>
                    </div>
                    <p className="about-text" style={{ color: '#333', maxWidth: '750px', marginBottom: '2rem', lineHeight: 1.6 }}>
                        Click on the cards below to explore key event categories and highlights from our training sessions and tournament showcases.
                    </p>
                    <FluidExpandingGrid />
                </motion.div>
            </div>
        </div>
    );
};

export default Events;
