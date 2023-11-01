import PersonService from "../Service/PersonService";
import PersonRepository from "../Repository/PersonRepository";
import { IPersonRepository } from "../Repository/IPersonRepository";

export default class PersonServiceFactory {
  static make(personRepository?: IPersonRepository) {
    const personRepositoryInstance = personRepository || new PersonRepository();
    return new PersonService(personRepositoryInstance);
  }
}
