import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft
} from "lucide-react";
import { cn } from "../lib/utils";
import { coaches } from "../data/coaches";
import "./CoachProfile.css";

const CoachProfile = () => {
  const { id } = useParams();
  const coach = coaches.find((c) => c.id === parseInt(id)) || coaches[0];

  const safeImage = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1507005911827-430973e27004?auto=format&fit=crop&q=80&w=600";
  };

  return (
    <div className="coach-profile-page">
      <Link to="/" className="back-btn">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="coach-profile-container">
        {/* Desktop layout */}
        <div className="coach-desktop-view">
          {/* Avatar Area */}
          <motion.div
            className="coach-avatar-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={coach.profile}
              alt={coach.name}
              className="coach-avatar-img"
              onError={safeImage}
            />
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="coach-info-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="coach-card-header">
              <h1 className="coach-name">{coach.name}</h1>
              <p className="coach-role">{coach.role}</p>
            </div>

            <p className="coach-bio">
              {coach.bio}
            </p>
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="coach-mobile-view">
          <div className="coach-mobile-avatar">
            <img
              src={coach.profile}
              alt={coach.name}
              className="coach-avatar-img"
              onError={safeImage}
            />
          </div>

          <div className="coach-mobile-content">
            <h1 className="coach-name">{coach.name}</h1>
            <p className="coach-role">{coach.role}</p>
            <p className="coach-bio">{coach.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
