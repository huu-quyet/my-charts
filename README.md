# My Visualization Platform

A modular and extensible visualization platform with support for various chart types. Built with React, TypeScript, and Chart.js.

## Features

- 📊 Multiple chart types: Pie, Bar, Line, Radar, Bubble, Polar Area, and Scatter
- 🎨 Automatic dark/light theme based on system preference
- 📱 Responsive design that works on all screen sizes
- 🧩 Modular plugin architecture for easy extension
- 🔄 Common data format across all chart types

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/my-viz-platform.git
cd my-viz-platform

# Install dependencies
yarn install

# Start the development server
yarn dev
```

### Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn preview` - Preview the production build
- `yarn lint` - Run ESLint
- `yarn dev:watch-plugins` - Watch plugin changes and rebuild automatically
- `yarn dev:full` - Run development server with plugin watcher
- `yarn reinstall-plugins` - Rebuild and reinstall all plugins

## Project Structure

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
