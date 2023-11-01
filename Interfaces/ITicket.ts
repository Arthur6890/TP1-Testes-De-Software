import { IPerson } from "./IPerson";
import { IFlight } from "./IFlight";

export interface ITicket {
	id: string;
	passanger: IPerson;
	flight: IFlight;
	seat: number;
}