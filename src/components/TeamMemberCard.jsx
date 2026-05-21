import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import './CoachSection.css';

export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Coach',
  name = 'Coach Name',
  imageUrl = '',
  description = '',
  className,
  onNavigate,
}) {
  const isPositionRight = position === 'right';
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('team-card-container', isPositionRight ? 'card-right' : 'card-left', className)}
    >
      {/* jobPosition label */}
      <motion.div
        initial={{ opacity: 0, x: isPositionRight ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className={cn('job-position-label', isPositionRight && 'text-right')}>
          {jobPosition}
        </p>
      </motion.div>

      <div className={cn('card-flex-wrapper', isPositionRight && 'flex-row-reverse')}>
        {/* Portrait image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="portrait-container"
        >
          <div className="portrait-overlay" />
          <img
            src={imageUrl}
            alt={name}
            className="portrait-img"
          />
        </motion.div>

        {/* Info block */}
        <motion.div
          initial={{ opacity: 0, x: isPositionRight ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="info-block"
        >
          {/* Display name */}
          <div className="name-wrapper">
            <p className="display-name">
              {name}
            </p>
          </div>

          {/* Details row */}
          <div className="details-row">
            {/* Circular CTA */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigate}
              className="cta-circle"
            >
              <ArrowRight
                size={22}
                className={cn('cta-arrow', !isPositionRight ? 'rotate-180' : 'rotate-360')}
              />
            </motion.div>

            {/* Bio copy */}
            <div className="bio-container">
              <p className="bio-text">
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
