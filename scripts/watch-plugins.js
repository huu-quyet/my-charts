import chokidar from "chokidar";
import { exec } from "child_process";
import { dirname, relative, resolve, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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

// Copy any file directly from src to dist with the same structure
function copyFile(srcFile, pluginPath) {
  const srcDir = join(pluginPath, "src");
  const distDir = join(pluginPath, "dist");
  const relativePath = relative(srcDir, srcFile);
  const distPath = join(distDir, relativePath);

  // Ensure the directory exists
  const distDirName = dirname(distPath);
  if (!fs.existsSync(distDirName)) {
    fs.mkdirSync(distDirName, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(srcFile, distPath);
  console.log(`📄 Copied file: ${relativePath}`);

  // Notify Vite about the change
  notifyVite();
}

// Copy all static files from src to dist during build
function copyStaticFiles(pluginPath) {
  const srcDir = join(pluginPath, "src");
  const distDir = join(pluginPath, "dist");

  // Create a recursive function to process directories
  function processDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(dir, entry.name);
      // Calculate the relative path from srcDir
      const relativePath = relative(srcDir, srcPath);
      const distPath = join(distDir, relativePath);

      if (entry.isDirectory()) {
        // Create directory in dist if it doesn't exist
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath, { recursive: true });
        }
        processDir(srcPath);
      } else if (isStaticFile(entry.name)) {
        // Copy static files (CSS, JSON, images, etc.)
        fs.copyFileSync(srcPath, distPath);
        console.log(`📄 Copied static file: ${relativePath}`);
      }
    }
  }

  try {
    processDir(srcDir);
  } catch (err) {
    console.error(`❌ Error copying static files: ${err.message}`);
  }
}

// Helper function to determine if a file is a static asset
function isStaticFile(filename) {
  const staticExtensions = [
    ".css",
    ".json",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".woff",
    ".woff2",
    ".eot",
    ".ttf",
  ];
  return staticExtensions.some((ext) => filename.endsWith(ext));
}

// Function to notify Vite of changes
function notifyVite() {
  // Touch the main entry file to trigger a Vite rebuild
  exec(
    `node -e "require('fs').utimesSync('src/main.tsx', new Date(), new Date())"`,
    { cwd: rootDir },
    (err) => {
      if (err) {
        console.error("❌ Failed to notify main application:", err.message);
      }
    }
  );
}

// Function to rebuild a specific plugin
function rebuildPlugin(pluginPath, packageName) {
  console.log(`🔄 Changes detected in ${packageName}. Rebuilding...`);

  // Execute TypeScript build
  exec(`cd ${pluginPath} && yarn tsc --build`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error building ${packageName}:`);
      console.error(stderr || error.message);
      return;
    }

    // Copy static files
    console.log(`📦 Copying static files for ${packageName}...`);
    copyStaticFiles(pluginPath);

    // Notify the main Vite server that plugins have changed
    console.log(`✅ Rebuilt ${packageName} successfully.`);
    console.log(`🔔 Notifying main application...`);
    notifyVite();
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

  // Watch for changes in source files
  chokidar
    .watch(
      [
        `${fullPath}/src/**/*.ts`,
        `${fullPath}/src/**/*.tsx`,
        `${fullPath}/src/**/*.css`,
        `${fullPath}/src/**/*.json`,
        `${fullPath}/src/**/*.svg`,
        `${fullPath}/src/**/*.png`,
        `${fullPath}/src/**/*.jpg`,
      ],
      {
        ignoreInitial: true,
      }
    )
    .on("change", (path) => {
      const relPath = relative(rootDir, path);
      console.log(`📝 File changed: ${relPath}`);

      // If it's a static file (CSS, JSON, images), just copy it directly for faster updates
      if (isStaticFile(path)) {
        copyFile(path, fullPath);
      } else {
        // For TS/TSX files, trigger a full rebuild
        debouncedRebuild();
      }
    })
    .on("error", (error) =>
      console.error(`❌ Watcher error: ${error.message}`)
    );
});

console.log("🔍 Plugin watcher started! Press Ctrl+C to stop.");
console.log("💡 Changes to plugins will be immediately reflected in the app");
