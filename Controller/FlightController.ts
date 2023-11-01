import { RequestHandler } from "express";
import { IFilterFlight, IFlight } from "../Interfaces/IFlight";
import { IFlightService } from "../Service/IFlightService";

export default class FlightController {
  private flightService: IFlightService;
  constructor(flightService: IFlightService) {
    this.flightService = flightService;
  }

  createFlight: RequestHandler = (request, response) => {
    try {
      const flight = this.flightService.createFlight(request.body as IFlight);

      response.status(201).json({ flight });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

  listFlight: RequestHandler = (request, response) => {
    try {
      const flights = this.flightService.listFlight(
        request.query as IFilterFlight
      );
      response.status(200).json({ flights: flights });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

  getFlights: RequestHandler = (request, response) => {
    try {
      const flightId = request.params.id;
      const flight = this.flightService.getFlightById(flightId);
      response.status(200).json({ flight });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

  changeStatus: RequestHandler = (request, response) => {
    try {
      const flightId = request.params.id;
      const status = request.body.status;
      const flight = this.flightService.changeStatus(flightId, status);
      response.status(200).json({ flight });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };
}
