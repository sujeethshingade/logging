import { NextResponse } from 'next/server';
import logger from '@/utils/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { level, message, username, metadata } = body;
    
    if (level === 'DEBUG') {
      logger.debug(message, username, metadata);
    } else if (level === 'INFO') {
      logger.info(message, username, metadata);
    } else if (level === 'WARN') {
      logger.warn(message, username, metadata);
    } else if (level === 'ERROR') {
      logger.error(message, username, metadata);
    } else if (level === 'FATAL') {
      logger.fatal(message, username, metadata);
    } else {
      // Default to info level
      logger.info(message, username, metadata);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging message:', error);
    return NextResponse.json({ error: 'Failed to log message' }, { status: 500 });
  }
}