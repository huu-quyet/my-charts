import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type DoughnutChartKey = 'doughnut';

/**
 * Configuration options specific to doughnut charts
 * Similar to pie charts but with a center cutout
 */
export interface DoughnutChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Size of the center cutout as a percentage or pixel value */
    cutout?: string | number;
    /** Width of the segment borders in pixels */
    borderWidth?: number;
    /** Rotation of the chart in degrees (-360 to 360) */
    rotation?: number;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
    /** Center text displayed in the middle of the doughnut */
    centerText?: {
        /** Text to display */
        text?: string;
        /** Font size for the text */
        fontSize?: number;
        /** Font color for the text */
        color?: string;
    };
}

/**
 * Props for the DoughnutChart component
 * Uses the common BaseChartProps with DoughnutChartConfig as the configuration type
 */
export type DoughnutChartProps = BaseChartProps<DoughnutChartConfig>;
