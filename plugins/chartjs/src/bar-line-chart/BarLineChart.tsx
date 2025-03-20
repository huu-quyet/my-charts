import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BarLineChartProps } from './types';
import { isDarkMode as checkDarkMode } from '../utils';
import { prepareBarLineChartData, prepareBarLineChartOptions } from './controls';
import '../assets/css/bar-line-chart.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * BarLineChart Component
 * 
 * Displays a combination chart with both bar and line series
 * Useful for comparing different types of related data (e.g., quantity and percentage)
 * 
 * @param props Component properties including data and configuration
 */
export const BarLineChartComponent: React.FC<BarLineChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data and options
    const chartData = prepareBarLineChartData(data, config, isDarkMode);
    const chartOptions = prepareBarLineChartOptions(config, isDarkMode);

    return (
        <div className="bar-line-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper bar-line-chart">
                <Chart type="bar" data={chartData as ChartData<'bar'>} options={chartOptions} />
            </div>
        </div>
    );
};
