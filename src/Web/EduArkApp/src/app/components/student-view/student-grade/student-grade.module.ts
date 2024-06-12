import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentGradeRoutingModule } from './student-grade-routing.module';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { NodeService } from 'src/app/core/service/student-view.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

@NgModule({
	declarations: [],
	imports: [CommonModule, StudentGradeRoutingModule, ConfirmDialogModule, ButtonModule],
	providers: [NodeService],
})
export class StudentGradeModule {}
