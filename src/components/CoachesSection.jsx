import React from 'react';
import { useNavigate } from 'react-router-dom';
import { coaches } from '../data/coaches';
import TeamMemberCard from './TeamMemberCard';
import { motion } from 'framer-motion';

export default function CoachesSection() {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-dark-overlay" id="meet-our-coaches">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title swing-text-reveal"
            initial={{ backgroundPosition: "100% 0%" }}
            whileInView={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Meet Our Coaches
          </motion.h2>
        </div>

        <div className="coaches-list flex flex-col gap-8">
          {coaches.map((coach, index) => (
            <TeamMemberCard
              key={coach.id}
              position={index % 2 === 0 ? 'left' : 'right'}
              jobPosition={coach.role}
              name={coach.name}
              imageUrl={coach.profile}
              description={coach.bio}
              onNavigate={() => navigate(`/coach/${coach.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
