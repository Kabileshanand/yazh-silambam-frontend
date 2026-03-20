import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
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
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrame;
        let offset = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const step = 20;
            const bigStep = 100;
            offset = (offset + 0.3) % bigStep;

            // Fine grid
            ctx.strokeStyle = 'rgba(22,22,22,1)';
            ctx.lineWidth = 0.5;
            for (let x = (offset % step); x < w + step; x += step) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = (offset % step); y < h + step; y += step) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            // Bold grid
            ctx.strokeStyle = 'rgba(30,30,30,1)';
            ctx.lineWidth = 1;
            for (let x = (offset % bigStep); x < w + bigStep; x += bigStep) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = (offset % bigStep); y < h + bigStep; y += bigStep) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            // Pulsing rings
            const cx = w / 2;
            const cy = h / 2;
            const t = Date.now() / 1000;
            [80, 180, 300, 440].forEach((baseR, i) => {
                const r = baseR + Math.sin(t * 0.6 + i) * 30;
                const alpha = 0.06 + Math.sin(t * 0.4 + i * 1.2) * 0.04;
                ctx.strokeStyle = `rgba(192,57,43,${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Floating ember dots
            const dots = [
                { bx: 0.15, by: 0.12, speed: 0.7, phase: 0 },
                { bx: 0.38, by: 0.08, speed: 0.5, phase: 1.5 },
                { bx: 0.65, by: 0.11, speed: 0.8, phase: 3 },
                { bx: 0.82, by: 0.18, speed: 0.6, phase: 0.8 },
                { bx: 0.92, by: 0.35, speed: 0.9, phase: 2.2 },
                { bx: 0.08, by: 0.55, speed: 0.5, phase: 4 },
                { bx: 0.95, by: 0.65, speed: 0.7, phase: 1 },
                { bx: 0.28, by: 0.88, speed: 0.6, phase: 3.5 },
            ];
            dots.forEach(d => {
                const dx = Math.sin(t * d.speed + d.phase) * 8;
                const dy = Math.cos(t * d.speed * 0.7 + d.phase) * 10;
                const x = d.bx * w + dx;
                const y = d.by * h + dy;
                const alpha = 0.4 + Math.sin(t * d.speed + d.phase) * 0.3;
                ctx.fillStyle = `rgba(231,76,60,${alpha})`;
                ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = `rgba(231,76,60,${alpha * 0.4})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 14); ctx.stroke();
            });

            // Scan line
            const scanY = ((t * 60) % (h + 40)) - 20;
            const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
            scanGrad.addColorStop(0, 'rgba(192,57,43,0)');
            scanGrad.addColorStop(0.5, 'rgba(192,57,43,0.1)');
            scanGrad.addColorStop(1, 'rgba(192,57,43,0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 2, w, 4);

            animFrame = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

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

            {/* ── Animated Background Canvas ── */}
            <canvas
                ref={canvasRef}
                className="achievements-bg-canvas"
            />

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