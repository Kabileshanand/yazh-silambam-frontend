import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Sword, 
  Shield, 
  Target, 
  Award, 
  Users, 
  Star,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import "./FeatureCarousel.css";

const FEATURES = [
  {
    id: "barehand",
    label: "Bare Hand Technique",
    icon: <Zap size={20} />,
    image: "/Barehand Techniques.jpeg",
    description: "Master fundamental bare hand techniques of Silambam. Build agility, speed, and focus without weapons.",
    link: "/bare-hand-techniques"
  },
  {
    id: "stick",
    label: "Stick Fencing",
    icon: <Sword size={20} />,
    image: "/Stick Fencing.jpeg",
    description: "Learn the core art of Tamil stick fencing. Discover dynamic strikes, blocks, and footwork.",
    link: "/stick-fencing"
  },
  {
    id: "weaponry",
    label: "Weaponry Training",
    icon: <Shield size={20} />,
    image: "/Weaponry Training.jpeg",
    description: "Train with traditional Tamil weapons. Master advanced techniques and deepen your practice.",
    link: "/weaponry-training"
  }
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 70;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    if (index === currentIndex) {
      navigate(FEATURES[index].link);
      return;
    }
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="feature-carousel-container">
      <div className="feature-carousel-main">
        {/* Sidebar */}
        <div className="feature-carousel-sidebar">
          <div className="sidebar-gradient-top" />
          <div className="sidebar-gradient-bottom" />
          
          <div className="sidebar-chips-wrapper">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.35,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="sidebar-chip-container"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "feature-chip",
                      isActive ? "active" : ""
                    )}
                  >
                    <div className="chip-icon">
                      {feature.icon}
                    </div>
                    <span className="chip-label">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="feature-carousel-content">
          <div className="cards-wrapper">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  onClick={() => isActive && navigate(feature.link)}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    rotate: isPrev ? -5 : isNext ? 5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  className={cn("feature-card", isActive ? "cursor-pointer" : "")}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "feature-card-img",
                      isActive ? "" : "inactive"
                    )}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
