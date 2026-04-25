import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sword, GripVertical, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCanvas from '../components/AnimatedCanvas';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(1);
    
    return (
        <div className="home-page" style={{ position: 'relative' }}>
            <AnimatedCanvas />

            {/* Cover Image Hero */}
            <div className="cover-hero-sticky">
                <img
                    src="/coverimage.png"
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
                        <div className="feature-grid w-full md:pr-12 lg:pr-20">
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
                            const isActive = activeFeature === index;
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActiveFeature(index)}
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
                                            ? '0 0 30px rgba(235, 76, 76, 0.4), 0 0 60px rgba(235, 76, 76, 0.2), inset 0 0 15px rgba(235, 76, 76, 0.15)' 
                                            : '0 0 20px rgba(235, 76, 76, 0.15)',
                                        border: isActive ? '1px solid rgba(235, 76, 76, 0.5)' : '1px solid rgba(235, 76, 76, 0.1)'
                                    }}
                                    className={`glass-card feature-card cursor-pointer overflow-hidden relative`}
                                >
                                    <motion.div layout="position" className="flex flex-col items-center justify-center h-full w-full relative z-10 min-w-[220px]">
                                        <div className={`feature-icon-wrapper transition-all duration-500 ${isActive ? 'scale-110 mb-6' : 'scale-90 mb-2'}`}>
                                            {item.icon}
                                        </div>
                                        <motion.h3 layout="position" className={`font-bold transition-all duration-500 ${isActive ? 'text-2xl mb-4' : 'text-lg mb-2 text-center'}`}>
                                            {item.title}
                                        </motion.h3>
                                        
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex flex-col items-center"
                                                >
                                                    <p className="feature-desc mb-6">{item.desc}</p>
                                                    <Link 
                                                        to={item.link} 
                                                        className="btn-primary text-sm px-6 py-2"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Explore Course
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                        </div>
                        <button 
                            className="absolute right-0 z-20 w-12 h-12 hidden md:flex items-center justify-center bg-gold text-maroon font-bold rounded-full hover:bg-[#ca3b3b] shadow-[0_0_20px_rgba(235,76,76,0.5)] transition-transform hover:scale-110"
                            onClick={() => setActiveFeature((prev) => (prev + 1) % 3)}
                        >
                            <ChevronRight size={28} />
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
                        <motion.h2 
                            className="section-title mb-6 swing-text-reveal"
                            initial={{ backgroundPosition: "100% 0%" }}
                            whileInView={{ backgroundPosition: "0% 0%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            Ready to Begin Your Journey?
                        </motion.h2>
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
