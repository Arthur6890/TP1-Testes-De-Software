import { IFilterFlight, IFlight, Status } from "../../Interfaces/IFlight";
import { IFlightService } from "../../Service/IFlightService";

export default class FlightServiceMock implements IFlightService {
  createFlight(_flight: IFlight) {
    return {} as IFlight;
  }
  listFlight(_params: IFilterFlight) {
    return [{} as IFlight];
  }
  getFlightById(_id: string) {
    return {} as IFlight;
  }
  changeStatus(_id: string, _status: Status) {
    return {} as IFlight;
  }
}
