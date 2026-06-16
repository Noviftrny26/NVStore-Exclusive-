'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '#' },
    { label: 'Best Sellers', href: '#' },
    { label: 'Designer Bags', href: '#' },
    { label: 'Pre-owned', href: '#' },
    { label: 'Sale', href: '#' },
  ],
  brands: [
    { label: 'Gucci', href: '#' },
    { label: 'Louis Vuitton', href: '#' },
    { label: 'Hermès', href: '#' },
    { label: 'Chanel', href: '#' },
    { label: 'Dior', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Authenticity', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Sustainability', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer id="about" className="bg-secondary border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-accent-gold" />
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-bold text-text-primary tracking-wide">
                  NVStore
                </span>
                <span className="text-[10px] text-accent-gold tracking-[0.3em] uppercase -mt-1">
                  Exclusive
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
              Your premier destination for authenticated luxury designer bags.
              Shop with confidence using cryptocurrency on the Solana blockchain.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@nvstore.exclusive" className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent-gold transition-colors">
                <Mail className="w-4 h-4" />
                hello@nvstore.exclusive
              </a>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <MapPin className="w-4 h-4" />
                Dubai, UAE
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary border border-white/10 flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-playfair font-semibold text-text-primary mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Links */}
          <div>
            <h4 className="font-playfair font-semibold text-text-primary mb-4">Brands</h4>
            <ul className="space-y-3">
              {footerLinks.brands.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-playfair font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-playfair font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-playfair text-2xl font-bold text-text-primary mb-3">
              Join the NVStore Club
            </h4>
            <p className="text-text-secondary text-sm mb-6">
              Subscribe for exclusive access to new arrivals, private sales, and blockchain-native rewards.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary border border-white/10 rounded-lg text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-gold text-primary font-medium rounded-lg hover:bg-amber-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
              <span>2024 NVStore Exclusive. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-accent-gold transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent-gold transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-accent-gold transition-colors">Cookie Policy</Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-secondary">Powered by</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-gold" viewBox="0 0 128 128" fill="currentColor">
                  <path d="M126.87 47.54c-2.02-8.1-10.14-12.32-18.13-12.32h-8.48c-2.96 0-5.37 2.4-5.37 5.36v5.35h-7.07c-9.54 0-17.29 7.76-17.29 17.29v22.58c0 9.54 7.76 17.29 17.29 17.29h7.07v5.36c0 2.96 2.4 5.36 5.37 5.36h8.48c7.99 0 16.11-4.22 18.13-12.32 1.56-6.25.18-12.77-3.83-18.02 4.02-5.25 5.4-11.77 3.83-18.02zM101.12 91.43H87.36V66.86h13.76v24.57zM93.74 61.51h-6.38v-6.15h6.38v6.15zM112.57 91.43h-6.37V66.86h6.37v24.57z"/>
                </svg>
                <span className="text-xs text-text-secondary font-medium">Solana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}