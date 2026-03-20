import React from 'react';
import { motion } from 'framer-motion';

const weapons = [
  {
    title: 'Aayutha Kambu',
    desc: 'Aayutha Kambu refers to specialized weapon staffs with unique designs and attachments. Varieties include: Vel Kambu (spear-tipped staff for thrusting), Laddu Kambu (weighted ball ends for impact), Chandhiran Suriyan (moon-sun symbolic blades), and Arai Kambu (half-staff hybrids). Each trains specific strikes, spins, and handling for versatile combat.',
  },
  {
    title: 'Surul',
    desc: 'Surul (Surul Vaal) is a flexible, whip-like sword (coiled blade) used in advanced Silambam. It lashes out with unpredictable, snake-like strikes over distance. Dangerous and precise, it requires expert control to avoid self-injury while delivering fast, whipping attacks and entanglements.',
  },
  {
    title: 'Vaal Veechu',
    desc: 'Vaal Veechu is the art of sword wielding and cutting techniques. It covers single or double sword flows, slashes, parries, and thrusts. Emphasizing fluid motion and precision, it develops lethal edge control, timing, and integration with footwork for battlefield effectiveness.',
  },
  {
    title: 'Patta Katthi',
    desc: 'Patta Katthi involves broad-bladed sword fighting, focusing on powerful sweeping cuts and heavy strikes. The wide blade allows for strong blocks and devastating chops. It trains raw power, endurance, and tactical use in close-to-medium range combat.',
  },
  {
    title: 'Sanna Katthi',
    desc: 'Sanna Katthi refers to slim dagger or small knife techniques in Silambam. It specializes in quick, precise stabs, slashes, and close-quarters defense. Ideal for concealed carry and rapid responses, it enhances agility and targeting vital areas.',
  },
  {
    title: 'Maan Kombu',
    desc: 'Maan Kombu (deer horns) is a traditional dual-weapon resembling blackbuck antlers. Worn on hands or held, it enables hooking, trapping, and piercing attacks. It combines grappling with sharp strikes, drawing from animal-inspired Tamil combat for unique defense.',
  },
  {
    title: 'Kendai - Kodari',
    desc: 'Kendai and Kodari are hooked or curved weapons (often sickle-like or axe-headed) for pulling, slashing, and close attacks. They emphasize complex body mechanics, leverage, and weapon trapping to disarm or control opponents in dynamic combat scenarios.',
  },
];

const WeaponryTraining = () => {
  return (
    <div className="page-container container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="section-title">Weaponry Training</h1>
        <p className="about-text" style={{ maxWidth: '750px', margin: '2rem auto 0' }}>
          Advanced levels introduce <span className="text-gold">traditional weapons</span> beyond the basic
          staff, drawing from Tamil warrior heritage for deeper combat mastery and cultural expression.
        </p>
      </motion.div>

      <div className="stick-showcase-surface mt-8">
        {weapons.map((weapon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className={`stick-showcase ${index % 2 !== 0 ? 'stick-showcase--reverse' : ''}`}
          >
            <div className="stick-showcase-media">
              <div className="stick-showcase-placeholder">Image Coming Soon</div>
            </div>
            <div className="stick-showcase-content">
              <h2 className="stick-showcase-title">{weapon.title}</h2>
              <p className="stick-showcase-desc">{weapon.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeaponryTraining;
