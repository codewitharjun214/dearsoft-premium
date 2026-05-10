import { motion } from 'motion/react';

export const SpaceBackground = () => {
  return (
    <div className="stars-bg">
      <div className="star-layer opacity-50 animate-stars" />
      <div className="star-layer opacity-30 animate-stars [animation-duration:180s]" />
      <div className="star-layer opacity-20 animate-stars [animation-duration:240s]" />
    </div>
  );
};
