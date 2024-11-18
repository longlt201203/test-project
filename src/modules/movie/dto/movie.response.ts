import { MovieEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";

export class MovieResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	title: string;

	@ApiProperty()
	year: number;

	@ApiProperty()
	director: string;

	@ApiProperty()
	rating: number;

	@ApiProperty()
	duration: number;

	static fromEntity(entity: MovieEntity): MovieResponse {
		return {
			id: entity.id,
			title: entity.title,
			year: entity.year,
			director: entity.director,
			rating: entity.rating,
			duration: entity.duration,
		};
	}

	static fromEntities(entities: MovieEntity[]): MovieResponse[] {
		return entities.map((entity) => MovieResponse.fromEntity(entity));
	}
}
