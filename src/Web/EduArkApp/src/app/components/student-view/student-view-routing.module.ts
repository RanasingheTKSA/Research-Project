import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student-lesson',
    pathMatch: 'full',
  },
  {
    path: 'student-lesson',
    loadChildren: () => import('./student-lesson/student-lesson.module').then((m) =>m.StudentLessonModule),
  },
  {
    path: 'student-grade',
    loadChildren: () => import('./student-grade/student-grade.module').then((m) => m.StudentGradeModule),
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./student-profile/student-profile.module').then((m) => m.StudentProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentViewRoutingModule { }
