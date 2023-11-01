import TicketController from "../Controller/TicketController";
import { ITicketService } from "../Service/ITicketService";
import TicketServiceFactory from "./TicketServiceFactory";

export default class TicketControllerFactory {
	static make(ticketService?: ITicketService) {
		const ticketServiceInstance = ticketService || TicketServiceFactory.make();
		return new TicketController(ticketServiceInstance);
	}
}
