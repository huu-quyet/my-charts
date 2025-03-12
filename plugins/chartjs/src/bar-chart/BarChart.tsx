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
import { BarChartProps } from './types';
import { isDarkMode as checkDarkMode } from '../utils';
import { prepareBarChartData, prepareBarChartOptions } from './controls';
import '../assets/css/bar-chart.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChartComponent: React.FC<BarChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = prepareBarChartData(data, config, isDarkMode);
    const chartOptions = prepareBarChartOptions(config, isDarkMode);

    return (
        <div className="bar-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper bar-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
