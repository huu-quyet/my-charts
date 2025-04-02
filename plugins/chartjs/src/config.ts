import { ChartTheme, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from './types';

// Chart configuration
interface ChartPluginConfig {
    themes: {
        light: ChartTheme;
        dark: ChartTheme;
    };
}

export const chartPluginConfig: ChartPluginConfig = {
    themes: {
        light: DEFAULT_LIGHT_THEME,
        dark: DEFAULT_DARK_THEME,
    },
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
