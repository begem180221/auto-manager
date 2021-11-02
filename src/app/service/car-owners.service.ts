import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarOwnersService } from '../interface/car-owners.interface';
import { OwnerEntity } from '../model/owner-entity.model';
import { CarEntity } from '../model/car-entity.model';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService {

  private carOwnersUrl = 'api/owners/';
  constructor(private http: HttpClient) { }
  
  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.carOwnersUrl);
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(this.carOwnersUrl + aId);
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    const newOwner: OwnerEntity = { id: null, 
                                    aLastName: aLastName, 
                                    aFirstName: aFirstName, 
                                    aMiddleName: aMiddleName,
                                    aCars: aCars }
    return this.http.post<OwnerEntity>(this.carOwnersUrl, newOwner);
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(this.carOwnersUrl + aOwner.id, aOwner);
  }
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(this.carOwnersUrl + aOwnerId);
  } 
}
