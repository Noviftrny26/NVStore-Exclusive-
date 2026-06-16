import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'gold' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-secondary text-text-secondary border-secondary',
  gold: 'bg-accent-gold/20 text-accent-gold border-accent-gold/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  error: 'bg-error/20 text-error border-error/30',
  outline: 'bg-transparent text-text-secondary border-text-secondary/30',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center font-inter font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
}

interface ConditionBadgeProps {
  condition: 'New' | 'Pre-owned';
  className?: string;
}

export function ConditionBadge({ condition, className }: ConditionBadgeProps) {
  return (
    <Badge
      variant={condition === 'New' ? 'gold' : 'outline'}
      size="sm"
      className={className}
    >
      {condition === 'New' ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
          New
        </>
      ) : (
        <>
<span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
          Pre-owned
        </>
      )}
    </Badge>
  );
}

interface StockBadgeProps {
  stock: number;
  className?: string;
}

export function StockBadge({ stock, className }: StockBadgeProps) {
  const getVariant = (): BadgeVariant => {
    if (stock === 0) return 'error';
    if (stock <= 2) return 'warning';
    return 'success';
  };

  const getLabel = () => {
    if (stock === 0) return 'Out of Stock';
    if (stock === 1) return '1 left';
    return `${stock} in stock`;
  };

  return (
    <Badge variant={getVariant()} size="sm" className={className}>
      {getLabel()}
    </Badge>
  );
}
