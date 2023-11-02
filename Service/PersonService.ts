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

  isPersonAdult(person: IPerson) {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - person.birthDate.getFullYear();
    return age >= 18;
  }

  isValidCPF(person: IPerson) {
    if (person.cpf.length !== 11) return false;
    return true;
  }
}
