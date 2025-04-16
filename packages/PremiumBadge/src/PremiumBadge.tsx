import React from 'react';

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type Size = 'sm' | 'md' | 'lg';

interface PremiumBadgeProps {
  label: string;
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  icon?: React.ReactNode;
}

const colors: Record<Variant, { bg: string; color: string; gradient?: string }> = {
  primary: { bg: '#3b82f6', color: '#fff' },
  success: { bg: '#10b981', color: '#fff' },
  warning: { bg: '#f59e0b', color: '#fff' },
  danger:  { bg: '#ef4444', color: '#fff' },
  info:    { bg: '#06b6d4', color: '#fff' },
  neutral: { bg: '#f3f4f6', color: '#111827' },
};

const paddings: Record<Size, string> = {
  sm: '4px 10px',
  md: '6px 14px',
  lg: '8px 18px',
};

const fontSizes: Record<Size, string> = {
  sm: '0.75rem',
  md: '0.85rem',
  lg: '1rem',
};

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  pill = true,
  icon,
}) => {
  const { bg, color } = colors[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: bg,
        color,
        padding: paddings[size],
        fontSize: fontSizes[size],
        fontWeight: 600,
        borderRadius: pill ? 999 : 8,
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'default',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </span>
  );
};


export default PremiumBadge;