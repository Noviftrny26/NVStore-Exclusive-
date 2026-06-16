'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { ConditionBadge } from '@/components/ui/Badge';
import { formatPriceUSD, formatPriceSOL } from '@/lib/format';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex gap-4 p-4 bg-secondary rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
        {quantity > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-gold text-primary text-xs font-bold rounded-full flex items-center justify-center">
            {quantity}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-xs text-accent-gold font-inter uppercase tracking-wider">
              {product.brand}
            </span>
            <h4 className="text-sm font-playfair font-semibold text-text-primary truncate mt-0.5">
              {product.name}
            </h4>
            <div className="mt-1">
              <ConditionBadge condition={product.condition} />
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="p-1.5 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-primary rounded-lg border border-white/10">
            <button
              onClick={handleDecrement}
              className="p-1.5 hover:bg-white/5 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 text-text-primary" />
            </button>
            <span className="w-8 text-center text-sm text-text-primary font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="p-1.5 hover:bg-white/5 transition-colors disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 text-text-primary" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-bold font-space text-accent-gold">
              {formatPriceSOL(product.price * quantity)} SOL
            </p>
            <p className="text-xs text-text-secondary font-space">
              ${formatPriceUSD(product.priceUSD * quantity)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-text-secondary">
                {formatPriceSOL(product.price)} SOL / ${formatPriceUSD(product.priceUSD)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}