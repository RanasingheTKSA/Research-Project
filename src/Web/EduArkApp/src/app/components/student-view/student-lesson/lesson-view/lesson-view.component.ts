import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { LessonModel } from 'src/app/core/models/lesson.units/lesson.model';

import { LessonService } from 'src/app/core/service/lesson.service';
import { NodeService } from 'src/app/core/service/student-view.service';
import { RatingService } from 'src/app/core/service/rating.service';
import { UntypedFormGroup } from '@angular/forms';
import { RatingModel } from 'src/app/core/models/lesson.units/rating.model';

@Component({
	selector: 'app-lesson-view',
	templateUrl: './lesson-view.component.html',
	styleUrls: ['./lesson-view.component.scss'],
	providers: [ConfirmationService],
})
export class LessonViewComponent {
	listoflessons: LessonModel[] = [];
	files!: TreeNode[];
	academicLevelId : number = 0;
	subjectId : number = 0;

	constructor(
		private _router: Router,
		private _spinner: NgxSpinnerService,
		private _lessonService: LessonService,
		private _confirmationService: ConfirmationService,
		private _toastr: ToastrService,
		private nodeService: NodeService,
		private _route: ActivatedRoute,
		private _ratingService: RatingService,
	) {}

	//------------------------------------------------------------------------------
	// @ Lifecycle hooks
	//------------------------------------------------------------------------------

	ngOnInit() {
		this._route.params.subscribe((params: ParamMap) => {
			this.academicLevelId = params['academicLevelId'];
			this.subjectId = params['subjectId'];
			this.viewLessonByGrade();
			console.log(this.academicLevelId);
			console.log(this.subjectId);
			
			
		});
		//this.getAllLessons();
		this.getGrade();
		
	}

	// async saveRating(type: number){
	// 	console.log(this.value);
		
	// 	try {
	// 		var ratingModel = new RatingModel();
	// 		ratingModel.id = 0;
	// 		ratingModel.ratingType = type;
	// 		ratingModel.value = this.value;
	// 		console.log(ratingModel);

	// 		this._spinner.hide();
			
	// 		ratingModel.id = this.ratingId == 0 ? 0 : this.ratingId;
	// 		let response = await this._ratingService.saveRating(ratingModel);
	// 		console.log(ratingModel);

	// 		if (response.succeeded){
	// 			this._spinner.hide();
	// 			this._toastr.success(response.successMessage,'DONE');
	// 			this.disableRating = true;
	// 			console.log("disabled");				
	// 		}
			
	// 	} catch (error) {
	// 		this._spinner.hide();
	// 	}
	// }

	async getGrade() {
		this.nodeService.getFiles().then((data) => (this.files = data));
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

	async navigateToResource(id: number): Promise<void> {
		if (id > 0) {
			this._router.navigate(['/student/student-lesson/lesson-view/lesson-resources', id]);
		} else {
			this._router.navigate(['/student/student-lesson/lesson-view/lesson-resources', 0]);
		}
	}

	async viewLessonByGrade() : Promise<void> {
		try {

			this._spinner.show();
			let filter = {
				academicLevelId : this.academicLevelId,
				subjectId : this.subjectId
			}

			let  response = await this._lessonService.getLessonFromGradeSubject(filter);
			this.listoflessons = response;
			console.log(this.listoflessons);
			
        	this._spinner.hide();
			
		} catch (error) {
			this._spinner.hide();
			this._toastr.error('An error occurred while fetching lessons.');
		}
	}
}
