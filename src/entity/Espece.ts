import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Genre } from "./Genre";
import { Famille } from "./Famille";

@Entity()
export class Espece {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Genre, (genre) => genre.name)
	genre: Genre;

	@ManyToOne(() => Famille, (famille) => famille.name)
	famille: Famille;
}
