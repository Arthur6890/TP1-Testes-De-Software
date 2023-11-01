import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";

export interface IFlightService {
	createFlight(flight: IFlight);
	listFlight(params: IFilterFlight);
	getFlightById(id: string);
	changeStatus(id: string, status: Status);
}
