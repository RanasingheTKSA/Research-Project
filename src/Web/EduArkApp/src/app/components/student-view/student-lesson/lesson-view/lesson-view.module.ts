import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonViewRoutingModule } from './lesson-view-routing.module';
import { CardModule } from 'primeng/card';
import { LessonViewComponent } from './lesson-view.component';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';

import { NodeService } from './../../../../core/service/student-view.service';
import { TreeModule } from 'primeng/tree';
import { LessonResourcesComponent } from './lesson-resources/lesson-resources.component';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms'; // for ngModel
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [ LessonViewComponent, LessonResourcesComponent ],
  imports: [
    CommonModule,
    LessonViewRoutingModule,

    CardModule,
    PanelModule,
    AccordionModule,
    TreeModule,
    TableModule,
    DividerModule,
    RatingModule,
    FormsModule,
    ConfirmPopupModule,
    ButtonModule,
    ToastrModule,
  ],
  providers: [ NodeService ]
})
export class LessonViewModule { }
