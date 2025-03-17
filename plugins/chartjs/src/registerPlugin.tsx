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