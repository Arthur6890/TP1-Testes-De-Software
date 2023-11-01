import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
export interface IFlightRepository {
	createFlight(flight: IFlight): IFlight;
	filterFlight(params: IFilterFlight): Array<IFlight>;
	getFlightById(id: string): IFlight;
	changeStatus(id: string, status: Status): IFlight;
}
