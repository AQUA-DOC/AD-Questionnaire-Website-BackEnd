import fs from "fs";
import path from "path";

const LOG_FILE = path.resolve(process.cwd(), "logs/app.log");
const MAX_LINES = 5000; // ← adjust as needed

// Ensure log directory exists
fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

function formatLine(level, message, meta) {
  const ts = new Date().toISOString();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : "";
  return `${ts} [${level.toUpperCase()}] ${message}${metaStr}`;
}

function writeLine(line) {
  let lines = [];

  if (fs.existsSync(LOG_FILE)) {
    const content = fs.readFileSync(LOG_FILE, "utf8");
    lines = content.split("\n").filter(Boolean);
  }

  lines.push(line);

  // Trim oldest lines if needed
  if (lines.length > MAX_LINES) {
    lines = lines.slice(lines.length - MAX_LINES);
  }

  fs.writeFileSync(LOG_FILE, lines.join("\n") + "\n");
}

export const logger = {
  info(message, meta) {
    writeLine(formatLine("info", message, meta));
  },

  warn(message, meta) {
    writeLine(formatLine("warn", message, meta));
  },

  error(message, meta) {
    writeLine(formatLine("error", message, meta));
  }
};