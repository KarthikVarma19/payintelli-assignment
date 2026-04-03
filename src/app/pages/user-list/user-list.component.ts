import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private readonly userStore = inject(UserStoreService);

  readonly users = this.userStore.users;
  readonly userCount = this.userStore.count;
}
