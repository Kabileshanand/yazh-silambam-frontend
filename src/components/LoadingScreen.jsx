import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        const originalStyle = window.getComputedStyle(document.body).overflow;  
        document.body.style.overflow = 'hidden';

        // Hide loading screen after 2.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); 

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#0a0c12',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 99999, // On top of everything
                    }}
                >
                    <motion.img 
                        src="/Buffering.png" 
                        alt="Loading..." 
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ 
                            scale: [0.9, 1.1, 0.9],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: 'min(150px, 35vw)',
                            height: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
