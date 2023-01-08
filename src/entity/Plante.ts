import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Espece } from "./Espece";

@Entity()
export class Plante {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	taille: number;

	@OneToOne(() => Espece, (espece) => espece.plante, { cascade: true })
	espece: Espece;
}
