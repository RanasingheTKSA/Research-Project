import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultModel } from '../models/common/result.model';
import { Observable } from 'rxjs';
import { Upload, upload } from '../models/common/upload';
import { LessonDetailModel } from './../models/lesson.units/lesson.detail.model';
import { LessonDetailModelPaginatedItemModel } from './../models/lesson.units/lesson.paginated.item.mode';
import { LessonModel } from '../models/lesson.units/lesson.model';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	baseUrl = environment.eduArkApiUrl;

	/**
	 * Constructor
	 * @param {HttpClient} _httpClient
	 */
	constructor(private _httpClient: HttpClient) {}

	/**
	 * Units Service
	 * @param {number}
	 * @service deleteLessonUnit
	 * @returns {Promise<ResultModel>}
	 */
	async deleteLessonUnit(id: number): Promise<ResultModel> {
		return await this._httpClient.delete<ResultModel>(`${this.baseUrl}Lesson/deleteLesson/${id}`).toPromise();
	}

	/**
	 * Units Service
	 * @param {}
	 * @service getLessonUnits
	 * @returns {Promise<LessonDetailsModel[]>}
	 */
	async getLessonUnits(): Promise<LessonModel[]> {
		return await this._httpClient.get<LessonModel[]>(`${this.baseUrl}Lesson/getLesson`).toPromise();
	}

	async getAllLessonByFilter(filter: any): Promise<LessonDetailModelPaginatedItemModel> {
		return await this._httpClient
			.post<LessonDetailModelPaginatedItemModel>(`${this.baseUrl}Lesson/getAllLessonByFilter`, filter)
			.toPromise();
	}

	/**
	 * Units Service
	 * @param {}
	 * @service getByIdLessonUnits
	 * @returns {Promise<LessonDetailsModel>}
	 */
	async getByIdLessonUnits(id: number): Promise<LessonModel> {
		return await this._httpClient.get<LessonModel>(`${this.baseUrl}Lesson/getBYIdLesson/${id}`).toPromise();
	}

	/**
	 * Units Service
	 * @param {number} id - The ID of the lesson unit to be updated.
	 * @param {LessonDetailsModel} updatedLesson - The updated lesson data.
	 * @service updateLessonUnit
	 * @returns {Promise<ResultModel>}
	 */
	async updateLessonUnit(id: number, updatedLesson: LessonModel): Promise<ResultModel> {
		return await this._httpClient
			.put<ResultModel>(`${this.baseUrl}Lesson/updateLesson/${id}`, updatedLesson)
			.toPromise();
	}

	/**
	 * Units Service
	 * @param {LessonDetailsModel} newLesson - The new lesson data to be saved.
	 * @service saveLessonUnit
	 * @returns {Promise<ResultModel>}
	 */
	async saveLessonUnit(newLesson: LessonDetailModel): Promise<ResultModel> {
		return await this._httpClient.post<ResultModel>(`${this.baseUrl}Lesson/saveLesson`, newLesson).toPromise();
	}

	/**
	 * Lesson Service
	 * @param {FormData}
	 * @service uploadLessonFile
	 * @returns {Observable<Upload>}
	 */
	uploadLessonFile(formData: FormData): Observable<Upload> {
		return this._httpClient
			.post<ResultModel>(`${this.baseUrl}Lesson/uploadLessonFile`, formData, {
				reportProgress: true,
				observe: 'events',
			})
			.pipe(upload());
	}

	/**
	 * @param {}
	 * @service getLessonFromGradeSubject
	 * @returns {Promise<LessonDetailsModel[]>}
	 */
		async getLessonFromGradeSubject(filter:any): Promise<LessonModel[]> {
			return await this._httpClient
				.post<LessonModel[]>(`${this.baseUrl}Lesson/getLessonFromGradeSubject`, filter).toPromise();
		}
}
