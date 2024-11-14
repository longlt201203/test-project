import { Controller, Get } from "@nestjs/common";

@Controller("demo")
export class DemoController {
	@Get()
	async getHello() {
		return "Hello World!";
	}
}
