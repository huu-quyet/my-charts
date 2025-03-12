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
- **Radar Chart**: For comparing multiple variables
- **Bubble Chart**: For three-dimensional data (x, y, size)
- **Polar Area Chart**: For polar coordinate visualization
- **Scatter Chart**: For correlation between variables

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

## Contributing

To add a new chart type:

- Create a new directory under src/ (e.g., src/new-chart-type/)
- Create the necessary files (NewChartComponent.tsx, types.ts, controls.ts, index.ts)
- Add the new chart type to the ChartType enum in src/types.ts
- Export your new chart from src/index.ts
- Update the component map in src/registerPlugin.tsx
