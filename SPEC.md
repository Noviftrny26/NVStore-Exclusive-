# NVStore Exclusive - Web3 Branded Bags Marketplace

## 1. Project Overview

**Project Name:** NVStore Exclusive  
**Type:** Web3 E-commerce Marketplace  
**Blockchain:** Solana  
**Wallet:** Phantom  
**Tech Stack:** Next.js 14 + TypeScript + Tailwind CSS + Solana Web3.js + Phantom Wallet Adapter

### Core Functionality
Platform marketplace untuk jual-beli tas bermerk premium (Gucci, Louis Vuitton, Prada, Hermès, Chanel, Dior, Balenciaga, Bottega Veneta) dengan pembayaran menggunakan cryptocurrency Solana (SOL) dan token SPL.

---

## 2. Visual & UI Specification

### Design Theme
- **Style:** Luxury Minimalist dengan sentuhan futuristik Web3
- **Color Palette:**
  - Primary: `#0D0D0D` (Deep Black)
  - Secondary: `#1A1A1A` (Charcoal)
  - Accent Gold: `#C9A962` (Luxury Gold)
  - Accent Rose: `#E8D4B8` (Champagne)
  - Text Primary: `#FFFFFF`
  - Text Secondary: `#A0A0A0`
  - Success: `#4ADE80`
  - Error: `#F87171`

### Typography
- **Headings:** "Playfair Display" (serif, elegant)
- **Body:** "Inter" (sans-serif, modern)
- **Accent/Numbers:** "Space Grotesk" (for prices, crypto amounts)

### Layout
- **Header:** Fixed, transparent to solid on scroll, logo + navigation + wallet connect
- **Hero Section:** Full viewport, featured product carousel
- **Categories:** Horizontal scroll cards with brand logos
- **Product Grid:** 4-column responsive grid with hover effects
- **Product Detail Modal:** Full-screen overlay with image gallery
- **Cart Sidebar:** Slide-in from right
- **Footer:** Minimal with social links and blockchain info

### Visual Effects
- Glassmorphism cards dengan backdrop-blur
- Gradient borders on hover
- Smooth page transitions
- Loading skeletons
- Floating particles/sparkles animation

---

## 3. Features Specification

### 3.1 Wallet Integration
- Phantom wallet connection (detect, connect, disconnect)
- Display connected wallet address (truncated)
- Show SOL balance
- Network detection (Mainnet/Devnet)
- Auto-reconnect on page reload

### 3.2 Product Catalog
- 12+ luxury bag products dengan:
  - High-quality images (placeholder dengan gradient backgrounds)
  - Brand name, product name, description
  - Price in SOL
  - Stock status
  - Condition (New/Pre-owned)
- Filter by brand
- Sort by price (low-high, high-low)
- Search functionality

### 3.3 Shopping Cart
- Add to cart with quantity
- Remove from cart
- Update quantity
- Calculate total in SOL
- Persist cart in localStorage

### 3.4 Checkout Flow
- Review order summary
- Enter shipping information
- Connect wallet if not connected
- Simulate blockchain transaction
- Transaction confirmation screen
- Order success animation

### 3.5 User Interface States
- Loading states with skeleton
- Empty cart state
- Wallet not connected state
- Transaction pending state
- Transaction success/failure state

---

## 4. Component Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Categories.tsx
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   ├── Cart.tsx
│   ├── CartItem.tsx
│   ├── WalletButton.tsx
│   ├── CheckoutModal.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       └── Skeleton.tsx
├── context/
│   ├── WalletContext.tsx
│   └── CartContext.tsx
├── data/
│   └── products.ts
├── types/
│   └── index.ts
└── lib/
    └── solana.ts
```

---

## 5. Mock Data - Products

| Brand | Product | Price (SOL) | Stock |
|-------|---------|-------------|-------|
| Gucci | GG Marmont Small Shoulder Bag | 45 | 3 |
| Louis Vuitton | Neverfull MM | 52 | 5 |
| Prada | Re-Edition 2005 Saffiano | 38 | 4 |
| Hermès | Birkin 25 | 180 | 2 |
| Chanel | Classic Flap Bag Medium | 120 | 2 |
| Dior | Lady Dior Medium | 95 | 3 |
| Balenciaga | Le Cagole XS | 42 | 6 |
| Bottega Veneta | Cassette Bag | 35 | 4 |
| Gucci | Dionysus GG Supercenter | 55 | 3 |
| Louis Vuitton | Alma BB | 48 | 5 |
| Prada | Nylon Bucket Bag | 28 | 8 |
| Hermès | Kelly 28 | 150 | 2 |

---

## 6. Acceptance Criteria

1. ✅ Website loads without errors
2. ✅ Phantom wallet connects successfully
3. ✅ Products display correctly with all information
4. ✅ Cart functionality works (add, remove, update)
5. ✅ Checkout flow completes (simulated)
6. ✅ Responsive on mobile and desktop
7. ✅ All animations smooth (60fps)
8. ✅ No console errors
9. ✅ Ready for demo presentation

---

## 7. Solana Integration (Simulated)

Since this is a demo frontend, blockchain transactions will be simulated:
- Transaction signing prompt appears
- Fake transaction signature generated
- Success confirmation with mock tx hash

For production, integrate with actual Solana programs or use Candy Machine for NFT-based purchases.