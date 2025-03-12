import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { BarChartConfig } from './types';

/**
 * Prepare bar chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Groups data by category for multi-series bar charts
 * 
 * @param data The common dataset
 * @param config The bar chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareBarChartData(data: CommonDataset, config: BarChartConfig, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Group data by category
    const dataByCategory = new Map<string, Map<string, number>>();
    const labels = new Set<string>();

    // First pass: collect unique labels and categories
    data.items.forEach(item => {
        labels.add(item.label);
        const category = item.category || 'Default';

        if (!dataByCategory.has(category)) {
            dataByCategory.set(category, new Map<string, number>());
        }

        dataByCategory.get(category)!.set(item.label, item.value);
    });

    const sortedLabels = Array.from(labels);

    // Create Chart.js datasets
    const chartJSDatasets = Array.from(dataByCategory.entries()).map(([category, values], index) => {
        const backgroundColor = theme.backgroundColor[index % theme.backgroundColor.length];
        const borderColor = theme.borderColor[index % theme.borderColor.length];

        return {
            label: category,
            data: sortedLabels.map(label => values.get(label) || 0),
            backgroundColor,
            borderColor,
            borderWidth: 1,
            borderRadius: config.borderRadius || 0,
            barPercentage: 0.8
        };
    });

    return {
        labels: sortedLabels,
        datasets: chartJSDatasets
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * 
 * @param config The bar chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareBarChartOptions(config: BarChartConfig, isDarkMode: boolean): ChartOptions<'bar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: config.horizontal ? 'y' : 'x',
        scales: {
            x: {
                stacked: !!config.stacked,
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
                stacked: !!config.stacked,
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
