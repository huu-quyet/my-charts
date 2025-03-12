import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { LineChartProps } from './types';
import { prepareLineChartData, prepareLineChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/line-chart.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChartComponent: React.FC<LineChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = prepareLineChartData(data, config, isDarkMode);
    const chartOptions = prepareLineChartOptions(config, isDarkMode);

    return (
        <div className="line-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper line-chart">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
