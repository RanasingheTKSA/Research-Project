import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGradeComponent } from './student-grade.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'grade',
    pathMatch: 'full',
  },
  {
    path: 'grade',
    component: StudentGradeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGradeRoutingModule { }
