// Currency conversion utility for USD to INR
// Converts USD values to INR using 1 USD = 100 INR conversion rate

/**
 * Converts USD value to INR display format
 * @param usdValue - Numeric USD value (e.g., 12.34)
 * @returns Formatted INR string with Indian numbering system (e.g., "₹ 1,23,456.00")
 */
export function usdToInrDisplay(usdValue: number): string {
  // Multiply by 100 (as requested conversion rate)
  const inr = Number(usdValue) * 100;

  // Format using Indian grouping with two decimals
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inr);

  // Return with rupee symbol and non-breaking space
  return `₹\u00A0${formatted}`;
}

/**
 * Converts USD string (like "$1,234.56") to INR display format
 * @param usdString - USD string with dollar sign and formatting
 * @returns Formatted INR string
 */
export function usdStringToInrDisplay(usdString: string): string {
  // Remove dollar sign, commas, and spaces, then parse to number
  const numericValue = parseFloat(usdString.replace(/[$,\s]/g, ''));
  
  if (isNaN(numericValue)) {
    return usdString; // Return original if parsing fails
  }
  
  return usdToInrDisplay(numericValue);
}

/**
 * Converts USD range string (like "$10 - $20") to INR range
 * @param rangeString - USD range string
 * @returns INR range string
 */
export function usdRangeToInrDisplay(rangeString: string): string {
  // Split by dash and process each part
  const parts = rangeString.split(' - ');
  if (parts.length !== 2) {
    return rangeString; // Return original if not a proper range
  }
  
  const startInr = usdStringToInrDisplay(parts[0]);
  const endInr = usdStringToInrDisplay(parts[1]);
  
  return `${startInr} - ${endInr}`;
}

// Example usage:
// usdToInrDisplay(1) => "₹ 100.00"
// usdToInrDisplay(1234.56) => "₹ 1,23,456.00"
// usdStringToInrDisplay("$150") => "₹ 15,000.00"
// usdRangeToInrDisplay("$2,000 - $5,000") => "₹ 2,00,000.00 - ₹ 5,00,000.00"