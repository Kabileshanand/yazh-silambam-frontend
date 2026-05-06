import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const CircularFeatures = ({ features, autoplay = true }) => {
  const navigate = useNavigate();

  // Color & font config
  const colorName = "#e5e5e5";
  const colorArrowBg = "rgba(235, 76, 76, 0.1)";
  const colorArrowFg = "#EB4C4C";
  const colorArrowHoverBg = "rgba(235, 76, 76, 0.4)";
  const fontSizeName = "2.5rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const featuresLength = useMemo(() => features.length, [features]);
  const activeFeature = useMemo(
    () => features[activeIndex],
    [activeIndex, features]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featuresLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, featuresLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, featuresLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featuresLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [featuresLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + featuresLength) % featuresLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [featuresLength]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    
    const offset = (index - activeIndex + featuresLength) % featuresLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + featuresLength) % featuresLength === index;
    const isRight = (activeIndex + 1) % featuresLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        boxShadow: "0 0 35px rgba(235, 76, 76, 0.45), 0 0 60px rgba(235, 76, 76, 0.2)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: isMobile
          ? `translateX(-15px) translateY(-15px) scale(0.88) rotateY(8deg)`
          : `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        boxShadow: "0 0 15px rgba(235, 76, 76, 0.15)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: isMobile
          ? `translateX(15px) translateY(-15px) scale(0.88) rotateY(-8deg)`
          : `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        boxShadow: "0 0 15px rgba(235, 76, 76, 0.15)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="circular-container mx-auto">
      <div className="circular-grid">
        {/* Images */}
        <div className="circular-image-container" ref={imageContainerRef}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="circular-image-wrapper glass-card"
              animate={getImageStyle(index)}
              initial={getImageStyle(index)}
              onClick={() => {
                if (index === activeIndex) {
                  navigate(feature.link);
                } else {
                  setActiveIndex(index);
                  if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
                }
              }}
            >
              <img
                src={feature.imageSrc}
                alt={feature.title}
                className="circular-image"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
        {/* Content */}
        <div className="circular-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="circular-title"
                style={{ color: colorName, fontSize: fontSizeName, margin: 0, paddingBottom: "1rem", fontFamily: "var(--font-main)" }}
              >
                {activeFeature.title}
              </h3>
              <motion.p
                className="circular-desc"
                style={{ color: "#a0a0a0", fontSize: "1.125rem", lineHeight: 1.75 }}
              >
                {activeFeature.description?.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
              <Button
                variant="outline"
                style={{ 
                  marginTop: "2rem", 
                  padding: 0, 
                  overflow: "hidden", 
                  display: "inline-flex", 
                  alignItems: "stretch",
                  backgroundColor: "transparent",
                  color: colorName,
                  borderColor: "rgba(255, 255, 255, 0.1)"
                }}
                onClick={() => navigate(activeFeature.link)}
              >
                <span style={{ padding: "0.5rem 1.25rem", display: "flex", alignItems: "center", fontSize: "1rem" }}>
                  Learn More
                </span>
                <span style={{ 
                  padding: "0.5rem 1rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  borderLeft: "1px solid rgba(255, 255, 255, 0.1)" 
                }}>
                  <ExternalLink size={20} />
                </span>
              </Button>
            </motion.div>
          </AnimatePresence>
          <div className="circular-arrows">
            <button
              className="circular-arrow-btn"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                color: colorArrowFg
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous feature"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              className="circular-arrow-btn"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                color: colorArrowFg
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next feature"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularFeatures;
