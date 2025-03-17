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
import { FloatingChartProps } from './types';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/floating-chart.css';
import { prepareFloatingChartData, prepareFloatingChartOptions } from './controls';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const FloatingChartComponent: React.FC<FloatingChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    const isDarkMode = checkDarkMode();
    const chartData = prepareFloatingChartData(data, config, isDarkMode);
    const chartOptions = prepareFloatingChartOptions(config, isDarkMode);

    return (
        <div className="floating-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}
            <div className="chart-wrapper floating-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
