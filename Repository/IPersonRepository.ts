import { IFilterPerson, IPerson } from "../Interfaces/IPerson";

export interface IPersonRepository {
	createPerson(person: IPerson): IPerson;
	listPerson(personFilter: IFilterPerson): Array<IPerson>;
	isPersonAdult(person: IPerson): boolean
	isValidCPF(person: IPerson): boolean
}
