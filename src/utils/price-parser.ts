export function parsePrice(priceText: string): number {
  return Number(priceText.replace(/[^0-9.]/g, ''));
}