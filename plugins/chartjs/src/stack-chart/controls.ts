import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { StackChartConfig } from './types';
import { formatLargeNumber } from '../utils';

/**
 * Prepare stack chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * 
 * @param data The common dataset
 * @param config The stack chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareStackChartData(data: CommonDataset, config: StackChartConfig, isDarkMode: boolean) {
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

        // For percentage charts, convert values to percentages for each label
        let data = sortedLabels.map(label => values.get(label) || 0);

        if (config.percentage) {
            // Calculate total for each label position across categories
            const totals = sortedLabels.map((label) => {
                let total = 0;
                Array.from(dataByCategory.values()).forEach(categoryValues => {
                    total += categoryValues.get(label) || 0;
                });
                return total;
            });

            // Convert to percentages
            data = data.map((value, i) => {
                return totals[i] ? (value / totals[i]) * 100 : 0;
            });
        }

        return {
            label: category,
            data,
            backgroundColor,
            borderColor: backgroundColor, // Same as background color
            borderWidth: 0, // No borders
            borderRadius: 16,
            barPercentage: 0.9,
            categoryPercentage: 0.9,
            // Bar width configuration
            maxBarThickness: 50,     // Maximum width if specified
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
 * @param config The stack chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareStackChartOptions(config: StackChartConfig, isDarkMode: boolean): ChartOptions<'bar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Custom tooltip for percentage display
    const tooltipCallback = config.percentage ? {
        callbacks: {
            label: (context: {
                dataset: { label?: string };
                parsed: { y?: number } | number;
            }) => {
                const label = context.dataset.label || '';
                const value = typeof context.parsed === 'object' ? context.parsed.y : context.parsed;
                const safeValue = typeof value === 'number' ? value : 0;
                return `${label}: ${safeValue.toFixed(1)}%`;
            }
        }
    } : {};

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: config.horizontal ? 'y' : 'x',
        scales: {
            x: {
                stacked: true, // Always stacked for stack charts
                title: {
                    display: !!config.xAxisLabel,
                    text: config.xAxisLabel || '',
                    color: theme.textColor
                },
                ticks: {
                    color: theme.textColor,
                    padding: 16,
                },
                grid: {
                    display: false, // Hide only the grid lines
                },
                border: {
                    display: false // Hide the axis border
                }
            },
            y: {
                stacked: true, // Always stacked for stack charts
                ticks: {
                    color: theme.textColor,
                    // Add '%' to y-axis ticks for percentage charts or format large numbers
                    callback: config.percentage ? function (value) {
                        return value + '%';
                    } : function (value) {
                        if (!config.horizontal && typeof value === 'number') {
                            return formatLargeNumber(value);
                        }
                        return value;
                    },
                    display: false,
                },
                grid: {
                    display: false, // Hide only the grid lines
                },
                border: {
                    display: false // Hide the axis border
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
                ...tooltipCallback
            },
            ...config.options?.plugins
        },
        ...config.options
    };
}
