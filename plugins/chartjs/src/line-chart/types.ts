import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type LineChartKey = 'line';

/**
 * Configuration options specific to line charts
 */
export interface LineChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Tension of the line curve (0 for straight lines, 1 for maximum curve) */
    tension?: number;
    /** Whether to display points at data positions */
    showPoints?: boolean;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the LineChart component
 * Uses the common BaseChartProps with LineChartConfig as the configuration type
 */
export type LineChartProps = BaseChartProps<LineChartConfig>;
