import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type RadarChartKey = 'radar';

/**
 * Configuration options specific to radar charts
 */
export interface RadarChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Starting angle for the first axis in radians */
    startAngle?: number;
    /** Configuration for the angle lines that connect center to edge */
    angleLines?: {
        /** Color of the angle lines */
        color?: string;
        /** Width of the angle lines in pixels */
        lineWidth?: number;
    };
    /** Color for the grid lines */
    gridColor?: string;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the RadarChart component
 * Uses the common BaseChartProps with RadarChartConfig as the configuration type
 */
export type RadarChartProps = BaseChartProps<RadarChartConfig>;
