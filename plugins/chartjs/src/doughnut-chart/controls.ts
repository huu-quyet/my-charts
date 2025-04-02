import { ChartOptions, Plugin } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { DoughnutChartConfig } from './types';
import { Chart } from 'chart.js';
import { formatLargeNumber } from '../utils';

/**
 * Prepare doughnut chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * 
 * @param data The common dataset
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareDoughnutChartData(data: CommonDataset, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    const labels = data.items.map(item => item.label);
    const values = data.items.map(item => item.value);
    const backgroundColor = data.items.map((item, index) =>
        item.color || theme.backgroundColor[index % theme.backgroundColor.length]);

    // No borders - use same colors for borders and background
    const borderColor = backgroundColor;

    return {
        labels,
        datasets: [{
            data: values,
            backgroundColor,
            borderColor,
            borderWidth: 0, // Set border width to 0 to remove borders
        }]
    };
}

/**
 * Create a plugin to display center text inside the doughnut
 * 
 * @param config The doughnut chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js plugin for center text
 */
export function createCenterTextPlugin(config: DoughnutChartConfig, isDarkMode: boolean): Plugin<'doughnut'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        id: 'doughnutCenterText',
        beforeDraw(chart: Chart<'doughnut'>) {
            if (config.centerText?.text) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;

                ctx.restore();
                const fontSize = config.centerText.fontSize || 16;
                const fontColor = config.centerText.color || theme.textColor;
                ctx.font = `${fontSize}px sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';

                ctx.fillStyle = fontColor;
                ctx.fillText(config.centerText.text, width / 2, height / 2);
                ctx.save();
            }
        }
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * 
 * @param config The doughnut chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareDoughnutChartOptions(config: DoughnutChartConfig, isDarkMode: boolean): ChartOptions<'doughnut'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Create the center text plugin if center text is configured
    const centerTextPlugin = createCenterTextPlugin(config, isDarkMode);

    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: config.cutout || '60%', // Default cutout for doughnut is 60%
        rotation: config.rotation ? Math.PI * config.rotation / 180 : undefined,
        plugins: {
            doughnutCenterText: centerTextPlugin,
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    color: theme.legendTextColor,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    pointStyleWidth: 40,
                    padding: 16,
                },
                rtl: false,
                align: 'start',
                onHover(e) {
                    const target = e.native?.target as HTMLElement;
                    if (target) {
                        target.style.cursor = 'pointer';
                    }
                },
            },
            title: {
                display: false,
                text: config.title || '',
                color: theme.textColor,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw as number;
                        return `${label}: ${formatLargeNumber(value)}`;
                    }
                },
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                titleColor: isDarkMode ? '#fff' : '#000',
                bodyColor: isDarkMode ? '#ddd' : '#333',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1
            },
            ...config.options?.plugins
        },
        ...config.options
    };
}
