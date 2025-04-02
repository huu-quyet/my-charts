import { ReactNode } from 'react';

/**
 * Metadata information displayed at the top of a chart
 * Provides contextual information about the visualization
 */
export interface ChartMetadata {
    /** Chart title displayed at the top */
    title: string;
    /** Description of the chart's purpose and data */
    description: string;
    /** Optional icon to display alongside title */
    icon?: ReactNode;
}

/**
 * Individual data point for the common dataset format
 * This serves as the foundation for all chart data types
 */
export interface CommonDataItem {
    /** Label for the data point (shown on axis or in tooltips) */
    label: string;
    /** Numeric value of the data point */
    value: number;
    /** Optional category for grouping data points */
    category?: string;
    /** Optional color override for this specific data point */
    color?: string;
    /** Optional date value for time-based charts */
    date?: string | Date;
    /** Additional custom data that might be used by specific chart types */
    extraData?: Record<string, unknown>;
}

/**
 * Filter configuration for dynamically filtering chart data
 * Enables interactive data exploration within visualizations
 */
export interface DataFilter {
    /** The field name(s) to filter on - can be a single field or multiple fields */
    field: string;
    /** The operator to use for filtering (equals, contains, etc.) */
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
    /** The value(s) to compare against */
    value: string | number;
    /** Whether this filter is currently active */
    active: boolean;
    /** 
     * Optional logic for combining multiple field conditions
     * - 'AND': All fields must match (default when multiple fields)
     * - 'OR': Any field can match
     */
    fieldLogic?: 'AND' | 'OR';
}

/**
 * Standardized dataset format used across all chart types
 * Enables seamless data sharing between different visualization types
 */
export interface CommonDataset {
    /** Array of data items containing the actual visualization data */
    items: CommonDataItem[];
    /** Optional title for the dataset */
    title?: string;
    /** Optional additional metadata about the dataset */
    metadata?: Record<string, unknown>;
}

/**
 * Base properties shared by all chart components
 * @template TConfig The configuration type specific to each chart type
 */
export interface BaseChartProps<TConfig> {
    /** Metadata to display with the chart (title, description) */
    metadata: ChartMetadata;
    /** The dataset to visualize */
    data: CommonDataset;
    /** Optional configuration options specific to this chart type */
    config?: TConfig;
}

/**
 * Props for the dynamic chart component that can switch between chart types
 * and supports interactive filtering
 * @template TConfig The configuration type specific to the selected chart type
 */
export interface DynamicChartProps<TConfig = unknown> extends BaseChartProps<TConfig> {
    /** The type of chart to render */
    chartType: ChartType;
    /** Configuration options for filtering the data */
    // filters?: DataFilter[];
    /** Callback function when filters are changed by the user */
    // onChangeFiltering?: (filters: DataFilter[]) => void;
}

/**
 * Theme configuration for charts with light/dark mode support
 * Contains color palettes and styling information
 */
export interface ChartTheme {
    /** Background colors for datasets (with transparency) */
    backgroundColor: string[];
    /** Border colors for datasets (solid) */
    borderColor: string[];
    /** Color for grid lines */
    gridColor: string;
    /** Color for text elements */
    textColor: string;
    /** Color for legend text */
    legendTextColor: string;
    /** Function to get a background color by index (for infinite colors) */
    getBackgroundColor: (index: number) => string;
    /** Function to get a border color by index (for infinite colors) */
    getBorderColor: (index: number) => string;
}

/**
 * Default color theme for light mode
 * Used when system preference is set to light or when dark mode is disabled
 */
