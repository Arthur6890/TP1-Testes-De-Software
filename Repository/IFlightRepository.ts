import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
import { IPerson } from "../Interfaces/IPerson";
import { IPlane } from "../Interfaces/IPlane";
export interface IFlightRepository {
	createFlight(flight: IFlight): IFlight;
	filterFlight(params: IFilterFlight): Array<IFlight>;
	getFlightById(id: string): IFlight;
	changeStatus(id: string, status: Status): IFlight;
	isPersonEligibleToBookFlight(person: IPerson): boolean
	isFlightDelayedBasedOnTime(flight: IFlight): boolean
	isPlaneModelSuitableForFlight(plane: IPlane, flight: IFlight): boolean
}
