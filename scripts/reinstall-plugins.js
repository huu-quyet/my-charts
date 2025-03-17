import { exec } from "child_process";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Map of plugin paths
const plugins = ["./plugins/chartjs"];

// Global reinstall script
async function reinstallAllPlugins() {
  console.log("🔄 Reinstalling all plugins...");

  // Validate plugins first
  console.log("📋 Validating plugin configurations...");
  const validPlugins = [];

  for (const pluginPath of plugins) {
    const fullPath = resolve(rootDir, pluginPath);
    try {
      // Check if package.json exists
      const packageJsonPath = join(fullPath, "package.json");
      if (!fs.existsSync(packageJsonPath)) {
        console.error(`❌ No package.json found in ${pluginPath}`);
        continue;
      }

      // Read package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      console.log(
        `✓ Found package ${packageJson.name} (${packageJson.version}) in ${pluginPath}`
      );
      validPlugins.push({ path: pluginPath, fullPath, name: packageJson.name });
    } catch (error) {
      console.error(`❌ Failed to validate ${pluginPath}:`, error.message);
    }
  }

  if (validPlugins.length === 0) {
    console.error("❌ No valid plugins found to reinstall");
    return;
  }

  console.log(`✅ Found ${validPlugins.length} valid plugins to reinstall`);

  // Build all plugins in parallel
  console.log("\n🛠️ Building all plugins...");

  try {
    await Promise.all(
      validPlugins.map(async (plugin) => {
        console.log(`   🔨 Building ${plugin.name}...`);
        try {
          // Clean before build
          await execPromise(`cd ${plugin.fullPath} && rm -rf dist`);
          // Build
          await execPromise(`cd ${plugin.fullPath} && yarn build`, {
            stdio: "inherit",
          });
          console.log(`   ✅ Successfully built ${plugin.name}`);
          return true;
        } catch (error) {
          console.error(`   ❌ Failed to build ${plugin.name}:`, error.message);
          return false;
        }
      })
    );
  } catch (error) {
    console.error(`❌ Error building plugins:`, error.message);
    process.exit(1);
  }

  // Set up symlinks instead of reinstalling
  console.log("\n🔗 Setting up symlinks for plugins...");

  for (const plugin of validPlugins) {
    console.log(`   🔄 Setting up symlink for ${plugin.name}...`);

    try {
      // Path to the node_modules folder for this package
      const nodeModulesPath = join(rootDir, "node_modules", plugin.name);
      const distPath = join(plugin.fullPath, "dist");

      // Remove existing package in node_modules if it exists
      if (fs.existsSync(nodeModulesPath)) {
        console.log(`      Removing existing package...`);
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      }

      // Ensure parent directory exists
      const parentDir = dirname(nodeModulesPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      // Create symlink
      console.log(`      Creating symlink...`);
      fs.symlinkSync(distPath, nodeModulesPath, "junction");

      console.log(`   ✅ Successfully linked ${plugin.name}`);
    } catch (error) {
      console.error(
        `   ❌ Failed to set up symlink for ${plugin.name}:`,
        error.message
      );
    }
  }

  console.log("\n🎉 All plugins have been built and linked!");
  console.log("👉 You may now start the development server with 'yarn dev'");
  console.log("💡 Changes to plugins will be immediately reflected in the app");
}

// Helper function to promisify exec with better error handling
function execPromise(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        // Include stdout/stderr in the error for better debugging
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

// Run the reinstall process
reinstallAllPlugins().catch((err) => {
  console.error("❌ Error during reinstallation:", err.message);
  process.exit(1);
});
