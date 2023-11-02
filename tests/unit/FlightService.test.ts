import FlightServiceFactory from "../../Factories/FlightServiceFactory";
import { flightOne } from "../mocks/FlightObject";
import FlightRepositoryMock from "../mocks/FlightRepositoryMock";
import { IFlight, Status } from "../../Interfaces/IFlight";
import { IPlane } from "../../Interfaces/IPlane";
import { IPerson } from "../../Interfaces/IPerson";

const FlightRepositoryInstance = new FlightRepositoryMock();
const FlightServiceInstance = FlightServiceFactory.make(
	FlightRepositoryInstance
);

let flight: IFlight = {
	id: "string",
	pilot: "string",
	origin: { city: "city", state: "state", country: "Country" },
	destination: { city: "city2", state: "state2", country: "Country2" },
	status: Status.CANCELED,
	ocupation: 10,
	departure: new Date('2023-11-01T10:00:00'),
	arrival: new Date('2023-11-01T12:30:00'),
};

let plane: IPlane = {
	id: "any",
	model: "any",
	seatQuantity: 0,
	yearOfManufacture: 2020,
}

const person: IPerson = {
	name: 'John Doe',
	birthDate: new Date('1990-01-01'),
	cpf: '1234567890',
	age: 33,
};

const person2: IPerson = {
	name: 'Jane Doe',
	birthDate: new Date('2010-05-15'),
	cpf: '9876543210',
	age: 12,
};

const person3: IPerson = {
	name: 'Sam Smith',
	birthDate: new Date(new Date().getFullYear() - 18, 0, 1),
	cpf: '5678901234',
	age: 18,
};

const flight1: IFlight = {
	id: '1',
	pilot: 'John Smith',
	origin: { city: 'New York', country: 'USA', state: "NY" },
	destination: { city: 'Los Angeles', country: 'USA', state: "CA" },
	departure: new Date(new Date().getTime() - 3600000), // 1 hour ago
	status: Status.PENDING,
};

const flight2: IFlight = {
	id: '2',
	pilot: 'Jane Doe',
	origin: { city: 'London', country: 'UK', state: "n/a" },
	destination: { city: 'Paris', country: 'France', state: "n/a" },
	departure: new Date(new Date().getTime() + 7200000), // 2 hours in the future
	status: Status.CONFIRMED,
};

const flight3: IFlight = {
	id: '3',
	pilot: 'Sam Johnson',
	origin: { city: 'Berlin', country: 'Germany', state: "n/a" },
	destination: { city: 'Madrid', country: 'Spain', state: "n/a" },
	departure: new Date(new Date().getTime() - 1800000), // 30 minutes ago
	status: Status.PENDING,
};


