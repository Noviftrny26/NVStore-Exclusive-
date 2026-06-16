'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, ChevronDown, LogOut, Copy, Check, ExternalLink } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export function WalletButton() {
  const { connected, publicKey, connecting, connect, disconnect, formatAddress } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleCopyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDisconnectModal(false);
    setShowDropdown(false);
  };

  if (connected && publicKey) {
    return (
      <div className="relative wallet-dropdown-container">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-accent-gold/30 rounded-lg hover:border-accent-gold/50 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-inter text-text-primary hidden sm:inline">
            {formatAddress(publicKey)}
          </span>
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-secondary border border-white/10 rounded-xl shadow-2xl animate-scale-in overflow-hidden z-50">
            <div className="p-4 border-b border-white/10">
              <p className="text-xs text-text-secondary mb-1">Connected Wallet</p>
              <p className="text-sm font-mono text-text-primary break-all">
                {publicKey}
              </p>
            </div>

            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-primary hover:bg-white/5 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>

              <a
                href={`https://solscan.io/account/${publicKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-primary hover:bg-white/5 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">View on Solscan</span>
              </a>

              <button
                onClick={() => setShowDisconnectModal(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Disconnect</span>
              </button>
            </div>
          </div>
        )}

        <Modal
          isOpen={showDisconnectModal}
          onClose={() => setShowDisconnectModal(false)}
          title="Disconnect Wallet"
          size="sm"
        >
          <p className="text-text-secondary mb-6">
            Are you sure you want to disconnect your wallet?
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setShowDisconnectModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDisconnect}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Disconnect
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      isLoading={connecting}
      disabled={connecting}
      leftIcon={<Wallet className="w-4 h-4" />}
      variant="outline"
      size="md"
    >
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Wallet</span>
    </Button>
  );
}
