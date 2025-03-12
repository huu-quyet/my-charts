import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { PolarAreaChartProps } from './types';
import { preparePolarAreaChartData, preparePolarAreaChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/polar-area-chart.css';

/**
 * Register required Chart.js components for PolarArea charts
 * This ensures the chart can be rendered correctly
 */
ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

/**
 * PolarAreaChart Component
 * 
 * A variation of a pie chart where segments have equal angles
 * and differ in how far they extend from the center of the chart
 * 
 * Useful for showing relative sizes of data while maintaining 
 * equal angular size for better readability
 * 
 * @param props Component properties including data and configuration
 */
export const PolarAreaChartComponent: React.FC<PolarAreaChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from common dataset
    const chartData = preparePolarAreaChartData(data, isDarkMode);
    const chartOptions = preparePolarAreaChartOptions(config, isDarkMode);

    return (
        <div className="polar-area-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper polar-area-chart">
                <PolarArea data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
