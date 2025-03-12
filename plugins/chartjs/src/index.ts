/**
 * ChartJS Plugin for Visualization Platform
 * 
 * A comprehensive charting library built on top of Chart.js and React-ChartJS-2,
 * providing a consistent, theme-aware API for various chart types.
 * 
 * Features:
 * - Common dataset format that works across all chart types
 * - Dark/light theme support with automatic system preference detection
 * - Responsive design with consistent styling
 * - Type-safe configuration options for each chart type
 * - Simplified API with sensible defaults
 */

// Export chart components
export * from './pie-chart';
export * from './line-chart';
export * from './bar-chart';
export * from './radar-chart';
export * from './bubble-chart';
export * from './polar-area-chart';
export * from './scatter-chart';

// Export core types and utilities
export * from './types';
export * from './registerPlugin';
export * from './config';
export * from './utils';

// Export chart types enum
export { ChartType } from './types';

// Export chart data controls
export * from './pie-chart/controls';
export * from './line-chart/controls';
export * from './bar-chart/controls';
export * from './radar-chart/controls';
export * from './bubble-chart/controls';
export * from './polar-area-chart/controls';
export * from './scatter-chart/controls';
