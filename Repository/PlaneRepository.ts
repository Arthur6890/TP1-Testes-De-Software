import { IPlane } from "../Interfaces/IPlane";
import { IPlaneRepository } from "./IPlaneRepository";

const planes: Array<IPlane> = [];

export default class PlaneRepository implements  IPlaneRepository {
  createAirplane(plane: IPlane): IPlane {
    planes.push(plane);
    return plane;
  }

  getPlaneById(id: string): IPlane {
    let plane = planes.filter((plane) => plane.id == id);
    if (plane.length == 0) {
      throw new Error("Avião não encontrado");
    }
    return plane[0];
  }
}
