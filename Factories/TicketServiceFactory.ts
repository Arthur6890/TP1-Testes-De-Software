import { ITicketRepository } from "../Repository/ITicketRepository"
import TicketRepository from "../Repository/TicketRepository"
import TicketService from "../Service/TicketService"

export default class TicketServiceFactory {
	static make(ticketRepository?: ITicketRepository) {
		const ticketRepositoryInstance = ticketRepository || new TicketRepository();
		return new TicketService(ticketRepositoryInstance);
	}
}