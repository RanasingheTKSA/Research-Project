import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectTargetSettingRoutingModule } from './subject-target-setting-routing.module';
import { SubjectTargetSettingComponent } from './subject-target-setting.component';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
	declarations: [SubjectTargetSettingComponent],
	imports: [CommonModule, SubjectTargetSettingRoutingModule, SharedModule, CardModule, ProgressBarModule],
})
export class SubjectTargetSettingModule {}
