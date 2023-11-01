import { IPersonService } from "../Service/IPersonService";
import PersonServiceFactory from "./PersonServiceFactory";
import PersonController from "../Controller/PersonController";

export default class PersonControllerFactory {
  static make(personService?: IPersonService) {
    const personServiceInstance = personService || PersonServiceFactory.make();
    return new PersonController(personServiceInstance);
  }
}
