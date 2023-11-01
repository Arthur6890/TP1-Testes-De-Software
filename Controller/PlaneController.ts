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
}
