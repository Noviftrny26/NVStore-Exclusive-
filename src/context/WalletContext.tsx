'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { WalletState, TransactionResult } from '@/types';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (message: string) => Promise<TransactionResult>;
  formatAddress: (address: string) => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface PhantomWallet {
  isPhantom?: boolean;
  publicKey?: { toString: () => string };
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on?: (event: string, callback: (...args: any[]) => void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off?: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomWallet;
    };
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    balance: null,
    connecting: false,
    error: null,
  });

  const getProvider = useCallback((): PhantomWallet | null => {
    if (typeof window !== 'undefined') {
      return window.phantom?.solana || null;
    }
    return null;
  }, []);

  const checkConnection = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      setState(prev => ({ ...prev, error: 'Phantom wallet not installed' }));
      return;
    }

    try {
      const response = await provider.connect();
      if (response.publicKey) {
        setState({
          connected: true,
          publicKey: response.publicKey.toString(),
          balance: null,
          connecting: false,
          error: null,
        });
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        connecting: false,
        error: err instanceof Error ? err.message : 'Failed to check connection',
      }));
    }
  }, [getProvider]);

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.connect().catch(() => {
        // Connection will be handled by user action
      });
    }
  }, [getProvider]);

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    const handleConnect = (response: { publicKey: { toString: () => string } }) => {
      setState({
        connected: true,
        publicKey: response.publicKey.toString(),
        balance: null,
        connecting: false,
        error: null,
      });
    };

    const handleDisconnect = () => {
      setState({
        connected: false,
        publicKey: null,
        balance: null,
        connecting: false,
        error: null,
      });
    };

    provider.on?.('connect', handleConnect);
    provider.on?.('disconnect', handleDisconnect);

    return () => {
      provider.off?.('connect', handleConnect);
      provider.off?.('disconnect', handleDisconnect);
    };
  }, [getProvider]);

  const connect = useCallback(async () => {
    const provider = getProvider();

    if (!provider) {
      setState(prev => ({ ...prev, error: 'Please install Phantom wallet extension' }));
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setState(prev => ({ ...prev, connecting: true, error: null }));

    try {
      const response = await provider.connect();
      setState({
        connected: true,
        publicKey: response.publicKey.toString(),
        balance: null,
        connecting: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        connecting: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      }));
    }
  }, [getProvider]);

  const disconnect = useCallback(() => {
    const provider = getProvider();
    if (provider) {
      provider.disconnect().catch(console.error);
    }
    setState({
      connected: false,
      publicKey: null,
      balance: null,
      connecting: false,
      error: null,
    });
  }, [getProvider]);

  const signTransaction = useCallback(async (message: string): Promise<TransactionResult> => {
    const provider = getProvider();

    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }

    if (!state.connected || !state.publicKey) {
      return { success: false, error: 'Please connect your wallet first' };
    }

    try {
      if (provider.signMessage) {
        const encodedMessage = new TextEncoder().encode(message);
        const { signature } = await provider.signMessage(encodedMessage);
        const signatureArray = Array.from(signature);
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
  }, [getProvider, state.connected, state.publicKey]);

  const formatAddress = useCallback((address: string): string => {
    if (!address) return '';
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        signTransaction,
        formatAddress,
      }}
    >
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
