import TicketRepositoryMock from "../mocks/TicketServiceMock";
import TicketServiceFactory from "../../Factories/TicketServiceFactory"
import { IFlight, Status } from "../../Interfaces/IFlight";
import { ITicket } from "../../Interfaces/ITicket";
import { ILocalization } from "../../Interfaces/ILocalization";

const TicketRepositoryInstance = new TicketRepositoryMock();
const TicketServiceInstance = TicketServiceFactory.make(
	TicketRepositoryInstance
);

describe('emitTicket', () => {
	it('Deve nao permirtir um bilhete falso ser emitido', () => {
		const origin: ILocalization = { city: 'New York', state: 'NY', country: 'Brazil' };
		const destination: ILocalization = { city: 'Los Angeles', state: 'CA', country: 'Brazil' };

		const flight: IFlight = {
			id: 'flight-1',
			pilot: 'Captain John',
			origin: origin,
			destination: destination,
			departure: new Date('2023-11-15T08:00:00'),
			status: Status.CONFIRMED,
		};
		const ticket: ITicket = {
			id: '123',
			passanger: { name: 'John Doe', birthDate: new Date(), cpf: '12345678901', age: 30 },
			flight: flight,
			seat: 5,
		};
		const emittedTicket = TicketServiceInstance.emitTicket(ticket);
		expect(emittedTicket).not.toEqual(ticket);
	});

	it('Deve emitir um bilhete com um ID diferente e retornar o mesmo bilhete', () => {
		const origin: ILocalization = { city: 'New York', state: 'NY', country: 'USA' };
		const origin2: ILocalization = { city: 'London', state: 'N/A', country: 'UK' };
		const destination: ILocalization = { city: 'Los Angeles', state: 'CA', country: 'USA' };
		const destination2: ILocalization = { city: 'Paris', state: 'N/A', country: 'France' };

		const flight1: IFlight = {
			id: 'flight-1',
			pilot: 'Captain John',
			origin,
			destination,
			departure: new Date('2023-11-15T08:00:00'),
			status: Status.CANCELED,
		};
		const ticket1: ITicket = {
			id: '123',
			passanger: { name: 'John Doe', birthDate: new Date(), cpf: '12345678901', age: 30 },
			flight: flight1,
			seat: 5,
		};
		const emittedTicket = TicketServiceInstance.emitTicket(ticket1);

		const flight2: IFlight = {
			id: 'flight-2',
			pilot: 'Captain Alice',
			origin: origin2,
			destination: destination2,
			departure: new Date('2023-11-16T10:00:00'),
			status: Status.PENDING,
		};
		const ticket2: ITicket = {
			id: '456',
			passanger: { name: 'Alice', birthDate: new Date(), cpf: '98765432109', age: 25 },
			flight: flight2,
			seat: 10,
		};
		const emittedTicket2 = TicketServiceInstance.emitTicket(ticket2);

		expect(emittedTicket2).not.toBe(emittedTicket);
	});

	it('Deve nao permitir se um bilhete inválido for emitido', () => {
		const origin: ILocalization = { city: 'Sydney', state: 'NSW', country: 'Australia' };
		const destination: ILocalization = { city: 'Tokyo', state: 'Tokyo', country: 'Japan' };

		const invalidTicket: ITicket = {
			id: '789',
			passanger: { name: '', birthDate: new Date(), cpf: '123', age: -5 },
			flight: {
				id: 'flight-3',
				pilot: 'Captain Bob',
				origin: origin,
				destination: destination,
				departure: new Date('2023-11-17T12:00:00'),
				status: Status.CANCELED,
			},
			seat: -2,
		};
		const invalidedTicket = TicketServiceInstance.emitTicket(invalidTicket);

		expect(invalidedTicket).not.toBe(invalidTicket);
	});

	it('Deve nao permitir ao tentar emitir um bilhete com informações de origem e destino inválidas', () => {
		const origin: ILocalization = { city: 'Martopolis', state: 'Marte', country: 'MARTE' };
		const destination: ILocalization = { city: 'Paris', state: 'Île-de-France', country: 'France' };

		const flight: IFlight = {
			id: 'flight-1',
			pilot: 'Captain Alice',
			origin: origin,
			destination: destination,
			departure: new Date('2023-11-18T09:00:00'),
			status: Status.CONFIRMED,
		};
		const invalidTicket: ITicket = {
			id: '123',
			passanger: { name: 'Alice', birthDate: new Date(), cpf: '98765432109', age: 25 },
			flight: flight,
			seat: 10,
		};
		const invalidedTicket = TicketServiceInstance.emitTicket(invalidTicket);
		expect(invalidedTicket).not.toEqual(invalidTicket);
	});

	it('Deve emitir um bilhete com informações de origem e destino diferentes', () => {
		const origin: ILocalization = { city: 'Sydney', state: 'NSW', country: 'Australia' };
		const destination: ILocalization = { city: 'Tokyo', state: 'Tokyo', country: 'Japan' };

		const flight: IFlight = {
			id: 'flight-2',
			pilot: 'Captain Bob',
			origin: origin,
			destination: destination,
			departure: new Date('2023-11-19T10:00:00'),
			status: Status.PENDING,
		};
		const ticket: ITicket = {
			id: '456',
			passanger: { name: 'Bob', birthDate: new Date(), cpf: '12345678901', age: 30 },
			flight: flight,
			seat: 5,
		};
		const emittedTicket = TicketServiceInstance.emitTicket(ticket);
		expect(emittedTicket).not.toEqual(ticket);
	});

	it('Não Deve emitir um bilhete com informações de origem e destino vazias', () => {
		const origin: ILocalization = { city: '', state: '', country: '' };
		const destination: ILocalization = { city: '', state: '', country: '' };

		const flight: IFlight = {
			id: 'flight-3',
			pilot: 'Captain Eve',
			origin: origin,
			destination: destination,
			departure: new Date('2023-11-20T11:00:00'),
			status: Status.CANCELED,
		};
		const ticket: ITicket = {
			id: '789',
			passanger: { name: 'Eve', birthDate: new Date(), cpf: '45612378901', age: 22 },
			flight: flight,
			seat: 15,
		};
		const emittedTicket = TicketServiceInstance.emitTicket(ticket);
		expect(emittedTicket).not.toEqual(ticket);
	});
})