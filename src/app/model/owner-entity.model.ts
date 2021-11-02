import { CarEntity } from "./car-entity.model";

export interface OwnerEntity {
    id: number | null,
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
}