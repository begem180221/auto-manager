import { OwnerEntity } from './../../model/owner-entity.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarOwnersService } from 'src/app/service/car-owners.service';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {
  displayedColumns: string[] = ['aLastName', 'aFirstName', 'aMiddleName', 'aCars', 'actions'];
  dataSource!: OwnerEntity[];

  constructor(private ownerService: CarOwnersService,
    private router: Router) { }

  ngOnInit(): void {
    this.getOwners();
  }

  private getOwners() {
    this.ownerService.getOwners().subscribe(resp => {
      this.dataSource = resp;
    });
  }

  showRecord(row: any) {
    const id = Number.parseInt(row.id);
    this.router.navigate(['profile', row.id, 'showMode'], { state: { currentOwner: this.getCurrentOwner(id) } });
  }

  addRecord() {
    this.router.navigate(['profile', 0, 'addMode']);
  }

  editRecord(row: any) {
    const id = Number.parseInt(row.id);
    this.router.navigate(['profile', row.id, 'editMode'], { state: { currentOwner: this.getCurrentOwner(id) } });
  }

  getCurrentOwner(id: number): OwnerEntity {
    return this.dataSource.filter(owner => owner.id === id)[0];
  }

  deleteConfirm(row: any) {
    const lastName = row.aLastName;
    const firstName = row.aFirstName;
    const middleName = row.aMiddleName;
    if (confirm('Are you sure to delete this record: ' +
      '"' + lastName + ' ' + firstName + ' ' + middleName + '"')) {
      this.deleteRecord(row);
    }
  }

  deleteRecord(row: any) {
    if (row) {
      const id = Number.parseInt(row.id);
      this.ownerService.deleteOwner(id).subscribe(() => {
        this.getOwners();
      });
    }
  }

}
