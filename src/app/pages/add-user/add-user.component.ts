import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRole, UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  private readonly userStore = inject(UserStoreService);
  private readonly router = inject(Router);

  private readonly passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  readonly roleOptions: UserRole[] = ['Admin', 'User'];

  readonly addUserForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.passwordStrengthRegex)]
    }),
    role: new FormControl<UserRole>('User', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  public isSubmitAttempted: boolean = false;

  get firstNameControl() {
    return this.addUserForm.controls.firstName;
  }

  get emailControl() {
    return this.addUserForm.controls.email;
  }

  get passwordControl() {
    return this.addUserForm.controls.password;
  }

  get showFirstNameError() {
    return this.isSubmitAttempted && this.firstNameControl.invalid;
  }

  get showEmailError() {
    return this.isSubmitAttempted && this.emailControl.invalid;
  }

  get showPasswordError() {
    return this.isSubmitAttempted && this.passwordControl.invalid;
  }

  get firstNameErrorMessage() {
    if (this.firstNameControl.hasError('required')) {
      return 'First name is required.';
    }

    return 'First name must be at least 2 characters long.';
  }

  get emailErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Email is required.';
    }

    if (this.emailControl.hasError('duplicate')) {
      return 'Email already exists.';
    }

    return 'Please enter a valid email address.';
  }

  get passwordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Password is required.';
    }

    return 'Password must be at least 8 characters and include upper, lower, number, and special character.';
  }

  addUser() {
    this.isSubmitAttempted = true;

    const currentEmailErrors = this.emailControl.errors;
    if (currentEmailErrors?.['duplicate']) {
      const { duplicate, ...otherErrors } = currentEmailErrors;
      this.emailControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }

    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    const formValue = this.addUserForm.getRawValue();

    if (this.userStore.checkUser(formValue.email)) {
      this.emailControl.setErrors({ duplicate: true });
      this.emailControl.markAsTouched();
      return;
    }


    this.userStore.addUser({
      firstName: formValue.firstName,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role
    });

    this.router.navigateByUrl('/');
  }
}
