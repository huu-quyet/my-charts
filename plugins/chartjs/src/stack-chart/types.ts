import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type StackChartKey = 'stack';

/**
 * Configuration options specific to stack charts
 * Stack charts are a special type of bar chart with stacked data
 */
export interface StackChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Whether to display bars horizontally or vertically */
    horizontal?: boolean;
    /** Radius for rounded corners on bars in pixels */
    borderRadius?: number;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Whether to display values as percentages */
    percentage?: boolean;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the StackChart component
 * Uses the common BaseChartProps with StackChartConfig as the configuration type
 */
export type StackChartProps = BaseChartProps<StackChartConfig>;
