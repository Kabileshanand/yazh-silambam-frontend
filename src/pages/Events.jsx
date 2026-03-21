import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MapPin, Calendar, Plus, Trash2, X, Edit } from 'lucide-react';
import { eventsAPI } from '../api';

const Events = () => {
    const location = useLocation();
    const [role, setRole] = useState(null);
    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        description: '',
        type: 'upcoming',
        location: ''
    });

    const defaultLocations = [
        "Salem Hastampatty Muniyappan Temple",
        "Salem Chinna Pudur Mariyamman Kovil",
        "Sri Saradha Matric Higher Secondary School, Salem",
        "Sri Sarada Balamandir Boys Matric Higher Secondary School, Salem",
        "Sri Vidya Mandir Senior Secondary School, Meyyanur, Salem",
        "Senthil Public School, Salem"
    ];

    useEffect(() => {
        const currentRole = location.state?.role;
        if (currentRole === 'admin') {
            setRole('admin');
        } else {
            setRole('student');
        }
        fetchEvents();
    }, [location.state]);

    const fetchEvents = async () => {
        try {
            const response = await eventsAPI.getAll();
            if (response.data.success) {
                const allEvents = response.data.events;
                const upcoming = allEvents.filter(e => e.type === 'upcoming');
                const past = allEvents.filter(e => e.type === 'past');
                setEvents(upcoming);
                setPastEvents(past);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (role !== 'admin') return;
        try {
            const response = await eventsAPI.create(newEvent);
            if (response.data.success) {
                fetchEvents();
                setShowAddModal(false);
                setNewEvent({ title: '', date: '', time: '', description: '', type: 'upcoming', location: '' });
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (role !== 'admin') return;
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                await eventsAPI.delete(eventId);
                fetchEvents();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const handleMoveToPast = async (event) => {
        if (role !== 'admin') return;
        try {
            await eventsAPI.update(event._id, { ...event, type: 'past' });
            fetchEvents();
        } catch (error) {
            console.error("Error moving event to past:", error);
        }
    };

    const handleMoveToUpcoming = async (event) => {
        try {
            await eventsAPI.update(event._id, { ...event, type: 'upcoming' });
            fetchEvents();
        } catch (error) {
            console.error("Error moving event to upcoming:", error);
        }
    };

    const openEditModal = (event) => {
        if (role !== 'admin') return;
        setEditingEvent({ ...event });
        setShowEditModal(true);
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        if (!editingEvent) return;
        try {
            const response = await eventsAPI.update(editingEvent._id, {
                title: editingEvent.title,
                date: editingEvent.date,
                time: editingEvent.time,
                description: editingEvent.description,
                type: editingEvent.type,
                location: editingEvent.location || ''
            });
            if (response.data.success) {
                fetchEvents();
                setShowEditModal(false);
                setEditingEvent(null);
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const formatEventDate = (dateStr) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                const dayMatch = dateStr.match(/\d+/);
                const monthMatch = dateStr.match(/[a-zA-Z]+/);
                return {
                    day: dayMatch ? dayMatch[0] : '??',
                    month: monthMatch ? monthMatch[0].toUpperCase() : '???'
                };
            }
            return {
                day: date.getDate(),
                month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
            };
        } catch (e) {
            return { day: '??', month: '???' };
        }
    };

    if (loading) return <div className="text-white text-center mt-20 pt-32">Loading Events...</div>;

    const featuredEvent = events[0] || null;

    return (
        <div className="events-page-v2">
            <div className="events-noise-overlay"></div>

            <div className="events-mag-container">

                {/* ── Page Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="events-mag-header"
                >
                    <div className="events-mag-eyebrow">
                        <span className="events-mag-eyebrow-line"></span>
                        Competition Schedule
                    </div>
                    <div className="events-mag-title">
                        <span className="events-mag-title-top">UPCOMING</span>
                        <span className="events-mag-title-bottom">EVENTS</span>
                    </div>
                </motion.div>

                {/* ── Admin Controls ── */}
                {role === 'admin' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-between items-center mb-8 glass-panel p-4"
                    >
                        <h2 className="text-lg font-bold text-gold">Admin Controls</h2>
                        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
                            <Plus size={18} /> Add Event
                        </button>
                    </motion.div>
                )}

                {/* ── Magazine Grid ── */}
                {events.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-white/60 text-lg">No upcoming events scheduled at the moment.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="events-mag-grid"
                    >
                        {/* Left: Featured event */}
                        {featuredEvent && (() => {
                            const { day, month } = formatEventDate(featuredEvent.date);
                            return (
                                <div className="events-mag-featured relative group">
                                    <div className="events-mag-wm">{month}</div>
                                    <div className="events-mag-badge">
                                        <span className="events-mag-badge-dot"></span>
                                        Next Event
                                    </div>
                                    <h2 className="events-mag-feat-title">{featuredEvent.title}</h2>
                                    <div className="events-mag-feat-meta">
                                        {featuredEvent.location && (
                                            <div className="events-mag-feat-row">
                                                <MapPin size={13} className="events-mag-feat-icon" />
                                                {featuredEvent.location}
                                            </div>
                                        )}
                                        <div className="events-mag-feat-row">
                                            <Calendar size={13} className="events-mag-feat-icon" />
                                            {featuredEvent.date}{featuredEvent.time ? ` · ${featuredEvent.time}` : ''}
                                        </div>
                                    </div>
                                    <div className="events-mag-feat-btns">
                                        <button className="events-mag-btn-primary">Register Now</button>
                                        <button className="events-mag-btn-ghost">View Details</button>
                                    </div>
                                    {role === 'admin' && (
                                        <div className="events-mag-admin-actions">
                                            <button onClick={() => openEditModal(featuredEvent)} className="bg-gold text-white p-2 rounded-full shadow-lg" title="Edit"><Edit size={14} /></button>
                                            <button onClick={() => handleMoveToPast(featuredEvent)} className="bg-blue-500 text-white p-2 rounded-full shadow-lg" title="Mark Past"><Calendar size={14} /></button>
                                            <button onClick={() => handleDeleteEvent(featuredEvent._id)} className="bg-red-500 text-white p-2 rounded-full shadow-lg" title="Delete"><Trash2 size={14} /></button>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {/* Right: Event list */}
                        <div className="events-mag-list">
                            <div className="events-mag-list-header">
                                <span className="events-mag-list-label">All Events</span>
                                <span className="events-mag-list-count">{events.length} Events</span>
                            </div>

                            {events.map((event, index) => {
                                const { day, month } = formatEventDate(event.date);
                                const isFirst = index === 0;
                                return (
                                    <div key={event._id} className={`events-mag-item relative group ${isFirst ? 'events-mag-item--active' : ''}`}>
                                        <div className="events-mag-item-date">
                                            <span className="events-mag-item-day">{day}</span>
                                            <span className="events-mag-item-mon">{month}</span>
                                        </div>
                                        <div className="events-mag-item-divider"></div>
                                        <div className="events-mag-item-info">
                                            <div className="events-mag-item-title">{event.title}</div>
                                            <div className="events-mag-item-sub">{event.location || 'Virtual'}</div>
                                        </div>
                                        <span className={`events-mag-item-badge ${isFirst ? 'events-mag-item-badge--next' : 'events-mag-item-badge--soon'}`}>
                                            {isFirst ? 'Next' : 'Upcoming'}
                                        </span>
                                        {role === 'admin' && (
                                            <div className="events-mag-item-admin">
                                                <button onClick={() => openEditModal(event)} className="bg-gold text-white p-1 rounded-full" title="Edit"><Edit size={12} /></button>
                                                <button onClick={() => handleMoveToPast(event)} className="bg-blue-500 text-white p-1 rounded-full" title="Mark Past"><Calendar size={12} /></button>
                                                <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white p-1 rounded-full" title="Delete"><Trash2 size={12} /></button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ── Past Events ── */}
                {pastEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 pt-10"
                    >
                        <div className="events-mag-header" style={{ marginBottom: '2rem' }}>
                            <div className="events-mag-title">
                                <span className="events-mag-title-top">PAST</span>
                                <span className="events-mag-title-bottom">RECORDS</span>
                            </div>
                        </div>
                        <div className="events-mag-past-list">
                            {pastEvents.map((event) => {
                                const { day, month } = formatEventDate(event.date);
                                return (
                                    <div key={event._id} className="events-mag-past-item relative group">
                                        <div className="events-mag-past-date">
                                            <span className="events-mag-past-day">{day}</span>
                                            <span className="events-mag-past-mon">{month}</span>
                                        </div>
                                        <div className="events-mag-past-info">
                                            <div className="events-mag-past-title">{event.title}</div>
                                            <div className="events-mag-past-loc">{event.location || 'Virtual'}</div>
                                        </div>
                                        <span className="events-mag-past-badge">Past</span>
                                        {role === 'admin' && (
                                            <div className="events-mag-item-admin">
                                                <button onClick={() => openEditModal(event)} className="bg-gold text-white p-1 rounded-full" title="Edit"><Edit size={12} /></button>
                                                <button onClick={() => handleMoveToUpcoming(event)} className="bg-blue-500 text-white p-1 rounded-full" title="Move to Upcoming"><Calendar size={12} /></button>
                                                <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white p-1 rounded-full" title="Delete"><Trash2 size={12} /></button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ── Venues ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="events-mag-venues"
                >
                    <div className="events-mag-header" style={{ marginBottom: '2rem' }}>
                        <div className="events-mag-title">
                            <span className="events-mag-title-top">MAJOR</span>
                            <span className="events-mag-title-bottom">VENUES</span>
                        </div>
                    </div>
                    <div className="venue-grid">
                        {defaultLocations.map((loc, idx) => (
                            <div key={idx} className="venue-card">
                                <p className="venue-name">{loc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* ── Add Event Modal ── */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gold">Add New Event</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Title</label>
                                <input type="text" className="form-input" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Date</label>
                                    <input type="date" className="form-input" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Time</label>
                                    <input type="time" className="form-input" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Type</label>
                                <select className="form-input" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Location (optional)</label>
                                <select className="form-input" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}>
                                    <option value="">Select a venue</option>
                                    {defaultLocations.map((loc, index) => (<option key={index} value={loc}>{loc}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Description</label>
                                <textarea className="form-input min-h-[100px]" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn-primary w-full mt-2">Add Event</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* ── Edit Event Modal ── */}
            {showEditModal && editingEvent && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gold">Edit Event</h3>
                            <button onClick={() => { setShowEditModal(false); setEditingEvent(null); }} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdateEvent} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Title</label>
                                <input type="text" className="form-input" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Date</label>
                                    <input type="date" className="form-input" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Time</label>
                                    <input type="time" className="form-input" value={editingEvent.time} onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Type</label>
                                <select className="form-input" value={editingEvent.type} onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value })}>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Location (optional)</label>
                                <select className="form-input" value={editingEvent.location || ''} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}>
                                    <option value="">Select a venue</option>
                                    {defaultLocations.map((loc, index) => (<option key={index} value={loc}>{loc}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Description</label>
                                <textarea className="form-input min-h-[100px]" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn-primary w-full mt-2">Save Changes</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Events;