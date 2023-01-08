import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Espece } from "../entity/Espece";
import { Genre } from "../entity/Genre";
import { Famille } from "../entity/Famille";
import { Plante } from "../entity/Plante";

export class EspeceController {
	private planteRepository = AppDataSource.getRepository(Plante);
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

	async oneByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const espece = await AppDataSource.getRepository(Espece)
			.createQueryBuilder("espece")
			.leftJoinAndSelect("espece.plante", "plante")
			.where("espece.name LIKE :name", { name: `%${name}%` })
			.getOneOrFail();
		return espece;
	}

	async searchByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const espece = await AppDataSource.getRepository(Espece)
			.createQueryBuilder("espece")
			.innerJoin("espece.genre", "genre")
			.innerJoin("espece.famille", "famille")
			.innerJoin("espece.plante", "plante")
			.select([
				"plante.id",
				"plante.name",
				"plante.taille",
				"espece.id",
				"espece.name",
				"genre.id",
				"genre.name",
				"famille.id",
				"famille.name",
			])
			.where("espece.name LIKE :name", { name: `%${name}%` })
			.orderBy("famille_name, genre_name, espece_name")
			.getRawMany();

		if (espece.length == 0) {
			const message: string = "Aucune plante ne correspond à votre recherche.";
			return message;
		}
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
			.innerJoin("espece.plante", "plante")
			.select([
				"plante.id",
				"plante.name",
				"plante.taile",
				"espece.id",
				"espece.name",
				"genre.id",
				"genre.name",
				"famille.id",
				"famille.name",
			])
			.where("genre.name LIKE :name", { name: `%${name}%` })
			.orderBy("famille_name, genre_name, espece_name")
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
			.innerJoin("espece.plante", "plante")
			.select([
				"plante.id",
				"plante.name",
				"plante.taile",
				"espece.id",
				"espece.name",
				"genre.id",
				"genre.name",
				"famille.id",
				"famille.name",
			])
			.where("famille.name LIKE :name", { name: `%${name}%` })
			.orderBy("famille_name, genre_name, espece_name")
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
