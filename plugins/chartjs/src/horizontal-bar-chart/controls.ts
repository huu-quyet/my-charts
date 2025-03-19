import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME } from '../types';
import { HorizontalBarChartConfig } from './types';
import { formatLargeNumber } from '../utils';

/**
 * Prepare horizontal bar chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Groups data by category for multi-series horizontal bar charts
 * 
 * @param data The common dataset
 * @param config The horizontal bar chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareHorizontalBarChartData(data: CommonDataset, config: HorizontalBarChartConfig, isDarkMode: boolean) {
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

        return {
            label: category,
            data: sortedLabels.map(label => values.get(label) || 0),
            backgroundColor,
            borderColor: backgroundColor, // Same as background color
            borderWidth: 0, // No borders
            borderRadius: 8,
            barPercentage: 0.8,
            // Bar width configuration
            maxBarThickness: 42,     // Maximum width if specified
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
 * @param config The horizontal bar chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareHorizontalBarChartOptions(config: HorizontalBarChartConfig, isDarkMode: boolean): ChartOptions<'bar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                stacked: !!config.stacked,
                ticks: {
                    color: theme.textColor,
                    callback: (value) => {
                        if (typeof value === 'number') {
                            return formatLargeNumber(value);
                        }
                        return value;
                    },
                    padding: 16
                },
                grid: {
                    color: theme.gridColor
                },
                border: {
                    display: false, // Hide the axis border
                    dashOffset: 10,
                    dash: [10],
                    color: theme.gridColor,
                }
            },
            y: {
                stacked: !!config.stacked,
                ticks: {
                    color: theme.textColor,
                    padding: 16
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false, // Hide the axis border
                },
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
        ...config.options
    };
}
