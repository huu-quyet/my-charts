import chokidar from "chokidar";
import { exec } from "child_process";
import { dirname, relative, resolve } from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Map of plugin paths and their package names
const plugins = {
  "./plugins/chartjs": "@plugins/chartjs",
};

// Debounce function to limit rebuild frequency
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Function to rebuild a specific plugin
function rebuildPlugin(pluginPath, packageName) {
  console.log(`🔄 Changes detected in ${pluginPath}. Rebuilding...`);

  // Execute TypeScript build
  exec(`cd ${pluginPath} && yarn tsc --build`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error building ${packageName}:`, error);
      return;
    }

    // Notify the main Vite server that plugins have changed
    console.log(`✅ Rebuilt ${packageName} successfully.`);
    console.log(`🔔 Notifying main application...`);

    // Touch the main entry file to trigger a Vite rebuild
    exec(
      `node -e "require('fs').utimesSync('src/main.tsx', new Date(), new Date())"`,
      { cwd: rootDir },
      (err) => {
        if (err) {
          console.error("Failed to notify main application:", err);
        } else {
          console.log("🚀 Main application notified of plugin changes!");
        }
      }
    );
  });
}

// Start watching each plugin
Object.entries(plugins).forEach(([pluginPath, packageName]) => {
  const fullPath = resolve(rootDir, pluginPath);
  console.log(`👀 Watching for changes in ${packageName} (${fullPath})...`);

  // Setup the watcher with debounced rebuild
  const debouncedRebuild = debounce(
    () => rebuildPlugin(fullPath, packageName),
    300
  );

  chokidar
    .watch(
      [
        `${fullPath}/src/**/*.ts`,
        `${fullPath}/src/**/*.tsx`,
        `${fullPath}/src/**/*.css`,
      ],
      {
        ignoreInitial: true,
      }
    )
    .on("change", (path) => {
      console.log(`📝 File changed: ${relative(rootDir, path)}`);
      debouncedRebuild();
    })
    .on("error", (error) => console.error(`Watcher error: ${error}`));
});

console.log("🔍 Plugin watcher started! Press Ctrl+C to stop.");
