import { IFilterPerson, IPerson} from "../Interfaces/IPerson";

export interface IPersonService {
  createPerson(person: IPerson);
  listPerson(personFilter: IFilterPerson);
}
