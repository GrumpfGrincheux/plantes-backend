import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Famille } from "../entity/Famille";
import { Genre } from "../entity/Genre";
import { Espece } from "../entity/Espece";

export class FamilleController {
	private familleRepository = AppDataSource.getRepository(Famille);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.familleRepository.find();
	}

	async searchByName(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;
		return this.familleRepository.find({
			where: { name },
		});
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const name = request.params.name;

		const famille = await this.familleRepository.findOne({
			where: { name },
		});

		if (!famille) {
			return "unregistered famille";
		}
		return famille;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { name } = request.body;

		const famille = new Famille();
		famille.name = name;

		await AppDataSource.manager.save(famille);

		return `La famille ${name} a bien été ajoutée !`;
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let familleToRemove = await this.familleRepository.findOneBy({ id });

		if (!familleToRemove) {
			return "this famille not exist";
		}

		await this.familleRepository.remove(familleToRemove);

		return "famille has been removed";
	}
}
