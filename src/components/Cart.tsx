'use client';

import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem';
import { Button } from '@/components/ui/Button';
import { formatPriceUSD, formatPriceSOL } from '@/lib/format';

interface CartProps {
  onCheckout?: () => void;
}

export function Cart({ onCheckout }: CartProps) {
  const { items, isOpen, closeCart, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-primary border-l border-white/10 z-50 animate-slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-accent-gold" />
            <h2 className="font-playfair text-xl font-bold text-text-primary">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-accent-gold/20 text-accent-gold text-xs font-medium rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-text-secondary" />
            </div>
            <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2">
              Your cart is empty
            </h3>
            <p className="text-text-secondary mb-6 max-w-xs">
              Discover our exclusive collection of luxury designer bags and add your favorites.
            </p>
            <Button onClick={closeCart} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-secondary/50">
              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-space">{formatPriceSOL(totalPrice)} SOL (${formatPriceUSD(totalPrice * 150)})</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Estimated Gas Fee</span>
                  <span>~0.0005 SOL</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-text-primary">Total</span>
                  <span className="text-accent-gold font-space">
                    {(totalPrice + 0.0005).toFixed(4)} SOL
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">≈ USD</span>
                  <span className="text-text-secondary font-space">
                    ${formatPriceUSD((totalPrice + 0.0005) * 150)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={onCheckout}
                  fullWidth
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Checkout with SOL
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-text-secondary text-xs">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Authentic Guarantee</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}