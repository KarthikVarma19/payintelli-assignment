import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'Admin' | 'User';

export interface AddUserPayload {
  firstName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface User {
  id: number;
  firstName: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly usersState = signal<User[]>([
    {
      id: 1,
      firstName: 'Alice',
      email: 'alice@example.com',
      password: 'Alice@123',
      role: 'Admin'
    },
    {
      id: 2,
      firstName: 'Bob',
      email: 'bob@example.com',
      password: 'Bob@123',
      role: 'User'
    }
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
      firstName: payload.firstName.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      role: payload.role
    };

    this.usersState.update((currentUsers) => [...currentUsers, newUser]);
  }

  // user email already exists check

  checkUser(email: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    return this.users().some((user) => user.email === normalizedEmail);
  }
}
