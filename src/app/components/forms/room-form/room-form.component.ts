import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  form: FormGroup;

  // form states
  loading: boolean = false;
  error: boolean = false;
  success: boolean = false;

  errorMsg: string;
  successMsg: string;

  constructor(
    private fb: FormBuilder,
    private rs: RoomService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.maxLength(24)
      ]]
    });
  }

  get name() {
    return this.form.get('name');
  }

  submitHandler() {
    this.loading = true;

    this.rs.add(this.form.value).subscribe(
      res => {
        this.success = true;
      },
      err => {
        this.error = true;
        this.errorMsg = "Something went wrong. Try again later.";
      },
      () => this.loading = false
    );

  }
}
