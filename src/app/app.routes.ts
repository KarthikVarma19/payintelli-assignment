import { Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
	{
		path: '',
		component: UserListComponent
	},
	{
		path: 'user/:id',
		component: UserDetailComponent
	},
	{
		path: 'add',
		component: AddUserComponent
    },
    // redirecting to the user list page, when route is not found
	{
		path: '**',
		redirectTo: ''
	}
];
