import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const ScrollToTopLink = ({ to, children, className, ...props }) => {
  const handleClick = () => {
    // Scroll to top when link is clicked
    window.scrollTo(0, 0);
  };

  return (
    <RouterLink
      to={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </RouterLink>
  );
}; 