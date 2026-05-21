import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./ParallaxFeatureSection.css";

const ParallaxFeatureRow = ({ title, description, imageUrl, reverse }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div ref={ref} className={`pfs-row ${reverse ? "pfs-row-reverse" : ""}`}>
      <motion.div style={{ y }} className="pfs-text-content">
        <div className="pfs-title">{title}</div>
        <motion.p style={{ y }} className="pfs-desc">
          {description}
        </motion.p>
      </motion.div>
      <motion.div style={{ opacity, clipPath }} className="pfs-img-container">
        <img src={imageUrl} className="pfs-img" alt={title} />
      </motion.div>
    </div>
  );
};

export const ParallaxFeatureList = ({ items = [], startIndex = 0 }) => {
  return (
    <div className="pfs-list">
      {items.map((item, index) => (
        <ParallaxFeatureRow
          key={item.title || index}
          title={item.title}
          description={item.desc}
          imageUrl={item.image}
          reverse={(startIndex + index) % 2 !== 0}
        />
      ))}
    </div>
  );
};
