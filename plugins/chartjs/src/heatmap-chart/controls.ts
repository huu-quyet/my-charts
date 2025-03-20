import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { HeatmapChartConfig } from './types';
import * as d3 from 'd3';
import { formatLargeNumber } from '../utils';

/**
 * Interface for heatmap data structure
 * Defines the format of each heatmap cell
 */
export interface HeatmapCell {
    /** X-axis value (column) */
    x: string;
    /** Y-axis value (row) */
    y: string;
    /** Cell value (determines color) */
    value: number;
    /** Original data item reference */
    originalItem?: {
        category?: string;
        label: string;
        value: number;
        [key: string]: unknown;
    };
}

/**
 * Prepare heatmap data from the common dataset format
 * Transforms data into a matrix structure suitable for the heatmap
 */
export function prepareHeatmapData(data: CommonDataset) {
    // Extract x (columns) and y (rows) dimensions
    const xLabels = new Set();
    const yLabels = new Set();
    const cellMap = new Map();

    // Process data to extract dimensions and values
    data.items.forEach(item => {
        const x = item.category || 'Default'; // Use category as x-dimension
        const y = item.label; // Use label as y-dimension
        const value = item.value; // Use value for the cell intensity

        xLabels.add(x);
        yLabels.add(y);

        // Create a unique key for each cell
        const cellKey = `${x}-${y}`;

        // Store the cell in our map
        cellMap.set(cellKey, {
            x,
            y,
            value,
            originalItem: item,
        });
    });

    // Convert to sorted arrays
    const sortedXLabels = Array.from(xLabels).sort();
    const sortedYLabels = Array.from(yLabels).sort();

    // Create cells array and calculate min/max values
    const cells: HeatmapCell[] = [];
    const minValue = Infinity;
    const maxValue = -Infinity;

    // For each combination of x and y, create a cell
    sortedXLabels.forEach(x => {
        sortedYLabels.forEach(y => {
            const cellKey = `${x}-${y}`;
            if (cellMap.has(cellKey)) {
                const cell = cellMap.get(cellKey);
                cells.push({
                    x: String(cell.x),
                    y: String(cell.y),
                    value: cell.value,
                    originalItem: cell.originalItem
                });

                cells.push({
                    x: String(x),
                    y: String(y),
                    value: cell.value,
                });
                cells.push({
                    x: String(x),
                    y: String(y),
                    value: cell.value,
                });
            }
        });
    });

    return {
        cells,
        xLabels: sortedXLabels,
        yLabels: sortedYLabels,
        minValue: minValue !== Infinity ? minValue : 0,
        maxValue: maxValue !== -Infinity ? maxValue : 0
    };
}

/**
 * Create color scale based on configuration and theme
 */
export function createColorScale(config: HeatmapChartConfig, isDarkMode: boolean, minValue: number, maxValue: number) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Use custom color scale if provided, otherwise use theme colors
    const colors = config.colorScale || [
        theme.backgroundColor[0],
        theme.backgroundColor[2],
        theme.backgroundColor[4],
    ];

    // Determine color interpolation method
    const interpolation = config.colorInterpolation || 'rgb';
    const interpolator = getColorInterpolator(interpolation);

    // Create the color scale
    const domain = config.colorDomain || [minValue, maxValue];
    return d3.scaleLinear<string>()
        .domain(domain)
        .range(colors)
        .interpolate(interpolator);
}

/**
 * Get the appropriate D3 color interpolator based on the specified method
 */
function getColorInterpolator(method: string) {
    switch (method) {
        case 'hsl':
            return d3.interpolateHsl;
        case 'lab':
            return d3.interpolateLab;
        case 'hcl':
            return d3.interpolateHcl;
        case 'rgb':
        default:
            return d3.interpolateRgb;
    }
}

/**
 * Format value for display in cells or tooltips
 */
export function formatValue(value: number, formatString?: string) {
    if (!formatString) return String(value);

    try {
        const formatter = d3.format(formatString);
        return formatter(value);
    } catch (error) {
        console.warn('Invalid format string:', formatString, error);
        return String(value);
    }
}

/**
 * Determine appropriate text color for a given background color
 * Ensures text remains readable against the background
 */
export function getContrastColor(backgroundColor: string) {
    try {
        // Convert to RGB if it's not already
        const rgb = d3.rgb(backgroundColor);

        // Calculate perceived brightness using YIQ formula
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

        // Return white for dark backgrounds, black for light backgrounds
        return brightness < 128 ? 'white' : 'black';
    } catch (error) {
        // Default to black if there's an error
        console.error('Error determining contrast color:', error);
        return 'black';
    }
}

// Add a utility function to leverage our formatLargeNumber in D3 context
export function formatD3LargeNumber(decimals: number = 1) {
    return (value: number | { valueOf(): number }) => {
        return formatLargeNumber(+value, decimals);
    };
}
