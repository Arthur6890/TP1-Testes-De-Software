import { ITicket } from "../Interfaces/ITicket";

export interface ITicketRepository {
	emitTicket(ticket: ITicket): ITicket;
	getTicketById(id: string): ITicket;
}
