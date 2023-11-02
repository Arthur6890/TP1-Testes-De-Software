import PersonRepositoryMock from "../mocks/PersonServiceMock";
import PersonServiceFactory from "../../Factories/PersonServiceFactory"

const PersonRepositoryInstance = new PersonRepositoryMock();
const PersonServiceInstance = PersonServiceFactory.make(
	PersonRepositoryInstance
);

describe('isPersonAdult', () => {
	it('Must create a person with a different CPF and return the same person', () => {
		const person1 = { name: 'John Doe', age: 40, birthDate: new Date("July 21, 1983 01:15:00"), cpf: "136.601.412-19" };
		const person2 = PersonServiceInstance.createPerson(person1)
		expect(person2).not.toBe(person1);
		expect(person2.cpf).not.toBe(person1.cpf);
	});

	it('Must return true for a person over the age of 18', () => {
		const adultPerson = { name: 'John Doe', age: 40, birthDate: new Date("July 21, 1983 01:15:00"), cpf: "136.601.412-19" };
		const createPerson = PersonServiceInstance.isPersonAdult(adultPerson)
		expect(createPerson).toBe(true);
	});

	it('Must return true for a person aged 18', () => {
		const adultPerson = { name: 'John Doe', age: 18, birthDate: new Date("July 21, 1983 01:15:00"), cpf: "136.601.412-19" };
		const createPerson = PersonServiceInstance.isPersonAdult(adultPerson)
		expect(createPerson).toBe(true);
	});

	it('Must return false for a person under the age of 18', () => {
		const minorPerson = { name: 'Alice', age: 15, birthDate: new Date("July 21, 2008 01:15:00"), cpf: "136.601.412-19" };
		const createPerson = PersonServiceInstance.isPersonAdult(minorPerson)
		expect(createPerson).toBe(false);
	});

	it('Should return false for a person with negative age', () => {
		const negativeAgePerson = { name: 'Bob', age: -5, birthDate: new Date("July 21, 2008 01:15:00"), cpf: "136.601.412-19" };
		const createPerson = PersonServiceInstance.isPersonAdult(negativeAgePerson)
		expect(createPerson).toBe(false);
	});

	it('Should return false for an ageless person', () => {
		const personWithoutAge = { name: 'Eve', birthDate: new Date('2008-01-01'), cpf: '654321987', age: 0 };
		const createPerson = PersonServiceInstance.isPersonAdult(personWithoutAge)
		expect(createPerson).toBe(false);
	});
});

describe('isValidCPF', () => {
	it('Must return true for a CPF with 11 digits', () => {
		const person = { name: 'John Doe', birthDate: new Date('1990-01-01'), cpf: '12345678901', age: 30 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(true);
	});

	it('Must return false for a CPF with less than 11 digits', () => {
		const person = { name: 'Jane Doe', birthDate: new Date('2000-01-01'), cpf: '1234567890', age: 25 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(false);
	});

	it('Must return false for a CPF with more than 11 digits', () => {
		const person = { name: 'Alice', birthDate: new Date('1985-01-01'), cpf: '123456789012', age: 36 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(false);
	});

	it('Must return false for an empty CPF', () => {
		const person = { name: 'Eve', birthDate: new Date('1999-01-01'), cpf: '', age: 22 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(false);
	});

	it('Must return true for a valid CPF', () => {
		const person = { name: 'John Doe', birthDate: new Date(), cpf: '12345678909', age: 30 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(true);
	});

	it('Must return true for a different valid CPF', () => {
		const person = { name: 'Alice', birthDate: new Date(), cpf: '98765432109', age: 25 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(true);
	});

	it('Must return false for an empty CPF', () => {
		const person = { name: 'Bob', birthDate: new Date(), cpf: '', age: 26 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(false);
	});


	it('Must return false for an invalid CPF', () => {
		const person = { name: 'Eve', birthDate: new Date(), cpf: '123456789000', age: 22 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(false);
	});

	it('It must return true for a CPF with non-numeric characters, as the business rule does not perform this check', () => {
		const person = { name: 'Carol', birthDate: new Date(), cpf: '12A456B8901', age: 28 };
		const validCPF = PersonServiceInstance.isValidCPF(person)
		expect(validCPF).toBe(true);
	});

})