import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectFilterModel } from 'src/app/core/models/subject/subject.filter.model';
import { MasterDataService } from 'src/app/core/service/master-data.service';
import { SubjectService } from 'src/app/core/service/subject.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.sass']
})

export class StudentProfileComponent {
  subjects: any =[];
  subjectCategories:any=[]
  currentUserDetails:any;
  loading:boolean=true;

  constructor(
    private _spinner: NgxSpinnerService,
    private _subjectService: SubjectService,
    private _masterDataService: MasterDataService,
    private _userService: UserService,
  ) {}

  ngOnInit() {
		this.getSubjectsByFilter();
    this.getSubjectMasterData();
    this.getUserByCurrentUserId();
	}

  async getSubjectsByFilter(): Promise<void> {
		try {
			this._spinner.show();
			let subjectFilter = new SubjectFilterModel();

			subjectFilter.name = "";
			subjectFilter.subjectStreamId = 0;
			subjectFilter.currentPage = 0;
			subjectFilter.pageSize = 10;

			let response = await this._subjectService.getSubjectsByFilter(subjectFilter);

			this.subjects = response.items;

			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}
  

  async getSubjectMasterData(): Promise<void> {
		try {
			this._spinner.show();
			let response = await this._masterDataService.getSubjectMasterData();
			this.subjectCategories = response.subjectCategories;
      
			this._spinner.hide();
		} catch (error) {
			this._spinner.hide();
		}
	}

  getSubjectCategories(id){
    return this.subjectCategories.filter(obj=>obj.id==id)[0].name
  }

  async getUserByCurrentUserId() {
		try {
			this._spinner.show();
			this.currentUserDetails = await this._userService.getUserByCurrentUserId();
			this._spinner.hide();
      this.loading=false;
		} catch (error) {
			this._spinner.hide();
		}
	}

}
