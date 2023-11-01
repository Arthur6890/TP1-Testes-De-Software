import { IFilterPerson, IPerson } from "../Interfaces/IPerson";

const people: Array<IPerson> = [];

export default class VooRepository {
	createPerson(person: IPerson): IPerson {
		people.push(person);
		return person;
	}

	verifyIfTheFilterByNameIsCorrect(personFilter: IFilterPerson, person: IPerson): boolean {
		if (personFilter?.name && !person.name.includes(personFilter.name)) {
			return false
		}
		return true
	}

	verifyIfTheFilterByCpfIsCorrect(personFilter: IFilterPerson, person: IPerson): boolean {
		if (personFilter?.cpf && person.cpf != personFilter.cpf) {
			return false
		}
		return true
	}

	listPerson(personFilter: IFilterPerson): Array<IPerson> {
		return people.filter((person) => {
			this.verifyIfTheFilterByNameIsCorrect(personFilter, person)
			this.verifyIfTheFilterByCpfIsCorrect(personFilter, person)
			return true;
		});
	}
}
