import { IFilterPerson, IPerson } from "../../Interfaces/IPerson";
import { IPersonRepository } from "../../Repository/IPersonRepository";

export default class PersonRepositoryMock implements IPersonRepository {
	createPerson(_person: IPerson) {
		return {} as IPerson;
	}
	listPerson(_personFilter: IFilterPerson) {
		return {} as Array<IPerson>;
	}
	isPersonAdult(_person: IPerson) {
		return {} as boolean;
	}
	isValidCPF(_person: IPerson) {
		return {} as boolean;
	}
}
