import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { User, EyeOff, Eye, AlertCircle } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('student'); // 'student' or 'admin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (role === 'admin') {
            try {
                const response = await authAPI.login(email, password, role);
                if (response.data.success) {
                    localStorage.setItem('userRole', 'admin');
                    localStorage.setItem('userUid', response.data.user.uid);
                    navigate('/dashboard', { state: { role: 'admin', uid: response.data.user.uid } });
                } else {
                    setError(response.data.message || 'Invalid Admin Access Key or Password.');
                }
            } catch (err) {
                console.error('Admin Login Error:', err);
                if (!err.response) {
                    setError('Server is offline. Please start the backend.');
                } else {
                    setError(err.response.data?.message || 'Invalid Admin Access Key or Password.');
                }
            }
            setLoading(false);
            return;
        }

        try {
            const loginEmail = !email.includes('@') ? `${email}@yazhsilamba.com` : email;
            const response = await authAPI.login(loginEmail, password, role);

            if (response.data.success) {
                const userData = response.data.user;
                localStorage.setItem('userRole', userData.role || 'student');
                localStorage.setItem('userUid', userData.uid);
                navigate('/dashboard', {
                    state: {
                        role: userData.role || 'student',
                        uid: userData.uid,
                        user: userData
                    }
                });
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Student Login Error:', err);
            if (!err.response) {
                setError('Server is offline. Please contact administrator.');
            } else {
                setError(err.response.data?.message || "Invalid credentials. Please check your ID and Password.");
            }
        }
        setLoading(false);
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
            >
                <div className="login-role-tabs">
                    <button
                        className={`role-tab ${role === 'student' ? 'active' : ''}`}
                        onClick={() => { setRole('student'); setError(''); }}
                    >
                        Student / Parent
                    </button>
                    <button
                        className={`role-tab ${role === 'admin' ? 'active' : ''}`}
                        onClick={() => { setRole('admin'); setError(''); }}
                    >
                        Admin
                    </button>
                </div>

                <div className="login-header">
                    <h1 className="login-title">Login</h1>
                    <p className="login-subtitle">
                        {role === 'student'
                            ? 'Welcome back! Please login to your account.'
                            : 'Administrator Access System'}
                    </p>
                </div>

                {error && (
                    <div className="login-error-msg flex items-center justify-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleEmailLogin}>
                    <div className="login-input-group">
                        <input
                            type="text"
                            placeholder={role === 'student' ? "Student ID (e.g., Yazhstudent001)" : "Admin Access Key"}
                            className="login-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <User className="login-field-icon" size={20} />
                    </div>

                    <div className="login-input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="login-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="login-field-icon clickable"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </div>
                    </div>

                    <div className="login-extras">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="checkbox-custom"></span>
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading ? (
                            <span className="inline-loader-wrap">
                                <img src="/Buffering.png" alt="" className="inline-loader-image" aria-hidden="true" />
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>


                </form>

                <div className="login-attribution">
                    Yazh Silambam Academy · <span className="text-gold">Admin Portal</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;


