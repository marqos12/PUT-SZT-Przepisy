import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.userLoginForm.valid) {
      this.userAuthService.login(this.userLoginForm.value);
    } else {
      this.markAllControlsAsTouched();
    }
  }

  markAllControlsAsTouched() {
    for (const field in this.userLoginForm.controls) {
      this.userLoginForm.controls[field].markAsDirty();
    }
  }
}
