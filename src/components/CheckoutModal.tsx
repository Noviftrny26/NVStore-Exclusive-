'use client';

import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Wallet, Package, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShippingInfo, TransactionResult } from '@/types';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { connected, publicKey, connect, signTransaction, formatAddress } = useWallet();

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const steps: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { key: 'shipping', label: 'Shipping', icon: <Package className="w-4 h-4" /> },
    { key: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'confirmation', label: 'Confirm', icon: <Check className="w-4 h-4" /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const isShippingValid = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key);
    }
  };

  const handlePrevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key);
    }
  };

  const handleProcessPayment = async () => {
    if (!connected) {
      await connect();
      return;
    }

    setIsProcessing(true);

    try {
      const result = await signTransaction(
        `NVStore Exclusive Purchase - Total: ${totalPrice} SOL - ${items.length} items`
      );

      setTransactionResult(result);

      if (result.success) {
        setStep('confirmation');
      }
    } catch (error) {
      setTransactionResult({
        success: false,
        error: 'Transaction failed. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = () => {
    clearCart();
    onClose();
    setStep('shipping');
    setShippingInfo({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    });
    setTransactionResult(null);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, index) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                index < currentStepIndex
                  ? 'bg-success text-primary'
                  : index === currentStepIndex
                  ? 'bg-accent-gold text-primary'
                  : 'bg-secondary text-text-secondary'
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="w-4 h-4" />
              ) : (
                s.icon
              )}
            </div>
            <span
              className={`text-sm font-inter hidden sm:inline ${
                index <= currentStepIndex ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {s.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                index < currentStepIndex ? 'bg-success' : 'bg-secondary'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-text-secondary mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-text-secondary mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="123 Luxury Avenue"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="New York"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
            placeholder="10001"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-text-secondary mb-2">Country</label>
          <select
            name="country"
            value={shippingInfo.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg text-text-primary focus:border-accent-gold focus:outline-none transition-colors"
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="SG">Singapore</option>
            <option value="AE">United Arab Emirates</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-secondary rounded-xl p-4">
        <h4 className="font-semibold text-text-primary mb-4">Order Summary</h4>
        <div className="space-y-2 text-sm">
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between">
              <span className="text-text-secondary">
                {item.product.name} x{item.quantity}
              </span>
              <span className="text-text-primary">
                {item.product.price * item.quantity} SOL
              </span>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary">{totalPrice} SOL</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-text-secondary">Gas Fee</span>
              <span className="text-text-primary">~0.0005 SOL</span>
            </div>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-white/10">
            <span className="text-text-primary">Total</span>
            <span className="text-accent-gold">{(totalPrice + 0.0005).toFixed(4)} SOL</span>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="bg-secondary rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-text-primary">Payment Method</h4>
          <Badge variant="gold" size="sm">SOL</Badge>
        </div>

        {connected && publicKey ? (
          <div className="flex items-center justify-between p-3 bg-primary rounded-lg border border-success/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Phantom Wallet</p>
                <p className="text-xs text-text-secondary">{formatAddress(publicKey)}</p>
              </div>
            </div>
            <Badge variant="success" size="sm">Connected</Badge>
          </div>
        ) : (
          <Button
            onClick={connect}
            variant="outline"
            fullWidth
            leftIcon={<Wallet className="w-4 h-4" />}
          >
            Connect Phantom Wallet
          </Button>
        )}
      </div>

      {transactionResult && !transactionResult.success && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
          <p className="text-sm text-error">{transactionResult.error}</p>
        </div>
      )}
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center py-8">
      {transactionResult?.success ? (
        <>
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-text-primary mb-2">
            Payment Successful!
          </h3>
          <p className="text-text-secondary mb-4">
            Your order has been placed and is being processed.
          </p>
          {transactionResult.signature && (
            <div className="bg-secondary rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-xs text-text-secondary mb-1">Transaction Signature</p>
              <p className="text-xs font-mono text-accent-gold break-all">
                {transactionResult.signature}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-error" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-text-primary mb-2">
            Payment Failed
          </h3>
          <p className="text-text-secondary mb-4">
            {transactionResult?.error || 'Something went wrong. Please try again.'}
          </p>
        </>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={step === 'confirmation' ? handleComplete : onClose}
      title={step === 'confirmation' ? '' : 'Checkout'}
      size="lg"
    >
      {step !== 'confirmation' && renderStepIndicator()}

      <div className="min-h-[400px]">
        {step === 'shipping' && renderShippingForm()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'confirmation' && renderConfirmationStep()}
      </div>

      {step !== 'confirmation' && (
        <div className="flex gap-3 mt-8">
          {currentStepIndex > 0 && (
            <Button
              variant="ghost"
              onClick={handlePrevStep}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step === 'shipping' ? (
            <Button
              onClick={handleNextStep}
              disabled={!isShippingValid()}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Continue to Payment
            </Button>
          ) : (
            <Button
              onClick={handleProcessPayment}
              disabled={!connected || isProcessing}
              isLoading={isProcessing}
              leftIcon={!isProcessing && <Wallet className="w-4 h-4" />}
            >
              {isProcessing ? 'Processing...' : 'Pay with SOL'}
            </Button>
          )}
        </div>
      )}

      {step === 'confirmation' && (
        <Button onClick={handleComplete} fullWidth size="lg" className="mt-4">
          {transactionResult?.success ? 'Continue Shopping' : 'Try Again'}
        </Button>
      )}
    </Modal>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}