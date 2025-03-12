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
    const borderColor = data.items.map((item, index) =>
        item.color ? adjustColorOpacity(item.color, 1) : theme.borderColor[index % theme.borderColor.length]);

    return {
        labels,
        datasets: [{
            data: values,
            backgroundColor,
            borderColor,
            borderWidth: 1
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
                }
            },
            title: {
                display: !!config.title,
                text: config.title || '',
                color: theme.textColor
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

/**
 * Helper function to adjust color opacity
 * Works with hex, rgb, and rgba color formats
 * 
 * @param color The base color string
 * @param opacity The opacity value (0-1)
 * @returns Color string with adjusted opacity
 */
function adjustColorOpacity(color: string, opacity: number): string {
    // For hex colors
    if (color.startsWith('#')) {
        return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }

    // For rgba colors
    if (color.startsWith('rgba')) {
        return color.replace(/rgba\((.+?), .+?\)/, `rgba($1, ${opacity})`);
    }

    // For rgb colors
    if (color.startsWith('rgb')) {
        return color.replace(/rgb\((.+?)\)/, `rgba($1, ${opacity})`);
    }

    return color;
}
