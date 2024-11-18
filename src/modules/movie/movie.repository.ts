import { MovieEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { ClassTracing } from "@utils";
import {
	DataSource,
	DeepPartial,
	FindManyOptions,
	Repository,
	SaveOptions,
} from "typeorm";

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
	constructor(datasource: DataSource) {
		super(MovieEntity, datasource.createEntityManager());
	}

	// @Tracing()
	find(options?: FindManyOptions<MovieEntity>): Promise<MovieEntity[]> {
		return super.find(options);
	}

	// @Tracing()
	basicSave(entity: DeepPartial<MovieEntity>, options?: SaveOptions) {
		return super.save(entity, options);
	}
}
