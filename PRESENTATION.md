# 🎨 NVStore Exclusive - Project Presentation

## Slide 1: Cover

---

# 🛍️ NVStore Exclusive
## Web3 Luxury Marketplace

**Premium Designer Bags Marketplace on Solana Blockchain**

🌐 **Live Demo:** https://nvstore-exclusive.vercel.app

📦 **Tech Stack:** Next.js 14 • TypeScript • Tailwind CSS • Solana Web3

---

## Slide 2: Project Overview

---

# 📋 Project Overview

## Apa itu NVStore Exclusive?

NVStore Exclusive adalah **marketplace e-commerce Web3** untuk jual-beli tas designer mewah premium dengan pembayaran menggunakan cryptocurrency **Solana (SOL)**.

### Fitur Utama:
| Fitur | Keterangan |
|-------|------------|
| 🛍️ **Product Catalog** | 12+ tas designer premium |
| 💳 **Crypto Payment** | Pembayaran dengan SOL/SPL Token |
| 👛 **Wallet Integration** | Phantom, Solflare, Coinbase, Ledger, Torus |
| 🛒 **Shopping Cart** | Full-featured cart dengan localStorage persistence |
| 📱 **Responsive Design** | Mobile-first approach |

### Brand yang Tersedia:
- **Gucci** | **Louis Vuitton** | **Prada** | **Hermès**
- **Chanel** | **Dior** | **Balenciaga** | **Bottega Veneta**

---

## Slide 3: Tech Stack

---

# 🛠️ Technology Stack

## Frontend Framework
```
Next.js 14.1.4
├── App Router
├── Server Components
└── Static Site Generation
```

## Programming Language
```
TypeScript 5.4.2
├── Strict Type Checking
├── Full Type Safety
└── IntelliSense Support
```

## Styling
```
Tailwind CSS 3.4.1
├── Custom Color Palette
├── Custom Animations
└── Responsive Utilities
```

## Blockchain Integration
```
Solana Web3 Ecosystem
├── @solana/web3.js - Blockchain interaction
├── @solana/wallet-adapter-react - Wallet management
└── @solana/wallet-adapter-wallets - Multi-wallet support
```

## UI Components
```
Lucide React - Icons
├── Custom Button Component
├── Modal System
├── Badge & Skeleton
└── Cart Sidebar
```

---

## Slide 4: Design System

---

# 🎨 Design System

## Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Primary** | `#0D0D0D` | Deep Black - Main background |
| **Secondary** | `#1A1A1A` | Charcoal - Card backgrounds |
| **Accent Gold** | `#C9A962` | Luxury Gold - Primary accent |
| **Accent Rose** | `#E8D4B8` | Champagne - Secondary accent |
| **Text Primary** | `#FFFFFF` | White - Main text |
| **Text Secondary** | `#A0A0A0` | Gray - Muted text |
| **Success** | `#4ADE80` | Green - Success states |
| **Error** | `#F87171` | Red - Error states |

## Typography

| Font | Family | Usage |
|------|--------|-------|
| **Playfair Display** | Serif | Headings - Elegant luxury feel |
| **Inter** | Sans-serif | Body text - Modern readability |
| **Space Grotesk** | Monospace | Prices, crypto amounts - Tech aesthetic |

## Design Philosophy
```
Luxury Minimalist + Web3 Futuristic
├── Glassmorphism cards dengan backdrop-blur
├── Gradient borders on hover
├── Smooth 60fps animations
└── Dark mode primary
```

---

## Slide 5: Project Structure

---

# 📁 Project Structure

```
nvstore-exclusive/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout dengan providers
│   │   ├── page.tsx            # Homepage utama
│   │   └── globals.css         # Global styles & Tailwind
│   │
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Categories.tsx      # Brand categories
│   │   ├── ProductGrid.tsx     # Product listing
│   │   ├── ProductCard.tsx      # Individual product card
│   │   ├── ProductModal.tsx    # Product detail modal
│   │   ├── Cart.tsx            # Cart sidebar
│   │   ├── CartItem.tsx        # Cart item component
│   │   ├── WalletButton.tsx    # Wallet connection button
│   │   ├── CheckoutModal.tsx   # Checkout flow
│   │   ├── Footer.tsx          # Footer section
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       └── Skeleton.tsx
│   │
│   ├── context/
│   │   ├── WalletContext.tsx    # Wallet state management
│   │   └── CartContext.tsx      # Cart state management
│   │
│   ├── data/
│   │   └── products.ts          # Product catalog data
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   │
│   └── lib/
│       └── format.ts            # Utility functions
│
├── public/                      # Static assets
├── package.json
├── tailwind.config.js           # Tailwind customization
├── tsconfig.json
└── SPEC.md                      # Project specification
```

