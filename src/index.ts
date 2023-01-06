import * as express from "express";
import * as bodyParser from "body-parser";
import * as favicon from "serve-favicon";
import helmet from "helmet";
import * as morgan from "morgan";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Famille } from "./entity/Famille";
import { Espece } from "./entity/Espece";
import { Genre } from "./entity/Genre";

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app
			.use(bodyParser.json())
			.use(cors())
			.use(
				morgan(
					":method :url :status :res[content-length] - :response-time ms :date[web]",
				),
			)
			.use(helmet())
			.use(favicon("./favicon.ico"));

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[route.action](
						req,
						res,
						next,
					);
					if (result instanceof Promise) {
						result.then((result) =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined,
						);
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				},
			);
		});

		// setup express app here
		// ...

		// start express server
		app.listen(3000);

		console.log(
			"Express server has started on port 3000. Open http://localhost:3000/users to see results",
		);
	})
	.catch((error) => console.log(error));
