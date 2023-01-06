import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Genre } from "./Genre";
import { Espece } from "./Espece";
@Entity()
export class Famille {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => Genre, (genre) => genre.name, { cascade: true })
	genres: Genre[];

	@OneToMany(() => Espece, (espece) => espece.name, { cascade: true })
	especes: Espece[];
}
