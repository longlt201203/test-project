import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { DemoModule } from "@modules/demo";
import { DbModule } from "@db";
import { MovieModule } from "@modules/movie";
import { ClsModule } from "nestjs-cls";
import { AuthGuard } from "@modules/auth";

@Module({
	imports: [
		DbModule,
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
				setup: (cls) => {
					cls.set("profile", null);
					cls.set("userInfo", null);
				},
			},
		}),
		DemoModule,
		MovieModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
