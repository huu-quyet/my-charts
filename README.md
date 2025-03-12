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
git clone https://github.com/huu-quyet/my-charts.git
cd my-charts

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

my-viz-platform/
├── src/ # Main application code
├── plugins/ # Chart plugins
│ └── chartjs/ # Chart.js plugin implementation
│ ├── src/ # Plugin source code
│ ├── lib/ # Compiled output
│ └── package.json
├── public/ # Static assets
├── scripts/ # Build and utility scripts
└── package.json # Project dependencies