export const DEFAULT_LIGHT_THEME: ChartTheme = {
    backgroundColor: [
        'rgba(0, 180, 216, 0.8)',   // #00B4D8
        'rgba(26, 78, 179, 0.8)',   // #1A4EB3
        'rgba(54, 150, 251, 0.8)',  // #3696FB
        'rgba(23, 92, 211, 0.8)',   // #175CD3
        'rgba(92, 182, 254, 0.8)',  // #5CB6FE
        'rgba(144, 209, 255, 0.8)', // #90D1FF
        'rgba(6, 80, 134, 0.8)',    // #065086
        'rgba(75, 192, 192, 0.8)',
        'rgba(0, 162, 208, 0.8)',
        'rgba(40, 125, 125, 0.8)',
    ],
    borderColor: [
        'rgba(0, 180, 216, 1)',     // #00B4D8
        'rgba(26, 78, 179, 1)',     // #1A4EB3
        'rgba(54, 150, 251, 1)',    // #3696FB
        'rgba(23, 92, 211, 1)',     // #175CD3
        'rgba(92, 182, 254, 1)',    // #5CB6FE
        'rgba(144, 209, 255, 1)',   // #90D1FF
        'rgba(6, 80, 134, 1)',      // #065086
        'rgba(75, 192, 192, 1)',
        'rgba(0, 162, 208, 1)',
        'rgba(40, 125, 125, 1)',
    ],
    gridColor: 'rgba(0, 0, 0, 0.1)',
    textColor: 'rgba(0, 0, 0, 0.87)',
    legendTextColor: 'rgba(0, 0, 0, 0.87)',
    // Generate colors dynamically to avoid repetition
    getBackgroundColor: (index: number) => {
        const baseColors = DEFAULT_LIGHT_THEME.backgroundColor;
        if (index < baseColors.length) {
            return baseColors[index];
        }

        // Generate colors in the blue range (180-240 degrees in HSL)
        // Use golden ratio for better distribution of colors
        const blueBaseHue = 210; // Center of blue range
        const variance = 30;     // +/- variation from the center
        const hue = (blueBaseHue - variance) + ((index * 137.508) % (variance * 2));
        const h = hue / 360;
        const s = 0.7 + (index % 3) * 0.1; // Vary saturation slightly
        const l = 0.55 + (index % 5) * 0.05; // Vary lightness slightly

        // HSL to RGB conversion algorithm
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hslToRgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(hslToRgb(p, q, h) * 255);
        const b = Math.round(hslToRgb(p, q, h - 1 / 3) * 255);

        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    },
    getBorderColor: (index: number) => {
        // First check if we have this index in the base colors
        const baseColors = DEFAULT_LIGHT_THEME.backgroundColor;
        if (index < baseColors.length) {
            // Extract RGB from background color and return with 1.0 opacity
            const bgColor = baseColors[index];
            return bgColor.replace(/rgba\((\d+),\s*(\d+),\s*(\d+).*/, 'rgba($1, $2, $3, 1)');
        }

        // Generate colors in the blue range (180-240 degrees in HSL)
        // Use golden ratio for better distribution of colors
        const blueBaseHue = 210; // Center of blue range
        const variance = 30;     // +/- variation from the center
        const hue = (blueBaseHue - variance) + ((index * 137.508) % (variance * 2));
        const h = hue / 360;
        const s = 0.8; // Higher saturation for vibrant blue colors
        const l = 0.65; // Same lightness as background for color consistency

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hslToRgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(hslToRgb(p, q, h) * 255);
        const b = Math.round(hslToRgb(p, q, h - 1 / 3) * 255);

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }
};

/**
 * Default color theme for dark mode
 * Used when system preference is set to dark mode
 * Uses a lighter dark theme for better readability
 */
export const DEFAULT_DARK_THEME: ChartTheme = {
    backgroundColor: [
        'rgba(54, 162, 235, 0.8)',   // blue
        'rgba(255, 99, 132, 0.8)',   // red
        'rgba(75, 192, 192, 0.8)',   // teal
        'rgba(255, 159, 64, 0.8)',   // orange
        'rgba(153, 102, 255, 0.8)',  // purple
        'rgba(255, 205, 86, 0.8)',   // yellow
        'rgba(39, 174, 96, 0.8)',    // green
        'rgba(231, 76, 60, 0.8)',    // bright red
        'rgba(142, 68, 173, 0.8)',   // violet
        'rgba(41, 128, 185, 0.8)',   // dark blue
    ],
    borderColor: [
        'rgba(54, 162, 235, 1)',     // blue
        'rgba(255, 99, 132, 1)',     // red
        'rgba(75, 192, 192, 1)',     // teal
        'rgba(255, 159, 64, 1)',     // orange
        'rgba(153, 102, 255, 1)',    // purple
        'rgba(255, 205, 86, 1)',     // yellow
        'rgba(39, 174, 96, 1)',      // green
        'rgba(231, 76, 60, 1)',      // bright red
        'rgba(142, 68, 173, 1)',     // violet
        'rgba(41, 128, 185, 1)',     // dark blue
    ],
    gridColor: 'rgba(255, 255, 255, 0.1)',
    textColor: 'rgba(255, 255, 255, 0.87)',
    legendTextColor: 'rgba(255, 255, 255, 0.87)',
    // Generate colors dynamically to avoid repetition
    getBackgroundColor: (index: number) => {
        const baseColors = DEFAULT_DARK_THEME.backgroundColor;
        if (index < baseColors.length) {
            return baseColors[index];
        }

        // Use golden ratio to generate well-distributed hues
        const hue = (index * 137.508) % 360;
        // Convert HSL to RGB values
        const h = hue / 360;
        const s = 0.7;
        const l = 0.6;

        // HSL to RGB conversion algorithm
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hslToRgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(hslToRgb(p, q, h) * 255);
        const b = Math.round(hslToRgb(p, q, h - 1 / 3) * 255);

        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    },
    getBorderColor: (index: number) => {
        // First check if we have this index in the base colors
        const baseColors = DEFAULT_DARK_THEME.backgroundColor;
        if (index < baseColors.length) {
            // Extract RGB from background color and return with 1.0 opacity
            const bgColor = baseColors[index];
            return bgColor.replace(/rgba\((\d+),\s*(\d+),\s*(\d+).*/, 'rgba($1, $2, $3, 1)');
        }

        // Use the same color generation logic as backgroundColor but with opacity 1
        const hue = (index * 137.508) % 360;
        const h = hue / 360;
        const s = 0.7;
        const l = 0.6; // Same lightness as background for color consistency

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hslToRgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(hslToRgb(p, q, h) * 255);
        const b = Math.round(hslToRgb(p, q, h - 1 / 3) * 255);

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }
};

/**
 * Helper function to convert HSL to RGB component
 * Used by the color generation functions
 */
function hslToRgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

/**
 * Union type of all possible chart component props
 * Used for dynamic component rendering and plugin registration
 */
export type ChartComponentProps =
    | import('./pie-chart/types').PieChartProps
    | import('./bar-chart/types').BarChartProps
    | import('./line-chart/types').LineChartProps
    | import('./bar-line-chart/types').BarLineChartProps
    | import('./radar-chart/types').RadarChartProps
    | import('./bubble-chart/types').BubbleChartProps
    | import('./polar-area-chart/types').PolarAreaChartProps
    | import('./scatter-chart/types').ScatterChartProps
    | import('./doughnut-chart/types').DoughnutChartProps
    | import('./stack-chart/types').StackChartProps
    | import('./heatmap-chart/types').HeatmapChartProps
    | import('./floating-chart/types').FloatingChartProps
    | import('./horizontal-bar-chart/types').HorizontalBarChartProps;

/**
 * Enumeration of all available chart types
 * Used for component registration and selection
 */
export enum ChartType {
    /** Pie chart for showing part-to-whole relationships */
    PIE = 'pie',
    /** Line chart for showing trends over time or sequences */
    LINE = 'line',
    /** Bar chart for comparing discrete categories */
    BAR = 'bar',
    /** Bar-Line combination chart for comparing different data types */
    BAR_LINE = 'bar-line',
    /** Radar chart for comparing multiple variables */
    RADAR = 'radar',
    /** Bubble chart for showing relationships between 3 variables */
    BUBBLE = 'bubble',
    /** Polar area chart for comparing similar to pie but with area */
    POLAR_AREA = 'polarArea',
    /** Scatter chart for showing correlation between variables */
    SCATTER = 'scatter',
    /** Doughnut chart for showing part-to-whole relationships with a center hole */
    DOUGHNUT = 'doughnut',
    /** Stack chart for showing part-to-whole relationships over a dimension */
    STACK = 'stack',
    /** Heatmap chart for visualizing matrix data and color intensity */
    HEATMAP = 'heatmap',
    /** Floating chart for showing floating data points */
    FLOATING = 'floating',
    /** Horizontal bar chart for comparing discrete categories horizontally */
    HORIZONTAL_BAR = 'horizontal-bar'
}

/**
 * Mapped type to connect chart types to their respective props
 * Provides type safety when working with dynamic chart components
 */
export type ChartComponentPropsMap = {
    [ChartType.PIE]: import('./pie-chart/types').PieChartProps;
    [ChartType.LINE]: import('./line-chart/types').LineChartProps;
    [ChartType.BAR]: import('./bar-chart/types').BarChartProps;
    [ChartType.BAR_LINE]: import('./bar-line-chart/types').BarLineChartProps;
    [ChartType.RADAR]: import('./radar-chart/types').RadarChartProps;
    [ChartType.BUBBLE]: import('./bubble-chart/types').BubbleChartProps;
    [ChartType.POLAR_AREA]: import('./polar-area-chart/types').PolarAreaChartProps;
    [ChartType.SCATTER]: import('./scatter-chart/types').ScatterChartProps;
    [ChartType.DOUGHNUT]: import('./doughnut-chart/types').DoughnutChartProps;
    [ChartType.STACK]: import('./stack-chart/types').StackChartProps;
    [ChartType.HEATMAP]: import('./heatmap-chart/types').HeatmapChartProps;
    [ChartType.FLOATING]: import('./floating-chart/types').FloatingChartProps;
    [ChartType.HORIZONTAL_BAR]: import('./horizontal-bar-chart/types').HorizontalBarChartProps;
};

/**
 * Registry for dynamically loaded chart components
 * Stores components with their registration timestamp
 */
export interface ChartComponentRegistry {
    /** Map of chart type to component and registration time */
    [key: string]: {
        /** The React component for this chart type */
        component: React.ComponentType<ChartComponentProps>;
        /** Timestamp when this component was registered (for versioning) */
        timestamp: number;
    };
}