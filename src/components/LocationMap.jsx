import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

export function LocationMap({
  location = "Yazh Silambam Academy",
  coordinates = "Chennai, Tamil Nadu",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`location-map-wrapper ${className}`}
      style={{
        perspective: 1000,
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        margin: '0 auto',
        width: 'fit-content'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="location-map-card"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'rgba(20, 20, 25, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
        animate={{
          width: isExpanded ? 360 : 240,
          height: isExpanded ? 280 : 140,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        {/* Subtle gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)' }} />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />

              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
                {/* Main roads */}
                <motion.line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(255,255,255,0.15)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.line x1="0%" y1="65%" x2="100%" y2="65%" stroke="rgba(255,255,255,0.15)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                
                {/* Vertical main roads */}
                <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke="rgba(255,255,255,0.12)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke="rgba(255,255,255,0.12)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />

                {/* Secondary streets */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
                ))}
              </svg>

              {/* Buildings */}
              <motion.div style={{ position: 'absolute', top: '40%', left: '10%', width: '15%', height: '20%', borderRadius: '2px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
              <motion.div style={{ position: 'absolute', top: '15%', left: '35%', width: '12%', height: '15%', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
              <motion.div style={{ position: 'absolute', top: '70%', left: '75%', width: '18%', height: '18%', borderRadius: '2px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 }} />
              <motion.div style={{ position: 'absolute', top: '20%', right: '10%', width: '10%', height: '25%', borderRadius: '2px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.55 }} />
              <motion.div style={{ position: 'absolute', top: '55%', left: '5%', width: '8%', height: '12%', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.65 }} />
              <motion.div style={{ position: 'absolute', top: '8%', left: '75%', width: '14%', height: '10%', borderRadius: '2px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.05)' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.75 }} />

              <motion.div
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, y: '-50%', x: '-50%', marginTop: -20 }}
                animate={{ scale: 1, y: '-50%', x: '-50%', marginTop: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 10px rgba(186, 15, 22, 0.5))", overflow: 'visible' }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ba0f16" />
                  <circle cx="12" cy="9" r="2.5" fill="#141414" />
                </svg>
              </motion.div>

              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent, transparent)', opacity: 0.6 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid pattern */}
        <motion.div
          style={{ position: 'absolute', inset: 0, opacity: 0.05 }}
          animate={{ opacity: isExpanded ? 0 : 0.05 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
          {/* Top section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative' }}>
              <motion.div
                style={{ position: 'relative' }}
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ba0f16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    filter: isHovered
                      ? "drop-shadow(0 0 8px rgba(186, 15, 22, 0.6))"
                      : "drop-shadow(0 0 4px rgba(186, 15, 22, 0.3))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </motion.svg>
              </motion.div>
            </div>

            {/* Status indicator */}
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(4px)' }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ba0f16' }} />
              <span style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Live</span>
            </motion.div>
          </div>

          {/* Bottom section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <motion.h3
              style={{ color: '#fff', fontWeight: 500, fontSize: '14px', letterSpacing: '-0.01em', margin: 0 }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontFamily: 'monospace', margin: 0, overflow: 'hidden' }}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Animated underline */}
            <motion.div
              style={{ height: '1px', background: 'linear-gradient(to right, rgba(186,15,22,0.8), rgba(186,15,22,0.3), transparent)', marginTop: '4px' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Click hint */}
      <motion.p
        style={{ position: 'absolute', bottom: '-24px', left: '50%', fontSize: '10px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', margin: 0 }}
        initial={{ opacity: 0, x: '-50%' }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
          x: '-50%'
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  );
}

export default LocationMap;
