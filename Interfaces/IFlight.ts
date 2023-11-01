import { ILocalization } from "./ILocalization";

export enum Status {
	CONFIRMED = "CONFIRMADO",
	PENDING = "PENDING",
	CANCELED = "CANCELED",
}

export interface IFlight {
	id: string;
	pilot: string;
	origin: ILocalization;
	destination: ILocalization;
	departure: Date;
	status: Status;
	arrival?: Date;
	ocupation?: number;
}

export interface IFilterFlight {
	origin?: ILocalization;
	destination?: ILocalization;
	departure?: Date;
	status?: Status;
}