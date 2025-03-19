import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { PieChartProps } from './types';
import { preparePieChartData, preparePieChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/pie-chart.css';

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

export const PieChartComponent: React.FC<PieChartProps> = ({
    metadata,
    data,
    config = {},
}) => {

    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from the common dataset
    const chartData = preparePieChartData(data, isDarkMode);

    // Prepare chart options
    const chartOptions = preparePieChartOptions(config, isDarkMode);

    return (
        <div className="pie-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper pie-chart">
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
