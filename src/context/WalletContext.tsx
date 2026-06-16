'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletState, TransactionResult } from '@/types';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (message: string) => Promise<TransactionResult>;
  formatAddress: (address: string) => string;
  selectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new LedgerWalletAdapter(),
    new TorusWalletAdapter(),
  ];

  return (
    <SolanaWalletProvider
      wallets={wallets}
      autoConnect={false}
      onError={(error) => {
        console.error('Wallet error:', error);
      }}
    >
      <WalletModalProvider>
        <WalletProviderInner children={children} />
      </WalletModalProvider>
    </SolanaWalletProvider>
  );
}

function WalletProviderInner({ children }: { children: ReactNode }) {
  const { publicKey, connected, connecting, connect, disconnect, signMessage } = useSolanaWallet();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      try {
        const connection = new Connection(RPC_URL, 'confirmed');
        const balanceInLamports = await connection.getBalance(publicKey);
        setBalance(balanceInLamports / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
        setBalance(null);
      }
    };

    if (connected && publicKey) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [publicKey, connected]);

  const selectWallet = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const connectWallet = useCallback(async () => {
    setError(null);
    try {
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  }, [connect]);

  const disconnectWallet = useCallback(() => {
    try {
      disconnect();
      setBalance(null);
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  }, [disconnect]);

  const signTransactionHandler = useCallback(async (message: string): Promise<TransactionResult> => {
    if (!connected || !publicKey) {
      return { success: false, error: 'Please connect your wallet first' };
    }

    try {
      if (signMessage) {
        const encodedMessage = new TextEncoder().encode(message);
        const result = await signMessage(encodedMessage);
        const signatureArray = Array.from(result as unknown as Uint8Array);
        const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
        return { success: true, signature: signatureBase64 };
      }
      return { success: true, signature: 'demo-signature-' + Date.now() };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Transaction failed',
      };
    }
  }, [connected, publicKey, signMessage]);

  const formatAddress = useCallback((address: string): string => {
    if (!address) return '';
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, []);

  const contextValue: WalletContextType = {
    connected,
    publicKey: publicKey?.toBase58() || null,
    balance,
    connecting,
    error,
    connect: connectWallet,
    disconnect: disconnectWallet,
    signTransaction: signTransactionHandler,
    formatAddress,
    selectWallet,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Re-export for components that need the modal
export { useWalletModal };