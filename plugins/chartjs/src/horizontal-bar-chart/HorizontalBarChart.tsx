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
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/bar-chart.css';
import { HorizontalBarChartProps, } from './types';
import { prepareHorizontalBarChartData, prepareHorizontalBarChartOptions } from './controls';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const HorizontalBarChartComponent: React.FC<HorizontalBarChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = prepareHorizontalBarChartData(data, config, isDarkMode);
    const chartOptions = prepareHorizontalBarChartOptions(config, isDarkMode);

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
