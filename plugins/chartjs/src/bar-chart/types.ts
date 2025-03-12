import { ReactNode } from 'react';
import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type BarChartKey = 'bar';

/**
 * Configuration options specific to bar charts
 */
export interface BarChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Whether to display bars horizontally or vertically */
    horizontal?: boolean;
    /** Whether to stack bars from multiple datasets */
    stacked?: boolean;
    /** Radius for rounded corners on bars in pixels */
    borderRadius?: number;
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
 * Props for the BarChart component
 * Uses the common BaseChartProps with BarChartConfig as the configuration type
 */
export type BarChartProps = BaseChartProps<BarChartConfig>;

/**
 * Interface representing a serializable bar chart configuration
 * Used when saving or sharing chart configurations
 */
export interface BarChart {
    /** Identifies this as a bar chart */
    chartType: BarChartKey;
    /** Metadata for the chart */
    metadata: {
        /** Title displayed at the top of the chart */
        title: string;
        /** Description of the chart's purpose and data */
        description: string;
        /** Optional icon to display alongside title */
        icon?: ReactNode;
    };
}
