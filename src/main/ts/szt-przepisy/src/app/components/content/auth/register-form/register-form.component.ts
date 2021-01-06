import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  userRegisterForm: FormGroup;
  passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  showHelp = false;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userRegisterForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordStrengthRegex)]],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) {
    const errors: any = {}
    const password = group.get('password').value;
    const passwordConfirmation = group.get('passwordConfirmation').value;

    const isSame = password === passwordConfirmation;

    if (!isSame) {
      errors.notSame = true;
      group.controls.passwordConfirmation.setErrors({ notSame: true })
    } else {
      group.controls.passwordConfirmation.setErrors(null);
    }

    return errors;
  }

  register() {
    if (this.userRegisterForm.valid) {
      this.userAuthService.register(this.userRegisterForm.value).subscribe(response => console.log(response));
    } else {
      this.showHelp = true;
      this.markAllControlsAsTouched();
    }
  }

  markAllControlsAsTouched() {
    for (const field in this.userRegisterForm.controls) {
      this.userRegisterForm.controls[field].markAsDirty();
    }
  }
}
