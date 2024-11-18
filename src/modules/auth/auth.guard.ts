import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Tracing } from "@utils";

export class AuthGuard implements CanActivate {
	@Tracing()
	async canActivate(context: ExecutionContext) {
		await this.wait1Second();
		return true;
	}

	wait1Second() {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}
}
