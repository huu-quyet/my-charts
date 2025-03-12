import type { ChartComponentProps, ChartComponentPropsMap, ChartComponentRegistry, ChartType } from './types';

/**
 * In-memory registry of available chart components
 * This would typically be stored in a more centralized location
 * or managed by a state management library like Redux
 */
export const chartComponents: ChartComponentRegistry = {};

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