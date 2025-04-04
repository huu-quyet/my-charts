import {
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    BubbleChartComponent,
    PolarAreaChartComponent,
    ScatterChartComponent,
    DoughnutChartComponent,
    StackChartComponent,
    HeatmapChartComponent,
    registerChartComponent,
    ChartType,
    HorizontalBarChartComponent,
    BarLineChartComponent
} from "@plugins/chartjs";

export function registerPieChartPlugin() {
    registerChartComponent(ChartType.PIE, PieChartComponent);
}

export function registerLineChartPlugin() {
    registerChartComponent(ChartType.LINE, LineChartComponent);
}

export function registerBarChartPlugin() {
    registerChartComponent(ChartType.BAR, BarChartComponent);
}

export function registerBarLineChartPlugin() {
    registerChartComponent(ChartType.BAR_LINE, BarLineChartComponent);
}

export function registerRadarChartPlugin() {
    registerChartComponent(ChartType.RADAR, RadarChartComponent);
}

export function registerBubbleChartPlugin() {
    registerChartComponent(ChartType.BUBBLE, BubbleChartComponent);
}

export function registerPolarAreaChartPlugin() {
    registerChartComponent(ChartType.POLAR_AREA, PolarAreaChartComponent);
}

export function registerScatterChartPlugin() {
    registerChartComponent(ChartType.SCATTER, ScatterChartComponent);
}

export function registerDoughnutChartPlugin() {
    registerChartComponent(ChartType.DOUGHNUT, DoughnutChartComponent);
}

export function registerStackChartPlugin() {
    registerChartComponent(ChartType.STACK, StackChartComponent);
}

export function registerHeatmapChartPlugin() {
    registerChartComponent(ChartType.HEATMAP, HeatmapChartComponent);
}

export function registerHorizontalChartPlugin() {
    registerChartComponent(ChartType.HORIZONTAL_BAR, HorizontalBarChartComponent);
}

// Register all chart components
export function registerAllChartPlugins() {
    registerPieChartPlugin();
    registerLineChartPlugin();
    registerBarChartPlugin();
    registerBarLineChartPlugin();
    registerRadarChartPlugin();
    registerBubbleChartPlugin();
    registerPolarAreaChartPlugin();
    registerScatterChartPlugin();
    registerDoughnutChartPlugin();
    registerStackChartPlugin();
    registerHeatmapChartPlugin();
    registerHorizontalChartPlugin();
}
