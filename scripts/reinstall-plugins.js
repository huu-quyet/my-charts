import { exec } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Map of plugin paths
const plugins = ["./plugins/chartjs"];

// Global reinstall script
async function reinstallAllPlugins() {
  console.log("🔄 Reinstalling all plugins...");

  // Rebuild each plugin
  for (const pluginPath of plugins) {
    const fullPath = resolve(rootDir, pluginPath);
    console.log(`📦 Processing ${pluginPath}...`);

    try {
      // Build plugin
      console.log(`   Building ${pluginPath}...`);
      await execPromise(`cd ${fullPath} && yarn build`, {
        stdio: "inherit",
      });

      // Reinstall plugin in root project
      console.log(`   Reinstalling ${pluginPath} in main project...`);
      await execPromise(`yarn remove ${pluginPath} && yarn add ${pluginPath}`, {
        cwd: rootDir,
        stdio: "inherit",
      });

      console.log(`✅ Successfully reinstalled ${pluginPath}`);
    } catch (error) {
      console.error(`❌ Failed to process ${pluginPath}:`, error);
    }
  }

  console.log("🎉 All plugins have been reinstalled!");
}

// Helper function to promisify exec
function execPromise(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

// Run the reinstall process
reinstallAllPlugins().catch((err) => {
  console.error("❌ Error during reinstallation:", err);
  process.exit(1);
});
