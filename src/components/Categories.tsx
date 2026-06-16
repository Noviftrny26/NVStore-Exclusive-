'use client';

import React from 'react';
import Image from 'next/image';
import { brands, brandColors } from '@/data/products';
import { Brand } from '@/types';

interface CategoriesProps {
  onSelectBrand?: (brand: Brand | 'All') => void;
  selectedBrand?: Brand | 'All';
}

export function Categories({ onSelectBrand, selectedBrand = 'All' }: CategoriesProps) {
  return (
    <section id="brands" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent-gold text-sm font-inter uppercase tracking-widest">
            Curated Selection
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mt-3">
            Shop by Brand
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Explore our exclusive collection from the world's most prestigious fashion houses
</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {brands.map(brand => {
            const isSelected = selectedBrand === brand;
            const brandColor = brandColors[brand];

            return (
              <button
                key={brand}
                onClick={() => onSelectBrand?.(isSelected ? 'All' : brand)}
                className={`group relative overflow-hidden rounded-xl aspect-[4/5] transition-all duration-500 ${
                  isSelected
                    ? 'ring-2 ring-accent-gold scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}cc 100%)`,
                  }}
                />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id={`pattern-${brand.replace(/\s+/g, '')}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="white" />
                    </pattern>
                    <rect width="100" height="100" fill={`url(#pattern-${brand.replace(/\s+/g, '')})`} />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-playfair text-lg md:text-xl font-bold text-white mb-1">
                      {brand}
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm font-inter">
                      {getBrandDescription(brand)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-accent-gold text-sm font-medium">
                        Explore
                      </span>
                      <svg
                        className="w-4 h-4 text-accent-gold transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent-gold/20 to-transparent" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getBrandDescription(brand: Brand): string {
  const descriptions: Record<Brand, string> = {
    'Gucci': 'Italian Excellence',
    'Louis Vuitton': 'French Heritage',
    'Prada': 'Milanese Innovation',
    'Hermès': 'Artisan Craftsmanship',
    'Chanel': 'Timeless Elegance',
    'Dior': 'Parisian Chic',
    'Balenciaga': 'Avant-Garde',
    'Bottega Veneta': 'Intrecciato Art',
  };
  return descriptions[brand];
}
