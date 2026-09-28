#!/usr/bin/env node
const lib = require("./index.js");
try {
  const out = lib.run(process.argv.slice(2));
  if (out != null) process.stdout.write(String(out).endsWith("\n") ? String(out) : String(out) + "\n");
} catch (err) {
  console.error("zonemask:", err.message || err);
  process.exit(1);
}
