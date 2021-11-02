import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerProfileComponent } from './component/car-owner-profile/car-owner-profile.component';
import { CarOwnersComponent } from './component/car-owners/car-owners.component';

const routes: Routes = [
  { path: '', component: CarOwnersComponent },
  { path: 'profile/:id/:mode', component: CarOwnerProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
