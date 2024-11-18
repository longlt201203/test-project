import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateMovieRequest, MovieResponse } from "./dto";
import { ApiResponseDto, ClassTracing, Tracing } from "@utils";
import { MovieService } from "./movie.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("movie")
@ApiTags("movie")
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Post()
	@ApiBody({ type: CreateMovieRequest })
	// @Tracing()
	async create(@Body() dto: CreateMovieRequest) {
		const data = await this.movieService.create(dto);
		return new ApiResponseDto(MovieResponse.fromEntity(data), null, "Created!");
	}

	@Get()
	// @Tracing()
	async findAll() {
		const data = await this.movieService.findAll();
		return new ApiResponseDto(
			MovieResponse.fromEntities(data),
			null,
			"Success!",
		);
	}
}
