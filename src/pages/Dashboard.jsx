import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, User, Edit, Save, Plus, Search, Trash2, LogOut, CalendarDays, X, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { usersAPI, authAPI } from '../api';
import NetworkLoader from '../components/NetworkLoader';


const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const storedRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
    const storedUid = typeof window !== 'undefined' ? localStorage.getItem('userUid') : null;
    const [role, setRole] = useState(location.state?.role || storedRole || 'student');
    const [currentUserUid, setCurrentUserUid] = useState(location.state?.uid || storedUid || null);
    const [studentProfile, setStudentProfile] = useState(location.state?.user || null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Admin State
    const [activeTab, setActiveTab] = useState('attendance');
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '',
        father: '',
        dob: '',
        admission: ''
    });
    const [addLoading, setAddLoading] = useState(false);
    const [addSuccess, setAddSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (role === 'student' && currentUserUid) {
                    const response = await usersAPI.getById(currentUserUid);
                    if (response.data.success) {
                        setStudentProfile(response.data.user);
                    }
                } else if (role === 'admin') {
                    const response = await usersAPI.getAll();
                    if (response.data.success) {
                        const usersList = response.data.users.map(user => ({
                            id: user._id,
                            uid: user._id,
                            ...user
                        }));
                        setStudents(usersList);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [role, currentUserUid]);

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleDelete = async (uid) => {
        if (confirm('Are you sure you want to remove this student?')) {
            try {
                await usersAPI.delete(uid);
                setStudents(students.filter(s => s.uid !== uid));
            } catch (e) {
                console.error("Error deleting student:", e);
            }
        }
    };

    const handleSaveStudent = async () => {
        if (!editingStudent) return;
        try {
            const response = await usersAPI.update(editingStudent.uid, {
                name: editingStudent.name,
                father: editingStudent.father,
                dob: editingStudent.dob,
                admission: editingStudent.admission,
                status: editingStudent.status,
                studentReport: editingStudent.studentReport || '',
                instructorNote: editingStudent.instructorNote || ''
            });

            if (response.data.success) {
                setStudents(students.map(s => s.uid === editingStudent.uid ? { ...editingStudent, ...response.data.user } : s));
                setEditingStudent(null);
                setIsEditing(false);
            }
        } catch (e) {
            console.error("Error updating student:", e);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setAddLoading(true);
        try {
            const response = await authAPI.signup(
                newStudent.name,
                newStudent.father,
                newStudent.dob,
                newStudent.admission
            );

            if (response.data.success) {
                setAddSuccess(response.data.message);
                // Refresh student list
                const usersRes = await usersAPI.getAll();
                if (usersRes.data.success) {
                    setStudents(usersRes.data.users.map(user => ({
                        id: user._id,
                        uid: user._id,
                        ...user
                    })));
                }
                setTimeout(() => {
                    setShowAddModal(false);
                    setAddSuccess(null);
                    setNewStudent({ name: '', father: '', dob: '', admission: '' });
                }, 3000);
            }
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Error adding student. Please try again.");
        } finally {
            setAddLoading(false);
        }
    };

    if (loading) return <NetworkLoader label="Loading Dashboard..." />;

    const tabs = [
        { id: 'attendance', label: 'Attendance', icon: <Calendar /> },
        { id: 'progress', label: 'Progress Report', icon: <TrendingUp /> },
    ];

    if (role === 'admin') {
        return (
            <div className="anywhere-dashboard">
                {/* background video replaces hero image */}
                <video autoPlay muted loop playsInline className="dashboard-bg-video">
                    <source src="/videos/dashboard-hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="anywhere-content px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
                    >

                        <div>
                            <p className="text-anywhere-accent font-bold tracking-widest text-xs uppercase mb-2">Administration Control</p>
                            <h1 className="anywhere-title mb-0">Portal Dashboard</h1>
                        </div>

                        <div className="flex gap-4 items-center">
                            <Link
                                to="/events"
                                state={{ role: 'admin' }}
                                className="anywhere-btn-secondary flex items-center gap-2"
                            >
                                <CalendarDays size={18} /> Manage Events
                            </Link>
                            <button onClick={() => setShowAddModal(true)} className="anywhere-btn-primary">
                                <Plus size={18} /> Add Student
                            </button>
                            <button onClick={handleLogout} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-all">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </motion.div>

                    <div className="anywhere-card overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-anywhere-accent rounded-full"></span>
                                Student Management
                            </h2>
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search student records..."
                                    className="anywhere-input-pill pl-10 w-full md:w-80"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-anywhere-text-dim" size={16} />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="anywhere-table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Full Name</th>
                                        <th>Parent / Father</th>
                                        <th>Date of Birth</th>
                                        <th>Status</th>
                                        <th className="text-right">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.uid || student.id}>
                                            <td><span className="anywhere-id-tag">{student.id}</span></td>
                                            <td><span className="font-bold">{student.name}</span></td>
                                            <td className="text-anywhere-text-dim">{student.father}</td>
                                            <td className="text-anywhere-text-dim font-mono text-sm">{student.dob}</td>
                                            <td>
                                                <span className={`anywhere-status-pill ${student.status === 'Active' ? 'anywhere-status-active' : 'bg-red-500/10 text-red-500'}`}>
                                                    {student.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => setEditingStudent({ ...student, uid: student.uid || student.id })}
                                                        className="p-2 hover:bg-anywhere-accent/10 rounded-lg text-anywhere-accent transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student.uid || student.id)}
                                                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Edit Student Modal */}
                {editingStudent && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="anywhere-card w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setEditingStudent(null)}
                                className="sticky right-6 top-6 text-anywhere-text-dim hover:text-white float-right"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-bold mb-6">Edit Student Details</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Student ID</label>
                                        <input disabled className="anywhere-input-pill bg-white/5 py-2 w-full" value={editingStudent.id} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Status</label>
                                        <select className="anywhere-input-pill py-2 w-full text-sm" value={editingStudent.status} onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Student Name</label>
                                        <input className="anywhere-input-pill py-2 w-full" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Father's Name</label>
                                        <input className="anywhere-input-pill py-2 w-full" value={editingStudent.father} onChange={(e) => setEditingStudent({ ...editingStudent, father: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Date of Birth</label>
                                        <input type="date" className="anywhere-input-pill py-2 w-full" value={editingStudent.dob} onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Admission Date</label>
                                        <input type="date" className="anywhere-input-pill py-2 w-full" value={editingStudent.admission} onChange={(e) => setEditingStudent({ ...editingStudent, admission: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Student Report</label>
                                    <textarea className="anywhere-input-pill py-2 w-full h-28 resize-none" placeholder="Enter student report..." value={editingStudent.studentReport || ''} onChange={(e) => setEditingStudent({ ...editingStudent, studentReport: e.target.value })} />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Instructor Note</label>
                                    <textarea className="anywhere-input-pill py-2 w-full h-28 resize-none" placeholder="Enter instructor note..." value={editingStudent.instructorNote || ''} onChange={(e) => setEditingStudent({ ...editingStudent, instructorNote: e.target.value })} />
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-white/10">
                                    <button onClick={handleSaveStudent} className="anywhere-btn-primary flex-1 flex items-center justify-center gap-2">
                                        <Save size={18} /> Save Changes
                                    </button>
                                    <button onClick={() => setEditingStudent(null)} className="anywhere-btn-secondary flex-1">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Add Student Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="anywhere-card w-full max-w-md relative"
                        >
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="absolute right-6 top-6 text-anywhere-text-dim hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            {addSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Registration Success!</h3>
                                    <p className="text-anywhere-text-dim leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                        {addSuccess}
                                    </p>
                                    <button
                                        onClick={() => { setShowAddModal(false); setAddSuccess(null); }}
                                        className="anywhere-btn-primary w-full mt-8"
                                    >
                                        Back to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8">Add New Student</h3>
                                    <form onSubmit={handleAddStudent} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Student Full Name</label>
                                            <input
                                                required
                                                className="anywhere-input-pill"
                                                placeholder="Enter full name"
                                                value={newStudent.name}
                                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Father's / Guardian Name</label>
                                            <input
                                                required
                                                className="anywhere-input-pill"
                                                placeholder="Enter father's name"
                                                value={newStudent.father}
                                                onChange={(e) => setNewStudent({ ...newStudent, father: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    required
                                                    className="anywhere-input-pill"
                                                    value={newStudent.dob}
                                                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-anywhere-text-dim mb-2">Admission Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    className="anywhere-input-pill"
                                                    value={newStudent.admission}
                                                    onChange={(e) => setNewStudent({ ...newStudent, admission: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={addLoading}
                                            className="anywhere-btn-primary w-full py-4 mt-4"
                                        >
                                            {addLoading ? 'Processing...' : 'Register Student'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        );
    }

    if (!studentProfile) return <div className="text-white text-center mt-20">Student Data Not Found. Please contact Admin.</div>;

    return (
        <div className="page-container container">
            <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="text-xl font-bold text-gold">Dashboard</h2>
                <button onClick={handleLogout} className="bg-red-500/20 text-red-500 px-3 py-1 rounded-lg text-sm">Logout</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / Tabs */}
                <div className="md:w-1/4">
                    <div className="glass-panel p-6">
                        <div className="flex justify-end mb-2">
                            <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><LogOut size={12} /> Logout</button>
                        </div>
                        <div className="flex flex-col items-center gap-3 mb-6 border-b border-gray-700 pb-6">
                            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-2">
                                <User size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-center text-gold">{studentProfile.name}</h3>
                            <div className="w-full space-y-3 text-sm mt-2">
                                <div className="flex justify-between border-b border-gray-700/50 pb-2">
                                    <span className="text-gray-400">Student ID</span>
                                    <span className="text-white font-mono">{studentProfile.id}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700/50 pb-2">
                                    <span className="text-gray-400">Father's Name</span>
                                    <span className="text-white">{studentProfile.father}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700/50 pb-2">
                                    <span className="text-gray-400">Date of Birth</span>
                                    <span className="text-white">{studentProfile.dob}</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-400">Admission Date</span>
                                    <span className="text-white">{studentProfile.admission}</span>
                                </div>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gold text-maroon font-bold' : 'hover:bg-white/5 text-gray-300'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:w-3/4">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel p-8"
                    >
                        {activeTab === 'attendance' && (
                            <div>
                                <h2 className="text-2xl mb-6">Attendance Tracker</h2>
                                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-gray-400 text-sm">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 30 }, (_, i) => {
                                        const status = Math.random() > 0.8 ? 'absent' : 'present';
                                        return (
                                            <div
                                                key={i}
                                                className={`aspect-square rounded-md flex items-center justify-center text-sm ${status === 'present' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                                            >
                                                {i + 1}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-6 flex gap-4 text-sm">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Present (26)</div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Absent (4)</div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'progress' && (
                            <div>
                                <h2 className="text-2xl mb-6">Progress Report</h2>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Silambam Basic Rotation</span>
                                            <span className="text-gold">85%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Footwork</span>
                                            <span className="text-gold">70%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Sparring (Intro)</span>
                                            <span className="text-gold">45%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="font-bold mb-2 text-gold">Instructor's Note</h4>
                                    <p className="text-sm text-gray-300">Kavya shows excellent discipline. Focus more on the left-hand coordination during the fast spins. Keep it up!</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;

