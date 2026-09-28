
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function parseEnv(text) {
  const out = {};
  for (const line of String(text).split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[t.slice(0, i).trim()] = v;
  }
  return out;
}
function missingKeys(env, required) {
  return required.filter(k => env[k] == null || env[k] === "");
}
function run(argv) {
  const sample = argv[0] && argv[0].includes("=") ? argv.join("\n") : "NODE_ENV=production\nPORT=3000";
  const env = parseEnv(sample);
  if (argv[0] === "keys") return Object.keys(env).sort().join("\n");
  return JSON.stringify({ keys: Object.keys(env).length, missing: missingKeys(env, ["NODE_ENV"]) }, null, 2);
}

module.exports = { readInput, parseEnv, missingKeys, run };
