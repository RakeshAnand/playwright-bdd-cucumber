// Utility to parse price-like elements into numbers and return stats.
export function parsePrices(priceElements) {
  const numericPrices = priceElements.map(element => {
    const cleanString = element.textContent.replace(/[^0-9.]/g, '');
    return parseFloat(cleanString);
  });

  const highestPrice = numericPrices.reduce((max, currentPrice) => {
    return currentPrice > max ? currentPrice : max;
  }, numericPrices[0]);

  return { numericPrices, highestPrice };
}

// If this file is executed directly (node utils/mapDemo.js), run a demo.
import { fileURLToPath } from 'url';
const entryPoint = process.argv[1];
if (entryPoint && entryPoint === fileURLToPath(import.meta.url)) {
  const priceElements = [
    { textContent: "$12.50 " },
    { textContent: " $45.00" },
    { textContent: "$110.99" },
    { textContent: "$5.25" }
  ];

  const { numericPrices, highestPrice } = parsePrices(priceElements);
  console.log("Cleaned Prices Array:", numericPrices);
  console.log("Highest Price:", highestPrice);
}
