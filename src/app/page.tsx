'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductModal } from '@/components/ProductModal';
import { Cart } from '@/components/Cart';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Footer } from '@/components/Footer';
import { Product, Brand } from '@/types';
import { featuredProducts } from '@/data/products';
import { formatPriceUSD, formatPriceSOL } from '@/lib/format';
import { Sparkles, Shield, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'All'>('All');

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, []);

  const handleBrandSelect = useCallback((brand: Brand | 'All') => {
    setSelectedBrand(brand);
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCloseProductModal = useCallback(() => {
    setIsProductModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  const handleOpenCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Bar */}
      <section className="bg-secondary border-y border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">100% Authentic</p>
                <p className="text-xs text-text-secondary">Verified by experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Fast Delivery</p>
                <p className="text-xs text-text-secondary">Worldwide shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Global Reach</p>
                <p className="text-xs text-text-secondary">150+ countries</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Crypto Ready</p>
                <p className="text-xs text-text-secondary">Pay with SOL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent-gold text-sm font-inter uppercase tracking-widest">
              Curated Selection
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mt-3">
              Featured Collection
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Discover our hand-picked selection of the most sought-after luxury bags,
              authenticated and ready for worldwide delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => handleProductSelect(product)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-4 py-2 bg-accent-gold text-primary text-sm font-medium rounded-lg">
                      View Details
                    </span>
                  </div>
                </div>
                <span className="text-xs text-accent-gold uppercase tracking-wider">{product.brand}</span>
                <h3 className="font-playfair text-lg font-semibold text-text-primary mt-1 group-hover:text-accent-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl font-bold font-space text-accent-gold mt-2">
                  {formatPriceSOL(product.price)} SOL
                </p>
                <p className="text-sm text-text-secondary font-space">
                  ${formatPriceUSD(product.priceUSD)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <Categories onSelectBrand={handleBrandSelect} selectedBrand={selectedBrand} />

      {/* All Products Grid */}
      <ProductGrid
        selectedBrand={selectedBrand}
        onProductSelect={handleProductSelect}
        showFilters={true}
      />

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-gold text-sm font-inter uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mt-3 mb-6">
                Where Luxury Meets Innovation
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  NVStore Exclusive is your premier destination for authenticated luxury designer bags.
                  Founded by connoisseurs with decades of experience in the luxury goods industry,
                  we bridge the gap between traditional fashion retail and the emerging Web3 ecosystem.
                </p>
                <p>
                  Every bag in our collection undergoes rigorous authentication by certified experts.
                  From Hermès Birkin to Chanel Classic Flap, each piece tells a story of craftsmanship,
                  heritage, and timeless elegance.
                </p>
                <p>
                  We accept SOL payments, offering seamless transactions powered by the Solana blockchain.
                  Experience the future of luxury shopping today.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary rounded-xl p-6 border border-white/5">
                  <p className="text-4xl font-bold font-space text-accent-gold">500+</p>
                  <p className="text-sm text-text-secondary mt-1">Authenticated Pieces</p>
                </div>
                <div className="bg-primary rounded-xl p-6 border border-white/5">
                  <p className="text-4xl font-bold font-space text-accent-gold">8</p>
                  <p className="text-sm text-text-secondary mt-1">Designer Brands</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-primary rounded-xl p-6 border border-white/5">
                  <p className="text-4xl font-bold font-space text-accent-gold">150+</p>
                  <p className="text-sm text-text-secondary mt-1">Countries Served</p>
                </div>
                <div className="bg-primary rounded-xl p-6 border border-white/5">
                  <p className="text-4xl font-bold font-space text-accent-gold">100%</p>
                  <p className="text-sm text-text-secondary mt-1">Authenticity Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />

      <Cart onCheckout={handleOpenCheckout} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </main>
  );
}