'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Badge, ConditionBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPriceUSD, formatPriceSOL } from '@/lib/format';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const inCart = isInCart(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 0) return;

    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    addItem(product);
    setIsAdding(false);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product);
  };

  return (
    <article
      className="group relative bg-secondary rounded-xl overflow-hidden border border-white/5 hover:border-accent-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent-gold/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={handleViewDetails}
      >
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <span className="text-text-secondary text-sm">Image unavailable</span>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Quick Actions */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              // Wishlist functionality placeholder
            }}
            className="p-2 bg-secondary/80 backdrop-blur-sm rounded-full hover:bg-secondary transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-text-primary" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="p-2 bg-secondary/80 backdrop-blur-sm rounded-full hover:bg-secondary transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-text-primary" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="gold" size="sm">
              Featured
            </Badge>
          )}
          <ConditionBadge condition={product.condition} />
        </div>

        {/* Stock Warning */}
        {product.stock > 0 && product.stock <= 2 && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="warning" size="sm" pulse>
              Only {product.stock} left
            </Badge>
          </div>
        )}

        {/* Out of Stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-text-primary font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Price */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-inter text-accent-gold uppercase tracking-wider">
            {product.brand}
          </span>
          <div className="text-right">
            <span className="text-lg font-bold text-accent-gold font-space">
              {formatPriceSOL(product.price)} SOL
            </span>
            <p className="text-xs text-text-secondary font-space">
              ${formatPriceUSD(product.priceUSD)}
            </p>
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-playfair text-base font-semibold text-text-primary line-clamp-2 cursor-pointer hover:text-accent-gold transition-colors"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-xs text-text-secondary font-inter">
          {product.category}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant={inCart ? 'secondary' : 'primary'}
            size="sm"
            fullWidth
            onClick={inCart ? openCart : handleAddToCart}
            isLoading={isAdding}
            disabled={product.stock === 0}
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            {inCart ? 'In Cart' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className={`h-0.5 bg-accent-gold transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
      />
    </article>
  );
}