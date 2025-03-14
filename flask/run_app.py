# Package to instrument Flask
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
)
from opentelemetry.semconv.resource import ResourceAttributes
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

from app import app

# Configure the OTLP endpoint and headers
OTLP_ENDPOINT = "https://app.last9.io/api/v4/organizations/gmail-rockmiop/v1/traces"
headers = {
    "Authorization": "eyJhbGciOiXXXXXXXXXXXXXX.eyJleHXXXXXXXXX.XXXXXXXXXXOwuvUNAeyJhbGciOiXXXXXXXXXXXXXX.eyJleHXXXXXXXXX.XXXXXXXXXXOwuvUNeyJhbGciOiXXXXXXXXXXXXXX"
}

# Instrument Flask application
FlaskInstrumentor().instrument_app(app)
FlaskInstrumentor().instrument(enable_commenter=True, commenter_options={})

# Creating a resource with the service name and environment
resource = Resource(attributes={
    ResourceAttributes.SERVICE_NAME: "flask-logging",
    ResourceAttributes.DEPLOYMENT_ENVIRONMENT: "development",
})

# Initialize the OTLP exporter with proper configuration
otlp_exporter = OTLPSpanExporter(
    endpoint=OTLP_ENDPOINT,
    headers=headers
)

provider = TracerProvider(resource=resource)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

# Run the Flask application
app.run(port=5000)
