import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import "./ImagesScrollingAnimation.css";

const projects = [
  {
    title: "Bare Hand Techniques",
    description: "Master the ancient bare hand techniques of Silambam. Develop extreme agility, speed, raw power, and sharp focus through unarmed combat forms and defensive stances.",
    src: "/Bare Hand Techniques.png",
    route: "/bare-hand-techniques",
  },
  {
    title: "Stick Fencing",
    description: "Immerse yourself in the core art of traditional Tamil stick fencing. Master swift strikes, defensive blocks, complex rotations, and dynamic footwork patterns.",
    src: "/Stick Fencing.png",
    route: "/stick-fencing",
  },
  {
    title: "Weaponry Training",
    description: "Elevate your training by mastering traditional Tamil weaponry. Build flow and precision with double sticks, short sticks, and advanced traditional training weapons.",
    src: "/Weaponry Training.png",
    route: "/weaponry-training",
  },
];

export const ImagesScrollingAnimation = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    containerRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const nextIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  };

  return (
    <div className="swipe-carousel-wrapper">
      <div className="swipe-carousel-outer">
        {/* Navigation Buttons */}
        <button className="swipe-nav-btn prev" onClick={handlePrev} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="swipe-nav-btn next" onClick={handleNext} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={containerRef} 
          className="swipe-carousel-container"
          onScroll={handleScroll}
        >
          {projects.map((project, i) => (
            <div key={i} className="swipe-card-slide">
              <motion.div 
                className="swipe-card glass-panel"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Section */}
                <div className="swipe-card-image-wrap">
                  <img 
                    src={project.src} 
                    alt={project.title} 
                    className="swipe-card-image" 
                  />
                </div>

                {/* Content Section */}
                <div className="swipe-card-content">
                  <h3 className="swipe-card-title">{project.title}</h3>
                  <p className="swipe-card-description">{project.description}</p>
                  
                  <motion.button 
                    className="swipe-card-cta"
                    onClick={() => navigate(project.route)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Techniques</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="swipe-indicators">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`swipe-indicator-dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
