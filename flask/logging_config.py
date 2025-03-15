import os
from logging.handlers import RotatingFileHandler
import socket
import getpass

SERVER_NAME = socket.gethostname()
USER_NAME = getpass.getuser()

LOG_DIR = os.path.join(os.path.dirname(__file__), 'logs')
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s - Server: ' + SERVER_NAME + ' - User: ' + USER_NAME + ' - %(levelname)s - %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'application.log'),
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'standard'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard'
        }
    },
    'loggers': {
        '': {  # root logger
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True
        }
    }
}
