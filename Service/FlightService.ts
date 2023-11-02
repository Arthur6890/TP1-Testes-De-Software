import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
import { IFlightRepository } from "../Repository/IFlightRepository";
export default class FlightService {
  private flightRepository: IFlightRepository;
  constructor(flightRepository: IFlightRepository) {
    this.flightRepository = flightRepository;
  }

  calculateFlightDuration(flight) {
    const departureTime = new Date(flight.departure);
    const arrivalTime = flight.arrival ? new Date(flight.arrival) : new Date();
    return (arrivalTime - departureTime) / (60 * 1000);
  }

  generateMessageByFlightStatus(flight) {
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

  isValidPlaneModel(plane) {
    const validModels = ['Boeing-737', 'Boeing-747', 'Airbus-A320', 'Airbus-A3280', 'Martin F-35',
    'Cessna-172', 'Airbus-A330'];
    return validModels.includes(plane.model);
  }

  isFlightCheckInAvailable(flight) {
    const currentTime = new Date();
    const departureTime = new Date(flight.departure);
    const timeDifference = departureTime - currentTime;
    return timeDifference <= 24 * 60 * 60 * 1000; // Menos de 24 horas
  }

  isInternationalFlight(flight) {
    return flight.origin.country !== flight.destination.country;
  }

  isPlaneModelSuitableForFlight(plane, flight) {
    return plane.seatQuantity >= flight.ocupation;
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
