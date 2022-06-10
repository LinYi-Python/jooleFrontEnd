import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {
  registerForm: FormGroup;
  isLoginPage = false;

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordChecker: ['', [Validators.required]]
    }, {updateOn: 'blur'});
  }

  onSubmit(){
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      // @ts-ignore
      this.authService.createUser(this.username.value, this.password.value);
      // @ts-ignore
      console.log(this.username.value, this.password.value);
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordChecker() {
    return this.registerForm.get('passwordChecker');
  }

}
