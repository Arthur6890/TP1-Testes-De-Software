import PlaneRepositoryMock from "../mocks/PlaneServiceMock";
import PlaneServiceFactory from "../../Factories/PlaneServiceFactory"

const PlaneRepositoryInstance = new PlaneRepositoryMock();
const PlaneServiceInstance = PlaneServiceFactory.make(
	PlaneRepositoryInstance
);

describe('isValidPlaneModel', () => {
	it('Must return true for a valid plane model', () => {
		const validPlane = { model: 'Boeing-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Must return true for another valid plane model', () => {
		const validPlane = { model: 'Cessna-172' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Should return false for an invalid plane model', () => {
		const validPlane = { model: 'Airbus-A319' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Should return false for a blank plane model', () => {
		const emptyPlane = { model: '' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(emptyPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Must return false for an invalid plane object', () => {
		const invalidPlane = { model: 'Boeing-731' };

		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);
		expect(isValidPlaneModel).toBe(false);

	});

	it('Must return true for a valid airplane model (Airbus-A330)', () => {
		const validPlane = { model: 'Boeing-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);
		expect(isValidPlaneModel).toBe(true);
	});

	it('Must return true for a valid airplane model (Martin F-35)', () => {
		const validPlane = { model: 'Martin F-35' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(true);
	});

	it('Should return false for an invalid plane model with capital letters', () => {
		const invalidPlane = { model: 'BOEING-737' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);

		expect(isValidPlaneModel).toBe(false);

	});

	it('Should return false for an invalid plane model with blanks', () => {
		const invalidPlane = { model: 'Cessna 172' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(invalidPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

	it('Must return false for a valid plane model (Boeing-747) with whitespace before and after', () => {
		const validPlane = { model: '  Boeing-747  ' };
		const isValidPlaneModel = PlaneServiceInstance.isValidPlaneModel(validPlane.model);

		expect(isValidPlaneModel).toBe(false);
	});

});