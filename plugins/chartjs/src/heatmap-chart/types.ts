import { BaseChartProps } from '../types';

/** String literal type for identifying the chart type */
export type HeatmapChartKey = 'heatmap';

/**
 * Configuration options specific to heatmap charts
 * Controls the appearance and behavior of the heatmap
 */
export interface HeatmapChartConfig {
    /** Title displayed at the top of the chart */
    title?: string;
    /** Label for the x-axis */
    xAxisLabel?: string;
    /** Label for the y-axis */
    yAxisLabel?: string;
    /** Whether to display the chart legend */
    showLegend?: boolean;
    /** Color scale to use for the heatmap cells */
    colorScale?: string[];
    /** Set a fixed domain for the color scale, or leave undefined to calculate from data */
    colorDomain?: [number, number];
    /** Method for interpolating colors (e.g., 'rgb', 'hsl', 'lab', 'hcl') */
    colorInterpolation?: string;
    /** Whether to show cell values in the heatmap */
    showValues?: boolean;
    /** Format string for displaying values (e.g., '.2f' for 2 decimal places) */
    valueFormat?: string;
    /** Text color for the cell values */
    valueColor?: string;
    /** Font size for the cell values */
    valueFontSize?: number | string;
    /** Padding between cells in pixels */
    cellPadding?: number;
    /** Border width for cells in pixels */
    cellBorderWidth?: number;
    /** Border color for cells */
    cellBorderColor?: string;
    /** Corner radius for cells in pixels */
    cellRadius?: number;
    /** Custom tooltip template function */
    tooltipTemplate?: (data: { x: string | number; y: string | number; value: number }, index: number) => string;
    /** Whether to show a color gradient legend */
    showColorLegend?: boolean;
    /** How many ticks to show in the color legend */
    colorLegendTicks?: number;
    /** Grid configuration */
    grid?: {
        /** Show horizontal grid lines */
        showHorizontal?: boolean;
        /** Show vertical grid lines */
        showVertical?: boolean;
        /** Grid line color */
        color?: string;
        /** Grid line width */
        width?: number;
    };
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Advanced options passed directly to D3 */
    options?: Record<string, unknown>;
}

/**
 * Props for the HeatmapChart component
 * Uses the common BaseChartProps with HeatmapChartConfig as the configuration type
 */
export type HeatmapChartProps = BaseChartProps<HeatmapChartConfig>;
