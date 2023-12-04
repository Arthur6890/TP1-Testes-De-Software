import { IFlight, Status } from "../../Interfaces/IFlight";

export const flightOne = {
	id: "1",
	pilot: "Arthur",
	origin: {
		city: "Belo Horizonte",
		state: "MG",
		country: "Brasil",
	},
	destination: {
		city: "Rio de Janeiro",
		state: "RJ",
		country: "Brasil",
	},
	departure: new Date(2021, 11, 31),
	status: Status.PENDING,
	ocupation: 100,
} as IFlight;
