// Consistent number formatting to avoid hydration mismatches
export function formatPriceUSD(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatPriceSOL(price: number): string {
  // Format with 2 decimal places for SOL prices
  return price.toFixed(2);
}
