import { JSX } from 'react';
import {
    DynamicChartProps,
} from './types';
import { getChartComponent } from './registerPlugin';

/**
 * A dynamic chart component that can render different chart types
 */
export const DynamicChart = <TConfig extends object>({
    chartType,
    data,
    metadata,
    config,
}: DynamicChartProps<TConfig>): JSX.Element => {
    // Get the component for the selected chart type
    const ChartComponent = getChartComponent(chartType);

    if (!ChartComponent) {
        return (
            <div className="chart-error">
                <h3>Chart type not available</h3>
                <p>The selected chart type "{chartType}" is not registered or available.</p>
            </div>
        );
    }

    return (
        <>
            {/* The actual chart component */}
            <ChartComponent
                data={data}
                metadata={metadata}
                config={config}
            />
        </>
    );
};

export default DynamicChart;
