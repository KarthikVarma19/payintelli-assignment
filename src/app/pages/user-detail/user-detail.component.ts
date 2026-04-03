import { Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStoreService);

  private readonly userId = Number(this.route.snapshot.paramMap.get('id'));

  readonly user = this.userStore.userById(this.userId);
  readonly hasValidId = computed(() => Number.isInteger(this.userId) && this.userId > 0);
}
