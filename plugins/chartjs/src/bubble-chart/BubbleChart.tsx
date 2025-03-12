import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { BubbleChartProps } from './types';
import { prepareBubbleChartData, prepareBubbleChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/bubble-chart.css';

/**
 * Register required Chart.js components for Bubble charts
 * This ensures the chart can be rendered correctly
 */
ChartJS.register(
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
);

/**
 * BubbleChart Component
 * 
 * Displays data as bubbles where:
 * - x and y coordinates determine position
 * - r (radius) determines bubble size
 * 
 * Useful for showing relationships between three dimensions of data
 * 
 * @param props Component properties including data and configuration
 */
export const BubbleChartComponent: React.FC<BubbleChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = prepareBubbleChartData(data, config, isDarkMode);
    const chartOptions = prepareBubbleChartOptions(config, isDarkMode);

    return (
        <div className="bubble-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper bubble-chart">
                <Bubble data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
