import {
    NodeTracerProvider,
    TracerConfig,
  } from "@opentelemetry/sdk-trace-node";
  import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"; // Use BatchSpanProcessor for better performance
  import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"; // Import OTLPTraceExporter
  import { registerInstrumentations } from "@opentelemetry/instrumentation";
  import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
  import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
  import { ATTR_DEPLOYMENT_ENVIRONMENT } from "@opentelemetry/semantic-conventions/incubating";
  import { Resource } from "@opentelemetry/resources";
  
  const providerConfig: TracerConfig = {
    resource: new Resource({
      [ATTR_SERVICE_NAME]: "logging", // Replace with your service name
      [ATTR_DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || "development", // Replace with your deployment environment
    }),
  };
  
  // Initialize and register the tracer provider
  const provider = new NodeTracerProvider(providerConfig);
  const otlp = new OTLPTraceExporter({
    url: "/v2/organizations/gmail-rockmiop/traces",
    headers: {
      Authorization: "eyJhbGciOiXXXXXXXXXXXXXX.eyJleHXXXXXXXXX.XXXXXXXXXXOwuvUNAeyJhbGciOiXXXXXXXXXXXXXX.eyJleHXXXXXXXXX.XXXXXXXXXXOwuvUNeyJhbGciOiXXXXXXXXXXXXXX",
    },
  }); // Configure the OTLP exporter
  
  provider.addSpanProcessor(new BatchSpanProcessor(otlp));
  provider.register();
  
  // Automatically instrument HTTP and Express (additional instrumentations can be added)
  registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations({
        // instrumentation-fs is disabled to reduce the noise of spans related to file operations
        "@opentelemetry/instrumentation-fs": {
          enabled: false,
        },
        "@opentelemetry/instrumentation-dns": {
          enabled: false,
        },
      }),
    ],
  });
  