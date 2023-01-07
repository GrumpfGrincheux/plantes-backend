import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Espece } from "../entity/Espece";
import { Genre } from "../entity/Genre";
import { Famille } from "../entity/Famille";

export class EspeceController {
	private especeRepository = AppDataSource.getRepository(Espece);
	private genreRepository = AppDataSource.getRepository(Genre);
	private familleRepository = AppDataSource.getRepository(Famille);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.especeRepository.find({
			relations: {
				genre: true,
				famille: true,
			},
		});
	}

	async searchByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const espece = await AppDataSource.getRepository(Espece)
			.createQueryBuilder("espece")
			.innerJoin("espece.genre", "genre")
			.innerJoin("espece.famille", "famille")
			.select(["espece.name", "genre.name", "famille.name"])
			.where("espece.name LIKE :name", { name: `%${name}%` })
			.getRawMany();

		if (espece.length == 0) {
			const message: string = "Aucune plante ne correspond à votre recherche.";
			return message;
		}
		console.log(espece);
		console.log(espece.length);
		return espece;
	}

	async searchByGenre(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		const name = request.params.name;

		const espece = await AppDataSource.getRepository(Espece)
			.createQueryBuilder("espece")
			.innerJoin("espece.genre", "genre")
			.innerJoin("espece.famille", "famille")
			.select(["espece.name", "genre.name", "famille.name"])
			.where("genre.name LIKE :name", { name: `%${name}%` })
			.getRawMany();

		if (espece.length == 0) {
			const message: string = "Aucune plante ne correspond à votre recherche.";
			return message;
		}
		console.log(espece);
		console.log(espece.length);
		return espece;
	}

	async searchByFamille(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		const name = request.params.name;

		const espece = await AppDataSource.getRepository(Espece)
			.createQueryBuilder("espece")
			.innerJoin("espece.genre", "genre")
			.innerJoin("espece.famille", "famille")
			.select(["espece.name", "genre.name", "famille.name"])
			.where("famille.name LIKE :name", { name: `%${name}%` })
			.getRawMany();

		if (espece.length == 0) {
			const message: string = "Aucune plante ne correspond à votre recherche.";
			return { message: message };
		}
		console.log(espece);
		console.log(espece.length);
		return espece;
	}

	async saveWithName(request: Request, response: Response, next: NextFunction) {
		const { name, genreName, familleName } = request.body;
		const famille = await this.familleRepository.findOne({
			where: { name: familleName },
		});

		if (!famille) {
			return "unregistered famille";
		}
		const genre = await this.genreRepository.findOne({
			where: { name: genreName },
		});

		if (!genre) {
			return "unregistered genre";
		}
		const espece = new Espece();
		espece.name = name;
		espece.genre = genre;
		espece.famille = famille;
		await AppDataSource.manager.save(espece);

		return `L'espèce ${name} a bien été ajoutée !`;
	}
	async saveWithId(request: Request, response: Response, next: NextFunction) {
		const { name, genreId, familleId } = request.body;
		const famille = await this.familleRepository.findOne({
			where: { id: familleId },
		});

		if (!famille) {
			return "unregistered famille";
		}
		const genre = await this.genreRepository.findOne({
			where: { id: genreId },
		});

		if (!genre) {
			return "unregistered genre";
		}
		const espece = new Espece();
		espece.name = name;
		espece.genre = genre;
		espece.famille = famille;
		await AppDataSource.manager.save(espece);

		return `L'espèce ${name} a bien été ajoutée !`;
	}
	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let especeToRemove = await this.especeRepository.findOneBy({ id });

		if (!especeToRemove) {
			return "this espece not exist";
		}

		await this.especeRepository.remove(especeToRemove);

		return "espece has been removed";
	}
}
