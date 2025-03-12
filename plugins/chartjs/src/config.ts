import { ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from './types';

// Chart configuration
interface ChartPluginConfig {
    themes: {
        light: ChartTheme;
        dark: ChartTheme;
    };
    defaults: {
        pie: {
            borderWidth: number;
            showLegend: boolean;
        };
        line: {
            tension: number;
            showPoints: boolean;
        };
        bar: {
            borderWidth: number;
            borderRadius: number;
        };
        radar: {
            fill: boolean;
        }
    };
}

export const chartPluginConfig: ChartPluginConfig = {
    themes: {
        light: DEFAULT_LIGHT_THEME,
        dark: DEFAULT_DARK_THEME,
    },
    defaults: {
        pie: {
            borderWidth: 1,
            showLegend: true,
        },
        line: {
            tension: 0.4,
            showPoints: true,
        },
        bar: {
            borderWidth: 1,
            borderRadius: 4,
        },
        radar: {
            fill: true,
        }
    }
};

// Get theme based on system preference
export function getCurrentTheme(): ChartTheme {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? chartPluginConfig.themes.dark : chartPluginConfig.themes.light;
}

// Create custom theme
export function createCustomTheme(theme: Partial<ChartTheme>, darkMode = false): ChartTheme {
    const baseTheme = darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    return {
        ...baseTheme,
        ...theme
    };
}
