import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultModel } from '../models/common/result.model';
import { RatingModel } from '../models/lesson.units/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseUrl = environment.eduArkApiUrl;

  /**
	 * Constructor
	 * @param {HttpClient} _httpClient
	 */
  constructor(private _httpClient : HttpClient) { }

  /** 
   * rating service
   * @param 
   * @service getRating
   * @returns {Promise<RatingModel[]>}
   */
  async getRating(): Promise<RatingModel[]> {
    return await this._httpClient.get<RatingModel[]>(`${this.baseUrl}Rating/getRating`).toPromise();
  }


  /**
   * rating service
   * @param {RatingModel} ratingModel
   * @service saveRating
   * @returns {Promise<ResultModel>}
   */
  async saveRating(ratingModel: RatingModel) : Promise<ResultModel> {
    return await this._httpClient.post<ResultModel>(`${this.baseUrl}Rating/saveRating`, ratingModel).toPromise();
  }
}
