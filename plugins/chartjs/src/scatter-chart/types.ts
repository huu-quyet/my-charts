import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type ScatterChartKey = 'scatter';

/**
 * Configuration options specific to scatter charts
 */
export interface ScatterChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Radius of data points in pixels */
    pointRadius?: number;
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
 * Props for the ScatterChart component
 * Uses the common BaseChartProps with ScatterChartConfig as the configuration type
 */
export type ScatterChartProps = BaseChartProps<ScatterChartConfig>;
