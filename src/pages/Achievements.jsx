import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import AnimatedCanvas from '../components/AnimatedCanvas';
const img1 = '/images/studentsimg/R Devendran.jpeg';


const StudentPhoto = ({ name, photo }) => {
    const Images = [
        { name: 'R Devendran', src: img1 }
    ];
    const [imageError, setImageError] = useState(false);
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    if (imageError) {
        return (
            <div className="student-photo-fallback">
                {initials}
            </div>
        );
    }

    return (
        <>
            {Images.map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt={name}
                    onError={() => setImageError(true)}
                    className="student-photo"
                />
            ))}
        </>
    );
};

const Achievements = () => {


    const achievementSections = [
        {
            title: "School Education Department (RDS & BDS)",
            subtitle: "Sports & Games Achievements",
            groups: [
                {
                    year: "2025 - 2026",
                    items: [
                        { name: "S Abirakshaya", category: "Under 14", result: "2nd Place" },
                        { name: "R Devendran", category: "Under 17", result: "2nd Place" },
                        { name: "S Sri Dharshini", category: "Under 19", result: "2nd Place (Zonal)" },
                        { name: "V Vititha", category: "Under 19", result: "3rd Place (Zonal)" },
                        { name: "B Aradhana", category: "Under 14", result: "3rd Place (Zonal)" },
                    ]
                },
                {
                    year: "2024 - 2025",
                    items: [
                        { name: "S Sri Dharshini", category: "Under 19", result: "3rd Place" },
                        { name: "V Vivitha", category: "Under 17", result: "3rd Place" },
                    ]
                },
                {
                    year: "2023 - 2024",
                    items: [
                        { name: "K P Tharrun Durai", category: "Under 17", result: "3rd Place" },
                        { name: "R Devendran", category: "Under 14", result: "3rd Place" },
                        { name: "S Sri Dharshini", category: "Under 17", result: "3rd Place" },
                    ]
                }
            ]
        },
        {
            title: "Salem Sahodaya Sports & Games Championship",
            groups: [
                {
                    year: "2025 - 2026",
                    items: [
                        { name: "B Dharnesh", category: "Under 17", result: "2nd Place" }
                    ]
                },
                {
                    year: "2024 - 2025",
                    items: [
                        { name: "B Dharnesh", category: "Under 14", result: "1st Place" },
                        { name: "A T Vishvanth", category: "Under 14", result: "3rd Place" }
                    ]
                },
                {
                    year: "2023 - 2024",
                    items: [
                        { name: "B Dharnesh", category: "Under 14", result: "2nd Place" }
                    ]
                }
            ]
        },
        {
            title: "Tamil Nadu CM Trophy Games",
            groups: [
                {
                    year: "2025",
                    items: [
                        { name: "K P Tharrun Durai", category: "College", result: "3rd Place" }
                    ]
                }
            ]
        },
        {
            title: "Association Championship",
            groups: [
                {
                    year: "2022 - 2023",
                    items: [
                        { name: "S Sri Dharshini", category: "Sub Junior", result: "1st Place (District)" }
                    ]
                }
            ]
        }
    ];

    return (
        <div className="achievements-page">

            <AnimatedCanvas />

            {/* ── Hero Banner Image ── */}
            <div className="achievements-hero-banner">
                <img
                    src="/wall of fame banner.png"
                    alt="Elite Performers"
                    className="achievements-hero-img"
                />
            </div>

            <div className="achievements-hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="achievements-hero-title">Wall of Fame</h1>
                    <p className="achievements-hero-subtitle">Celebrating Our Champions & Their Remarkable Milestones</p>
                </motion.div>
            </div>

            <div className="page-container container">

                {achievementSections.map((section, sIndex) => {
                    const tableData = section.groups.flatMap(group =>
                        group.items.map(item => ({
                            name: item.name,
                            photo: item.photo || `/images/students/${item.name.replace(/\s+/g, '-').toLowerCase()}.jpg`,
                            year: group.year,
                            category: item.category,
                            result: item.result
                        }))
                    );

                    return (
                        <motion.div
                            key={sIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: sIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="mt-8 mb-12"
                        >
                            <div className="mb-6">
                                <h2 className="achievement-section-title">{section.title}</h2>
                                {section.subtitle && (
                                    <h3 className="achievement-section-subtitle">{section.subtitle}</h3>
                                )}
                            </div>
                            <div className="glass-panel p-6 overflow-x-auto">
                                <table className="w-full border-collapse achievements-table">
                                    <thead>
                                        <tr className="border-b-2 border-gold/50">
                                            <th className="text-left py-4 px-4 text-gold font-bold text-lg">Profile</th>
                                            <th className="text-left py-4 px-4 text-gold font-bold text-lg">Name</th>
                                            <th className="text-left py-4 px-4 text-gold font-bold text-lg">Year</th>
                                            <th className="text-left py-4 px-4 text-gold font-bold text-lg">Category</th>
                                            <th className="text-left py-4 px-4 text-gold font-bold text-lg">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <motion.tr
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                viewport={{ once: true }}
                                                className="border-b border-gray-700/30 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="py-4 px-4">
                                                    <div className="achievement-profile-photo">
                                                        <StudentPhoto name={row.name} photo={row.photo} />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-white font-semibold">{row.name}</td>
                                                <td className="py-4 px-4 text-gray-300 font-medium">{row.year}</td>
                                                <td className="py-4 px-4">
                                                    <span className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">
                                                        {row.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`font-semibold flex items-center gap-2 ${
                                                        row.result.toLowerCase().includes('1st')
                                                            ? 'text-[#EB4C4C]'
                                                            : row.result.toLowerCase().includes('2nd')
                                                                ? 'text-gray-300'
                                                                : 'text-orange-400'
                                                    }`}>
                                                        <span style={{ fontSize: '1.1rem' }}>
                                                            {row.result.toLowerCase().includes('1st') ? '🥇' :
                                                             row.result.toLowerCase().includes('2nd') ? '🥈' :
                                                             row.result.toLowerCase().includes('3rd') ? '🥉' :
                                                             '🏅'}
                                                        </span>
                                                        {row.result}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;