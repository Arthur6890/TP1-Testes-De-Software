import { IPlane } from "../Interfaces/IPlane";

export interface IPlaneRepository {
  createAirplane(plane: IPlane): IPlane;
  getPlaneById(id: string): IPlane;
}
