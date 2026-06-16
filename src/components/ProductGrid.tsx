'use client';

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import { Product, Brand, SortOption, FilterState } from '@/types';
import { brands, products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

interface ProductGridProps {
  selectedBrand?: Brand | 'All';
  onProductSelect?: (product: Product) => void;
  showFilters?: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

const conditionOptions = ['All', 'New', 'Pre-owned'] as const;

export function ProductGrid({
  selectedBrand = 'All',
  onProductSelect,
  showFilters = true,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterState, setFilterState] = useState<FilterState>({
    brand: 'All',
    minPrice: 0,
    maxPrice: 500,
    condition: 'All',
  });
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Brand filter
    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    } else if (filterState.brand !== 'All') {
      result = result.filter(p => p.brand === filterState.brand);
    }

    // Price filter
    result = result.filter(
      p => p.price >= filterState.minPrice && p.price <= filterState.maxPrice
    );

    // Condition filter
    if (filterState.condition !== 'All') {
      result = result.filter(p => p.condition === filterState.condition);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedBrand, filterState, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.brand !== 'All') count++;
    if (filterState.condition !== 'All') count++;
    if (filterState.minPrice > 0 || filterState.maxPrice < 500) count++;
    return count;
  }, [filterState]);

  const clearFilters = () => {
    setFilterState({
      brand: 'All',
      minPrice: 0,
      maxPrice: 500,
      condition: 'All',
    });
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div>
        <h4 className="text-sm font-inter font-semibold text-text-primary mb-3">
          Brand
        </h4>
        <div className="flex flex-wrap gap-2">
          {(['All', ...brands] as const).map(brand => (
            <button
              key={brand}
              onClick={() =>
                setFilterState(prev => ({ ...prev, brand: brand as Brand | 'All' }))
              }
              className={`px-3 py-1.5 text-xs font-inter rounded-full border transition-colors ${
                (brand === 'All' && filterState.brand === 'All') ||
                filterState.brand === brand
                  ? 'bg-accent-gold text-primary border-accent-gold'
                  : 'bg-transparent text-text-secondary border-white/20 hover:border-white/40'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-inter font-semibold text-text-primary mb-3">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={filterState.minPrice}
              onChange={e =>
                setFilterState(prev => ({
                  ...prev,
                  minPrice: Math.max(0, parseInt(e.target.value) || 0),
                }))
              }
              className="w-20 px-3 py-1.5 bg-secondary border border-white/10 rounded-lg text-sm text-text-primary focus:border-accent-gold focus:outline-none"
              placeholder="Min"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              value={filterState.maxPrice}
              onChange={e =>
                setFilterState(prev => ({
                  ...prev,
                  maxPrice: Math.max(0, parseInt(e.target.value) || 500),
                }))
              }
              className="w-20 px-3 py-1.5 bg-secondary border border-white/10 rounded-lg text-sm text-text-primary focus:border-accent-gold focus:outline-none"
              placeholder="Max"
            />
            <span className="text-xs text-text-secondary">SOL</span>
          </div>
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h4 className="text-sm font-inter font-semibold text-text-primary mb-3">
          Condition
        </h4>
        <div className="flex gap-2">
          {conditionOptions.map(condition => (
            <button
              key={condition}
              onClick={() =>
                setFilterState(prev => ({
                  ...prev,
                  condition: condition as 'All' | 'New' | 'Pre-owned',
                }))
              }
              className={`px-4 py-1.5 text-xs font-inter rounded-full border transition-colors ${
                filterState.condition === condition
                  ? 'bg-accent-gold text-primary border-accent-gold'
                  : 'bg-transparent text-text-secondary border-white/20 hover:border-white/40'
              }`}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          leftIcon={<X className="w-4 h-4" />}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <section id="collections" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-accent-gold text-sm font-inter uppercase tracking-widest">
              Our Collection
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mt-2">
              {selectedBrand !== 'All' ? selectedBrand : 'All Products'}
            </h2>
            <p className="text-text-secondary mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                leftIcon={<Filter className="w-4 h-4" />}
                className="lg:hidden"
              >
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="gold" size="sm" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            )}

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-4 py-2 pr-10 bg-secondary border border-white/10 rounded-lg text-sm text-text-primary focus:border-accent-gold focus:outline-none cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-accent-gold text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-accent-gold text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          {showFilters && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-secondary rounded-xl p-6 border border-white/5">
                <h3 className="font-playfair text-lg font-semibold text-text-primary mb-6">
                  Filters
                </h3>
                <FilterPanel />
              </div>
            </aside>
          )}

          {/* Mobile Filters */}
          {showFilters && showFiltersMobile && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
              <div className="absolute bottom-0 left-0 right-0 bg-secondary rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-right">
                <div className="sticky top-0 bg-secondary px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-playfair text-lg font-semibold text-text-primary">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFiltersMobile(false)}
                    className="p-2 hover:bg-white/5 rounded-lg"
                  >
                    <X className="w-5 h-5 text-text-primary" />
                  </button>
                </div>
                <div className="p-6">
                  <FilterPanel />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-secondary mb-4">No products found</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onProductSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}