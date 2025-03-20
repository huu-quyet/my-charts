import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { BarLineChartConfig } from './types';
import { formatLargeNumber } from '../utils';

/**
 * Prepare bar-line combination chart data for rendering with Chart.js
 * Transforms the common dataset into the format expected by Chart.js
 * Splits data between bar and line series based on configuration
 * 
 * @param data The common dataset
 * @param config The bar-line chart config
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js compatible data object
 */
export function prepareBarLineChartData(data: CommonDataset, config: BarLineChartConfig, isDarkMode: boolean) {
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
    const categories = Array.from(dataByCategory.keys());

    // Determine which categories should be bars vs lines
    let barCategories: string[] = [];
    let lineCategories: string[] = [];

    if (config.lineCategories && config.lineCategories.length > 0) {
        // If lineCategories is specified, use it
        lineCategories = config.lineCategories.filter(cat => categories.includes(cat));
        barCategories = categories.filter(cat => !lineCategories.includes(cat));
    } else if (config.barCategories && config.barCategories.length > 0) {
        // If barCategories is specified, use it
        barCategories = config.barCategories.filter(cat => categories.includes(cat));
        lineCategories = categories.filter(cat => !barCategories.includes(cat));
    } else {
        // Default: first category is bars, rest are lines
        barCategories = categories.length > 0 ? [categories[0]] : [];
        lineCategories = categories.slice(1);
    }

    // Create Chart.js datasets
    const chartJSDatasets: Array<any> = [];

    // Create bar datasets
    barCategories.forEach((category, index) => {
        const values = dataByCategory.get(category) || new Map<string, number>();
        const backgroundColor = theme.backgroundColor[index % theme.backgroundColor.length];

        chartJSDatasets.push({
            type: 'bar',
            label: category,
            data: sortedLabels.map(label => values.get(label) || 0),
            backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 0,
            borderRadius: config.borderRadius || 4,
            barPercentage: 0.8,
            categoryPercentage: 0.8,
            yAxisID: 'y',
            order: 1, // Bars appear behind lines
            maxBarThickness: 42, // Maximum width if specified
        });
    });

    // Create line datasets
    lineCategories.forEach((category, index) => {
        const values = dataByCategory.get(category) || new Map<string, number>();
        // Use a different section of the color palette for lines
        const colorIndex = (index + Math.max(barCategories.length, 3)) % theme.backgroundColor.length;
        const backgroundColor = theme.backgroundColor[colorIndex];

        const borderColor = backgroundColor.replace(/rgba\((\d+,\s*\d+,\s*\d+),\s*0\.8\)/, 'rgba($1, 1)');

        chartJSDatasets.push({
            type: 'line',
            label: category,
            data: sortedLabels.map(label => values.get(label) || 0),
            backgroundColor,
            borderColor,
            fill: false,
            yAxisID: config.useDualAxes ? 'y1' : 'y',
            order: 0, // Lines appear in front of bars
            borderWidth: 3,
            tension: 0.6,
            pointRadius: 8,
            pointBackgroundColor: borderColor,
            pointBorderColor: 'white',
            pointHoverRadius: 10,
            pointBorderWidth: 2,
            pointOpacity: 1,
        });
    });

    return {
        labels: sortedLabels,
        datasets: chartJSDatasets,
    };
}

/**
 * Prepare chart options based on configuration
 * Sets up the Chart.js options object with proper theme and user config
 * Handles dual Y-axis setup when enabled
 * 
 * @param config The bar-line chart configuration
 * @param isDarkMode Whether the UI is in dark mode
 * @returns Chart.js options object
 */
export function prepareBarLineChartOptions(config: BarLineChartConfig, isDarkMode: boolean): ChartOptions<'bar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Create scales configuration
    const scales: any = {
        x: {
            title: {
                display: !!config.xAxisLabel,
                text: config.xAxisLabel || '',
                color: theme.textColor
            },
            ticks: {
                color: theme.textColor,
                padding: 16
            },
            grid: {
                display: false
            },
            border: {
                display: false,
                dashOffset: 10,
                dash: [10],
                color: theme.gridColor,
            },
        },
        y: {
            title: {
                display: !!config.yAxisLabel,
                text: config.yAxisLabel || '',
                color: theme.textColor,
            },
            position: 'left',
            ticks: {
                color: theme.textColor,
                callback: (value: any) => {
                    if (typeof value === 'number') {
                        return formatLargeNumber(value);
                    }
                    return String(value);
                },
                padding: 16
            },
            grid: {
                color: theme.gridColor
            },
            border: {
                display: false,
                dashOffset: 10,
                dash: [10],
                color: theme.gridColor,
            },
        }
    };

    // Add second Y axis if dual axes are enabled
    if (config.useDualAxes) {
        scales.y1 = {
            title: {
                display: !!config.rightYAxisLabel,
                text: config.rightYAxisLabel || '',
                color: theme.textColor
            },
            position: 'right',
            ticks: {
                color: theme.textColor,
                callback: (value: any) => {
                    if (typeof value === 'number') {
                        return formatLargeNumber(value);
                    }
                    return String(value);
                },
                padding: 16
            },
            grid: {
                display: false,
            },
            border: {
                display: false,
                dashOffset: 10,
                dash: [10],
                color: theme.gridColor,
            },
        };
    }

    return {
        responsive: true,
        maintainAspectRatio: false,
        scales,
        interaction: {
            mode: 'index',
            intersect: false,
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
                },
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                titleColor: isDarkMode ? '#fff' : '#000',
                bodyColor: isDarkMode ? '#ddd' : '#333',
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${formatLargeNumber(value)}`;
                    }
                }
            },
            ...config.options?.plugins
        },
        ...config.options
    };
}
