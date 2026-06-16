'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { featuredProducts } from '@/data/products';

const heroSlides = [
  {
    id: 1,
    title: 'Luxury Reimagined',
    subtitle: 'Discover exclusive designer pieces',
    description: 'Curated collection of authenticated luxury bags from the world\'s most prestigious houses.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&h=1080&fit=crop',
    cta: 'Shop Collection',
  },
  {
    id: 2,
    title: 'Hermès Heritage',
    subtitle: 'Iconic Birkin & Kelly',
    description: 'Authentic Hermès handbags, handcrafted by master artisans in France.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1920&h=1080&fit=crop',
    cta: 'View Selection',
  },
  {
    id: 3,
    title: 'Crypto Luxury',
    subtitle: 'Pay with SOL',
    description: 'Seamless blockchain payments. Connect your Phantom wallet and shop in seconds.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26be2ea3c?w=1920&h=1080&fit=crop',
    cta: 'Learn More',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
<div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[6000ms]"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-inter tracking-wide">
              {heroSlides[currentSlide].subtitle}
            </span>

            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-lg text-text-secondary max-w-lg">
              {heroSlides[currentSlide].description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#collections">
                <Button
                  size="lg"
                  leftIcon={<ShoppingBag className="w-5 h-5" />}
 className="shadow-lg shadow-accent-gold/20"
                >
                  {heroSlides[currentSlide].cta}
                </Button>
              </Link>
              <Link href="#brands">
                <Button variant="outline" size="lg">
                  Explore Brands
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-secondary/80 backdrop-blur-sm border border-white/10 rounded-full hover:bg-secondary transition-colors group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-text-primary group-hover:text-accent-gold transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-secondary/80 backdrop-blur-sm border border-white/10 rounded-full hover:bg-secondary transition-colors group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-text-primary group-hover:text-accent-gold transition-colors" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent-gold w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Featured Product Badge */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-secondary/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-xs">
          <p className="text-xs text-accent-gold mb-2 font-inter uppercase tracking-wider">
            Featured
</p>
          <div className="flex items-center gap-3">
            <img
              src={featuredProducts[0]?.image}
              alt={featuredProducts[0]?.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <p className="text-sm text-text-primary font-medium">
                {featuredProducts[0]?.name}
              </p>
              <p className="text-xs text-text-secondary">
                {featuredProducts[0]?.brand}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
