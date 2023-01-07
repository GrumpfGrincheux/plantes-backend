import { UserController } from "./controller/UserController";
import { FamilleController } from "./controller/FamilleController";
import { GenreController } from "./controller/GenreController";
import { EspeceController } from "./controller/EspeceController";
import { PlanteController } from "./controller/PlanteController";

export const Routes = [
	{
		method: "get",
		route: "/users",
		controller: UserController,
		action: "all",
	},
	{
		method: "get",
		route: "/users/:id",
		controller: UserController,
		action: "one",
	},
	{
		method: "post",
		route: "/users",
		controller: UserController,
		action: "save",
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
	},
	{
		method: "get",
		route: "/familles",
		controller: FamilleController,
		action: "all",
	},
	{
		method: "get",
		route: "/familles/:name",
		controller: FamilleController,
		action: "searchByName",
	},
	{
		method: "get",
		route: "/familles/:name",
		controller: FamilleController,
		action: "one",
	},
	{
		method: "post",
		route: "/familles",
		controller: FamilleController,
		action: "save",
	},
	{
		method: "delete",
		route: "/familles/:id",
		controller: FamilleController,
		action: "remove",
	},
	{
		method: "get",
		route: "/genres",
		controller: GenreController,
		action: "all",
	},
	{
		method: "get",
		route: "/genres/:name",
		controller: GenreController,
		action: "searchByName",
	},
	{
		method: "get",
		route: "/genres/:name",
		controller: GenreController,
		action: "one",
	},
	{
		method: "post",
		route: "/genres",
		controller: GenreController,
		action: "save",
	},
	{
		method: "delete",
		route: "/genres/:id",
		controller: GenreController,
		action: "remove",
	},
	{
		method: "get",
		route: "/especes",
		controller: EspeceController,
		action: "all",
	},
	{
		method: "get",
		route: "/especes/especes/:name",
		controller: EspeceController,
		action: "searchByName",
	},
	{
		method: "get",
		route: "/especes/genres/:name",
		controller: EspeceController,
		action: "searchByGenre",
	},
	{
		method: "get",
		route: "/especes/familles/:name",
		controller: EspeceController,
		action: "searchByFamille",
	},
	{
		method: "post",
		route: "/especes/id",
		controller: EspeceController,
		action: "saveWithId",
	},
	{
		method: "post",
		route: "/especes/name",
		controller: EspeceController,
		action: "saveWithName",
	},
	{
		method: "delete",
		route: "/especes/:id",
		controller: EspeceController,
		action: "remove",
	},
	{
		method: "get",
		route: "/plantes",
		controller: PlanteController,
		action: "all",
	},
];
