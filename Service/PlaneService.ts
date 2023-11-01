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
}
