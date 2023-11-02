import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
import { IFlightRepository } from "../Repository/IFlightRepository";
import {IPlane} from "../Interfaces/IPlane";
export default class FlightService {
  private flightRepository: IFlightRepository;
  constructor(flightRepository: IFlightRepository) {
    this.flightRepository = flightRepository;
  }

  calculateFlightDuration(flight: IFlight) {
    const departureTime = new Date(flight.departure);
    const arrivalTime = flight.arrival ? new Date(flight.arrival) : new Date();
    if (departureTime.getTime() >= arrivalTime.getTime()) {
      throw new Error("Hora de chegada invalida");
    }
    return (arrivalTime.getTime() - departureTime.getTime()) / (60 * 1000);
  }

  generateMessageByFlightStatus(flight: IFlight) {
    if (flight.status == Status.CONFIRMED) {
      return "The flight is confirmed and can proceed."
    }
    else if (flight.status == Status.PENDING){
      return "The flight is not yet authorized. Please stand by."
    }
    else {
      return "The flight is canceled."
    }
  }

  isFlightCheckInAvailable(flight: IFlight, currentTime: Date) {
    const departureTime = new Date(flight.departure);
    const timeDifference = departureTime.getTime() - currentTime.getTime();
    return ((timeDifference <= 24 * 60 * 60 * 1000) && (timeDifference > 0)); // Menos de 24 horas
  }

  isInternationalFlight(flight: IFlight) {
    return flight.origin.country !== flight.destination.country;
  }

  isPlaneModelSuitableForFlight(plane: IPlane, flight: IFlight) {
    if (flight.ocupation !== undefined) {
      return plane.seatQuantity >= flight.ocupation;
    }
    return false;
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
