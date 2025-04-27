import React, { useState, useEffect } from 'react';

interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
  activeColor?: string;
  readonly?: boolean;
  allowHalf?: boolean;
  className?: string;
  emoji?: string 
  tooltip?: boolean;
  theme?: 'default' | 'cosmic' | 'neon' | 'futuristic' | 'minimal';
  animation?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  onChange,
  size = 40,
  color = '#d1d5db',
  activeColor = '#facc15',
  readonly = false,
  allowHalf = true,
  className = '',
  emoji,
  tooltip = true,
  theme = 'default',
  animation = true,
  glowIntensity = 'medium',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedStar, setClickedStar] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
      if (animation) {
        setClickedStar(rating);
        setTimeout(() => setClickedStar(null), 1200);
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
          id: i + Date.now(),
          x: Math.random() * size,
          y: Math.random() * size * 0.5,
          size: Math.random() * 6 + 2,
          color: themeStyles.particleColor + (Math.random() > 0.5 ? 'cc' : '99'), // Subtle color variation
        }));
        setParticles((prev) => [...prev, ...newParticles]);
        setTimeout(() => setParticles((prev) => prev.filter((p) => !newParticles.includes(p))), 1200);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
    if (readonly) return;
    const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    if (allowHalf) {
      setHoverValue(x < width / 2 ? index - 0.5 : index);
    } else {
      setHoverValue(index);
    }
    const tiltX = ((y - height / 2) / height) * 20;
    const tiltY = ((x - width / 2) / width) * -20;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    setTilt({ x: 0, y: 0 });
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  const getThemeStyles = () => {
    const glow = {
      low: '0 0 6px rgba(255, 255, 255, 0.2)',
      medium: '0 0 10px rgba(255, 255, 255, 0.4)',
      high: '0 0 14px rgba(255, 255, 255, 0.7)',
    };

    switch (theme) {
      case 'cosmic':
        return {
          star: `box-shadow: ${glow[glowIntensity]}; border-radius: 50%;`,
          starHover: `box-shadow: 0 0 20px rgba(147, 51, 234, 0.8);`,
          active: `box-shadow: 0 0 25px rgba(236, 72, 153, 1); animation: activePulse 1.8s infinite;`,
          particleColor: '#ec4899',
          gradient: 'linear-gradient(to right, #9333ea, #ec4899)',
        };
      case 'neon':
        return {
          star: `box-shadow: ${glow[glowIntensity]}; border-radius: 50%;`,
          starHover: `box-shadow: 0 0 18px rgba(34, 197, 94, 0.9);`,
          active: `box-shadow: 0 0 22px rgba(34, 197, 94, 1); animation: activePulse 1.5s infinite;`,
          particleColor: '#22c55e',
          gradient: 'linear-gradient(to right, #22c55e, #06b6d4)',
        };
      case 'futuristic':
        return {
          star: `box-shadow: ${glow[glowIntensity]}; border-radius: 50%;`,
          starHover: `box-shadow: 0 0 22px rgba(59, 130, 246, 1);`,
          active: `box-shadow: 0 0 28px rgba(59, 130, 246, 1); animation: activePulse 2s infinite;`,
          particleColor: '#2563eb',
          gradient: 'linear-gradient(to right, #2563eb, #9333ea)',
        };
      case 'minimal':
        return {
          star: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 50%;`,
          starHover: `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);`,
          active: `box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);`,
          particleColor: '#9ca3af',
          gradient: 'linear-gradient(to right, #d1d5db, #9ca3af)',
        };
      default:
        return {
          star: `box-shadow: ${glow[glowIntensity]}; border-radius: 50%;`,
          starHover: `box-shadow: 0 0 16px rgba(251, 191, 36, 0.8);`,
          active: `box-shadow: 0 0 20px rgba(251, 191, 36, 1); animation: activePulse 1.8s infinite;`,
          particleColor: '#facc15',
          gradient: 'linear-gradient(to right, #facc15, #f97316)',
        };
    }
  };

  const themeStyles = getThemeStyles();

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      @keyframes glow {
        0%, 100% { filter: brightness(100%) drop-shadow(0 0 4px rgba(255,255,255,0.2)); }
        50% { filter: brightness(130%) drop-shadow(0 0 8px rgba(255,255,255,0.5)); }
      }
      @keyframes activePulse {
        0%, 100% { transform: scale(1); filter: brightness(100%); }
        50% { transform: scale(1.08); filter: brightness(120%); }
      }
      @keyframes futuristic {
        0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1); }
        50% { transform: perspective(1000px) rotateX(6deg) rotateY(6deg) scale(1.15); }
      }
      @keyframes wobble {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(2deg); }
        75% { transform: rotate(-2deg); }
      }
      @keyframes particle {
        0% { opacity: 1; transform: scale(1) translate(0, 0); }
        100% { opacity: 0; transform: scale(0.2) translate(${Math.random() * 30 - 15}px, -40px); }
      }
      @keyframes rockShow {
        0% { transform: perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1); }
        50% { transform: perspective(1000px) translateY(-40px) rotateX(360deg) rotateY(180deg) rotateZ(45deg) scale(1.5); }
        75% { transform: perspective(1000px) translateY(10px) rotateX(720deg) rotateY(360deg) rotateZ(0deg) scale(1.2); }
        100% { transform: perspective(1000px) translateY(0) rotateX(720deg) rotateY(360deg) rotateZ(0deg) scale(1.1); }
      }
      @keyframes tooltipBounce {
        0% { transform: translateX(-50%) translateZ(20px) scale(0.8); opacity: 0; }
        60% { transform: translateX(-50%) translateZ(20px) scale(1.05); opacity: 1; }
        100% { transform: translateX(-50%) translateZ(20px) scale(1); opacity: 1; }
      }
      .star-container {
        perspective: 1000px;
      }
      .star-svg {
        transform-style: preserve-3d;
      }
      .tooltip-visible {
        display: block !important;
        animation: tooltipBounce 0.3s ease-out;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: readonly ? 'default' : 'pointer',
      }}
      className={className}
    >
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const isActive = displayValue >= index;
        const isHalf = allowHalf && displayValue + 0.5 === index;
        const isClicked = clickedStar === index;
        const fill = isActive ? activeColor : isHalf ? `url(#half-${index})` : color;

        return (
          <div
            key={index}
            className="star-container"
            style={{ position: 'relative' }}
          >
            {/* Particle Effects */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                style={{
                  position: 'absolute',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: '50%',
                  background: particle.color,
                  animation: 'particle 1.2s ease-out',
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  opacity: 1,
                }}
              />
            ))}
            <svg
              onClick={() => handleClick(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={typeof fill === 'string' ? fill : undefined}
              xmlns="http://www.w3.org/2000/svg"
              className="star-svg"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                ...(isActive || isHalf ? { boxShadow: themeStyles.active } : { boxShadow: themeStyles.star }),
                transformOrigin: 'center',
                ...(isActive ? { transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.1)` } : {}),
                ...(isClicked ? { animation: 'rockShow 1.2s ease-out' } : {}),
                ...(readonly ? {} : {
                  filter: 'brightness(100%)',
                  ':hover': {
                    filter: 'brightness(130%)',
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.25) translateY(-4px)`,
                    boxShadow: themeStyles.starHover,
                    animation: 'wobble 0.5s ease-in-out',
                  },
                }),
                ...(theme === 'futuristic' ? { filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' } : {}),
              }}
            >
              <defs>
                <linearGradient id={`half-${index}`} gradientTransform="rotate(90)">
                  <stop offset="50%" stopColor={activeColor} />
                  <stop offset="50%" stopColor={color} />
                </linearGradient>
                <filter id={`glow-${index}`}>
                  <feGaussianBlur in="SourceGraphic" stdDeviation={glowIntensity === 'high' ? 3 : glowIntensity === 'medium' ? 2 : 1} />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {emoji ? (
                typeof emoji === 'string' ? (
                  <text
                    x="12"
                    y="16"
                    fontSize="16"
                    textAnchor="middle"
                    fill={fill}
                    style={{ transition: 'fill 0.2s ease', filter: `url(#glow-${index})` }}
                  >
                    {emoji}
                  </text>
                ) : (
                  <g style={{ filter: `url(#glow-${index})` }}>{emoji}</g>
                )
              ) : (
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  stroke={isActive ? activeColor : color}
                  strokeWidth={0.8}
                  style={{ transition: 'stroke 0.2s ease', filter: `url(#glow-${index})` }}
                />
              )}
            </svg>
            {tooltip  && (
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%) translateZ(20px)',
                  display: 'none',
                  background: theme === 'neon' ? 'rgba(34, 197, 94, 0.9)' : theme === 'cosmic' ? 'rgba(147, 51, 234, 0.9)' : theme === 'futuristic' ? 'rgba(37, 99, 235, 0.9)' : 'rgba(31, 41, 55, 0.9)',
                  color: theme === 'neon' ? '#000' : '#fff',
                  fontSize: '12px',
                  borderRadius: '9999px',
                  padding: '6px 12px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  border: theme === 'futuristic' ? '1px solid rgba(59, 130, 246, 0.5)' : 'none',
                }}
                className="group-hover:tooltip-visible"
              >
                {index}{allowHalf && displayValue === index - 0.5 ? '.5' : ''}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;