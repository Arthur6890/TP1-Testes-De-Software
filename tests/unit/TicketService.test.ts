import TicketRepositoryMock from "../mocks/TicketServiceMock";
import TicketServiceFactory from "../../Factories/TicketServiceFactory"
import { IFlight, Status } from "../../Interfaces/IFlight";
import { ITicket } from "../../Interfaces/ITicket";
import { ILocalization } from "../../Interfaces/ILocalization";

const TicketRepositoryInstance = new TicketRepositoryMock();
const TicketServiceInstance = TicketServiceFactory.make(
	TicketRepositoryInstance
);

const origin1: ILocalization = { city: 'New York', state: 'NY', country: 'Brazil' };
const destination1: ILocalization = { city: 'Los Angeles', state: 'CA', country: 'Brazil' };
const flight1: IFlight = {
	id: 'flight-1',
	pilot: 'Captain John',
	origin: origin1,
	destination: destination1,
	departure: new Date('2023-11-15T08:00:00'),
	status: Status.CONFIRMED,
};
const ticket1: ITicket = {
	id: '123',
	passanger: { name: 'John Doe', birthDate: new Date(), cpf: '12345678901', age: 30 },
	flight: flight1,
	seat: 5,
};

const origin2: ILocalization = { city: 'New York', state: 'NY', country: 'USA' };
const origin3: ILocalization = { city: 'London', state: 'N/A', country: 'UK' };
const destinatio2: ILocalization = { city: 'Los Angeles', state: 'CA', country: 'USA' };
const destination3: ILocalization = { city: 'Paris', state: 'N/A', country: 'France' };

const flight2: IFlight = {
	id: 'flight-1',
	pilot: 'Captain John',
	origin: origin2,
	destination: destinatio2,
	departure: new Date('2023-11-15T08:00:00'),
	status: Status.CANCELED,
};
const ticket2: ITicket = {
	id: '123',
	passanger: { name: 'John Doe', birthDate: new Date(), cpf: '12345678901', age: 30 },
	flight: flight2,
	seat: 5,
};
const flight3: IFlight = {
	id: 'flight-2',
	pilot: 'Captain Alice',
	origin: origin3,
	destination: destination3,
	departure: new Date('2023-11-16T10:00:00'),
	status: Status.PENDING,
};
const ticket3: ITicket = {
	id: '456',
	passanger: { name: 'Alice', birthDate: new Date(), cpf: '98765432109', age: 25 },
	flight: flight3,
	seat: 10,
};

const origin4: ILocalization = { city: 'Sydney', state: 'NSW', country: 'Australia' };
const destination4: ILocalization = { city: 'Tokyo', state: 'Tokyo', country: 'Japan' };
const invalidTicket: ITicket = {
	id: '789',
	passanger: { name: '', birthDate: new Date(), cpf: '123', age: -5 },
	flight: {
		id: 'flight-3',
		pilot: 'Captain Bob',
		origin: origin4,
		destination: destination4,
		departure: new Date('2023-11-17T12:00:00'),
		status: Status.CANCELED,
	},
	seat: -2,
};

const origin5: ILocalization = { city: 'Martopolis', state: 'Marte', country: 'MARTE' };
const destination5: ILocalization = { city: 'Paris', state: 'Île-de-France', country: 'France' };
const flight4: IFlight = {
	id: 'flight-1',
	pilot: 'Captain Alice',
	origin: origin5,
	destination: destination5,
	departure: new Date('2023-11-18T09:00:00'),
	status: Status.CONFIRMED,
};
const invalidTicket2: ITicket = {
	id: '123',
	passanger: { name: 'Alice', birthDate: new Date(), cpf: '98765432109', age: 25 },
	flight: flight4,
	seat: 10,
};

const origin6: ILocalization = { city: 'Sydney', state: 'NSW', country: 'Australia' };
const destination6: ILocalization = { city: 'Tokyo', state: 'Tokyo', country: 'Japan' };
const flight5: IFlight = {
	id: 'flight-2',
	pilot: 'Captain Bob',
	origin: origin6,
	destination: destination6,
	departure: new Date('2023-11-19T10:00:00'),
	status: Status.PENDING,
};
const ticket4: ITicket = {
	id: '456',
	passanger: { name: 'Bob', birthDate: new Date(), cpf: '12345678901', age: 30 },
	flight: flight5,
	seat: 5,
};

const origin7: ILocalization = { city: '', state: '', country: '' };
const destination7: ILocalization = { city: '', state: '', country: '' };
const flight6: IFlight = {
	id: 'flight-3',
	pilot: 'Captain Eve',
	origin: origin7,
	destination: destination7,
	departure: new Date('2023-11-20T11:00:00'),
	status: Status.CANCELED,
};
const ticket5: ITicket = {
	id: '789',
	passanger: { name: 'Eve', birthDate: new Date(), cpf: '45612378901', age: 22 },
	flight: flight6,
	seat: 15,
};

describe('emitTicket', () => {
	it('should not allow a false ticket to be issued', () => {
		const emittedTicket = TicketServiceInstance.emitTicket(ticket1);
		expect(emittedTicket).not.toEqual(ticket1);
	});

	it('Must issue a ticket with a different ID and return the same ticket', () => {
		const emittedTicket = TicketServiceInstance.emitTicket(ticket2);
		const emittedTicket2 = TicketServiceInstance.emitTicket(ticket3);

		expect(emittedTicket2).not.toBe(emittedTicket);
	});

	it('Should not allow if an invalid ticket is issued', () => {
		const invalidedTicket = TicketServiceInstance.emitTicket(invalidTicket);
		expect(invalidedTicket).not.toBe(invalidTicket);
	});

	it('Should not allow when trying to issue a ticket with invalid origin and destination information', () => {
		const invalidedTicket = TicketServiceInstance.emitTicket(invalidTicket2);
		expect(invalidedTicket).not.toEqual(invalidTicket2);
	});

	it('Must issue a ticket with different origin and destination information', () => {
		const emittedTicket = TicketServiceInstance.emitTicket(ticket4);
		expect(emittedTicket).not.toEqual(ticket4);
	});

	it('Should not issue a ticket with empty origin and destination information', () => {
		const emittedTicket = TicketServiceInstance.emitTicket(ticket5);
		expect(emittedTicket).not.toEqual(ticket5);
	});
})