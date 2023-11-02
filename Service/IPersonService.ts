import { IFilterPerson, IPerson } from "../Interfaces/IPerson";

export interface IPersonService {
	createPerson(person: IPerson);
	listPerson(personFilter: IFilterPerson);
	isPersonAdult(person: IPerson)
	isValidCPF(person: IPerson)
}
