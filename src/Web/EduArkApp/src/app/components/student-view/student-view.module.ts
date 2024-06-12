import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentViewRoutingModule } from './student-view-routing.module';
import { StudentGradeComponent } from './student-grade/student-grade.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { TreeModule } from 'primeng/tree';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [ 
    StudentGradeComponent
  ],
  imports: [
    CommonModule,
    StudentViewRoutingModule,
    CardModule,
    AccordionModule,
    DividerModule,
    TreeModule,
    ConfirmDialogModule,
  ]
})
export class StudentViewModule { }
