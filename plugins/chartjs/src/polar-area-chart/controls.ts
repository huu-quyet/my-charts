import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { PolarAreaChartConfig } from './types';

/**
 * Prepare polar area chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * 
 * @param data The common dataset
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function preparePolarAreaChartData(data: CommonDataset, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    const labels = data.items.map(item => item.label);
    const values = data.items.map(item => item.value);
    const backgroundColor = data.items.map((item, index) =>
        item.color || theme.backgroundColor[index % theme.backgroundColor.length]);

    return {
        labels,
        datasets: [{
            data: values,
            backgroundColor,
            borderColor: backgroundColor, // Same as background color
            borderWidth: 0 // No borders
        }]
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * 
 * @param config The polar area chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function preparePolarAreaChartOptions(config: PolarAreaChartConfig, isDarkMode: boolean): ChartOptions<'polarArea'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                grid: {
                    color: theme.gridColor,
                },
                ticks: {
                    color: theme.textColor,
                    backdropColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                }
            }
        },
        plugins: {
            legend: {
                display: config.showLegend !== false,
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
                display: !!config.title,
                text: config.title || '',
                color: theme.textColor,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                titleColor: isDarkMode ? '#fff' : '#000',
                bodyColor: isDarkMode ? '#ddd' : '#333',
            },
            ...config.options?.plugins
        },
        animation: {
            animateRotate: config.animateRotate ?? true,
            animateScale: config.animateScale ?? true
        },
        startAngle: config.startAngle || -0.5 * Math.PI,
        ...config.options
    };
}
