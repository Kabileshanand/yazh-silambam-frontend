import React, { useEffect, useState } from 'react';
import { Instagram, Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationMap from '../components/LocationMap';

const Contact = ({ showHero = true, isShow = true }) => {
    const [submitState, setSubmitState] = useState({ type: '', message: '' });

    const handleInquirySubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const phone = formData.get('phone')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        const whatsappNumber = '919360282959'; // Academy WhatsApp number

        let whatsappMessage = `*New Enquiry from Website*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        whatsappMessage += `*Phone:* ${phone}\n`;
        if (email) {
            whatsappMessage += `*Email:* ${email}\n`;
        }
        whatsappMessage += `\n*Message:*\n${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        event.currentTarget.reset();
        setSubmitState({ type: 'success', message: 'Opening WhatsApp...' });

        // Clear success message after 3 seconds
        setTimeout(() => setSubmitState({ type: '', message: '' }), 3000);
    };


    return (
        <div className="contact-page">
            {/* First Page: Hero Image Section */}
            {showHero && (
                <section className="contact-hero-section">
                    <img src="/contact-bg.jpg" alt="Contact Us" className="contact-hero-img" />
                    <div className="contact-hero-overlay">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Contact Us
                        </motion.h1>
                    </div>
                </section>
            )}

            {/* Second Page: Existing Contact Content */}
            <section className="contact-panel">
                <div className="contact-left">
                    <h1 className="contact-title">
                        Let&apos;s build a <span>greatest</span> team together!
                    </h1>
                    <p className="contact-subtitle">
                        Whether you&apos;re a beginner or advancing your skills, our classes are designed
                        to help you grow stronger and more confident with every session.
                    </p>

                    <div className="contact-info-block">
                        <p className="contact-info-label">Email</p>
                        <a className="contact-info-value" href="mailto:yazhsilambam2022@gmail.com">
                            yazhsilambam2022@gmail.com
                        </a>

                        <p className="contact-info-label">Phone</p>
                        <a className="contact-info-value" href="tel:+919360282959">
                            +91 93602 82959
                        </a>


                    </div>
                </div>

                <div className="contact-right">
                    <form className="contact-form" onSubmit={handleInquirySubmit}>
                        <div className="contact-form-row">
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email (Optional)" />
                        </div>
                        <div className="contact-form-row">
                            <input type="tel" name="phone" placeholder="Phone" required />
                        </div>
                        <div className="contact-form-row">
                            <textarea name="message" placeholder="Message" rows="5" required />
                        </div>
                        <button
                            type="submit"
                            className="contact-submit-btn"
                            disabled={submitState.type === 'loading'}
                        >
                            {submitState.type === 'loading' ? (
                                <span className="inline-loader-wrap">
                                    <img src="/Buffering.png" alt="" className="inline-loader-image" aria-hidden="true" />
                                    Sending...
                                </span>
                            ) : (
                                'Send Inquiry'
                            )}
                        </button>
                        {submitState.message && (
                            <p className={`contact-submit-status ${submitState.type}`}>
                                {submitState.message}
                            </p>
                        )}
                    </form>

                    {/* Social Glass Box */}
                    <div className="social-glass-box">
                        <div className="social-box-column">
                            <div className="social-icon-circle">
                                <Instagram size={20} />
                            </div>
                            <h3 className="social-box-title">Follow on Instagram</h3>
                            <p className="social-box-desc">
                                Join our vibrant community and stay updated with our latest events and classes.
                            </p>
                            <a
                                href="https://www.instagram.com/yazh_silambam?igsh=MXcwZWsyMWFleHp6dw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-box-link"
                            >
                                Join our Instagram <ArrowRight size={16} />
                            </a>
                        </div>
                        <div className="social-divider"></div>
                        <div className="social-box-column">
                            <div className="social-icon-circle">
                                <Youtube size={20} />
                            </div>
                            <h3 className="social-box-title">Subscribe on YouTube</h3>
                            <p className="social-box-desc">
                                Watch our latest tutorials, performances, and martial arts training.
                            </p>
                            <a
                                href="https://youtube.com/@yazhsilambam?si=Rnyb8ZEMOC1jhhVL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-box-link"
                            >
                                Visit our YouTube <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>


                </div>
            </section>

            {/* Third Section: Map + Since 2021 */}
            {isShow && (
            <section className="contact-map-section">
                {/* Background Watermark at top */}
                <div className="contact-watermark contact-watermark--top" aria-hidden="true">SINCE 2021</div>
                <motion.h2
                    className="contact-map-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    Find Us Here
                </motion.h2>
                <motion.p
                    className="contact-map-subtext"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Yazh Silambam Academy — Salem, Tamil Nadu
                </motion.p>
                <motion.div
                    className="contact-map-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                   

                >
                    <a href="https://share.google/rWPyEpAGgRpQE2f4O" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%', display: 'block',  }}>
                        <LocationMap
                            location="Yazh Silambam Academy"
                            coordinates="Salem, Tamil Nadu"
                        />
                    </a>
                </motion.div>
            </section>
        )}
        </div>
    );
};

export default Contact;
