import { ChartType, ChartComponentRegistry, ChartComponentPropsMap } from './types';
import React from 'react';

// Import chart components (will be replaced with actual imports)
import { PieChartComponent } from './pie-chart/PieChart';
import { BarChartComponent } from './bar-chart/BarChart';
import { LineChartComponent } from './line-chart/LineChart';
import { RadarChartComponent } from './radar-chart/RadarChart';
import { BubbleChartComponent } from './bubble-chart';
import { PolarAreaChartComponent } from './polar-area-chart';
import { ScatterChartComponent } from './scatter-chart';
import { DoughnutChartComponent } from './doughnut-chart';
import { StackChartComponent } from './stack-chart';
import { HeatmapChartComponent } from './heatmap-chart';
import { FloatingChartComponent } from './floating-chart';
import { HorizontalBarChartComponent } from './horizontal-bar-chart';

/**
 * Registry of available chart components
 * This could be expanded with a registration system for plugins
 */
const chartComponents: ChartComponentRegistry = {
    [ChartType.PIE]: {
        component: PieChartComponent as React.ComponentType<ChartComponentPropsMap['pie']>,
        timestamp: Date.now()
    },
    [ChartType.BAR]: {
        component: BarChartComponent as React.ComponentType<ChartComponentPropsMap['bar']>,
        timestamp: Date.now()
    },
    [ChartType.LINE]: {
        component: LineChartComponent as React.ComponentType<ChartComponentPropsMap['line']>,
        timestamp: Date.now()
    },
    [ChartType.RADAR]: {
        component: RadarChartComponent as React.ComponentType<ChartComponentPropsMap['radar']>,
        timestamp: Date.now()
    },
    [ChartType.BUBBLE]: {
        component: BubbleChartComponent as React.ComponentType<ChartComponentPropsMap['bubble']>,
        timestamp: Date.now()
    },
    [ChartType.POLAR_AREA]: {
        component: PolarAreaChartComponent as React.ComponentType<ChartComponentPropsMap['polarArea']>,
        timestamp: Date.now()
    },
    [ChartType.SCATTER]: {
        component: ScatterChartComponent as React.ComponentType<ChartComponentPropsMap['scatter']>,
        timestamp: Date.now()
    },
    [ChartType.DOUGHNUT]: {
        component: DoughnutChartComponent as React.ComponentType<ChartComponentPropsMap['doughnut']>,
        timestamp: Date.now()
    },
    [ChartType.STACK]: {
        component: StackChartComponent as React.ComponentType<ChartComponentPropsMap['stack']>,
        timestamp: Date.now()
    },
    [ChartType.HEATMAP]: {
        component: HeatmapChartComponent as React.ComponentType<ChartComponentPropsMap['heatmap']>,
        timestamp: Date.now()
    },
    [ChartType.FLOATING]: {
        component: FloatingChartComponent as React.ComponentType<ChartComponentPropsMap['floating']>,
        timestamp: Date.now()
    },
    [ChartType.HORIZONTAL_BAR]: {
        component: HorizontalBarChartComponent as React.ComponentType<ChartComponentPropsMap['horizontal-bar']>,
        timestamp: Date.now()
    }
    // Additional chart types can be registered here
};

export default chartComponents;
