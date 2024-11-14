import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("app-controller");

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getHello() {
		return await tracer.startActiveSpan(
			"app-controller.getHello",
			async (span) => {
				const result = this.appService.getHello();
				span.end();
				return result;
			},
		);
	}
}
