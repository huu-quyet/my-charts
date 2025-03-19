import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { LineChartConfig } from './types';
import { formatLargeNumber } from '../utils';

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
        // Convert rgba(r,g,b,0.8) to rgba(r,g,b,1)
        const borderColor = backgroundColor.replace(/rgba\((\d+,\s*\d+,\s*\d+),\s*0\.8\)/, 'rgba($1, 1)');

        return {
            label: category,
            data: points,
            fill: false,
            backgroundColor,
            borderColor,
            borderWidth: 4,
            tension: 0.6,
            pointRadius: 10,
            pointBackgroundColor: borderColor,
            pointBorderColor: 'white',
            pointHoverRadius: 12,
            pointBorderWidth: 2,
            pointOpacity: 1,
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
                ticks: {
                    color: theme.textColor,
                    display: true, // Keep the values visible
                    padding: 16
                },
                border: {
                    display: false,
                    dashOffset: 10,
                    dash: [10],
                    color: theme.gridColor,
                },
                grid: {
                    color: theme.gridColor
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
                    display: false // Hide only the grid lines
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
            },
            ...config.options?.plugins
        },
        ...config.options
    };
}

