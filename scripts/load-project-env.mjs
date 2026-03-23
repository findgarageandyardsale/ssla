import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Load `.env` then `.env.local` into `process.env` (same idea as Vite).
 * @param {string} root project root (folder containing .env)
 * @returns {boolean} true if at least one env file existed
 */
export function loadProjectEnv(root) {
  function loadEnvFile(filePath, overrideExisting = false) {
    if (!existsSync(filePath)) return false;
    const text = readFileSync(filePath, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (overrideExisting || process.env[key] === undefined) process.env[key] = val;
    }
    return true;
  }

  const envPath = join(root, ".env");
  const envLocalPath = join(root, ".env.local");
  const hasEnv = loadEnvFile(envPath, false);
  loadEnvFile(envLocalPath, true);
  return hasEnv || existsSync(envLocalPath);
}
