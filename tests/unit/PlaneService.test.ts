import PlaneRepositoryMock from "../mocks/PlaneServiceMock";
import PlaneServiceFactory from "../../Factories/PlaneServiceFactory"

const PlaneRepositoryInstance = new PlaneRepositoryMock();
const PlaneServiceInstance = PlaneServiceFactory.make(
	PlaneRepositoryInstance
);

describe('isValidPlaneModel', () => {
	it('Deve retornar verdadeiro para um modelo de avião válido', () => {
		const validPlane = { model: 'Boeing-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Deve retornar verdadeiro para outro modelo de avião válido', () => {
		const validPlane = { model: 'Cessna-172' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Deve retornar falso para um modelo de avião inválido', () => {
		const validPlane = { model: 'Airbus-A319' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Deve retornar falso para um modelo de avião em branco', () => {
		const emptyPlane = { model: '' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(emptyPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Deve retornar falso para um objeto de avião inválido', () => {
		const invalidPlane = { model: 'Boeing-731' };

		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);
		expect(isValidPlaneModel).toBe(false);

	});

	it('Deve retornar verdadeiro para um modelo de avião válido (Airbus-A330)', () => {
		const validPlane = { model: 'Boeing-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);
		expect(isValidPlaneModel).toBe(true);
	});

	it('Deve retornar verdadeiro para um modelo de avião válido (Martin F-35)', () => {
		const validPlane = { model: 'Martin F-35' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Deve retornar falso para um modelo de avião inválido com letras maiúsculas', () => {
		const invalidPlane = { model: 'BOEING-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);

		expect(isValidPlaneModel).toBe(false);

	});

	it('Deve retornar falso para um modelo de avião inválido com espaços em branco', () => {
		const invalidPlane = { model: 'Cessna 172' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Deve retornar false para um modelo de avião válido (Boeing-747) com espaços em branco antes e depois', () => {
		const validPlane = { model: '  Boeing-747  ' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

});