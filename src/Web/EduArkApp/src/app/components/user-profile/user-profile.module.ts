import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { StudentBehaviorFormComponent } from './student-behavior-form/student-behavior-form.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { KnobModule } from 'primeng/knob';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

@NgModule({
	declarations: [UserProfileComponent, StudentBehaviorFormComponent, PasswordResetFormComponent],
	imports: [
		CommonModule,
		UserProfileRoutingModule,
		TabViewModule,
		FormsModule,
		ReactiveFormsModule,
		TooltipModule,
		CheckboxModule,
		KnobModule,
		KeyFilterModule,
		RadioButtonModule,
		CardModule,
		NgxChartsModule,
		DialogModule,
		ButtonModule,

		RatingModule,
    	FormsModule,
    	ConfirmPopupModule,
    	ButtonModule,
    	ToastrModule,
		FieldsetModule,
		TableModule,
		DividerModule,
	],

	exports: [StudentBehaviorFormComponent],
})
export class UserProfileModule {}