---

## Slide 6: Key Components

---

# 🧩 Key Components

## 1. Header Component
```
Features:
├── Fixed position, transparent to solid on scroll
├── Logo + Navigation menu
├── Wallet connection button
├── Cart icon dengan item count badge
└── Mobile responsive hamburger menu
```

## 2. Hero Section
```
Features:
├── Full viewport height
├── Animated background gradient
├── Featured product showcase
├── CTA buttons (Shop Now, Connect Wallet)
└── Floating particles animation
```

## 3. Product Components
```
ProductGrid:
├── Responsive grid (1-4 columns)
├── Brand filter
├── Price sort
├── Search functionality
└── Loading skeleton

ProductCard:
├── Image dengan hover zoom effect
├── Brand badge
├── Price in SOL & USD
├── Stock indicator
└── "View Details" overlay on hover

ProductModal:
├── Full-screen overlay
├── Image gallery
├── Product details
├── Add to cart functionality
└── Quantity selector
```

## 4. Cart Components
```
Cart Sidebar:
├── Slide-in from right
├── Item list dengan quantity
├── Remove/update quantity
├── Subtotal calculation
├── Checkout button
└── Empty state handling
```

---

## Slide 7: Wallet Integration

---

# 👛 Wallet Integration

## Supported Wallets

| Wallet | Adapter | Status |
|--------|---------|--------|
| **Phantom** | PhantomWalletAdapter | ✅ Primary |
| **Solflare** | SolflareWalletAdapter | ✅ Supported |
| **Coinbase** | CoinbaseWalletAdapter | ✅ Supported |
| **Ledger** | LedgerWalletAdapter | ✅ Supported |
| **Torus** | TorusWalletAdapter | ✅ Supported |

## Wallet Features

### Connection Flow
```
1. User clicks "Connect Wallet"
2. Wallet modal opens
3. User selects wallet
4. Browser extension prompts approval
5. Connection established
6. Display: Address (truncated) + SOL balance
```

### State Management
```typescript
interface WalletState {
  connected: boolean;      // Connection status
  publicKey: string | null; // Wallet address
  balance: number | null;   // SOL balance
  connecting: boolean;     // Loading state
  error: string | null;     // Error message
}
```

### Balance Fetching
```
- RPC Endpoint: https://api.mainnet-beta.solana.com
- Auto-refresh every 30 seconds
- Formatted display: X.XX SOL
```

---

## Slide 8: Product Catalog

---

# 🛍️ Product Catalog

## Sample Products

| Brand | Product Name | Price (SOL) | Price (USD) | Stock |
|-------|--------------|-------------|-------------|-------|
| Hermès | Birkin 25 | 180 | ~$27,000 | 2 |
| Hermès | Kelly 28 | 150 | ~$22,500 | 2 |
| Chanel | Classic Flap Bag Medium | 120 | ~$18,000 | 2 |
| Dior | Lady Dior Medium | 95 | ~$14,250 | 3 |
| Louis Vuitton | Neverfull MM | 52 | ~$7,800 | 5 |
| Gucci | Dionysus GG Supercenter | 55 | ~$8,250 | 3 |
| Louis Vuitton | Alma BB | 48 | ~$7,200 | 5 |
| Gucci | GG Marmont Small Shoulder Bag | 45 | ~$6,750 | 3 |
| Balenciaga | Le Cagole XS | 42 | ~$6,300 | 6 |
| Prada | Re-Edition 2005 Saffiano | 38 | ~$5,700 | 4 |
| Bottega Veneta | Cassette Bag | 35 | ~$5,250 | 4 |
| Prada | Nylon Bucket Bag | 28 | ~$4,200 | 8 |

## Product Attributes
```
├── id: Unique identifier
├── brand: Designer brand (8 options)
├── name: Product name
├── description: Detailed description
├── price: Price in SOL (integer)
├── priceUSD: Price in USD (integer)
├── image: Product image URL
├── images: Image gallery array
├── stock: Available quantity
├── condition: "New" | "Pre-owned"
├── category: Product category
└── featured: Featured flag (boolean)
```

---

## Slide 9: Checkout Flow

---

# 🛒 Checkout Flow

## Step-by-Step Process

