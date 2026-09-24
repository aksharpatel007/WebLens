import React from 'react';

export function Card({ children, className = "", spotlight = false, shimmer = false, style = {} }: { children: React.ReactNode, className?: string, spotlight?: boolean, shimmer?: boolean, style?: React.CSSProperties }) {
  let classes = `glass-card ${className}`;
  if (spotlight) classes += ' spotlight-card';
  if (shimmer) classes += ' shimmer-border';

  return (
    <div className={classes} style={{ padding: '2rem', ...style }}>
      {children}
    </div>
  );
}
