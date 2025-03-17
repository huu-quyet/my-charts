import { exec } from "child_process";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Map of plugin paths and their package names (must match with watch-plugins.js)
const plugins = {
  "./plugins/chartjs": "@plugins/chartjs",
};

/**
 * Creates symlinks between plugin dist folders and node_modules for immediate updates
 */
async function setupPluginLinks() {
  console.log("🔗 Setting up symlinks for plugins...");

  for (const [pluginPath, packageName] of Object.entries(plugins)) {
    const fullPluginPath = resolve(rootDir, pluginPath);
    const packageJsonPath = join(fullPluginPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.error(`❌ No package.json found in ${pluginPath}`);
      continue;
    }

    // Get actual package name from package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const actualPackageName = packageJson.name;

    // Path to the node_modules folder for this package
    const nodeModulesPath = join(rootDir, "node_modules", actualPackageName);
    const distPath = join(fullPluginPath, "dist");

    try {
      // Ensure dist folder exists
      if (!fs.existsSync(distPath)) {
        console.log(`📁 Creating dist folder for ${actualPackageName}...`);
        fs.mkdirSync(distPath, { recursive: true });
      }

      // Remove existing package in node_modules if it exists
      if (fs.existsSync(nodeModulesPath)) {
        console.log(
          `🗑️ Removing existing package ${actualPackageName} from node_modules...`
        );
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      }

      // Ensure parent directory exists
      const parentDir = dirname(nodeModulesPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      // Create symlink
      console.log(`🔗 Linking ${distPath} to ${nodeModulesPath}...`);
      fs.symlinkSync(distPath, nodeModulesPath, "junction");

      console.log(`✅ Successfully linked plugin: ${actualPackageName}`);
    } catch (error) {
      console.error(
        `❌ Failed to link plugin ${actualPackageName}:`,
        error.message
      );
    }
  }

  console.log("\n🎉 Plugin symlinks setup complete!");
  console.log(
    "👉 Plugin changes will now be immediately reflected in the main application"
  );
}

// Run the setup process
setupPluginLinks().catch((err) => {
  console.error("❌ Error setting up plugin links:", err.message);
  process.exit(1);
});
