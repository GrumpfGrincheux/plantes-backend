import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Genre } from "./Genre";
import { Famille } from "./Famille";
import { Plante } from "./Plante";

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

	@OneToOne(() => Plante, (plante) => plante.espece)
	@JoinColumn()
	plante: Plante;
}
