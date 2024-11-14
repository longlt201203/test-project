import { Injectable } from "@nestjs/common";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("app-service");

@Injectable()
export class AppService {
	getHello(): string {
		return tracer.startActiveSpan("app-service.getHello", (span) => {
			span.end();
			// throw new Error("Error in AppService");
			return "Hello World!";
		});
	}
}
