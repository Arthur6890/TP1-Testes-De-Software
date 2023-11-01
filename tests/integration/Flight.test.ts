import FlightControllerFactory from "../../Factories/FlightControllerFactory";
import { flightOne } from "../mocks/FlightObject";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { Status } from "../../Interfaces/IFlight";

describe("Flight #integration", () => {
  const FlightControllerInstance = FlightControllerFactory.make();
  beforeAll(() => {
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
  });

  describe("Create Flight", () => {
    it("should return 201 when flight is created", () => {
      const flight = { ...flightOne, id: faker.datatype.uuid() };
      const req = {
        body: flight,
      } as unknown as Request;

      const mockJsonResponse = jest.fn();

      const res = {
        status: jest.fn().mockImplementation(() => ({
          json: mockJsonResponse,
        })),
      } as unknown as Response;

      FlightControllerInstance.createFlight(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockJsonResponse).toHaveBeenCalledWith({ flight: flight });
    });

    it("should return 400 when origin is the same of destination", () => {
      const invalidFlight = {
        ...flightOne,
        destination: flightOne.origin,
      };
      const req = {
        body: invalidFlight,
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
  });

  describe("list flights", () => {
    it("should return 200 with a list of flights", () => {
      const flightFilter = { status: Status.PENDING };
      const req = {
        query: flightFilter,
      } as unknown as Request;

      const mockJsonResponse = jest.fn();

      const res = {
        status: jest.fn().mockImplementation(() => ({
          json: mockJsonResponse,
        })),
      } as unknown as Response;

      FlightControllerInstance.listFlight(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("get flight by id", () => {
    it("should return 200 with a flight", () => {
      const req = {
        params: { id: flightOne.id },
      } as unknown as Request;

      const mockJsonResponse = jest.fn();

      const res = {
        status: jest.fn().mockImplementation(() => ({
          json: mockJsonResponse,
        })),
      } as unknown as Response;

      FlightControllerInstance.getFlights(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockJsonResponse).toHaveBeenCalledWith({
        flight: flightOne,
      });
    });

    it("should return 400 with an error message when flight is not found", () => {
      const req = {
        params: { id: faker.datatype.uuid() },
      } as unknown as Request;

      const mockJsonResponse = jest.fn();

      const res = {
        status: jest.fn().mockImplementation(() => ({
          json: mockJsonResponse,
        })),
      } as unknown as Response;

      FlightControllerInstance.getFlights(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockJsonResponse).toHaveBeenCalledWith({
        error: "voo não encontrado",
      });
    });
  });
});
