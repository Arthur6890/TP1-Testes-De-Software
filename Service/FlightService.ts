import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
import { IFlightRepository } from "../Repository/IFlightRepository";
export default class FlightService {
  private flightRepository: IFlightRepository;
  constructor(flightRepository: IFlightRepository) {
    this.flightRepository = flightRepository;
  }

  verifyIfOriginCityIsEqualToDestinationCity(flight: IFlight) {
    if (flight.origin.city == flight.destination.city) {
      throw new Error("a origem não poder ser igual ao destino");
    }
  }

  AddZeroInFlightOcupationIfItDoesntExists(flight: IFlight) {
    if (!flight.ocupation) {
      flight.ocupation = 0;
    }
  }

  createFlight(flight: IFlight) {
    this.verifyIfOriginCityIsEqualToDestinationCity(flight);
    this.AddZeroInFlightOcupationIfItDoesntExists(flight);
    return this.flightRepository.createFlight(flight);
  }

  listFlight(params: IFilterFlight) {
    return this.flightRepository.filterFlight(params);
  }

  getFlightById(id: string) {
    return this.flightRepository.getFlightById(id);
  }
  changeStatus(id: string, status: Status) {
    return this.flightRepository.changeStatus(id, status);
  }
}
