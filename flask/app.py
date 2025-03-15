from flask import Flask
from logging.config import dictConfig
from logging_config import LOGGING_CONFIG
from prometheus_flask_exporter import PrometheusMetrics

app = Flask(__name__)
metrics = PrometheusMetrics(app)
dictConfig(LOGGING_CONFIG)

# static information as metric
metrics.info('app_info', 'Application info', version='1.0.0')

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