/**
 * Helper function to determine if the UI is in dark mode
 * Uses the system preference via CSS media query
 * 
 * @returns boolean indicating if dark mode is active
 */
export function isDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Format a number for display with appropriate abbreviations
 * Converts large values to K (thousands) or M (millions) notation
 * 
 * @param value The number to format
 * @returns Formatted string with appropriate suffix
 */
export function formatNumber(value: number): string {
    if (Math.abs(value) >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
}

/**
 * Helper function to adjust color opacity
 * Works with hex, rgb, and rgba color formats
 * 
 * @param color The base color string
 * @param opacity The opacity value (0-1)
 * @returns Color string with adjusted opacity
 */
export function adjustColorOpacity(color: string, opacity: number): string {
    // For hex colors
    if (color.startsWith('#')) {
        return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }

    // For rgba colors
    if (color.startsWith('rgba')) {
        return color.replace(/rgba\((.+?), .+?\)/, `rgba($1, ${opacity})`);
    }

    // For rgb colors
    if (color.startsWith('rgb')) {
        return color.replace(/rgb\((.+?)\)/, `rgba($1, ${opacity})`);
    }

    return color;
}

/**
 * Formats large numbers to be more readable on axis labels
 * Examples: 1000 -> 1k, 1500 -> 1.5k, 1000000 -> 1M
 * 
 * @param value The number to format
 * @param decimals Number of decimal places to show (default: 1)
 * @returns Formatted string representation of the number
 */
export function formatLargeNumber(value: number, decimals: number = 1): string {
    if (value === 0) return '0';

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000000) {
        return sign + (absValue / 1000000000).toFixed(decimals).replace(/\.0$/, '') + 'B';
    }
    if (absValue >= 1000000) {
        return sign + (absValue / 1000000).toFixed(decimals).replace(/\.0$/, '') + 'M';
    }
    if (absValue >= 1000) {
        return sign + (absValue / 1000).toFixed(decimals).replace(/\.0$/, '') + 'k';
    }

    return sign + absValue.toFixed(decimals).replace(/\.0$/, '');
}