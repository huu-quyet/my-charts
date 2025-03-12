import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { ScatterChartProps } from './types';
import { prepareScatterChartData, prepareScatterChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/scatter-chart.css';

/**
 * Register required Chart.js components for Scatter charts
 * This ensures the chart can be rendered correctly
 */
ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

/**
 * ScatterChart Component
 * 
 * Displays data as points on a cartesian coordinate grid
 * Useful for showing relationships between two variables
 * 
 * @param props Component properties including data and configuration
 */
export const ScatterChartComponent: React.FC<ScatterChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = prepareScatterChartData(data, config, isDarkMode);
    const chartOptions = prepareScatterChartOptions(config, isDarkMode);

    return (
        <div className="scatter-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper scatter-chart">
                <Scatter data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
