import { IFilterPerson, IPerson } from "../Interfaces/IPerson";
import { IPersonRepository } from "../Repository/IPersonRepository";

export default class PersonService {
  private personRepository: IPersonRepository;
  constructor(personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }
  createPerson(person: IPerson): IPerson {
    return this.personRepository.createPerson(person);
  }
  listPerson(personFilter: IFilterPerson): Array<IPerson> {
    return this.personRepository.listPerson(personFilter);
  }
}
