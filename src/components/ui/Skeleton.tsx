import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={twMerge(
        'bg-secondary',
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5">
      <Skeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton width={80} height={20} />
          <Skeleton width={60} height={20} variant="text" />
        </div>
        <Skeleton width="100%" height={16} variant="text" />
        <Skeleton width="70%" height={16} variant="text" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton width={60} height={24} />
          <Skeleton width={80} height={32} />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-secondary rounded-lg">
      <Skeleton className="w-20 h-20 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} variant="text" />
        <Skeleton width="40%" height={14} variant="text" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton width={80} height={28} />
          <Skeleton width={40} height={24} />
        </div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 bg-primary/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Skeleton width={120} height={32} />
          <div className="hidden md:flex items-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={80} height={20} variant="text" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton width={100} height={40} />
            <Skeleton width={100} height={40} />
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative h-[70vh] min-h-[500px] bg-secondary overflow-hidden">
      <Skeleton className="absolute inset-0" variant="rectangular" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            <Skeleton width={200} height={40} />
            <Skeleton width="100%" height={24} variant="text" />
            <Skeleton width="80%" height={24} variant="text" />
            <Skeleton width={160} height={48} />
          </div>
        </div>
      </div>
    </section>
  );
}
