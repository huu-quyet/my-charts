import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type BubbleChartKey = 'bubble';

/**
 * Configuration options specific to bubble charts
 */
export interface BubbleChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Label for the bubble size in tooltips */
    sizeLabel?: string;
    /** Aspect ratio of the chart (width/height) */
    aspectRatio?: number;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the BubbleChart component
 * Uses the common BaseChartProps with BubbleChartConfig as the configuration type
 */
export type BubbleChartProps = BaseChartProps<BubbleChartConfig>;
