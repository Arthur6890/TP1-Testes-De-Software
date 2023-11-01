import { IPlane } from "../Interfaces/IPlane";

export interface IPlaneService {
  createPlane(plane: IPlane);
  getPlaneById(id: string);
}
