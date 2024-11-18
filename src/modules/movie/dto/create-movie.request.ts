import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieRequest {
	@ApiProperty()
	title: string;

	@ApiProperty()
	year: number;

	@ApiProperty()
	director: string;

	@ApiProperty()
	duration: number;
}
