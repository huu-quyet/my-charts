import { ReactNode } from 'react';
import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type PieChartKey = 'pie';

/**
 * Configuration options specific to pie charts
 */
export interface PieChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Size of the center cutout as a percentage or pixel value (for donut charts) */
    cutout?: string | number;
    /** Width of the segment borders in pixels */
    borderWidth?: number;
    /** Advanced Chart.js options passed directly to the underlying library */
    options?: {
        /** Chart.js plugin configurations */
        plugins?: Record<string, unknown>;
        /** Any other Chart.js options */
        [key: string]: unknown;
    };
}

/**
 * Metadata information for pie charts
 */
export interface PieChartMetadata {
    /** Title displayed at the top of the chart */
    title: string;
    /** Description of the chart's purpose and data */
    description: string;
    /** Optional icon to display alongside title */
    icon?: ReactNode;
}

/**
 * Props for the PieChart component
 * Uses the common BaseChartProps with PieChartConfig as the configuration type
 */
export type PieChartProps = BaseChartProps<PieChartConfig>;

/**
 * Interface representing a serializable pie chart configuration
 * Used when saving or sharing chart configurations
 */
export interface PieChart {
    /** Identifies this as a pie chart */
    chartType: PieChartKey;
    /** Metadata for the chart */
    metadata: PieChartMetadata;
}