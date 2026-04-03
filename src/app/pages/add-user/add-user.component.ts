import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRole, UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  private readonly userStore = inject(UserStoreService);
  private readonly router = inject(Router);

  readonly roleOptions: UserRole[] = ['Admin', 'User'];

  public name: string = '';
  public role: UserRole = 'User';
  public isSubmitAttempted: boolean = false;

  get showNameError() {
    return this.isSubmitAttempted && !this.name.trim();
  }

  addUser() {
    this.isSubmitAttempted = true;

    if (!this.name.trim()) {
      return;
    }

    this.userStore.addUser({ name: this.name, role: this.role });
    this.router.navigateByUrl('/');
  }
}
