import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { LineChartConfig } from './types';

/**
 * Prepare line chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Organizes data by category and handles time-based sorting
 * 
 * @param data The common dataset
 * @param config The line chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareLineChartData(data: CommonDataset, config: LineChartConfig, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Group by category
    const dataByCategory = new Map<string, { x: string | Date, y: number }[]>();

    // Sort items by date if present for proper chronological display
    const sortedItems = [...data.items].sort((a, b) => {
        if (a.date && b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
    });

    // Group items by category
    sortedItems.forEach(item => {
        const category = item.category || 'Default';

        if (!dataByCategory.has(category)) {
            dataByCategory.set(category, []);
        }

        dataByCategory.get(category)!.push({
            x: item.date || item.label,
            y: item.value
        });
    });

    // Create Chart.js datasets
    const chartJSDatasets = Array.from(dataByCategory.entries()).map(([category, points], index) => {
        const backgroundColor = theme.backgroundColor[index % theme.backgroundColor.length];
        const borderColor = theme.borderColor[index % theme.borderColor.length];

        return {
            label: category,
            data: points,
            fill: false,
            backgroundColor,
            borderColor,
            borderWidth: 2,
            tension: config.tension || 0.4,
            pointRadius: config.showPoints ? 4 : 0,
            pointBackgroundColor: borderColor,
            pointBorderColor: isDarkMode ? '#333' : '#fff',
            pointHoverRadius: 6
        };
    });

    return {
        datasets: chartJSDatasets
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * 
 * @param config The line chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareLineChartOptions(config: LineChartConfig, isDarkMode: boolean): ChartOptions<'line'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: !!config.xAxisLabel,
                    text: config.xAxisLabel || '',
                    color: theme.textColor
                },
                ticks: {
                    color: theme.textColor
                },
                grid: {
                    color: theme.gridColor
                }
            },
            y: {
                title: {
                    display: !!config.yAxisLabel,
                    text: config.yAxisLabel || '',
                    color: theme.textColor
                },
                ticks: {
                    color: theme.textColor
                },
                grid: {
                    color: theme.gridColor
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
        ...config.options
    };
}

