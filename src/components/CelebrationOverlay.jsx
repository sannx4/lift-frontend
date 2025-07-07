import React, { useEffect, useState } from 'react';

const CelebrationOverlay = ({ show, onClose }) => {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          onClose(); // callback to clear show state in parent
          setAnimateOut(false);
        }, 500); // fade out duration
      }, 3000); // how long to show
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !animateOut) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center pointer-events-none
        ${animateOut ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
    >
      <div className="text-[80px] sm:text-[120px] md:text-[150px] opacity-30 select-none">
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
      </div>
    </div>
  );
};

export default CelebrationOverlay;
