import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { StackChartProps } from './types';
import { isDarkMode as checkDarkMode } from '../utils';
import { prepareStackChartData, prepareStackChartOptions } from './controls';
import '../assets/css/stack-chart.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * StackChart Component
 * 
 * Displays data as stacked bars to show part-to-whole relationships
 * across a dimension. Supports both absolute values and percentages.
 * 
 * @param props Component properties including data and configuration
 */
export const StackChartComponent: React.FC<StackChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data and options
    const chartData = prepareStackChartData(data, config, isDarkMode);
    const chartOptions = prepareStackChartOptions(config, isDarkMode);

    return (
        <div className="stack-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper stack-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
