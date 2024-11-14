import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";

export const instrumentation = new NodeSDK({
	serviceName: "test-project-api",
	traceExporter: new ZipkinExporter({
		url: "http://localhost:9411/api/v2/spans",
		serviceName: "test-project-api",
	}),
	metricReader: new PrometheusExporter({
		port: 9464,
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});
