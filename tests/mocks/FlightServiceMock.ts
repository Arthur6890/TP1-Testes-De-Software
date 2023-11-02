import { IFilterFlight, IFlight, Status } from "../../Interfaces/IFlight";
import { IPerson } from "../../Interfaces/IPerson";
import { IPlane } from "../../Interfaces/IPlane";
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
	isFlightDelayedBasedOnTime(_flight: IFlight) {
		return {} as boolean
	}

	isPlaneModelSuitableForFlight(_plane: IPlane, _flight: IFlight) {
		return {} as boolean
	}
	isPersonEligibleToBookFlight(_person: IPerson) {
		return {} as boolean
	}

}
