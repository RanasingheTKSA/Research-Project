import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { LessonService } from './../../../../core/service/lesson.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Upload } from 'src/app/core/models/common/upload';
import { SpinnerMessageService } from 'src/app/core/service/spinner-message.service';
import { DropDownModel } from 'src/app/core/models/common/drop.down.model';
import { LessonDetailsFilterModel } from 'src/app/core/models/lesson.units/lesson.details.filter.model';
import { MasterDataService } from 'src/app/core/service/master-data.service';
import { LessonModel } from 'src/app/core/models/lesson.units/lesson.model';

@Component({
	selector: 'app-units',
	templateUrl: './units.component.html',
	styleUrls: ['./units.component.sass'],
	providers: [ConfirmationService],
})
export class UnitsComponent {
	// core data properties
	lessonUnitForm: UntypedFormGroup;
	visibleUserDetailFormDialog: boolean = false;
	headerText: string;
	selectedAcademicLevelId: number = 0;
	selectedSubjectId: number = 0;

	listoflessons: LessonModel[] = [];
	lessonDetailsEdit: UntypedFormGroup;

	public static readonly DEFAULT_LESSON_UNIT_ID: number = 0;

	//master data properties
	subjectRoles: DropDownModel[] = [];

	selectedSubjectRole: number = 0;

	academicLevels: DropDownModel[] = [];
	subjects: DropDownModel[] = [];

	//filter properties
	// lessonName: string = '';
	// gradeRoles: string = '';

	//pagination meta data properties
	currentPage: number = 0;
	pageSize: number = 10;
	totalRecordCount: number = 0;

	//------------------------------------------------------------------------------
	// @ constructor
	//------------------------------------------------------------------------------

	/**
	 * Constructor
	 * @param {Router} _router
	 * @param {NgxSpinnerService} _spinner
	 * @param {LessonService} _lessonService
	 * @param {ConfirmationService} _confirmationService
	 * @param {ToastrService} _toastr
	 */

	constructor(
		private _router: Router,
		private _spinner: NgxSpinnerService,
		private _lessonService: LessonService,
		private _confirmationService: ConfirmationService,
		private _toastr: ToastrService,
		private _masterDataService: MasterDataService
	) {}

	//------------------------------------------------------------------------------
	// @ Lifecycle hooks
	//------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit() {
		this.getBaseAcademicMasterData();
	}

	/**
	 * @param {}
	 * @service addLessonUnitForm
	 * @returns {Promise<void>}
	 */

	async addLessonUnitForm() {
		try {
			this.visibleUserDetailFormDialog = true;
			this.headerText = 'ADD NEW LESSON';
		} catch (error) {}
	}

	/**
	 * @param {}
	 * @service closeLessonUnitForm
	 * @returns {<void>}
	 */

	closeLessonUnitForm() {
		try {
			this.visibleUserDetailFormDialog = false;
			this.lessonUnitForm.reset();
		} catch (error) {}
	}

	/**
	 * @param {}
	 * @service getAllLessons
	 * @returns {Promise<void>}
	 */

	selectedLessonIndex = 0;
	async getAllLessons() {
		try {
			this._spinner.show();

			let response = await this._lessonService.getLessonUnits();
			this.listoflessons = response;
			console.log(this.listoflessons);

			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	/**
	 * @param {}
	 * @service getAllGradesByFilter
	 * @returns {Promise<void>}
	 */
	async getAllGradesByFilter() {
		try {
			this._spinner.show();

			let response = await this._lessonService.getLessonUnits();
			//this.listofGradeOnly = response.items

			this._spinner.hide();
		} catch (error) {}
	}

	/**
	 * @param {number}
	 * @service deleteLesson
	 * @returns {Promise<void>}
	 */
	async deleteLesson(id: number) {
		console.log('inside the lesson delete ');

		try {
			console.log('inside the try ');
			this._confirmationService.confirm({
				message: 'Are you sure that you want to proceed?',
				header: 'Confirmation',
				icon: 'pi pi-exclamation-triangle',
				accept: async () => {
					this._spinner.show();
					let response = await this._lessonService.deleteLessonUnit(id);

					if (response.succeeded) {
						this._toastr.success(response.successMessage, 'COMPLETED');
						await this.getAllLessons();
					} else {
						response.errors.forEach((error) => {
							this._toastr.error(error, 'NOT COMPLETED');
						});
					}
				},
				reject: () => {
					this._spinner.hide();
				},
			});
		} catch (error) {
			console.error('Error deleting lesson:', error);
			this._spinner.hide();
			this._toastr.error('An error occurred while deleting the lesson.', 'ERROR');
		}
	}

	async loadLessons(event: LazyLoadEvent): Promise<void> {
		this.currentPage = event.first / event.rows;
		this.pageSize = event.rows;

		await this.getLessonByFilter();

		try {
		} catch (error) {}
	}

	async getLessonByFilter(): Promise<void> {
		try {
			this._spinner.show();
			let filter = {
				academicLevelId: this.selectedAcademicLevelId,
				subjectId: this.selectedSubjectId,
				currentPage: this.currentPage,
				pageSize: this.pageSize,
			};

			let response = await this._lessonService.getAllLessonByFilter(filter);
			this.listoflessons = response.items;
			this.totalRecordCount = response.totalCount;

			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	/**
	 * @param {}
	 * @service lessonEdit
	 * @returns {Promise<void>}
	 */
	async lessonEdit(lessonDetails: LessonModel) {
		try {
			if (!this.lessonDetailsEdit) {
				this.lessonDetailsEdit = new UntypedFormGroup({});
			}

			this.lessonDetailsEdit.patchValue(lessonDetails);
			this.headerText = 'EDIT LESSON';
			this.visibleUserDetailFormDialog = true;
		} catch (error) {
			console.error('Error editing lesson:', error);
			this._spinner.hide();
			this._toastr.error('An error occurred while editing the lesson.', 'ERROR');
		}
	}

	async getBaseAcademicMasterData(): Promise<void> {
		try {
			this._spinner.show();
			let response = await this._masterDataService.getBaseAcademicMasterData();
			this.academicLevels = response.academicLevels;
		} catch (error) {}
	}

	async getSubjectsByAcademicLevelId(): Promise<void> {
		try {
			this.subjects = [];
			let response = await this._masterDataService.getSubjectsMasterDataByAcademicLevelId(this.selectedAcademicLevelId);
			if (response.length > 0) {
				this.subjects = response;
			} else {
				this._toastr.warning('Not Subject found ', 'warning');
				this.subjects = [];
			}
		} catch (error) {}
	}

	async testNavigation(id: number) {
		console.log("TEST");
		
	}

	async navigationToTheLessonUnit(id: number): Promise<void> {
		if (id > 0) {
			this._router.navigate(['/teacher/lesson/units/lesson-units-add', id]);
		} else {
			this._router.navigate(['/teacher/lesson/units/lesson-units-add', 0]);
		}
	}
}
