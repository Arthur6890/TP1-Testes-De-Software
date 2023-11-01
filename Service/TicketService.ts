import { ITicket } from "../Interfaces/ITicket"
import { ITicketRepository } from "../Repository/ITicketRepository";

export default class TicketService {
	private ticketRepository: ITicketRepository;
	constructor(ticketRepository: ITicketRepository) {
		this.ticketRepository = ticketRepository
	}
	emitTicket(passagem: ITicket) {
		return this.ticketRepository.emitTicket(passagem)
	}
	getTicketById(id: string) {
		return this.ticketRepository.getTicketById(id);
	}
}