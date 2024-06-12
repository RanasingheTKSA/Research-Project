import { CorePaginationFilterModel } from './../common/core.pagination.filter.model';

export class LessonDetailsFilterModel extends CorePaginationFilterModel {
	id : number;
    lessonName : string;
    subjectRoles?: string;
}
