import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { coaches } from "../data/coaches";
import "./CoachCarousel.css";

const safeImage = (e) => {
  console.warn("Coach image failed to load, using placeholder:", e.target.src);
  e.target.src = "https://images.unsplash.com/photo-1507005911827-430973e27004?auto=format&fit=crop&q=80&w=400";
};


const useResponsive = () => {
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else setScreenSize('lg');
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

export default function CoachCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const screenSize = useResponsive();

  const getResponsiveValues = () => {
    switch (screenSize) {
      case 'xs': return { containerRadius: 110, profileSize: 45, centerCardWidth: '220px' };
      case 'sm': return { containerRadius: 130, profileSize: 55, centerCardWidth: '240px' };
      case 'md': return { containerRadius: 160, profileSize: 65, centerCardWidth: '260px' };
      default: return { containerRadius: 200, profileSize: 80, centerCardWidth: '280px' };
    }
  };

  const { containerRadius, profileSize, centerCardWidth } = getResponsiveValues();
  const containerSize = containerRadius * 2 + 150;

  const getRotation = useCallback(
    (index) => (index - activeIndex) * (360 / coaches.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % coaches.length);
  const prev = () => setActiveIndex((i) => (i - 1 + coaches.length) % coaches.length);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="coach-carousel-section">
      <div className="container">
        <div className="orbit-title-wrap">
          <motion.h2
            className="section-title swing-text-reveal"
            initial={{ backgroundPosition: "100% 0%" }}
            whileInView={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our Coaches
          </motion.h2>
        </div>

        <div
          className="coach-orbit-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main Navigation Arrows (Side) */}
          <button onClick={prev} className="main-nav-btn prev"><ChevronLeft size={32} /></button>
          <button onClick={next} className="main-nav-btn next"><ChevronRight size={32} /></button>

          <div
            className="orbit-container"
            style={{ width: containerSize, height: containerSize }}
          >
            {/* Center Area: Styled Card like the screenshot */}
            <AnimatePresence mode="wait">
              <motion.div
                key={coaches[activeIndex].id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="orbit-center-card"
                style={{ width: centerCardWidth }}
              >
                <div className="center-card-avatar-wrap">
                  <img
                    src={coaches[activeIndex].profile}
                    alt={coaches[activeIndex].name}
                    onError={safeImage}
                    className="center-card-img"
                  />
                </div>

                <div className="center-card-content">
                  <h3 className="center-card-name">{coaches[activeIndex].name}</h3>
                  <div className="center-card-item">
                    <Briefcase size={14} className="icon-muted" />
                    <span>{coaches[activeIndex].role}</span>
                  </div>

                  <div className="center-card-footer">
                    <button onClick={prev} className="card-nav-arrow"><ChevronLeft size={16} /></button>
                    <button 
                      className="connect-btn"
                      onClick={() => navigate(`/coach/${coaches[activeIndex].id}`)}
                    >
                      Connect
                    </button>
                    <button onClick={next} className="card-nav-arrow"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Orbiting Avatars */}
            {coaches.map((p, i) => {
              const rotation = getRotation(i);
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={p.id}
                  animate={{
                    transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="orbiting-avatar-wrap"
                  style={{
                    width: profileSize,
                    height: profileSize,
                    position: "absolute",
                    top: `calc(50% - ${profileSize / 2}px)`,
                    left: `calc(50% - ${profileSize / 2}px)`,
                    zIndex: isActive ? 25 : 15,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -rotation }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="avatar-counter-rotate"
                  >
                    <img
                      key={p.profile}
                      src={p.profile}
                      alt={p.name}
                      onError={safeImage}
                      onClick={() => setActiveIndex(i)}
                      className={`orbit-avatar-img ${isActive ? "active" : ""}`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="orbit-dots">
            {coaches.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`orbit-dot ${index === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

