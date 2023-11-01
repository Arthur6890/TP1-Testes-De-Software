import { IFilterFlight, IFlight, Status } from "../../Interfaces/IFlight";
import { IFlightRepository } from "../../Repository/IFlightRepository";

export default class FlightRepositoryMock implements IFlightRepository {
  createFlight(_flight: IFlight) {
    return {} as IFlight;
  }
  filterFlight(_params: IFilterFlight) {
    return [{} as IFlight];
  }
  getFlightById(_id: string) {
    return {} as IFlight;
  }
  changeStatus(_id: string, _status: Status) {
    return {} as IFlight;
  }
}
