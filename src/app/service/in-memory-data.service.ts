import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let owners = [
      { id: 1, aLastName: 'Ivanov', aFirstName: 'Ivan', aMiddleName: 'Ivanovich',
        aCars: [{ aStateNumber: 'AX7777AB', aBrand: 'Hyundai', aModel: 'Accent', aYear: 2007 }] },
      { id: 2, aLastName: 'Petrova', aFirstName: 'Natalya', aMiddleName: 'Igorevna',
        aCars: [{ aStateNumber: 'AA1234XX', aBrand: 'Ford', aModel: 'Mondeo', aYear: 2015 },
                { aStateNumber: 'AI5678BE', aBrand: 'Daewoo', aModel: 'Matiz', aYear: 2010}] },
      { id: 3, aLastName: 'Antonov', aFirstName: 'Aleksey', aMiddleName: 'Sergeyevich',
        aCars: [{ aStateNumber: 'BH4321AE', aBrand: 'Opel', aModel: 'Corsa', aYear: 2020 }] }
    ];
    return { owners };
  }
}
