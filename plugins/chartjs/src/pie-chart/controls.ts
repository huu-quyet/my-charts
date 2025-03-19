import { ChartOptions } from 'chart.js';
import { CommonDataset, CommonDataItem, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { PieChartConfig } from './types';
import { formatLargeNumber } from '../utils';

/**
 * Convert common dataset format to pie chart specific format
 * (Note: This function is maintained for backward compatibility)
 * 
 * @param commonData The common dataset
 * @returns Pie chart specific data format
 */
export function convertCommonToPieData(commonData: CommonDataset) {
    return {
        items: commonData.items.map((item: CommonDataItem) => {
            return {
                label: item.label,
                value: item.value,
                color: item.color // Use provided color if available
            };
        })
    };
}

/**
 * Prepare pie chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * 
 * @param data The common dataset
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function preparePieChartData(data: CommonDataset, isDarkMode: boolean) {
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
            borderWidth: 0  // Set border width to 0 to remove borders
        }]
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * 
 * @param config The pie chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function preparePieChartOptions(config: PieChartConfig, isDarkMode: boolean): ChartOptions<'pie'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
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


