import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  // form states
  loading: boolean = false;
  error: boolean = false;
  success: boolean = false;

  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private ts: TokenService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
      ]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submitHandler() {
    this.loading = true;

    this.userService.login(this.form.value).subscribe(
      res => {
        this.ts.saveToken(res.access_token);
        this.router.navigate(["/dashboard"]);
      },
      err => {
        this.error = true;
        this.errorMsg = err.error.message;
      }
    );

    this.loading = false;
  }

}
