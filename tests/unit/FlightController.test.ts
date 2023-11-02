import FlightControllerFactory from "../../Factories/FlightControllerFactory";
import FlightServiceMock from "../mocks/FlightServiceMock";
import { flightOne } from "../mocks/FlightObject";
import { Request, Response } from "express";


const FlightServiceInstance = new FlightServiceMock();
const FlightControllerInstance = FlightControllerFactory.make(
	FlightServiceInstance
);
describe("Flight Controller #unit", () => {
	describe("createFlight", () => {
		it("should return 201 when create a flight ", () => {
			FlightServiceInstance.createFlight = jest.fn((_flight) => {
				return flightOne;
			});

			const req = {
				body: flightOne,
			} as unknown as Request;

			const mockJsonResponse = jest.fn();

			const res = {
				status: jest.fn().mockImplementation(() => ({
					json: mockJsonResponse,
				})),
			} as unknown as Response;

			FlightControllerInstance.createFlight(req, res, jest.fn());

			expect(res.status).toHaveBeenCalledWith(201);
			expect(mockJsonResponse).toHaveBeenCalledWith({ flight: flightOne });
		});

		it("should return 400 when service throws an error", () => {
			FlightServiceInstance.createFlight = jest.fn((_flight) => {
				throw new Error("a origem não poder ser igual ao destino");
			});

			const req = {
				body: flightOne,
			} as unknown as Request;

			const mockJsonResponse = jest.fn();

			const res = {
				status: jest.fn().mockImplementation(() => ({
					json: mockJsonResponse,
				})),
			} as unknown as Response;

			FlightControllerInstance.createFlight(req, res, jest.fn());

			expect(res.status).toHaveBeenCalledWith(400);
			expect(mockJsonResponse).toHaveBeenCalledWith({
				error: "a origem não poder ser igual ao destino",
			});
		});

		it("should return 200 when list all the flights", () => {
			FlightServiceInstance.listFlight = jest.fn((_flight) => {''
				return [flightOne];
			});

			const req = {} as unknown as Request;

			const mockJsonResponse = jest.fn();

			const res = {
				status: jest.fn().mockImplementation(() => ({
					json: mockJsonResponse,
				})),
			} as unknown as Response;

			FlightControllerInstance.listFlight(req, res, jest.fn());

			expect(res.status).toHaveBeenCalledWith(200);
			expect(mockJsonResponse).toHaveBeenCalledWith({ flights: [flightOne] });
		});

		it("should return 200 when service get one flight", () => {
			FlightServiceInstance.getFlightById = jest.fn((_flight) => {
				return flightOne;
			});

			const req = {
				params: {
					id: flightOne.id,
				},
			} as unknown as Request;

			const mockJsonResponse = jest.fn();

			const res = {
				status: jest.fn().mockImplementation(() => ({
					json: mockJsonResponse,
				})),
			} as unknown as Response;

			FlightControllerInstance.getFlights(req, res, jest.fn());

			expect(res.status).toHaveBeenCalledWith(200);
			expect(mockJsonResponse).toHaveBeenCalledWith({ flight: flightOne });
		});

		it("should return 200 when service can change the status of a flight", () => {
			FlightServiceInstance.changeStatus = jest.fn((_flight) => {
				return flightOne;
			});

			const req = {
				params: {
					id: flightOne.id,
				},
				body: {
					status: flightOne.status,
				},
			} as unknown as Request;

			const mockJsonResponse = jest.fn();

			const res = {
				status: jest.fn().mockImplementation(() => ({
					json: mockJsonResponse,
				})),
			} as unknown as Response;

			FlightControllerInstance.changeStatus(req, res, jest.fn());

			expect(res.status).toHaveBeenCalledWith(200);
			expect(mockJsonResponse).toHaveBeenCalledWith({ flight: flightOne });
		});


	});
});
