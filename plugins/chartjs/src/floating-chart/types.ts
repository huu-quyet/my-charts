import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type FloatingChartKey = 'floating';

/**
 * Configuration options specific to floating bar charts
 */
export interface FloatingChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Whether to display bars horizontally */
    horizontal?: boolean;
    /** Radius for rounded corners on bars in pixels */
    borderRadius?: number;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Whether to show bar values */
    showValues?: boolean;
    /** Format for the values displayed on bars */
    valueFormat?: string;
    /** Advanced Chart.js options */
    options?: {
        plugins?: Record<string, unknown>;
        [key: string]: unknown;
    };
}

/**
 * Props for the FloatingChart component
 */
export type FloatingChartProps = BaseChartProps<FloatingChartConfig>;
