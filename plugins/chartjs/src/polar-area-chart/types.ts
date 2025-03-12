import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type PolarAreaChartKey = 'polarArea';

/**
 * Configuration options specific to polar area charts
 */
export interface PolarAreaChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Starting angle for the first segment in radians */
    startAngle?: number;
    /** Whether to animate rotation when rendering */
    animateRotate?: boolean;
    /** Whether to animate scaling when rendering */
    animateScale?: boolean;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the PolarAreaChart component
 * Uses the common BaseChartProps with PolarAreaChartConfig as the configuration type
 */
export type PolarAreaChartProps = BaseChartProps<PolarAreaChartConfig>;
