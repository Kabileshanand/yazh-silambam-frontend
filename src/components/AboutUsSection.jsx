import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Star,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Target,
  Dumbbell
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import "./AboutUsSection.css";

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <Target className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 about-service-sparkle" />,
      title: "Beginner Training",
      description:
        "Start your Silambam journey with our comprehensive beginner programs. We teach fundamental stick techniques, footwork, and defensive movements that build a strong foundation in this traditional martial art.",
      position: "left",
    },
    {
      icon: <Star className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 about-service-sparkle" />,
      title: "Advanced Techniques",
      description:
        "Master complex combat sequences, advanced spinning techniques, and traditional forms that showcase the beauty and power of Silambam at its highest level.",
      position: "left",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 about-service-sparkle" />,
      title: "Self-Defense",
      description:
        "Our practical self-defense training combines ancient Silambam techniques with modern applications, empowering students with confidence and real-world protection skills.",
      position: "left",
    },
    {
      icon: <Award className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 about-service-sparkle" />,
      title: "Weapon Mastery",
      description:
        "Perfect your skills with traditional Silambam weapons including the staff, sword, and shield. From basic grip techniques to advanced combinations, we guide you through every stage of mastery.",
      position: "right",
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 about-service-sparkle" />,
      title: "Physical Conditioning",
      description:
        "Our specialized fitness programs build strength, flexibility, and endurance essential for Silambam practice, ensuring students develop both mind and body discipline.",
      position: "right",
    },
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 about-service-sparkle" />,
      title: "Competition Training",
      description:
        "Prepare for tournaments and demonstrations with our focused competition training. Our expert coaching helps students showcase their skills with precision and confidence.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Users />, value: 60, label: "Active Students", suffix: "+" },
    { icon: <Target />, value: 500, label: "Techniques Mastered", suffix: "+" },
    { icon: <Calendar />, value: 8, label: "Years Teaching", suffix: "" },
    { icon: <TrendingUp />, value: 95, label: "Student Retention", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="about-section-container"
    >
      {/* Decorative background elements */}
      <motion.div
        className="about-decor about-decor-1"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="about-decor about-decor-2"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="about-decor about-decor-3"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="about-decor about-decor-4"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="about-content-wrapper"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="about-header" variants={itemVariants}>
          <motion.span
            className="about-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            DISCOVER OUR LEGACY
          </motion.span>
          <h2 className="about-title swing-text-reveal">About Us</h2>
          <motion.div
            className="about-divider"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="about-description" variants={itemVariants}>
          We are a dedicated team of Silambam masters and instructors committed to preserving and teaching this ancient Tamil martial art. With passionate students and unwavering dedication to traditional techniques, we transform beginners into skilled practitioners while honoring our rich cultural heritage.
        </motion.p>

        <div className="about-grid">
          {/* Left Column */}
          <div className="about-column">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="about-center-image-container">
            <motion.div className="about-image-wrapper" variants={itemVariants}>
              <motion.div
                className="about-image-inner glass-card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="/About Us.jpeg"
                  alt="Yazh Silambam Training"
                  className="about-main-img"
                  onError={(e) => {
                    // fallback to some placeholder if the image doesn't exist yet
                    e.target.src = "/images/weaponry/Kendai Kodari.jpg";
                  }}
                />
                <motion.div
                  className="about-image-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.button
                    className="about-portfolio-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const el = document.getElementById("who-we-are");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Our Achievements <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="about-accent-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="about-accent-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="about-column">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="about-stats-grid"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }) {
  return (
    <motion.div
      className="about-service-item"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="about-service-header"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="about-service-icon-wrap"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="about-service-title">{title}</h3>
      </motion.div>
      <motion.p
        className="about-service-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="about-service-learn-more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="about-service-learn-more-text">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

function StatCounter({ icon, value, label, suffix, delay }) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="about-stat-card glass-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="about-stat-icon-wrap"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="about-stat-value">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="about-stat-label">{label}</p>
      <motion.div className="about-stat-line" />
    </motion.div>
  );
}
