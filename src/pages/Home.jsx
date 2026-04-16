import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCanvas from '../components/AnimatedCanvas';

const Home = () => {
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
