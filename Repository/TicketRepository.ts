import { ITicket } from "../Interfaces/ITicket";
import { ITicketRepository } from "./ITicketRepository";

const passagens: Array<ITicket> = [];

export default class TicketRepository implements ITicketRepository {
	emitTicket(ticket: ITicket): ITicket {
		passagens.push(ticket)
		return ticket
	}

	getTicketById(id: string): ITicket {
		let ticket = passagens.filter((ticket) => ticket.id == id);
		if (ticket.length == 0) {
			throw new Error("Passagem não encontrada")
		}
		return ticket[0];
	}
}
