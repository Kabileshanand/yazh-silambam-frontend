import React from 'react';
import { motion } from 'framer-motion';

const coreTechniques = [
  {
    title: 'Nadu Kambu Varisai',
    desc: 'Nadu Kambu Varisai is the core spinning technique where the stick rotates from its center (middle grip). Practitioners perform continuous circles and figures with high speed and control. It develops wrist strength, coordination, fluidity, and the foundational rhythm needed for advanced spins and combat transitions.',
    image: '/images/stick-fencing/Nadu Kambu.jpg',
  },
  {
    title: 'Nedung Kambu Varisai',
    desc: 'Nedung Kambu Varisai involves spinning the staff from about 3/4 length (off-center grip toward one end). This creates wider, more dynamic arcs and faster rotations. It trains advanced control, balance, and power generation for longer-range strikes and defensive sweeps.',
    image: '/images/stick-fencing/Nedung Kambu.jpg',
  },
  {
    title: 'Kadai Kambu Varisai',
    desc: 'Kadai Kambu Varisai focuses on spinning from the bottom/end of the stick (grip near one tip). It produces tight, rapid spins ideal for close-quarters defense and quick counters. This method enhances grip strength, precision, and the ability to transition seamlessly between spins and thrusts.',
    image: '/images/stick-fencing/Kadai Kambu.jpg',
  },
  {
    title: 'Rettai Kambu Varisai',
    desc: 'Rettai Kambu Varisai teaches dual-stick handling and spinning (two short or medium staffs). It doubles offensive and defensive options, allowing simultaneous blocks and attacks. Practitioners learn coordination between both hands, creating complex patterns for superior combat versatility.',
    image: '/images/stick-fencing/Rettai Kambu.jpg',
  },
  {
    title: 'Thee Silambam',
    desc: 'Thee Silambam (Fire Silambam) is an advanced, spectacular demonstration form using staffs with fire tips or flaming ends. It combines spinning, strikes, and flows with fire for visual impact and cultural performances. It demands exceptional skill, focus, timing, and safety awareness.',
    image: '/images/stick-fencing/Thee Silambam.jpg',
  },
  {
    title: 'Sparring',
    desc: 'Sparring (or free combat practice) applies all stick techniques in controlled fighting. Students engage in realistic exchanges with protective gear, focusing on timing, distance, strategy, and respect. It bridges forms to real application, building confidence, adaptability, and sportsmanship.',
    image: '/images/stick-fencing/Sparing.jpg',
  },
];

const alangara = [
  {
    title: 'Ribbon Stick',
    desc: 'Ribbon Stick involves tying colorful ribbons to the top and bottom of the staff, then spinning it in intricate patterns. The ribbons create beautiful visual trails, enhancing spectacle during performances. It highlights grace, rhythm, and precision while showcasing Tamil artistic tradition.',
    image: '/images/stick-fencing/Ribbon Stick.jpg',
  },
  {
    title: 'Padal',
    desc: 'Padal, or Star Silambam, is a high-skill freestyle technique with rapid, continuous rotations forming star-like patterns. The staff moves in multi-directional orbits at high speed, requiring exceptional wrist dexterity, timing, and body control for mesmerizing displays.',
    image: '/images/stick-fencing/Padal.jpg',
  },
  {
    title: 'Poo Pandhu',
    desc: 'Poo Pandhu is a specialized advanced form similar to Padal, using a ball (or weighted object) tied by rope to the staff end. Spinning creates flower-like or orbiting motions with added momentum. It trains balance, centrifugal force control, and artistic flair for performances.',
    image: '/images/stick-fencing/Poo Pandhu.jpg',
  },
  {
    title: 'Tharasu',
    desc: 'Tharasu is an advanced balance-focused technique emphasizing equilibrium during complex spins and poses. Practitioners hold extended positions or perform one-legged spins while maintaining perfect control. It builds core strength, concentration, and mastery over body dynamics.',
    image: '/images/stick-fencing/Tharasu.jpg',
  },
];

const TechniqueList = ({ techniques, startIndex = 0 }) => (
  <>
    {techniques.map((technique, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true }}
        className={`stick-showcase ${(startIndex + index) % 2 !== 0 ? 'stick-showcase--reverse' : ''}`}
      >
        <div className="stick-showcase-media">
          <img
            src={technique.image}
            alt={technique.title}
            className="stick-showcase-image"
          />
        </div>
        <div className="stick-showcase-content">
          <h2 className="stick-showcase-title">{technique.title}</h2>
          <p className="stick-showcase-desc">{technique.desc}</p>
        </div>
      </motion.div>
    ))}
  </>
);

const StickFencing = () => {
  return (
    <div className="page-container container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="section-title">Stick Fencing</h1>
        <p className="about-text" style={{ maxWidth: '750px', margin: '2rem auto 0' }}>
          Stick Fencing is the heart of <span className="text-gold">Silambam</span>, centered on the bamboo
          staff. It builds precision, speed, rhythm, and 360° defense through spinning, striking, and
          sparring forms.
        </p>
      </motion.div>

      {/* Silambam Core */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="achievement-section-title">Silambam Core</h2>
      </motion.div>

      <div className="stick-showcase-surface mt-4 mb-12">
        <TechniqueList techniques={coreTechniques} startIndex={0} />
      </div>

      {/* Alangara Silambam */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="achievement-section-title">Alangara Silambam</h2>
        <p className="achievement-section-subtitle">Decorative / Performance Silambam</p>
        <p className="about-text text-center mt-4" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
          Alangara Silambam emphasizes aesthetic, flowing displays for events and cultural shows.
        </p>
      </motion.div>

      <div className="stick-showcase-surface mt-4">
        <TechniqueList techniques={alangara} startIndex={0} />
      </div>
    </div>
  );
};

export default StickFencing;
