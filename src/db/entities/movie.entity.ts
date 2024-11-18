import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	title: string;

	@Column()
	year: number;

	@Column()
	director: string;

	@Column({ type: "decimal", precision: 2, scale: 1, default: 0 })
	rating: number;

	@Column()
	duration: number;
}
