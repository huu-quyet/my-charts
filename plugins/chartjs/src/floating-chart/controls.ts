import { ChartOptions } from 'chart.js';
import { CommonDataset, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';
import { FloatingChartConfig } from './types';

export function prepareFloatingChartData(data: CommonDataset, config: FloatingChartConfig, isDarkMode: boolean) {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // Group data by category
    const categories = Array.from(new Set(data.items.map(item => item.category || 'Default')));
    const labels = Array.from(new Set(data.items.map(item => item.label)));

    const datasets = categories.map((category, index) => {
        const backgroundColor = theme.backgroundColor[index % theme.backgroundColor.length];
        const categoryData = labels.map(label => {
            const item = data.items.find(i => i.label === label && (i.category || 'Default') === category);
            if (!item) return null;

            const value = item.value;
            const minValue = item.extraData?.min as number ?? value;
            const maxValue = item.extraData?.max as number ?? value;

            return [minValue, maxValue];
        });

        return {
            label: category,
            data: categoryData,
            backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 0,
            borderRadius: config.borderRadius || 4,
            borderSkipped: false
        };
    });

    return {
        labels,
        datasets
    };
}

export function prepareFloatingChartOptions(config: FloatingChartConfig, isDarkMode: boolean): ChartOptions<'bar'> {
    const theme = isDarkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: config.horizontal ? 'y' : 'x',
        scales: {
            x: {
                title: {
                    display: !!config.xAxisLabel,
                    text: config.xAxisLabel || '',
                    color: theme.textColor
                },
                ticks: { color: theme.textColor },
                grid: { color: theme.gridColor }
            },
            y: {
                title: {
                    display: !!config.yAxisLabel,
                    text: config.yAxisLabel || '',
                    color: theme.textColor
                },
                ticks: { color: theme.textColor },
                grid: { color: theme.gridColor }
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
