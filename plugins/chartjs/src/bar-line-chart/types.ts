import { ReactNode } from 'react';
import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type BarLineChartKey = 'bar-line';

/**
 * Configuration options specific to bar-line combination charts
 * Allows configuring which series are displayed as bars vs. lines
 */
export interface BarLineChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Categories to be displayed as bars (all others will be lines) */
    barCategories?: string[];
    /** Categories to be displayed as lines (overrides barCategories) */
    lineCategories?: string[];
    /** Radius for rounded corners on bars in pixels */
    borderRadius?: number;
    /** Tension of the line curve (0 for straight lines, 1 for maximum curve) */
    lineTension?: number;
    /** Whether to display points on line series */
    showPoints?: boolean;
    /** Point radius for line series */
    pointRadius?: number;
    /** Label for the X axis */
    xAxisLabel?: string;
    /** Label for the Y axis */
    yAxisLabel?: string;
    /** Whether to use separate Y axes for bars and lines */
    useDualAxes?: boolean;
    /** Label for the right Y axis (when useDualAxes is true) */
    rightYAxisLabel?: string;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Props for the BarLineChart component
 * Uses the common BaseChartProps with BarLineChartConfig as the configuration type
 */
export type BarLineChartProps = BaseChartProps<BarLineChartConfig>;

/**
 * Interface representing a serializable bar-line chart configuration
 * Used when saving or sharing chart configurations
 */
export interface BarLineChart {
    /** Identifies this as a bar-line chart */
    chartType: BarLineChartKey;
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
