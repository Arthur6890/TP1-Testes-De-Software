import { RequestHandler } from "express";
import { IPlane } from "../Interfaces/IPlane";
import { IPlaneService } from "../Service/IPlaneService";

export default class PlaneController {
	private planeService: IPlaneService;
	constructor(planeService: IPlaneService) {
		this.planeService = planeService;
	}
	createPlane: RequestHandler = (request, response) => {
		try {
			const plane = this.planeService.createPlane(request.body as IPlane);
			response.status(201).json(plane);
		} catch (error: any) {
			response.status(400).json({ error: error.message });
		}
	};
	getFlight: RequestHandler = (request, response) => {
		try {
			const planeId = request.params.id;
			const plane = this.planeService.getPlaneById(planeId);
			response.status(200).json(plane);
		} catch (error: any) {
			response.status(400).json({ error: error.message });
		}
	};

	isValidPlaneModel: RequestHandler = (request, response) => {
		const validModels = ['Boeing-737', 'Boeing-747', 'Airbus-A320', 'Airbus-A3280', 'Martin F-35',
			'Cessna-172', 'Airbus-A330'];
		try {
			const planeModel = request.params.model;
			if (validModels.includes(planeModel)) {
				response.status(200).json(planeModel);
			}
		}
		catch (error: any) {
			response.status(400).json({ error: error.message });
		}
	}
}
