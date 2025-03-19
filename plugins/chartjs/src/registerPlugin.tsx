import { Chart, Plugin } from 'chart.js';
import chartComponents from './ChartRegistry';
import type { ChartComponentProps, ChartComponentPropsMap, ChartType } from './types';

/**
 * Registers a chart component in the global registry
 * 
 * @template T Chart type from the ChartType enum
 * @param type The chart type identifier
 * @param Component The React component implementing the chart
 */
export function registerChartComponent<T extends ChartType>(
    type: T,
    Component: React.ComponentType<ChartComponentPropsMap[T]>
) {
    chartComponents[type] = {
        component: Component as React.ComponentType<ChartComponentProps>,
        timestamp: Date.now()
    };
    console.log(`Registered chart component: ${type}`);
}

/**
 * Retrieves a chart component from the registry
 * 
 * @template T Chart type from the ChartType enum
 * @param type The chart type to retrieve
 * @returns The requested component or undefined if not found
 */
export function getChartComponent<T extends ChartType>(type: T): React.ComponentType<ChartComponentPropsMap[T]> | undefined {
    return chartComponents[type]?.component as React.ComponentType<ChartComponentPropsMap[T]> | undefined;
}

/**
 * Registers a custom Chart.js plugin
 * 
 * @param plugin The plugin object to register
 */
// Create custom plugin for beforeInit hook
const customPlugin: Plugin = {
    id: 'customSpacing',
    beforeInit: (chart) => {
        // Access the chart instance before initialization
        const legend = chart.legend;
        if (!legend) return;
        const originalFit = legend.fit;

        // Override the legend fit function
        legend.fit = function () {
            originalFit.call(this);

            // Add extra spacing after legend
            this.height += 24;
        };
    }
};

// Register the custom plugin
Chart.register(customPlugin);