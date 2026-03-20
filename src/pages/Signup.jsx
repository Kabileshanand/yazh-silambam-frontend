import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';

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
        <div className="page-container container h-screen-nav flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 w-full max-w-lg"
            >
                <h2 className="text-3xl text-center mb-8 font-bold text-gold">Student Registration</h2>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Student Name</label>
                        <input
                            type="text"
                            name="studentName"
                            required
                            className="form-input"
                            placeholder="Enter full name"
                            value={formData.studentName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Father's Name</label>
                        <input
                            type="text"
                            name="fatherName"
                            required
                            className="form-input"
                            placeholder="Enter father's name"
                            value={formData.fatherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            required
                            className="form-input"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Admission Date</label>
                        <input
                            type="date"
                            name="admissionDate"
                            required
                            className="form-input"
                            value={formData.admissionDate}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
                        {loading ? 'Registering...' : 'Register Student'}
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Already have an ID? <Link to="/login" className="text-gold hover:underline">Login here</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;

