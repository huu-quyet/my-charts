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
}

/**
 * Default color theme for light mode
 * Used when system preference is set to light or when dark mode is disabled
 */
export const DEFAULT_LIGHT_THEME: ChartTheme = {
    backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(2,62,138, 1)',
        'rgba(0,150,199, 1)',
        'rgba(23,92,211,1)',
        'rgba(3,4,94, 1)',
        'rgba(0,119,182, 1)',
        'rgba(56,175,250, 1)',
        'rgba(239,248,255,1)',
        'rgba(199, 199, 199, 0.7)',
    ],
    borderColor: [
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
        'rgba(229,231,235,1)',
    ],
    gridColor: 'rgba(0, 0, 0, 0.1)',
    textColor: '#666',
    legendTextColor: '#666',
};

/**
 * Default color theme for dark mode
 * Used when system preference is set to dark mode
 * Uses a lighter dark theme for better readability
 */
export const DEFAULT_DARK_THEME: ChartTheme = {
    backgroundColor: [
        'rgba(75,121,198,1)',
        'rgba(85,122,204,1)',
        'rgba(81,166,220,1)',
        'rgba(78,168,203,0.7)',
        'rgba(83,168,163,0.7)',
        'rgba(98,101,121,1)',
        'rgba(140,140,140,0.7)',
        'rgba(101,113,209,0.7)',
        'rgba(80,165,125,0.7)',
        'rgba(209,87,95,0.7)',
    ],
    borderColor: [
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
        'rgba(100,100,100,1)',
    ],
    gridColor: 'rgba(255, 255, 255, 0.15)',
    textColor: '#eaeaea',
    legendTextColor: '#eaeaea',
};

/**
 * Union type of all possible chart component props
 * Used for dynamic component rendering and plugin registration
 */
export type ChartComponentProps =
    | import('./pie-chart/types').PieChartProps
    | import('./bar-chart/types').BarChartProps
    | import('./line-chart/types').LineChartProps
    | import('./radar-chart/types').RadarChartProps;

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
    /** Radar chart for comparing multiple variables */
    RADAR = 'radar',
    /** Bubble chart for showing relationships between 3 variables */
    BUBBLE = 'bubble',
    /** Polar area chart for comparing similar to pie but with area */
    POLAR_AREA = 'polarArea',
    /** Scatter chart for showing correlation between variables */
    SCATTER = 'scatter'
}

/**
 * Mapped type to connect chart types to their respective props
 * Provides type safety when working with dynamic chart components
 */
export type ChartComponentPropsMap = {
    [ChartType.PIE]: import('./pie-chart/types').PieChartProps;
    [ChartType.LINE]: import('./line-chart/types').LineChartProps;
    [ChartType.BAR]: import('./bar-chart/types').BarChartProps;
    [ChartType.RADAR]: import('./radar-chart/types').RadarChartProps;
    [ChartType.BUBBLE]: import('./bubble-chart/types').BubbleChartProps;
    [ChartType.POLAR_AREA]: import('./polar-area-chart/types').PolarAreaChartProps;
    [ChartType.SCATTER]: import('./scatter-chart/types').ScatterChartProps;
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