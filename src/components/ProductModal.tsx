'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, Heart, Share2, Check, ExternalLink } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge, ConditionBadge, StockBadge } from '@/components/ui/Badge';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem, isInCart, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const inCart = isInCart(product.id);
  const maxQuantity = Math.min(product.stock, 10);

  const handleAddToCart = async () => {
    if (product.stock === 0 || quantity > product.stock) return;

    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAdding(false);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
      openCart();
    }, 1000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, maxQuantity)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.brand} ${product.name}`,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" showCloseButton={false}>
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 p-2 bg-secondary rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-text-primary" />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-secondary">Image not available</span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge variant="gold" size="md">
                    Featured
                  </Badge>
                )}
                <ConditionBadge condition={product.condition} />
              </div>

              <StockBadge stock={product.stock} className="absolute top-4 right-4" />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-accent-gold'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand & Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-accent-gold font-inter text-sm uppercase tracking-widest">
                {product.brand}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5 text-text-secondary" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-text-secondary hover:text-error transition-colors" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold font-space text-accent-gold">
                {product.price} SOL
              </span>
              <span className="text-text-secondary text-sm">
                ${(product.price * 150).toLocaleString()} est. value
              </span>
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary rounded-xl">
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">
                  Category
                </span>
                <p className="text-text-primary font-medium mt-1">{product.category}</p>
              </div>
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">
                  Condition
                </span>
                <p className="text-text-primary font-medium mt-1">{product.condition}</p>
              </div>
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">
                  Brand
                </span>
                <p className="text-text-primary font-medium mt-1">{product.brand}</p>
              </div>
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">
                  Stock
                </span>
                <p className="text-text-primary font-medium mt-1">
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <span className="text-text-secondary text-xs uppercase tracking-wider block mb-3">
                  Quantity
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-secondary rounded-lg border border-white/10">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-text-primary" />
                    </button>
                    <span className="w-12 text-center text-text-primary font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= maxQuantity}
                      className="p-3 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-text-primary" />
                    </button>
                  </div>
                  <span className="text-text-secondary text-sm">
                    Max: {maxQuantity}
                  </span>
                </div>
              </div>
            )}

            {/* Total */}
            {product.stock > 0 && quantity > 1 && (
              <div className="mb-6 flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-white/5">
                <span className="text-text-secondary">Total Price:</span>
                <span className="text-xl font-bold font-space text-accent-gold">
                  {product.price * quantity} SOL
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <Button
                onClick={handleAddToCart}
                isLoading={isAdding}
                disabled={product.stock === 0 || addedToCart}
                fullWidth
                size="lg"
                leftIcon={
                  addedToCart ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )
                }
                className={addedToCart ? 'bg-success hover:bg-success' : ''}
              >
                {addedToCart
                  ? 'Added to Cart!'
                  : inCart
                  ? 'Add More to Cart'
                  : product.stock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </Button>

              <Button
                variant="outline"
                fullWidth
                size="lg"
                leftIcon={<ExternalLink className="w-4 h-4" />}
              >
                View on Solana Blockchain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}