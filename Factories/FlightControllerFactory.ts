import FlightServiceFactory from "./FlightServiceFactory";
import FlightController from "../Controller/FlightController";
import { IFlightService } from "../Service/IFlightService";

export default class FlightControllerFactory {
  static make(flightService?: IFlightService) {
    const flightServiceInstance = flightService || FlightServiceFactory.make();
    return new FlightController(flightServiceInstance);
  }
}
