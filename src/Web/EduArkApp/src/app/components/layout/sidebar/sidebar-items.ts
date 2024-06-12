import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
	{
		path: '',
		title: 'MENUITEMS.ADMIN.TEXT',
		iconType: 'feather',
		icon: 'monitor',
		class: 'menu-toggle',
		groupTitle: false,
		badge: '',
		badgeClass: '',
		isVisible: false,
		submenu: [
			{
				path: '/admin/user',
				title: 'MENUITEMS.ADMIN.LIST.USER',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/academic-level',
				title: 'MENUITEMS.ADMIN.LIST.ACADEMIC_LEVEL',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/subject',
				title: 'MENUITEMS.ADMIN.LIST.SUBJECT',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/class-name',
				title: 'MENUITEMS.ADMIN.LIST.CLASS-NAME',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/teacher/lesson/units/units',
				title: 'Lesson - Units',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/student/student-lesson/lesson-view/lesson-view',
				title: 'student - lesson',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/student/student-grade/grade',
				title : 'student - grade',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/class',
				title: 'MENUITEMS.ADMIN.LIST.CLASS',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/subject-teacher',
				title: 'MENUITEMS.ADMIN.LIST.SUBJECT-TEACHERS',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
			{
				path: '/admin/subject-target-setting',
				title: 'MENUITEMS.ADMIN.LIST.SUBJECT-TARGET-SETTING',
				iconType: '',
				icon: '',
				class: 'ml-menu',
				groupTitle: false,
				badge: '',
				badgeClass: '',
				submenu: [],
				isVisible: false,
			},
		],
	},
	{
		path: 'teacher',
		title: 'MENUITEMS.TEACHER.TEXT',
		iconType: 'feather',
		icon: 'trello',
		class: '',
		groupTitle: false,
		badge: '',
		badgeClass: '',
		isVisible: false,
		submenu: [],
	},
	{
		path: 'calendar',
		title: 'MENUITEMS.CALENDAR.TEXT',
		iconType: 'feather',
		icon: 'calendar',
		class: '',
		groupTitle: false,
		badge: '',
		badgeClass: 'badge bg-blue sidebar-badge float-end',
		submenu: [],
		isVisible: false,
	},
	{
		path: 'notises',
		title: 'MENUITEMS.NOTISES.TEXT',
		iconType: 'feather',
		icon: 'layout',
		class: '',
		groupTitle: false,
		badge: '',
		badgeClass: 'badge bg-blue sidebar-badge float-end',
		submenu: [],
		isVisible: false,
	},
	{
		path: '/student/student-profile/student-profile',
		title: 'PROFILE',
		iconType: 'feather',
		icon: 'user',
		class: '',
		groupTitle: false,
		badge: '',
		badgeClass: 'badge bg-blue sidebar-badge float-end',
		submenu: [],
		isVisible: false,
	},
];
