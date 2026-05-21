import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import Contact from './Contact';
import { ImagesScrollingAnimation } from '../components/ImagesScrollingAnimation';
import AboutUsSection from '../components/AboutUsSection';
import CoachesSection from '../components/CoachesSection';
import NeuralNoise from '../components/NeuralNoise';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                const el = document.getElementById(location.state.scrollTo);
                if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener('change', update);
        return () => mql.removeEventListener('change', update);
    }, []);

    return (
        <div className="home-page" style={{ position: 'relative', background: 'transparent' }}>
            {/* Background Animation */}
            <NeuralNoise color={[0.9, 0.1, 0.1]} opacity={0.8} speed={0.0005} />

            {/* Cinematic Parallax Hero */}
            <div className="cover-hero-sticky">
                <picture>
                    <source
                        srcSet="/Home%20Page%20Cover%20Image%20Mobile.png"
                        media="(max-width: 767px)"
                    />
                    <img
                        src="/Home%20Page%20Cover%20Image.png"
                        alt="Yazh Silambam Academy"
                        className="cover-hero-img"
                        draggable={false}
                    />
                </picture>
                {/* Central Logo Overlay */}
                <div className=''>
                    <motion.div
                        className="hero-logo-overlay "
                        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-60%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <img src="/Yazhlogo.png" alt="Main Logo" className="hero-logo-main" />
                    </motion.div>
                </div>
                 <img src="/Yazhsilambam.png" alt="Text Logo" className="hero-logo-text" />
            </div>
           

            <AboutUsSection />


            {/* What We Provide */}
            <section className="bg-dark-overlay pt-20" id="what-we-provide">
                <div className="container">
                    <div className="text-center mb-8">
                        <motion.h2
                            className="section-title swing-text-reveal"
                            initial={{ backgroundPosition: "100% 0%" }}
                            whileInView={{ backgroundPosition: "0% 0%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            What We Provide
                        </motion.h2>
                    </div>
                </div>
                <ImagesScrollingAnimation />
            </section>

            <CoachesSection />

            <Contact showHero={false} isShow={false}/>
        </div>
    );
};

export default Home;
