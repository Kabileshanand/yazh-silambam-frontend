import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MaskHero = ({ title, subtitle, imageSrc, centerImage }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // We'll scale the SVG mask up as we scroll
    // When scrollYProgress goes from 0 to 1, we scale from 1 to something large (like 80)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);

    return (
        <div 
            ref={container} 
            style={{ 
                height: '120vh', 
                position: 'relative' 
            }}
        >
            <div 
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#000'
                }}
            >
                {/* Background Image that will be revealed */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url('${imageSrc}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* SVG Mask Container */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        scale,
                        transformOrigin: 'center center',
                        pointerEvents: 'none',
                    }}
                >
                    <svg width="100%" height="100%">
                        <defs>
                            <mask id="textMask">
                                <rect width="100%" height="100%" fill="white" />
                                <text 
                                    x="50%" 
                                    y="50%" 
                                    fontSize="9vw"
                                    letterSpacing="0.05em"
                                    fontWeight="900" 
                                    fontFamily="Inter, sans-serif"
                                    textAnchor="middle" 
                                    dominantBaseline="central" 
                                    fill="black"
                                >
                                    {subtitle ? (
                                        <>
                                            <tspan x="50%" dy="-0.5em">{title}</tspan>
                                            <tspan x="50%" dy="1em">{subtitle}</tspan>
                                        </>
                                    ) : (
                                        title
                                    )}
                                </text>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" fill="#0c0c0c" mask="url(#textMask)" />
                    </svg>
                </motion.div>

                {/* Central Logo Overlay - Positioned on Top Layer */}
                {centerImage && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '200px',
                            zIndex: 20,
                            pointerEvents: 'none'
                        }}
                        initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <img 
                            src={centerImage} 
                            alt="Logo" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 25px rgba(0,0,0,0.9))'
                            }} 
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MaskHero;
