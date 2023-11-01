import PlaneController from "../Controller/PlaneController";
import { IPlaneService } from "../Service/IPlaneService";
import PlaneServiceFactory from "./PlaneServiceFactory";

export default class PlaneControllerFactory {
  static make(planeService?: IPlaneService) {
    const planeServiceInstance = planeService || PlaneServiceFactory.make();
    return new PlaneController(planeServiceInstance);
  }
}
