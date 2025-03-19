import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { ScatterChartConfig } from './types';
import { formatLargeNumber } from '../utils';

/**
 * Prepare scatter chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Extracts x/y coordinates from data points for plotting
 * 
 * @param data The common dataset
 * @param config The scatter chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareScatterChartData(data: CommonDataset, config: ScatterChartConfig, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Group by category
    const dataByCategory = new Map<string, { x: number; y: number }[]>();

    // Process items
    data.items.forEach(item => {
        const category = item.category || 'Default';

        if (!dataByCategory.has(category)) {
            dataByCategory.set(category, []);
        }

        // Extract x and y values
        const x = typeof item.label === 'string' && !isNaN(parseFloat(item.label))
            ? parseFloat(item.label)
            : item.extraData?.x as number || 0;

        const y = item.value;

        dataByCategory.get(category)!.push({
            x,
            y
        });
    });

    // Create Chart.js datasets
    const chartJSDatasets = Array.from(dataByCategory.entries()).map(([category, points], index) => {
        const backgroundColor = theme.backgroundColor[index % theme.backgroundColor.length];

        return {
            label: category,
            data: points,
            backgroundColor,
            borderColor: 'transparent', // Transparent borders
            pointRadius: 10,
            pointHoverRadius: 15,
        };
    });

    return {
        datasets: chartJSDatasets.map(dataset => ({
            ...dataset,
        }))
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * Includes custom tooltip formatting for coordinate display
 * 
 * @param config The scatter chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareScatterChartOptions(config: ScatterChartConfig, isDarkMode: boolean): ChartOptions<'scatter'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: config.aspectRatio || 1.5,
        scales: {
            x: {
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
                    display: false, // Hide the axis border,
                    dashOffset: 10,
                    dash: [10],
                    color: theme.gridColor,
                }
            },
            y: {
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
                    display: false, // Hide the axis border,
                    dashOffset: 10,
                    dash: [10],
                    color: theme.gridColor,
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
                callbacks: {
                    label: (ctx) => {
                        return `${ctx.dataset.label} (${ctx.parsed.x}, ${ctx.parsed.y})`;
                    }
                },
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                titleColor: isDarkMode ? '#fff' : '#000',
                bodyColor: isDarkMode ? '#ddd' : '#333',
            },
            ...config.options?.plugins
        },
        ...config.options
    };
}
