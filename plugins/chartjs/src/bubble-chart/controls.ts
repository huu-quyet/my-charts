import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { BubbleChartConfig } from './types';

/**
 * Prepare bubble chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Creates bubble chart data with x, y coordinates and r (radius) values
 * 
 * @param data The common dataset
 * @param config The bubble chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareBubbleChartData(data: CommonDataset, config: BubbleChartConfig, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Group by category
    const dataByCategory = new Map<string, { x: number; y: number; r: number }[]>();

    // Process items
    data.items.forEach(item => {
        const category = item.category || 'Default';

        if (!dataByCategory.has(category)) {
            dataByCategory.set(category, []);
        }

        // Extract x, y, and r values
        // For bubble charts: x and y are coordinates, r is the bubble size (radius)
        // Use value as y, parse label as x if it's a number, and use extraData.size as r
        const x = typeof item.label === 'string' && !isNaN(parseFloat(item.label))
            ? parseFloat(item.label)
            : item.extraData?.x as number || 0;

        const y = item.value;

        // Size can come from extraData.size or extraData.r
        const size = (item.extraData?.size as number) ||
            (item.extraData?.r as number) ||
            Math.max(4, Math.min(20, y / 5)); // Default size based on y value

        dataByCategory.get(category)!.push({
            x,
            y,
            r: size
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
            borderWidth: 1,
            hoverRadius: 4,
            hoverBorderWidth: 1,
        };
    });

    return {
        datasets: chartJSDatasets
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * Includes custom tooltip to show bubble size information
 * 
 * @param config The bubble chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareBubbleChartOptions(config: BubbleChartConfig, isDarkMode: boolean): ChartOptions<'bubble'> {
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
                    label: (item) => {
                        const datapoint = item.raw as { x: number, y: number, r: number };
                        const sizeLabel = config.sizeLabel || 'Size';
                        return [
                            `${item.dataset.label}: (${item.label}, ${item.formattedValue})`,
                            `${sizeLabel}: ${datapoint.r}`
                        ];
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
