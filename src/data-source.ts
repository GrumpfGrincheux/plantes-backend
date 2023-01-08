import "reflect-metadata";
import { DataSource } from "typeorm";
import { Espece } from "./entity/Espece";
import { Famille } from "./entity/Famille";
import { Genre } from "./entity/Genre";
import { Plante } from "./entity/Plante";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
	type: "mariadb",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "test",
	synchronize: true,
	logging: false,
	entities: [User, Famille, Genre, Espece, Plante],
	migrations: [],
	subscribers: [],
});
