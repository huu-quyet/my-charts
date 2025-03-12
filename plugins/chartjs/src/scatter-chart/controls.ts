import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { ScatterChartConfig } from './types';

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
        const borderColor = theme.borderColor[index % theme.borderColor.length];

        return {
            label: category,
            data: points,
            backgroundColor,
            borderColor,
            pointRadius: config.pointRadius || 5,
            pointHoverRadius: (config.pointRadius || 5) + 2,
        };
    });

    return {
        datasets: chartJSDatasets
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