```
┌─────────────────────────────────────────────────────────┐
│  STEP 1: Cart Review                                    │
│  ├── View cart items                                    │
│  ├── Adjust quantities                                  │
│  ├── See subtotal                                       │
│  └── Click "Checkout"                                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 2: Shipping Information                           │
│  ├── Full Name                                          │
│  ├── Email Address                                      │
│  ├── Phone Number                                       │
│  ├── Shipping Address                                   │
│  ├── City & Country                                     │
│  └── Postal Code                                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 3: Wallet Connection                              │
│  ├── Connect wallet if not connected                    │
│  ├── Verify SOL balance                                 │
│  └── Confirm transaction                                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 4: Transaction Simulation                         │
│  ├── Sign transaction (wallet prompt)                   │
│  ├── Wait for confirmation                              │
│  └── Generate mock signature                            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 5: Order Confirmation                             │
│  ├── Success animation                                  │
│  ├── Order summary                                      │
│  ├── Transaction hash display                           │
│  └── Continue shopping option                           │
└─────────────────────────────────────────────────────────┘
```

---

## Slide 10: Responsive Design

---

# 📱 Responsive Design

## Breakpoints

| Breakpoint | Screen Size | Columns |
|------------|-------------|---------|
| **Mobile** | < 640px | 1 column |
| **Tablet** | 640px - 1024px | 2 columns |
| **Desktop** | > 1024px | 4 columns |

## Mobile Optimizations

```
Header:
├── Hamburger menu for navigation
├── Collapsible cart
└── Compact wallet button

Product Grid:
├── Single column layout
├── Touch-friendly tap targets
└── Swipeable image galleries

Cart:
├── Full-screen drawer
├── Large touch buttons
└── Simplified checkout flow

Typography:
├── Scaled font sizes
├── Appropriate line heights
└── Readable on small screens
```

## Animation Adaptations
```
├── Reduced motion for performance
├── GPU-accelerated transforms
└── 60fps target on all devices
```

---

## Slide 11: Deployment

---

# 🚀 Deployment

## Live URL

### **https://nvstore-exclusive.vercel.app**

## Deployment Platform
```
Vercel - Optimal for Next.js
├── Automatic HTTPS/SSL
├── Edge Network (Global CDN)
├── Preview Deployments
├── Git Integration (GitHub)
└── Environment Variables
```

## Build Configuration

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run build` |
| **Output Directory** | Next.js default |
| **Runtime** | Node.js 18+ |
| **Region** | Washington D.C. (iad1) |
| **Build Time** | ~47 seconds |

## GitHub Integration
```
Repository: https://github.com/Noviftrny26/NVStore-Exclusive-
Branch: main
Auto-deploy: On every push
```

---

## Slide 12: Future Enhancements

---

# 🔮 Future Enhancements

## Short-term (Q3 2026)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Real transaction signing | High | Medium |
| NFT-based ownership certificate | High | High |
| User authentication (Web3Auth) | Medium | High |
| Order history tracking | Medium | Medium |
| Wishlist functionality | Low | Low |

## Long-term (Q4 2026)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Multi-chain support (Ethereum, Polygon) | High | High |
| Decentralized storage (IPFS) | Medium | High |
| DAO governance for rare items | Low | Very High |
| Mobile app (React Native) | Medium | Very High |

## Technical Improvements

```
├── Upgrade to Next.js 15
├── Add unit tests (Jest/Vitest)
├── E2E testing (Playwright)
├── Analytics integration
├── SEO optimization
└── PWA support
```

---

## Slide 13: Conclusion

---

# ✅ Conclusion

## NVStore Exclusive

**A modern Web3 e-commerce platform combining luxury fashion with blockchain technology.**

### Key Achievements

✅ **Full-stack Next.js application**  
✅ **Multi-wallet Solana integration**  
✅ **Beautiful luxury dark theme UI**  
✅ **Complete shopping experience**  
✅ **Production deployment on Vercel**  
✅ **Responsive mobile-first design**

### Live Demo

## 🌐 **https://nvstore-exclusive.vercel.app**

### Connect Wallet & Start Shopping!

```
Supported Wallets:
• Phantom  • Solflare  • Coinbase  • Ledger  • Torus
```

---

## Contact & Links

| Resource | Link |
|----------|------|
| **Live Demo** | https://nvstore-exclusive.vercel.app |
| **GitHub Repo** | https://github.com/Noviftrny26/NVStore-Exclusive- |
| **Owner** | Noviftrny26 |

---

*Thank you for your attention!*
