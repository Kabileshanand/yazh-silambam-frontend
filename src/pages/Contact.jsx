import React, { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [submitState, setSubmitState] = useState({ type: '', message: '' });

    const handleInquirySubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const phone = formData.get('phone')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setSubmitState({
                type: 'error',
                message: 'Email service is not configured. Please add EmailJS keys in environment variables.'
            });
            return;
        }

        setSubmitState({ type: 'loading', message: 'Sending enquiry...' });

        emailjs
            .send(
                serviceId,
                templateId,
                {
                    to_email: 'yazhsilambam2022@gmail.com',
                    from_name: name,
                    from_email: email,
                    phone,
                    message,
                },
                { publicKey }
            )
            .then(() => {
                setSubmitState({ type: 'success', message: 'Enquiry sent successfully.' });
                event.currentTarget.reset();
            })
            .catch(() => {
                setSubmitState({
                    type: 'error',
                    message: 'Failed to send enquiry. Please try again.'
                });
            });
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
                            <input type="email" name="email" placeholder="Email" required />
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
                </div>
            </section>
        </div>
    );
};

export default Contact;
