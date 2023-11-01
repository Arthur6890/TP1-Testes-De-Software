import FlightServiceFactory from "../../Factories/FlightServiceFactory";
import { Status } from "../../Interfaces/IFlight";
import { flightOne } from "../mocks/FlightObject";
import FlightRepositoryMock from "../mocks/FlightRepositoryMock";

const FlightRepositoryInstance = new FlightRepositoryMock();
const FlightServiceInstance = FlightServiceFactory.make(
  FlightRepositoryInstance
);

describe("Flight Service #unit", () => {
  describe("Get flight by id", () => {
    it("should return a flight", () => {
      const id = flightOne.id;
      FlightRepositoryInstance.getFlightById = jest.fn((_id) => {
        return flightOne;
      });
      const flight = FlightServiceInstance.getFlightById(id);

      expect(flight).toBe(flightOne);
    });

    it("should throw an error", () => {
      const id = "unexistentID";
      FlightRepositoryInstance.getFlightById = jest.fn((_id) => {
        throw new Error("voo não encontrado");
      });

      expect(() => FlightServiceInstance.getFlightById(id)).toThrow(
        new Error("voo não encontrado")
      );
    });
  });

  describe("List flight", () => {
    it("should return a list of flights", () => {
      FlightRepositoryInstance.filterFlight = jest.fn((_filterParams) => {
        return [flightOne];
      });
      const filterParams = {};
      const flights = FlightServiceInstance.listFlight(filterParams);

      expect(flights).toStrictEqual([flightOne]);
    });

    it("should return a expty array", () => {
      FlightRepositoryInstance.filterFlight = jest.fn((_filterParams) => {
        return [];
      });
      const filterParams = {};
      const flights = FlightServiceInstance.listFlight(filterParams);

      expect(flights).toStrictEqual([]);
    });
  });

  describe("create flight", () => {
    it("should create a flight", () => {
      FlightRepositoryInstance.createFlight = jest.fn((_flight) => {
        return flightOne;
      });

      expect(FlightServiceInstance.createFlight(flightOne)).toBe(flightOne);
    });

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

    it("should throw an error when repository throws", () => {
      FlightRepositoryInstance.createFlight = jest.fn((_id) => {
        throw new Error("ID já existente na base de dados");
      });

      expect(() => FlightServiceInstance.createFlight(flightOne)).toThrow(
        new Error("ID já existente na base de dados")
      );
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

    it("should trohow an error when repository throws", () => {
      FlightRepositoryInstance.changeStatus = jest.fn((_id, _status) => {
        throw new Error("voo não encontrado");
      });
      expect(() =>
        FlightServiceInstance.changeStatus(flightOne.id, Status.CANCELED)
      ).toThrow(new Error("voo não encontrado"));
    });
  });
});
