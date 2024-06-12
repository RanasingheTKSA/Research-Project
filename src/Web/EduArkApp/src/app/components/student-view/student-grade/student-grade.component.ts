import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent, TreeNode } from 'primeng/api';
import { AcademicLevelDetailsModel } from 'src/app/core/models/academic-level/academic.level.details.model';
import { AcademicLevelFilterModel } from 'src/app/core/models/academic-level/academic.level.filter.model';
import { AcademicLevelModel } from 'src/app/core/models/academic-level/academic.level.model';
import { BaseAcademicMasterDataModel } from 'src/app/core/models/common/base.academic.master.data.model';
import { DropDownModel } from 'src/app/core/models/common/drop.down.model';
import { LessonModel } from 'src/app/core/models/lesson.units/lesson.model';

import { SubjectDetailsModel } from 'src/app/core/models/subject/subject.detail.model';
import { SubjectFilterModel } from 'src/app/core/models/subject/subject.filter.model';
import { SubjectMasterDataModel } from 'src/app/core/models/subject/subject.master.data.model';
import { UserDetailsMasterDataFilterModel } from 'src/app/core/models/user/user.details.master.data.model';
import { AcademicLevelService } from 'src/app/core/service/academic-level.service';
import { LessonService } from 'src/app/core/service/lesson.service';
import { MasterDataService } from 'src/app/core/service/master-data.service';
import { NodeService } from 'src/app/core/service/student-view.service';
import { SubjectService } from 'src/app/core/service/subject.service';

@Component({
	selector: 'app-student-grade',
	templateUrl: './student-grade.component.html',
	styleUrls: ['./student-grade.component.scss'],
	providers: [ConfirmationService],
})
export class StudentGradeComponent {
	value!: number;

	currentPage: number = 0;
	pageSize: number = 10;
	totalRecordCount: number = 0;
	name: string = '';
	levelHeadId: number = 0;

	listoflessons: LessonModel[] = [];
	levelHeads: DropDownModel[] = [];
	listOfAcademicLevels: AcademicLevelDetailsModel[] = [];

	//master data properties
	subjectMasterData: SubjectMasterDataModel;
	subjectTypes: DropDownModel[] = [];
	parentBasketSubjects: DropDownModel[] = [];
	subjectCategories: DropDownModel[] = [];
	subjectStreams: DropDownModel[] = [];
	academicLevels: DropDownModel[] = [];

	selectedSubjectStreamId: number = 0;
	listOfSubjects: DropDownModel[] = [];

	// files!: TreeNode[];

	constructor(
		private _router: Router,
		private _spinner: NgxSpinnerService,
		private _lessonService: LessonService,
		private _masterDataService: MasterDataService,
		private _confirmationService: ConfirmationService,
		private _academicLevelService: AcademicLevelService,
		private _toastr: ToastrService,
		private nodeService: NodeService,
		private _subjectService: SubjectService
	) {}

	//------------------------------------------------------------------------------
	// @ Lifecycle hooks
	//------------------------------------------------------------------------------

	async ngOnInit() {
		this.getAllGradeFromAcademicLevel();
		await this.getSubjectMasterData();
	}

	selectedLessonIndex = 0;
	async getAllGradeFromAcademicLevel() {
		try {
			this._spinner.show();
			let academicLevel = new AcademicLevelFilterModel();

			academicLevel.name = this.name ? this.name : '';
			academicLevel.levelHeadId = this.levelHeadId ? this.levelHeadId : 0;
			academicLevel.currentPage = this.currentPage;
			academicLevel.pageSize = this.pageSize;

			let response = await this._academicLevelService.getAllAcademicLevels(academicLevel);
			this.listOfAcademicLevels = response.items;
			this.totalRecordCount = response.totalCount;

			await this.getLevelHeadsByFilter({ event: '' });

			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	/**
	 * @param {any}
	 * @Method getLevelHeadsByFilter
	 * @returns {Promise<void>}
	 */

	async getLevelHeadsByFilter(event: any) {
		let filter = new UserDetailsMasterDataFilterModel();

		filter.name = event.filter === null ? '' : event.filter;
		filter.roleId = 3;
		let response = await this._masterDataService.getUserDetailMasterDataByFilter(filter);

		this.levelHeads = response;

		let defaultItem: DropDownModel = {
			id: 0,
			name: '--All--',
		};

		this.levelHeads.unshift(defaultItem);
	}

	async getSubjectMasterData(): Promise<void> {
		try {
			this._spinner.show();
			let response = await this._masterDataService.getSubjectMasterData();

			this.subjectMasterData = response;
			this.subjectTypes = response.subjectTypes;
			this.parentBasketSubjects = response.parentBasketSubjects;
			this.subjectCategories = response.subjectCategories;
			this.subjectStreams = response.subjectStreams;
			this.academicLevels = response.academicLevels;

			console.log(response);
			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	async test(grade: any) {
		console.log(grade);
	}

	async getSubjectsMasterDataByAcademicLevelId(academicLevelId: number): Promise<void> {
		try {
			let response = await this._masterDataService.getSubjectsMasterDataByAcademicLevelId(academicLevelId);
			console.log(response);

			if (response.length > 0) {
				this.listOfSubjects = response;
			} else {
				this.listOfSubjects = [];
			}
		} catch (error) {}
	}

	async viewLessons(academicLevelId: number, subjectId: number) : Promise<void> {
		//list of lessons
		//angular router
		
		this._router.navigate(['student/student-lesson/lesson-view/lesson-view', academicLevelId, subjectId]);
	}
}
