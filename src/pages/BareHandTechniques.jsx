import React from 'react';
import { motion } from 'framer-motion';

const techniques = [
  {
    title: 'Suvadu Murai',
    desc: 'Suvadu Murai refers to the fundamental footwork patterns (steps and stances) in Silambam and Adi Murai. It teaches precise, agile movements like forward/backward shifts, circular pivots, and low stances to maintain balance, evade attacks, control distance, and generate power from the ground. Mastering Suvadu builds speed, stability, and tactical positioning essential for all combat.',
    image: '/images/bare-hand/suvadu-murai.jpg',
  },
  {
    title: 'Kutthu Varisai',
    desc: 'Kutthu Varisai (punch sequences) is the striking series of unarmed Silambam, focusing on rapid punches, elbows, palms, and finger strikes. "Kutthu" means punch/hit, and "Varisai" means sequence. It develops explosive power, timing, blocking, and combinations to overwhelm opponents, often practiced in flowing forms to enhance reflexes and endurance.',
    image: '/images/bare-hand/kutthu-varisai.jpg',
  },
  {
    title: 'Thattu Varisai',
    desc: 'Thattu Varisai involves blocking and parrying sequences using hands, forearms, and body positioning. It trains defensive reflexes against strikes, teaching how to redirect force, create openings, and counter immediately. This method strengthens coordination, timing, and the ability to defend while setting up attacks.',
    image: '/images/bare-hand/thattu-varisai.jpg',
  },
  {
    title: 'Guru Vanakkam',
    desc: 'Guru Vanakkam (or Sabai Vanakkam) is the traditional salutation and respect. Practitioners bow, touch the ground or staff, and pay homage to the guru, ancestors, and the art. It instills discipline, humility, gratitude, and mental focus, connecting students to Silambam\'s ancient Tamil heritage.',
    image: '/images/bare-hand/guru-vanakkam.jpg',
  },
  {
    title: 'Adi Murai & Pidi Murai',
    desc: 'Adi Murai ("hitting way") covers lethal striking techniques targeting vital points, while Pidi Murai ("grabbing way") focuses on locks, holds, throws, and grapples. Together, they form practical self-defense against grabs, chokes, or multiple attackers, emphasizing pressure points, joint manipulation, and quick neutralization for real-world protection.',
    image: '/images/bare-hand/adi-pidi-murai.jpg',
  },
];

const BareHandTechniques = () => {
  return (
    <div className="page-container container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="section-title">Bare Hand Techniques</h1>
        <p className="about-text" style={{ maxWidth: '750px', margin: '2rem auto 0' }}>
          Bare Hand Techniques <span className="text-gold">(Verum Kai Prayogam or Kuthu Varisai)</span> form
          the foundation of Silambam, building agility, power, and self-defense without weapons. These
          unarmed methods prepare the body for armed combat and real-world protection.
        </p>
      </motion.div>

      <div className="stick-showcase-surface mt-8">
        {techniques.map((technique, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className={`stick-showcase ${index % 2 !== 0 ? 'stick-showcase--reverse' : ''}`}
          >
            <div className="stick-showcase-media">
              <div className="stick-showcase-placeholder">
                Image Coming Soon
              </div>
            </div>
            <div className="stick-showcase-content">
              <h2 className="stick-showcase-title">{technique.title}</h2>
              <p className="stick-showcase-desc">{technique.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BareHandTechniques;
