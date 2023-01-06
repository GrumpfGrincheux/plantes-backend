import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Genre } from "../entity/Genre";
import { Famille } from "../entity/Famille";

export class GenreController {
	private genreRepository = AppDataSource.getRepository(Genre);
	private familleRepository = AppDataSource.getRepository(Famille);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.genreRepository.find({
			relations: {
				famille: true,
			},
		});
	}

	async searchByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;
		return this.genreRepository.find({
			where: { name },
			relations: {
				famille: true,
			},
		});
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const genre = await this.genreRepository.findOne({
			where: { name },
			relations: {
				famille: true,
			},
		});

		if (!genre) {
			return "unregistered genre";
		}
		return genre;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { name, familleId } = request.body;
		const famille = await this.familleRepository.findOne({
			where: { id: familleId },
		});

		if (!famille) {
			return "unregistered famille";
		}
		const genre = new Genre();
		genre.name = name;
		genre.famille = famille;
		await AppDataSource.manager.save(genre);

		return `Le genre ${name} a bien été ajouté !`;
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let genreToRemove = await this.genreRepository.findOneBy({ id });

		if (!genreToRemove) {
			return "this genre not exist";
		}

		await this.genreRepository.remove(genreToRemove);

		return "genre has been removed";
	}
}
