import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { RadarChartConfig } from './types';

/**
 * Prepare radar chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Creates radar axes from unique labels and datasets from categories
 * 
 * @param data The common dataset
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareRadarChartData(data: CommonDataset, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Extract all unique labels and categories
    const labels = new Set<string>();
    const categories = new Set<string>();

    data.items.forEach(item => {
        labels.add(item.label);
        categories.add(item.category || 'Default');
    });

    // Create a lookup for values by category and label
    const valueLookup = new Map<string, Map<string, number>>();

    data.items.forEach(item => {
        const category = item.category || 'Default';
        if (!valueLookup.has(category)) {
            valueLookup.set(category, new Map<string, number>());
        }
        valueLookup.get(category)!.set(item.label, item.value);
    });

    // Create datasets
    const sortedLabels = Array.from(labels);
    const chartJSDatasets = Array.from(categories).map((category, index) => {
        const values = valueLookup.get(category) || new Map();
        const backgroundColor = `${theme.backgroundColor[index % theme.backgroundColor.length]}80`; // Add transparency
        const borderColor = theme.borderColor[index % theme.borderColor.length];

        return {
            label: category,
            data: sortedLabels.map(label => values.get(label) || 0),
            backgroundColor,
            borderColor,
            borderWidth: 1,
            pointBackgroundColor: borderColor,
            pointBorderColor: isDarkMode ? '#333' : '#fff',
            pointHoverRadius: 6
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
 * @param config The radar chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareRadarChartOptions(config: RadarChartConfig, isDarkMode: boolean): ChartOptions<'radar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    color: theme.gridColor,
                },
                grid: {
                    color: theme.gridColor,
                },
                pointLabels: {
                    color: theme.textColor,
                },
                ticks: {
                    color: theme.textColor,
                    backdropColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                },
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
