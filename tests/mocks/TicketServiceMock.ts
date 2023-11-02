import { ITicket } from "../../Interfaces/ITicket";
import { ITicketRepository } from "../../Repository/ITicketRepository";

export default class TicketRepositoryMock implements ITicketRepository {
	emitTicket(_ticket: ITicket) {
		return {} as ITicket;
	}
	getTicketById(_id: string) {
		return {} as ITicket;
	}
}
