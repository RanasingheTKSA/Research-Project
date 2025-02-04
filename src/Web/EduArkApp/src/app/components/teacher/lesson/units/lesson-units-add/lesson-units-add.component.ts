import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EMPTY, Observable } from 'rxjs';
import { Upload } from 'src/app/core/models/common/upload';

import { LessonService } from 'src/app/core/service/lesson.service';
import { SpinnerMessageService } from 'src/app/core/service/spinner-message.service';
import { LessonFileType } from 'src/app/core/enums/lesson.file.type';
import { DropDownModel } from 'src/app/core/models/common/drop.down.model';
import { MasterDataService } from 'src/app/core/service/master-data.service';
@Component({
	selector: 'app-lesson-units-add',
	templateUrl: './lesson-units-add.component.html',
	styleUrls: ['./lesson-units-add.component.sass'],
	providers: [ConfirmationService, DialogService],
})
export class LessonUnitsAddComponent {
	//core data properties
	lessonUnitsAddForm: UntypedFormGroup;
	lessonId: number = 0;

	lessonFileType: LessonFileType;

	academicLevels: DropDownModel[] = [];
	subjects: DropDownModel[] = [];
	/**
	 * Constructor
	 * @param {UntypedFormBuilder} _untypedFormBuilder
	 * @param {NgxSpinnerService} _spinner
	 * @param {ToastrService} _toastr
	 * @param {Router} _router
	 */

	constructor(
		private _untypedFormBuilder: UntypedFormBuilder,
		private _spinner: NgxSpinnerService,
		private _lessonService: LessonService,
		private _toastr: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _spinnerMessageService: SpinnerMessageService,
		private _masterDataService: MasterDataService
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */

	async ngOnInit() {
		await this.createLessonAddDetailForm();

		this._route.params.subscribe(async (params) => {
			this.lessonId = parseInt(params['id']);
			if (this.lessonId > 0) {
				await this.getByIdLesson();
			}
		});
	}

	async createLessonAddDetailForm(): Promise<void> {
		try {
			this.lessonUnitsAddForm = this._untypedFormBuilder.group({
				name: ['', Validators.required],
				description: ['', Validators.required],
				academicLevelId: ['', Validators.required],
				subjectId: ['', Validators.required],
			});

			await this.getBaseAcademicMasterData();
		} catch (error) {}
	}

	async getByIdLesson(): Promise<void> {
		try {
			this._spinner.show();
			let response = await this._lessonService.getByIdLessonUnits(this.lessonId);
			this.lessonUnitsAddForm.patchValue(response);
			console.log(this.lessonUnitsAddForm);
			
			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	async getBaseAcademicMasterData(): Promise<void> {
		try {
			this._spinner.show();
			let response = await this._masterDataService.getBaseAcademicMasterData();
			this.academicLevels = response.academicLevels;
			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

	async getSubjectsByAcademicLevelId(): Promise<void> {
		try {
			let response = await this._masterDataService.getSubjectsMasterDataByAcademicLevelId(this.academicLevelId);
			if (response.length > 0) {
				this.subjects = response;
			} else {
				this._toastr.warning('Not Subject found ', 'warning');
				this.subjects = [];
			}
		} catch (error) {}
	}

	/*async saveLessonUnit() {
		try {
			this._spinner.show();
			let response = await this._lessonService.saveLessonUnit(this.lessonUnitsAddForm.value);

			if (response.succeeded) {
				this._toastr.success(response.successMessage, 'SUCCESS');
				this._router.navigate(['/teacher/lesson/units']);
			} else {
				response.errors.forEach((error) => {
					this._toastr.error(error, 'ERROR');
				});
			}

			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}*/

	// This is a one of the correct save form (add)

	async saveLessonUnit() {
		try {
			this._spinner.show();
			var lessModel = this.lessonUnitsAddForm.getRawValue();
			lessModel.id = this.lessonId == 0 ? 0 : this.lessonId;
			let response = await this._lessonService.saveLessonUnit(lessModel);

			console.log(lessModel);

			if (response.succeeded) {
				this._spinner.hide();
				this._toastr.success(response.successMessage, 'done');
				this._router.navigate(['/teacher/lesson/units']);
			} else {
				this._spinner.hide();
				response.errors.forEach((error: any) => {
					this._toastr.error(error, 'error');
				});
			}
		} catch (error) {
			this._spinner.hide();
		}
	}

	get Id(): number {
		return this.lessonUnitsAddForm.value.id;
	}

	/**
	 * Method of get lesson file upload (video,audio, and text)
	 *
	 * @param {any} event
	 * @returns {Observable<Upload>}
	 */

	upload$: Observable<Upload> = EMPTY;
	precetage: any;

	onFileChange(event: any, fileType: LessonFileType) {
		let file = event.srcElement;
		const formData = new FormData();

		formData.set('id', this.lessonId.toString());
		formData.set('type', fileType.toString());

		if (file.files.length > 0) {
			this._spinner.show();

			for (let index = 0; index < file.files.length; index++) {
				formData.append('file', file.files[index], file.files[index].name);
			}
			console.log('====================================');
			console.log(formData);
			console.log('====================================');

			this._lessonService.uploadLessonFile(formData).subscribe(
				(response) => {
					this.precetage = response;

					if (response.state === 'DONE') {
						this.getByIdLesson();
					}
				},
				(error) => {
					console.log(error);
					this._spinner.hide();
					this._spinnerMessageService.sendData('');
					this._toastr.error('NETWORK ERROR HAS BEEN OCCURED!, PLEASE TRY AGAIN');
				}
			);
		}
	}

	//getters
	get academicLevelId(): number {
		return this.lessonUnitsAddForm.get('academicLevelId').value;
	}
}
