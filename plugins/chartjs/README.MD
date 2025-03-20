# ChartJS Plugin for Visualization Platform

## Overview

This plugin provides a comprehensive set of chart components built on top of Chart.js and React-ChartJS-2. It offers a consistent API across different chart types with built-in support for theming, responsive design, and a common data format.

## Features

- **Unified Data Format**: Use the same data structure across all chart types
- **Theme Support**: Automatic detection of system light/dark preference
- **Type Safety**: Comprehensive TypeScript definitions
- **Responsive Design**: Charts automatically adjust to container size
- **Consistent Styling**: Uniform look and feel across all visualizations
- **Extensible**: Easy to add new chart types

## Available Chart Types

- **Pie Chart**: For part-to-whole relationships
- **Bar Chart**: For comparing categories
- **Line Chart**: For showing trends over time
- **Bar-Line Chart**: For combining bar and line visualizations in a single chart
- **Radar Chart**: For comparing multiple variables
- **Bubble Chart**: For three-dimensional data (x, y, size)
- **Polar Area Chart**: For polar coordinate visualization
- **Scatter Chart**: For correlation between variables
- **Doughnut Chart**: For part-to-whole relationships with a center cutout
- **Stack Chart**: For showing part-to-whole relationships over a dimension
- **Waterfall Chart**: For showing how positive/negative values contribute to a total
- **Heatmap Chart**: For showing data density across two dimensions
- **Table Chart**: For showing raw data in a tabular format

## Common Data Format

All charts use a standardized data format:

```typescript
interface CommonDataItem {
    label: string;
    value: number;
    category?: string;
    color?: string;
    date?: string | Date;
    extraData?: Record<string, unknown>;
}

interface CommonDataset {
    items: CommonDataItem[];
    title?: string;
    metadata?: Record<string, unknown>;
}

import { PieChartComponent, ChartType } from '@plugins/chartjs';

// Sample data
const data = {
    items: [
        { label: "Red", value: 12, color: "#FF6384", category: "Group 1" },
        { label: "Blue", value: 19, color: "#36A2EB", category: "Group 1" },
        { label: "Yellow", value: 3, color: "#FFCE56", category: "Group 1" }
    ]
};

// Sample component
function MyChart() {
    return (
        <PieChartComponent
            metadata={{
                title: "Sample Chart",
                description: "Distribution of colors"
            }}
            data={data}
            config={{
                showLegend: true,
                cutout: '30%'
            }}
        />
    );
}
```

## Bar-Line Chart

The Bar-Line chart combines bar and line elements in a single visualization, allowing for effective comparison of different types of related data.

### Features

- Configurable categories for bar and line representation
- Optional dual y-axes for different scales of data
- Customizable styling for both bar and line elements
- Interactive tooltips for data exploration

### Example Usage

```typescript
import { BarLineChartComponent, ChartType } from '@plugins/chartjs';

// Sample data
const data = {
  items: [
    { label: "Jan", value: 100, category: "Revenue" },
    { label: "Feb", value: 120, category: "Revenue" },
    { label: "Mar", value: 140, category: "Revenue" },
    { label: "Jan", value: 20, category: "Growth Rate" },
    { label: "Feb", value: 22, category: "Growth Rate" },
    { label: "Mar", value: 25, category: "Growth Rate" }
  ]
};

// Sample component
function MyBarLineChart() {
  return (
    <BarLineChartComponent
      metadata={{
        title: "Revenue and Growth Rate",
        description: "Monthly revenue with corresponding growth rates"
      }}
      data={data}
      config={{
        barCategories: ["Revenue"],
        lineCategories: ["Growth Rate"],
        useDualAxes: true,
        yAxisLabel: "Revenue ($)",
        rightYAxisLabel: "Growth (%)",
        showLegend: true,
        showPoints: true
      }}
    />
  );
}
```

## Architecture

The plugin is organized by chart type, with each type having its own directory containing:

- Component: The React component (e.g., PieChart.tsx)
- Types: TypeScript definitions specific to the chart (types.ts)
- Controls: Data transformation and option preparation (controls.ts)
- Common functionality is provided in:

- types.ts: Core type definitions
- utils/: Helper functions
- registerPlugin.tsx: Dynamic component registration

## Advanced Usage

### Custom Themes

```typescript
import { PieChartComponent, ChartTheme, DEFAULT_LIGHT_THEME } from '@plugins/chartjs';

// Create a custom theme
const customTheme: ChartTheme = {
    ...DEFAULT_LIGHT_THEME,
    backgroundColor: ['#ff5722', '#03a9f4', '#8bc34a', '#673ab7', '#e91e63'],
    textColor: '#333'
};

// Pass to your chart
function MyChart() {
    return (
        <PieChartComponent
            // ... your props
            theme={customTheme}
        />
    );
}
```

## Chart Registration

```typescript
import { registerChartComponent, ChartType } from "@plugins/chartjs";
import { MyCustomChart } from "./MyCustomChart";

// Register a custom chart component
registerChartComponent("myCustom", MyCustomChart);

// Later, use your registered component
const MyChart = getChartComponent("myCustom");
```

## Heatmap Chart

The heatmap chart is built with D3.js and provides a way to visualize matrix data where color intensity represents values.

### Features

- Color intensity mapping for values
- Customizable color scales and interpolation methods
- Optional cell value display
- Automatic text color contrast adjustment
- Interactive tooltips
- Color legend with configurable ticks
- Animation support
- Full dark mode support

### Example Usage

```typescript
import { HeatmapChartComponent, ChartType } from '@plugins/chartjs';

// Sample data
const heatmapData = {
  items: [
    { label: "Item A", value: 10, category: "Category 1" },
    { label: "Item B", value: 20, category: "Category 1" },
    { label: "Item C", value: 30, category: "Category 2" },
    { label: "Item A", value: 40, category: "Category 2" },
    { label: "Item B", value: 50, category: "Category 3" },
    { label: "Item C", value: 60, category: "Category 3" }
  ]
};

// Sample component
function MyHeatmap() {
  return (
    <HeatmapChartComponent
      metadata={{
        title: "Value Distribution",
        description: "Heatmap showing value distribution across categories and items"
      }}
      data={heatmapData}
      config={{
        title: 'Value Distribution Matrix',
        xAxisLabel: 'Categories',
        yAxisLabel: 'Items',
        showValues: true,
        valueFormat: '.0f',
        colorInterpolation: 'hsl'
      }}
    />
  );
}
```

The heatmap chart takes the following configuration options:

- `title`: Title displayed at the top of the chart
- `xAxisLabel`: Label for the x-axis
- `yAxisLabel`: Label for the y-axis
- `showLegend`: Whether to display the chart legend
- `colorScale`: Array of colors for the heatmap cells
- `colorDomain`: Fixed domain for the color scale [min, max]
- `colorInterpolation`: Method for interpolating colors ('rgb', 'hsl', 'lab', 'hcl')
- `showValues`: Whether to show cell values
- `valueFormat`: D3 format string for cell values
- `valueColor`: Text color for cell values or 'auto' for contrast detection
- `cellPadding`: Padding between cells in pixels
- `cellRadius`: Corner radius for cells in pixels
- `animationDuration`: Duration of animations in milliseconds

## Contributing

To add a new chart type:

- Create a new directory under src/ (e.g., src/new-chart-type/)
- Create the necessary files (NewChartComponent.tsx, types.ts, controls.ts, index.ts)
- Add the new chart type to the ChartType enum in src/types.ts
- Export your new chart from src/index.ts
- Update the component map in src/registerPlugin.tsx
