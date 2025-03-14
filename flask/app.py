from flask import Flask
from logging.config import dictConfig
from logging_config import LOGGING_CONFIG

app = Flask(__name__)
dictConfig(LOGGING_CONFIG)


@app.route('/')
def home():
    app.logger.debug('Debug message')
    app.logger.info('Info message')
    app.logger.warning('Warning message')
    app.logger.error('Error message')
    app.logger.critical('Critical message')
    app.logger.exception('Exception message')
    return "Flask Logging App"


if __name__ == '__main__':
    app.run(debug=True)