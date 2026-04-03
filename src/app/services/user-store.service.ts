import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'Admin' | 'User';

export interface AddUserPayload {
  name: string;
  role: UserRole;
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly usersState = signal<User[]>([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' }
  ]);

  readonly users = computed(() => this.usersState());
  readonly count = computed(() => this.users().length);

  userById(id: number) {
    return computed(() => this.users().find((user) => user.id === id) ?? null);
  }

  addUser(payload: AddUserPayload) {
    const nextId = this.users().length ? Math.max(...this.users().map((user) => user.id)) + 1: 1;

    const newUser: User = {
      id: nextId,
      name: payload.name.trim(),
      role: payload.role
    };

    this.usersState.update((currentUsers) => [...currentUsers, newUser]);
  }
}
