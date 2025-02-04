import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from '../student-profile/student-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'student-profile',
    pathMatch: 'full',
  },
  {
    path: 'student-profile',
    component: StudentProfileComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProfileRoutingModule { }
