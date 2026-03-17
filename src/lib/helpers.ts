import { REFERENCE_PREFIX } from "./constants";

/**
 * Generate a URL-friendly slug from a string.
 * Example: "Pink Ribbon Birthday Cake" → "pink-ribbon-birthday-cake"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate an order reference number.
 * Format: JCD-YYYYMMDD-NNN
 * Example: JCD-20260318-001
 */
export function generateReferenceNumber(dailyCount: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = String(dailyCount + 1).padStart(3, "0");
  return `${REFERENCE_PREFIX}-${year}${month}${day}-${sequence}`;
}

/**
 * Format a number as Philippine Peso currency.
 * Example: 1500 → "₱1,500.00"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string for display.
 * Example: "2026-03-18" → "March 18, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a datetime string for display.
 * Example: "2026-03-18T14:30:00" → "March 18, 2026 at 2:30 PM"
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get the minimum selectable date based on lead time.
 * Returns a date string in YYYY-MM-DD format.
 */
export function getMinOrderDate(leadTimeDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + leadTimeDays);
  return date.toISOString().split("T")[0];
}

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
