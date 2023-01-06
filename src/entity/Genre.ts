import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Espece } from "./Espece";
import { Famille } from "./Famille";

@Entity()
export class Genre {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@ManyToOne(() => Famille, (famille) => famille.genres)
	famille: Famille;

	@OneToMany(() => Espece, (espece) => espece.name, { cascade: true })
	especes: Espece[];
}
