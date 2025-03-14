import fs from 'fs';
import path from 'path';
import os from 'os';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

const LOG_DIR = path.join(process.cwd(), 'logs');
const SERVER_NAME = os.hostname();
const MAX_LOG_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Get current log file path
function getLogFilePath(): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const logFilePattern = new RegExp(`^application_${today}_(\\d+)\\.log$`);
  let maxFileIndex = 0;
  
  if (fs.existsSync(LOG_DIR)) {
    // Find the highest index file for today
    const files = fs.readdirSync(LOG_DIR);
    files.forEach(file => {
      const match = file.match(logFilePattern);
      if (match) {
        const fileIndex = parseInt(match[1], 10);
        maxFileIndex = Math.max(maxFileIndex, fileIndex);
      }
    });
  }
  
  const currentLogFile = path.join(LOG_DIR, `application_${today}_${maxFileIndex}.log`);
  
  if (fs.existsSync(currentLogFile)) {
    const stats = fs.statSync(currentLogFile);
    if (stats.size >= MAX_LOG_SIZE_BYTES) {
      maxFileIndex++;
    }
  }
  
  return path.join(LOG_DIR, `application_${today}_${maxFileIndex}.log`);
}

// Format the log entry
function formatLog(level: LogLevel, message: string, username?: string, metadata?: any): string {
  const timestamp = new Date().toISOString();
  const levelName = LogLevel[level].padEnd(5);
  
  let logEntry = `[${timestamp}] [${levelName}] [${SERVER_NAME}]`;
  
  if (username) {
    logEntry += ` [User:${username}]`;
  }
  
  logEntry += ` ${message}`;
  
  if (metadata) {
    logEntry += ` ${JSON.stringify(metadata)}`;
  }
  
  return logEntry;
}

// Write to log file
function writeLog(level: LogLevel, message: string, username?: string, metadata?: any): void {
  const logFilePath = getLogFilePath();
  const logEntry = formatLog(level, message, username, metadata) + '\n';
  
  fs.appendFileSync(logFilePath, logEntry);
}

const logger = {
  debug: (message: string, username?: string, metadata?: any) => 
    writeLog(LogLevel.DEBUG, message, username, metadata),
  
  info: (message: string, username?: string, metadata?: any) => 
    writeLog(LogLevel.INFO, message, username, metadata),
  
  warn: (message: string, username?: string, metadata?: any) => 
    writeLog(LogLevel.WARN, message, username, metadata),
  
  error: (message: string, username?: string, metadata?: any) => 
    writeLog(LogLevel.ERROR, message, username, metadata),
  
  fatal: (message: string, username?: string, metadata?: any) => 
    writeLog(LogLevel.FATAL, message, username, metadata),
};

export default logger;