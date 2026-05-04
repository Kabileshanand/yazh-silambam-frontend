import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { User, Calendar, AlertCircle } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentName: '',
        fatherName: '',
        dob: '',
        admissionDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.signup(
                formData.studentName,
                formData.fatherName,
                formData.dob,
                formData.admissionDate
            );

            if (response.data.success) {
                alert(response.data.message);
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-nature-bg"></div>
            <div className="login-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="login-glass-card"
                style={{ maxWidth: '460px' }}
            >
                <div className="login-header">
                    <h1 className="login-title">Student Registration</h1>
                    <p className="login-subtitle">Fill in the details to create a student account</p>
                </div>

                {error && (
                    <div className="login-error-msg flex items-center justify-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-group">
                        <input
                            type="text"
                            name="studentName"
                            placeholder="Student Full Name"
                            className="login-field"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                        />
                        <User className="login-field-icon" size={20} />
                    </div>

                    <div className="login-input-group">
                        <input
                            type="text"
                            name="fatherName"
                            placeholder="Father's Name"
                            className="login-field"
                            value={formData.fatherName}
                            onChange={handleChange}
                            required
                        />
                        <User className="login-field-icon" size={20} />
                    </div>

                    <div className="login-input-group">
                        <input
                            type="date"
                            name="dob"
                            className="login-field"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            style={{ colorScheme: 'dark' }}
                        />
                        <Calendar className="login-field-icon" size={20} />
                    </div>

                    <div className="login-input-group">
                        <input
                            type="date"
                            name="admissionDate"
                            className="login-field"
                            value={formData.admissionDate}
                            onChange={handleChange}
                            required
                            style={{ colorScheme: 'dark' }}
                        />
                        <Calendar className="login-field-icon" size={20} />
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading ? (
                            <span className="inline-loader-wrap">
                                <img src="/Buffering.png" alt="" className="inline-loader-image" aria-hidden="true" />
                                Registering...
                            </span>
                        ) : (
                            'Register Student'
                        )}
                    </button>

                    <p className="login-footer-text">
                        Already have an ID? <Link to="/login">Login here</Link>
                    </p>
                </form>

                <div className="login-attribution">
                    Yazh Silambam Academy · <span className="text-gold">Student Portal</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
