import FlightRepository from '../../Repository/FlightRepository';
import { IFilterFlight, IFlight, Status } from "../../Interfaces/IFlight";

describe('FlightRepository', () => {
  let flightRepository: FlightRepository;

  beforeEach(() => {
    flightRepository = new FlightRepository();
  });

	it('should verify if destination city is equal in params and flight', () => {
		const params: IFilterFlight = { destination: { city: 'DestinationCity', state: 'DestinationState', country: 'DestinationCountry' } };
		const flight: IFlight = {
			id: '1',
			pilot: 'John Doe',
			origin: { city: 'OriginCity', state: 'OriginState', country: 'OriginCountry' },
			destination: { city: 'DestinationCity', state: 'DestinationState', country: 'DestinationCountry' },
			departure: new Date(),
			status: Status.CONFIRMED,
		};

		const result = flightRepository.verifyIfDestinationCityIsEqualInParmsAndFlight(params, flight);

		expect(result).toBeTruthy();
	});

  it('should filter flights based on parameters', () => {
    const flight1: IFlight = {
      id: '1',
      pilot: 'John Doe',
      origin: { city: 'OriginCity1', state: 'OriginState1', country: 'OriginCountry1' },
      destination: { city: 'DestinationCity1', state: 'DestinationState1', country: 'DestinationCountry1' },
      departure: new Date(),
      status: Status.CONFIRMED,
    };

    const flight2: IFlight = {
      id: '2',
      pilot: 'Jane Smith',
      origin: { city: 'OriginCity2', state: 'OriginState2', country: 'OriginCountry2' },
      destination: { city: 'DestinationCity2', state: 'DestinationState2', country: 'DestinationCountry2' },
      departure: new Date(),
      status: Status.PENDING,
    };

    flightRepository.createFlight(flight1);
    flightRepository.createFlight(flight2);

    const params: IFilterFlight = { destination: { city: 'DestinationCity1', state: 'DestinationState1', country: 'DestinationCountry1' }, status: Status.CONFIRMED };
    const filteredFlights = flightRepository.filterFlight(params);

    expect(filteredFlights).toHaveLength(1);
    expect(filteredFlights[0]).toEqual(flight1);
  });

  it('should throw an error when getting a flight by an invalid ID', () => {
    expect(() => flightRepository.getFlightById('invalid_id')).toThrowError('voo não encontrado');
  });

  it('should throw an error when changing the status of a flight with an invalid ID', () => {
    expect(() => flightRepository.changeStatus('invalid_id', Status.PENDING)).toThrowError('voo não encontrado');
  });
});
