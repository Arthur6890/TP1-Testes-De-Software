import { IFlight, Status } from "../../Interfaces/IFlight";

export const flightOne = {
  id: "1",
  pilot: "Arthur",
  origin: {
    city: "Belo Horizonte",
    state: "MG",
    contry: "Brasil",
  },
  destination: {
    city: "Rio de Janeiro",
    state: "RJ",
    contry: "Brasil",
  },
  departure: new Date(),
  status: Status.PENDING,
  ocupation: 100,
} as IFlight;
