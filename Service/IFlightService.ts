import { IFilterFlight, IFlight, Status } from "../Interfaces/IFlight";
import { IPerson } from "../Interfaces/IPerson";
import { IPlane } from "../Interfaces/IPlane";

export interface IFlightService {
	createFlight(flight: IFlight);
	listFlight(params: IFilterFlight);
	getFlightById(id: string);
	changeStatus(id: string, status: Status);
	isPersonEligibleToBookFlight(person: IPerson)
	isFlightDelayedBasedOnTime(flight: IFlight)
	isPlaneModelSuitableForFlight(plane: IPlane, flight: IFlight)
}