describe("Flight Service #unit", () => {
	describe("create flight", () => {

		it("should throw an error if destination is equal to origin", () => {
			FlightRepositoryInstance.createFlight = jest.fn((_flight) => {
				return flightOne;
			});
			const invalidFlight = { ...flightOne, destination: flightOne.origin };

			expect(() => FlightServiceInstance.createFlight(invalidFlight)).toThrow(
				new Error("a origem não poder ser igual ao destino")
			);
		});

		it("should add zero in flight ocupation when it doesnt exists", () => {
			FlightRepositoryInstance.createFlight = jest.fn((flight) => {
				return flight;
			});
			const flightWithoutOcupation = { ...flightOne };
			delete flightWithoutOcupation.ocupation;
			const flight = FlightServiceInstance.createFlight(flightWithoutOcupation);
			expect(flight.ocupation).toBe(0);
		});
	});

	describe("changeStatus", () => {
		it("should change status of flight", () => {
			FlightRepositoryInstance.changeStatus = jest.fn((_id, status) => {
				return { ...flightOne, status: status };
			});

			const id = flightOne.id;
			const flightConfirmed = FlightServiceInstance.changeStatus(
				id,
				Status.CONFIRMED
			);
			expect(flightConfirmed.status).toBe(Status.CONFIRMED);
		});

	});
	describe("flightDuration", () => {
		it('should calculate flight duration with valid departure and arrival', () => {

			const duration = FlightServiceInstance.calculateFlightDuration(flight);
			expect(duration).toBe(150);
		});


		it('should calculate flight duration with equal departure and arrival', () => {
			flight.departure = new Date('2023-11-01T10:00:00');
			flight.arrival = new Date('2023-11-01T10:00:00');

			expect(() => FlightServiceInstance.calculateFlightDuration(flight)).toThrow(
				new Error("Hora de chegada invalida")
			);
		});

		it('should calculate flight duration with arrival in the past', () => {
			flight.departure = new Date('2023-11-01T14:00:00');
			flight.arrival = new Date('2023-11-01T12:30:00');

			expect(() => FlightServiceInstance.calculateFlightDuration(flight)).toThrow(
				new Error("Hora de chegada invalida")
			);

		});
	});

	describe('generateMessageByFlightStatus', () => {
		it('Should return the right message for a confirmed flight', () => {
			flight.status = Status.CONFIRMED;
			const message = FlightServiceInstance.generateMessageByFlightStatus(flight);
			expect(message).toBe('The flight is confirmed and can proceed.');
		});

		it('Should return the right message for a pending flight', () => {
			flight.status = Status.PENDING;
			const message = FlightServiceInstance.generateMessageByFlightStatus(flight);
			expect(message).toBe('The flight is not yet authorized. Please stand by.');
		});

		it('Should return the right message for a canceled flight', () => {
			flight.status = Status.CANCELED;
			const message = FlightServiceInstance.generateMessageByFlightStatus(flight);
			expect(message).toBe('The flight is canceled.');
		});
	});

	describe('isFlightCheckInAvailable', () => {
		it('Should allow check-in when flight departure is within a day', () => {
			const currentTime = new Date('2023-11-01T10:00:00');
			flight.departure = new Date('2023-11-02T10:00:00');
			const canCheckIn = FlightServiceInstance.isFlightCheckInAvailable(flight, currentTime);
			expect(canCheckIn).toBe(true);
		});

		it('Should allow check-in when flight departure is within exatly 24 hours', () => {
			const currentTime = new Date('2023-11-01T10:00:00');
			flight.departure = new Date('2023-11-02T10:00:00');
			const canCheckIn = FlightServiceInstance.isFlightCheckInAvailable(flight, currentTime);
			expect(canCheckIn).toBe(true);
		});

		it('Shouldnt allow check-in when flight departure is not within over a day', () => {
			const currentTime = new Date('2023-11-01T14:00:00');
			flight.departure = new Date('2024-1-01T10:00:00');
			const canCheckIn = FlightServiceInstance.isFlightCheckInAvailable(flight, currentTime);
			expect(canCheckIn).toBe(false);
		});

		it('Shouldnt allow check-in when flight departure already happened', () => {
			const currentTime = new Date('2023-11-01T14:00:00');
			flight.departure = new Date('2022-11-01T10:00:00');
			const canCheckIn = FlightServiceInstance.isFlightCheckInAvailable(flight, currentTime);
			expect(canCheckIn).toBe(false);
		});
	});

	describe('isInternationalFlight', () => {
		it('Should return true for origin country different then destiny country', () => {
			flight.origin = { city: 'NY', state: 'NY', country: 'USA' };
			flight.destination = { city: 'Montreal', state: 'Quebec', country: 'Canada' };
			const isInternational = FlightServiceInstance.isInternationalFlight(flight);
			expect(isInternational).toBe(true);
		});

		it('Should return false for origin country equal then destiny country', () => {
			flight.origin = { city: 'LA', state: 'LA', country: 'USA' };
			flight.destination = { city: 'NY', state: 'NY', country: 'USA' };
			const isInternational = FlightServiceInstance.isInternationalFlight(flight);
			expect(isInternational).toBe(false);
		});
	});

	describe('isPlaneModelSuitableForFlight', () => {
		it('Should return true when the plane have more space than the flight occupation', () => {
			plane.seatQuantity = 200;
			flight.ocupation = 150;
			const isSuitable = FlightServiceInstance.isPlaneModelSuitableForFlight(plane, flight);
			expect(isSuitable).toBe(true);
		});

		it('Should return true when the plane have the same space than the flight occupation', () => {
			plane.seatQuantity = 200;
			flight.ocupation = 200;
			const isSuitable = FlightServiceInstance.isPlaneModelSuitableForFlight(plane, flight);
			expect(isSuitable).toBe(true);
		});

		it('Should return false when the plane have less space than the flight occupation', () => {
			plane.seatQuantity = 100;
			flight.ocupation = 150;
			const isSuitable = FlightServiceInstance.isPlaneModelSuitableForFlight(plane, flight);
			expect(isSuitable).toBe(false);
		});

		it('Should return false for a plane with no seats', () => {
			plane.seatQuantity = 0;
			flight.ocupation = 150;
			const isSuitable = FlightServiceInstance.isPlaneModelSuitableForFlight(plane, flight);
			expect(isSuitable).toBe(false);
		});
	});

	describe('isPersonEligibleToBookFlight', () => {
		it('should return true if the person is 18 years old or older', () => {
			const result = FlightServiceInstance.isPersonEligibleToBookFlight(person);
			expect(result).toBe(true);
		});

		it('should return false if the person is younger than 18', () => {
			const result = FlightServiceInstance.isPersonEligibleToBookFlight(person2);
			expect(result).toBe(false);
		});

		it('should return true if the person is exactly 18 years old', () => {
			const result = FlightServiceInstance.isPersonEligibleToBookFlight(person3);
			expect(result).toBe(true);
		});
	})

	describe('isFlightDelayedBasedOnTime', () => {
		it('should return true if the flight is delayed (Status.DELAYED)', () => {
			const result = FlightServiceInstance.isFlightDelayedBasedOnTime(flight1);
			expect(result).toBe(true);
		});
	})

	it('should return false if the flight is not delayed (Status.CONFIRMED)', () => {
		const result = FlightServiceInstance.isFlightDelayedBasedOnTime(flight2);
		expect(result).toBe(false);
	});

	it('should return true if the flight status is not DELAYED (Status.PENDING)', () => {
		const result = FlightServiceInstance.isFlightDelayedBasedOnTime(flight3);
		expect(result).toBe(true);
	});


});


