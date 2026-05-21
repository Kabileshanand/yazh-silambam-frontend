import { ParallaxFeatureList } from '../components/ParallaxFeatureSection';
import NeuralNoise from '../components/NeuralNoise';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const weapons = [
  {
    title: 'Aayutha Kambu',
    desc: 'Aayutha Kambu refers to specialized weapon staffs with unique designs and attachments. Varieties include: Vel Kambu (spear-tipped staff for thrusting), Laddu Kambu (weighted ball ends for impact), Chandhiran Suriyan (moon-sun symbolic blades), and Arai Kambu (half-staff hybrids). Each trains specific strikes, spins, and handling for versatile combat.',
    image: '/images/weaponry/Vel Kambu.jpg',
  },
  {
    title: 'Surul',
    desc: 'Surul (Surul Vaal) is a flexible, whip-like sword (coiled blade) used in advanced Silambam. It lashes out with unpredictable, snake-like strikes over distance. Dangerous and precise, it requires expert control to avoid self-injury while delivering fast, whipping attacks and entanglements.',
    image: '/images/weaponry/Surul.jpg',
  },
  {
    title: 'Vaal Veechu',
    desc: 'Vaal Veechu is the art of sword wielding and cutting techniques. It covers single or double sword flows, slashes, parries, and thrusts. Emphasizing fluid motion and precision, it develops lethal edge control, timing, and integration with footwork for battlefield effectiveness.',
    image: '/images/weaponry/Vaal.jpg',
  },
  {
    title: 'Patta Katthi',
    desc: 'Patta Katthi involves broad-bladed sword fighting, focusing on powerful sweeping cuts and heavy strikes. The wide blade allows for strong blocks and devastating chops. It trains raw power, endurance, and tactical use in close-to-medium range combat.',
    image: '/images/weaponry/Patta Katthi.jpg',
  },
  {
    title: 'Sanna Katthi',
    desc: 'Sanna Katthi refers to slim dagger or small knife techniques in Silambam. It specializes in quick, precise stabs, slashes, and close-quarters defense. Ideal for concealed carry and rapid responses, it enhances agility and targeting vital areas.',
    image: '/images/weaponry/Sanna Katthi.jpg',
  },
  {
    title: 'Maan Kombu',
    desc: 'Maan Kombu (deer horns) is a traditional dual-weapon resembling blackbuck antlers. Worn on hands or held, it enables hooking, trapping, and piercing attacks. It combines grappling with sharp strikes, drawing from animal-inspired Tamil combat for unique defense.',
    image: '/images/weaponry/Maan Kombu.jpg',
  },
  {
    title: 'Kendai - Kodari',
    desc: 'Kendai and Kodari are hooked or curved weapons (often sickle-like or axe-headed) for pulling, slashing, and close attacks. They emphasize complex body mechanics, leverage, and weapon trapping to disarm or control opponents in dynamic combat scenarios.',
    image: '/images/weaponry/Kendai Kodari.jpg',
  },
];

const WeaponryTraining = () => {
  return (
    <div className="page-container" style={{ padding: 0, position: 'relative', background: 'transparent' }}>
      <NeuralNoise color={[0.9, 0.1, 0.1]} opacity={0.6} speed={0.0003} />

      {/* Sticky floating back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="back-home-floating-container"
      >
        <Link
          to="/"
          state={{ scrollTo: 'what-we-provide' }}
          className="back-home-floating-btn"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      <div className="container" style={{ marginTop: '8rem' }}>
        
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

        <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <ParallaxFeatureList items={weapons} />
        </div>
      </div>
    </div>
  );
};

export default WeaponryTraining;
