import { RequestHandler } from "express";
import { IFilterPerson, IPerson } from "../Interfaces/IPerson";
import { IPersonService } from "../Service/IPersonService";

export default class PersonController {
  private personService: IPersonService;
  constructor(personService: IPersonService) {
    this.personService = personService;
  }

  createPerson: RequestHandler = (request, response) => {
    try {
      const person = this.personService.createPerson(request.body as IPerson);
      response.status(201).json({ person });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

  listPerson: RequestHandler = (request, response) => {
    try {
      const persons = this.personService.listPerson(
        request.query as IFilterPerson
      );
      response.status(200).json({ persons: persons });
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };
}
