interface LogOptions {
    username?: string;
    metadata?: any;
  }
  
  // Send log to server
  async function logToServer(level: string, message: string, options?: LogOptions) {
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level,
          message,
          username: options?.username,
          metadata: options?.metadata,
        }),
      });
    } catch (error) {
      console.error('Error sending log to server:', error);
    }
  }
  
  // Client-side logger methods
  const clientLogger = {
    debug: (message: string, options?: LogOptions) => 
      logToServer('DEBUG', message, options),
    
    info: (message: string, options?: LogOptions) => 
      logToServer('INFO', message, options),
    
    warn: (message: string, options?: LogOptions) => 
      logToServer('WARN', message, options),
    
    error: (message: string, options?: LogOptions) => 
      logToServer('ERROR', message, options),
    
    fatal: (message: string, options?: LogOptions) => 
      logToServer('FATAL', message, options),
  };
  
  export default clientLogger;