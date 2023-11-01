import { RequestHandler } from "express";
import { ITicket } from "../Interfaces/ITicket";
import { ITicketService } from "../Service/ITicketService";

export default class TicketController {
  private ticketService: ITicketService;
  constructor(ticketService: ITicketService) {
    this.ticketService = ticketService;
  }
  emitTicket: RequestHandler = (request, response) => {
    try {
      const ticket = this.ticketService.emitTicket(request.body as ITicket);
      response.status(201).json({ ticket });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };
  getTicketById: RequestHandler = (request, response) => {
    try {
      const ticketId = request.params.id;
      const ticket = this.ticketService.getTicketById(ticketId);
      response.status(200).json({ ticket });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };
}
