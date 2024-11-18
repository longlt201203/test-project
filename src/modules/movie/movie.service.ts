import { MovieEntity } from "@db/entities/movie.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieRequest } from "./dto";
import { Tracing } from "@utils";
import { MovieRepository } from "./movie.repository";

@Injectable()
export class MovieService {
	constructor(private readonly movieRepository: MovieRepository) {}

	async wait2Seconds(): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// reject();
				resolve();
			}, 2000);
		});
	}

	@Tracing()
	async findAll() {
		// throw new Error("Method not implemented.");
		return await this.movieRepository.find();
	}

	@Tracing()
	async create(dto: CreateMovieRequest) {
		const [a, result] = await Promise.all([
			this.wait2Seconds(),
			this.movieRepository.basicSave({
				title: dto.title,
				year: dto.year,
				director: dto.director,
				duration: dto.duration,
			}),
		]);
		return result;
	}
}
