import { MovieEntity } from "@db/entities";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { MovieRepository } from "./movie.repository";

@Module({
	imports: [TypeOrmModule.forFeature([MovieEntity])],
	controllers: [MovieController],
	providers: [MovieService, MovieRepository],
})
export class MovieModule {}
