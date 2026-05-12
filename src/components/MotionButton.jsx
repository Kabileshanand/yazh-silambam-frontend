import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const MotionButton = ({ label, className, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => to && navigate(to)}
      className={cn(
        'motion-btn-container group',
        className
      )}
    >
      <span className="motion-btn-circle" aria-hidden="true"></span>
      <div className="motion-btn-icon">
        <ArrowRight size={20} />
      </div>
      <span className="motion-btn-text">
        {label}
      </span>
    </button>
  );
};

export default MotionButton;
