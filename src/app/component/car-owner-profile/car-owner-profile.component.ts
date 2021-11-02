import { CarEntity } from './../../model/car-entity.model';
import { OwnerEntity } from './../../model/owner-entity.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

const MIN_YEAR = 1990;
const CURRENT_YEAR = 2021;
const STATE_NUMBER_PATTERN = '^[A-Z]{2}\\d{4}[A-Z]{2}$';

@Component({
  selector: 'app-car-owner-profile',
  templateUrl: './car-owner-profile.component.html',
  styleUrls: ['./car-owner-profile.component.css']
})
export class CarOwnerProfileComponent implements OnInit {
  currentOwner: OwnerEntity = <OwnerEntity>{};
  isShowMode: boolean = false;
  isAddMode: boolean = false;
  isEditMode: boolean = false;
  years: number[] = [];

  profileForm: FormGroup = <FormGroup>{};

  constructor(private ownerService: CarOwnersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    for (let i = CURRENT_YEAR; i >= MIN_YEAR; i--) {
      this.years.push(i);
    }
    this.currentOwner = this.router.getCurrentNavigation()?.extras.state?.currentOwner;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      let mode = params.get('mode');
      let ownerId: number = 0;
      if (id) {
        ownerId = Number.parseInt(id);
      }
      if (ownerId && mode === 'showMode') {
        this.isShowMode = !this.isShowMode;
      } else if (mode === 'addMode') {
        this.isAddMode = !this.isAddMode;
        this.profileForm = this.createAddProfileForm();
      } else if (ownerId && mode === 'editMode') {
        this.isEditMode = !this.isEditMode;
        this.profileForm = this.createEditProfileForm();
      }
    });
  }

  createAddProfileForm(): FormGroup {
    return this.fb.group({
      aLastName: ['', Validators.required],
      aFirstName: ['', Validators.required],
      aMiddleName: [''],
      aCars: this.fb.array([
        this.createNewCar()
      ])
    });
  }

  createEditProfileForm(): FormGroup {
    return this.fb.group({
      aLastName: [this.currentOwner.aLastName, Validators.required],
      aFirstName: [this.currentOwner.aFirstName, Validators.required],
      aMiddleName: [this.currentOwner.aMiddleName],
      aCars: this.getExistCars()
    });
  }

  get aCars(): FormArray {
    return this.profileForm.get('aCars') as FormArray;
  }

  private createNewCar(): FormGroup {
    return this.fb.group({
      aStateNumber: ['', Validators.compose([Validators.required, Validators.pattern(STATE_NUMBER_PATTERN)])],
      aBrand: ['', Validators.required],
      aModel: ['', Validators.required],
      aYear: [null, Validators.required]
    });
  }

  private getExistCars(): FormArray {
    const existCars: FormArray = this.fb.array([]);

    this.currentOwner.aCars.map(car => {
      existCars.push(this.fb.group({
        aStateNumber: [car.aStateNumber, Validators.compose([Validators.required, Validators.pattern(STATE_NUMBER_PATTERN)])],
        aBrand: [car.aBrand, Validators.required],
        aModel: [car.aModel, Validators.required],
        aYear: [car.aYear, Validators.required]
      }));
    });

    return existCars;
  }

  addCar() {
    const newCar = this.createNewCar();
    this.aCars.push(newCar);
  }

  deleteCar(idx: number) {
    this.aCars.removeAt(idx);
  }

  onSubmit() {
    if (this.isAddMode) {
      const lastName = this.profileForm.value.aLastName;
      const firstName = this.profileForm.value.aFirstName;
      const middleName = this.profileForm.value.aMiddleName;
      const cars: CarEntity[] = this.profileForm.value.aCars;

      this.ownerService.createOwner(lastName, firstName, middleName, cars).subscribe(() => {
        this.router.navigate(['']);
      });
    } else if (this.isEditMode) {
      const editedOwner: OwnerEntity = {
        id: this.currentOwner.id,
        aLastName: this.profileForm.value.aLastName,
        aFirstName: this.profileForm.value.aFirstName,
        aMiddleName: this.profileForm.value.aMiddleName,
        aCars: this.profileForm.value.aCars
      }

      this.ownerService.editOwner(editedOwner).subscribe(() => {
        this.router.navigate(['']);
      });

    }
  }

  onBackClick() {
    this.router.navigate(['']);
  }
}
