import { IPlane } from "../Interfaces/IPlane";
import { IPlaneRepository } from "../Repository/IPlaneRepository";

export default class PlaneService {
  private planeRepository: IPlaneRepository;
  constructor(planeRepository: IPlaneRepository) {
    this.planeRepository = planeRepository;
  }
  createPlane(plane: IPlane) {
    return this.planeRepository.createAirplane(plane);
  }
  getPlaneById(id: string) {
    return this.planeRepository.getPlaneById(id);
  }

  isValidPlaneModel(plane: IPlane) {
    const validModels = ['Boeing-737', 'Boeing-747', 'Airbus-A320', 'Airbus-A3280', 'Martin F-35',
      'Cessna-172', 'Airbus-A330'];
    return validModels.includes(plane.model);
  }
}
