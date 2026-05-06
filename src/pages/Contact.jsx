import React, { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import LocationMap from '../components/LocationMap';

const Contact = () => {
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

                        <div className="contact-social">
                            <a
                                href="https://www.instagram.com/yazh_silambam?igsh=MXcwZWsyMWFleHp6dw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram size={18} />
                                <span>Instagram</span>
                            </a>
                            <a
                                href="https://youtube.com/@yazhsilambam?si=Rnyb8ZEMOC1jhhVL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Visit our YouTube channel"
                            >
                                <Youtube size={18} />
                                <span>YouTube</span>
                            </a>
                        </div>
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
                    
                    <div style={{ marginTop: '3rem', zIndex: 10, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <a href="https://share.google/rWPyEpAGgRpQE2f4O" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                            <LocationMap
                                location="Yazh Silambam Academy"
                                coordinates="Salem, Tamil Nadu"
                            />
                        </a>
                    </div>
                </div>
            </section>


            {/* Background Watermark */}
            <div className="contact-watermark" aria-hidden="true">
                SINCE 2021
            </div>
        </div>
    );
};

export default Contact;
