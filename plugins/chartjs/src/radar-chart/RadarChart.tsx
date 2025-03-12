import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { RadarChartProps } from './types';
import { prepareRadarChartData, prepareRadarChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/radar-chart.css';

// Register Chart.js components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const RadarChartComponent: React.FC<RadarChartProps> = ({
    metadata,
    data,
    config = {},
}) => {

    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Prepare chart data and options
    const chartData = prepareRadarChartData(data, isDarkMode);
    const chartOptions = prepareRadarChartOptions(config, isDarkMode);

    return (
        <div className="radar-chart-container">
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper radar-chart">
                <Radar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
