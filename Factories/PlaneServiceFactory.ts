import { IPlaneRepository } from "../Repository/IPlaneRepository";
import PlaneRepository from "../Repository/PlaneRepository";
import PlaneService from "../Service/PlaneService";

export default class PlaneServiceFactory {
  static make(planeRepository?: IPlaneRepository) {
    const planeRepositoryInstance = planeRepository || new PlaneRepository();
    return new PlaneService(planeRepositoryInstance);
  }
}
