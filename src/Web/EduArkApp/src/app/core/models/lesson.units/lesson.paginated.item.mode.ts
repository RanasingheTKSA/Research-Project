import { PaginatedItemModel } from './../common/paginated.item.model';
import { LessonModel } from './lesson.model';

export class LessonDetailModelPaginatedItemModel extends PaginatedItemModel {
	items: LessonModel[];
}
