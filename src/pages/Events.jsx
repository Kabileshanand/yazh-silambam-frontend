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
        // Strict role check - admin controls only visible when navigating from Admin Dashboard
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
                setNewEvent({
                    title: '',
                    date: '',
                    time: '',
                    description: '',
                    type: 'upcoming',
                    location: ''
                });
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

    if (loading) return <div className="text-white text-center mt-20">Loading Events...</div>;

    const formatEventDate = (dateStr) => {
        try {
            // Handle YYYY-MM-DD
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                // Try to extract numbers if it's a range like "22-26 Jul"
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

    return (
        <div className="events-page-v2">
            <div className="events-noise-overlay"></div>

            <div className="events-v2-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="events-v2-header"
                >
                    <h1 className="events-v2-title-top">UPCOMING</h1>
                    <h2 className="events-v2-title-bottom">EVENTS</h2>
                </motion.div>

                {/* Admin Controls */}
                {role === 'admin' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-between items-center mb-12 glass-panel p-4"
                    >
                        <h2 className="text-lg font-bold text-gold">Admin Controls</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus size={18} /> Add Event
                        </button>
                    </motion.div>
                )}

                {/* Events list */}
                <div className="events-v2-list">
                    {events.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-white/60 text-lg">No upcoming events scheduled at the moment.</p>
                        </div>
                    ) : (
                        events.map((event, index) => {
                            const { day, month } = formatEventDate(event.date);
                            return (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="event-v2-card">
                                        <div className="event-v2-date-area">
                                            <span className="event-v2-day">{day}</span>
                                            <span className="event-v2-month">{month}</span>
                                        </div>
                                        <div className="event-v2-line"></div>
                                        <div className="event-v2-info">
                                            <h3 className="event-v2-title">{event.title}</h3>
                                            <p className="event-v2-loc">{event.location || 'VIRTUAL'}</p>
                                        </div>
                                    </div>

                                    {/* Admin hover actions */}
                                    {role === 'admin' && (
                                        <div className="event-v2-actions">
                                            <button
                                                onClick={() => openEditModal(event)}
                                                className="bg-gold text-white p-2 rounded-full shadow-lg"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleMoveToPast(event)}
                                                className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
                                                title="Mark Past"
                                            >
                                                <Calendar size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(event._id)}
                                                className="bg-red-500 text-white p-2 rounded-full shadow-lg"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })
                    )}
                </div>

                {/* Past Events from Database */}
                {pastEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 pt-10"
                    >
                        <div className="events-v2-header mb-12">
                            <h2 className="events-v2-title-top">PAST</h2>
                            <h2 className="events-v2-title-bottom">RECORDS</h2>
                        </div>

                        <div className="events-v2-list opacity-80">
                            {pastEvents.map((event, index) => {
                                const { day, month } = formatEventDate(event.date);
                                return (
                                    <div key={event._id} className="relative group">
                                        <div className="event-v2-card" style={{ background: '#f0f0f0' }}>
                                            <div className="event-v2-date-area">
                                                <span className="event-v2-day">{day}</span>
                                                <span className="event-v2-month">{month}</span>
                                            </div>
                                            <div className="event-v2-line"></div>
                                            <div className="event-v2-info">
                                                <h3 className="event-v2-title" style={{ color: '#444' }}>{event.title}</h3>
                                                <p className="event-v2-loc">{event.location || 'NONE'}</p>
                                            </div>
                                        </div>

                                        {role === 'admin' && (
                                            <div className="event-v2-actions">
                                                <button
                                                    onClick={() => openEditModal(event)}
                                                    className="bg-gold text-white p-2 rounded-full shadow-lg"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleMoveToUpcoming(event)}
                                                    className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
                                                    title="Move to Upcoming"
                                                >
                                                    <Calendar size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEvent(event._id)}
                                                    className="bg-red-500 text-white p-2 rounded-full shadow-lg"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Past Venues section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 pt-20 border-t border-white/10"
                >
                    <div className="events-v2-header mb-12">
                        <h2 className="events-v2-title-top">MAJOR</h2>
                        <h2 className="events-v2-title-bottom">VENUES</h2>
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

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gold">Add New Event</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Time</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Type</label>
                                <select
                                    className="form-input"
                                    value={newEvent.type}
                                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Location (optional)</label>
                                <select
                                    className="form-input"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                >
                                    <option value="">Select a venue</option>
                                    {defaultLocations.map((loc, index) => (
                                        <option key={index} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Description</label>
                                <textarea
                                    className="form-input min-h-[100px]"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full mt-2">
                                Add Event
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Edit Event Modal */}
            {showEditModal && editingEvent && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gold">Edit Event</h3>
                            <button
                                onClick={() => { setShowEditModal(false); setEditingEvent(null); }}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateEvent} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editingEvent.title}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={editingEvent.date}
                                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Time</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        value={editingEvent.time}
                                        onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Event Type</label>
                                <select
                                    className="form-input"
                                    value={editingEvent.type}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value })}
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Location (optional)</label>
                                <select
                                    className="form-input"
                                    value={editingEvent.location || ''}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                                >
                                    <option value="">Select a venue</option>
                                    {defaultLocations.map((loc, index) => (
                                        <option key={index} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Description</label>
                                <textarea
                                    className="form-input min-h-[100px]"
                                    value={editingEvent.description}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full mt-2">
                                Save Changes
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Events;

