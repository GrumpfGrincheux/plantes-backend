import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Espece } from "../entity/Espece";
import { Plante } from "../entity/Plante";

export class PlanteController {
	private especeRepository = AppDataSource.getRepository(Espece);

	async all(request: Request, response: Response, next: NextFunction) {
		const plantes = await AppDataSource.getRepository(Plante)
			.createQueryBuilder("plante")
			.leftJoinAndSelect("plante.espece", "espece")
			.getMany();

		return plantes;
	}

	async oneByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const plantes = await AppDataSource.getRepository(Plante)
			.createQueryBuilder("plante")
			.leftJoinAndSelect("plante.espece", "espece")
			.where("plante.name LIKE :name", { name: `%${name}%` })
			.getOneOrFail();
	}

	async allByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const plantes = await AppDataSource.getRepository(Plante)
			.createQueryBuilder("plante")
			.leftJoinAndSelect("plante.espece", "espece")
			.where("plante.name LIKE :name", { name: `%${name}%` })
			.getMany();
	}

	async allById(request: Request, response: Response, next: NextFunction) {
		const id = request.params.id;

		const plantes = await AppDataSource.getRepository(Plante)
			.createQueryBuilder("plante")
			.leftJoinAndSelect("plante.espece", "espece")
			.where("plante.id LIKE :id", { id: `%${id}%` })
			.getMany();
	}

	async saveWithName(request: Request, response: Response, next: NextFunction) {
		const { especeName, name, taille } = request.body;
		const espece = await this.especeRepository.findOne({
			where: { name: especeName },
		});

		if (!espece) {
			return "unregistered espece";
		}
		const plante = new Plante();
		plante.name = name;
		plante.taille = taille;
		plante.espece = espece;

		await AppDataSource.manager.save(plante);

		return `La plante '${name}' a bien été ajoutée !`;
	}
}
