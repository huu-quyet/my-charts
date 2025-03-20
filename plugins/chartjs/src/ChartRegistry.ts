import { ChartComponentRegistry, ChartType } from './types';
import { PieChartComponent } from './pie-chart';
import { LineChartComponent } from './line-chart';
import { BarChartComponent } from './bar-chart';
import { BarLineChartComponent } from './bar-line-chart';
import { RadarChartComponent } from './radar-chart';
import { BubbleChartComponent } from './bubble-chart';
import { PolarAreaChartComponent } from './polar-area-chart';
import { ScatterChartComponent } from './scatter-chart';
import { DoughnutChartComponent } from './doughnut-chart';
import { StackChartComponent } from './stack-chart';
import { HeatmapChartComponent } from './heatmap-chart';
import { FloatingChartComponent } from './floating-chart';
import { HorizontalBarChartComponent } from './horizontal-bar-chart';

/**
 * Initial registry of chart components available in the system
 * Maps chart types to their React components
 */
const chartComponents: ChartComponentRegistry = {
    [ChartType.PIE]: {
        component: PieChartComponent,
        timestamp: Date.now()
    },
    [ChartType.LINE]: {
        component: LineChartComponent,
        timestamp: Date.now()
    },
    [ChartType.BAR]: {
        component: BarChartComponent,
        timestamp: Date.now()
    },
    [ChartType.BAR_LINE]: {
        component: BarLineChartComponent,
        timestamp: Date.now()
    },
    [ChartType.RADAR]: {
        component: RadarChartComponent,
        timestamp: Date.now()
    },
    [ChartType.BUBBLE]: {
        component: BubbleChartComponent,
        timestamp: Date.now()
    },
    [ChartType.POLAR_AREA]: {
        component: PolarAreaChartComponent,
        timestamp: Date.now()
    },
    [ChartType.SCATTER]: {
        component: ScatterChartComponent,
        timestamp: Date.now()
    },
    [ChartType.DOUGHNUT]: {
        component: DoughnutChartComponent,
        timestamp: Date.now()
    },
    [ChartType.STACK]: {
        component: StackChartComponent,
        timestamp: Date.now()
    },
    [ChartType.HEATMAP]: {
        component: HeatmapChartComponent,
        timestamp: Date.now()
    },
    [ChartType.FLOATING]: {
        component: FloatingChartComponent,
        timestamp: Date.now()
    },
    [ChartType.HORIZONTAL_BAR]: {
        component: HorizontalBarChartComponent,
        timestamp: Date.now()
    }
};

export default chartComponents;
