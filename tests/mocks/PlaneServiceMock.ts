import { IPlane } from "../../Interfaces/IPlane";
import { IPlaneRepository } from "../../Repository/IPlaneRepository";

export default class PlaneRepositoryMock implements IPlaneRepository {
	createAirplane(_plane: IPlane) {
		return {} as IPlane;
	}
	getPlaneById(_id: string) {
		return {} as IPlane;
	}
	isValidPlaneModel(_plane: string) {
		return {} as boolean;
	}
}
