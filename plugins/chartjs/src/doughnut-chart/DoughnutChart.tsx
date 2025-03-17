import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { DoughnutChartProps } from './types';
import { prepareDoughnutChartData, prepareDoughnutChartOptions, createCenterTextPlugin } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/doughnut-chart.css';

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

/**
 * DoughnutChart Component
 * 
 * Displays data similar to a pie chart but with a center cutout
 * Great for showing part-to-whole relationships with focus on the center
 * 
 * @param props Component properties including data and configuration
 */
export const DoughnutChartComponent: React.FC<DoughnutChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data directly from the common dataset
    const chartData = prepareDoughnutChartData(data, isDarkMode);

    // Prepare chart options
    const chartOptions = prepareDoughnutChartOptions(config, isDarkMode);

    // Register the center text plugin
    if (config.centerText?.text) {
        const centerTextPlugin = createCenterTextPlugin(config, isDarkMode);
        // Check if the plugin is already registered to avoid duplicates
        if (!ChartJS.registry.plugins.get(centerTextPlugin.id)) {
            ChartJS.register(centerTextPlugin);
        }
    }

    return (
        <div className="doughnut-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper doughnut-chart">
                <Doughnut data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
