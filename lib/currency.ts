// lib/currency.ts
import { CURRENCY_MAP, type CurrencyConfig } from '@/types';

export function formatPrice(
  amountUSD: number,
  currency: CurrencyConfig,
  showDecimals = true
): string {
  const converted = amountUSD * currency.rate;

  // JPY, INR, etc. don't use decimals in practice
  const noDecimalCurrencies = ['JPY', 'INR'];
  const maximumFractionDigits =
    noDecimalCurrencies.includes(currency.code) || !showDecimals ? 0 : 2;

  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(converted);
}

export function getCurrencyByCountry(countryCode: string): CurrencyConfig {
  return CURRENCY_MAP[countryCode] ?? CURRENCY_MAP['US'];
}

// Hook: detect user country via Accept-Language or IP geolocation header
export async function detectUserCountry(): Promise<string> {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    const data = await res.json();
    return data.country_code ?? 'US';
  } catch {
    return 'US';
  }
}
