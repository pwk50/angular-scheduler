import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  // form states
  loading: boolean = false;
  error: boolean = false;
  success: boolean = false;

  errorMsg: string;
  successMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private ts: TokenService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.maxLength(30)
      ]],
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submitHandler() {
    this.loading = true;

    this.userService.register(this.form.value).subscribe(
      res => {
        this.success = true;
        this.successMsg = res.message;
      },
      err => {
        this.error = true;
        this.errorMsg = err.error.message;
      },
      () => this.loading = false
    );

  }

}
