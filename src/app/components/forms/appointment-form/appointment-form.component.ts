import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { Room } from 'src/app/models/Room';
import { AppointmentService } from 'src/app/services/appointment.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { person } from '../../../shared/icons';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  form: FormGroup;
  @Input() appointment;

  room_list: Observable<Room[]>;

  responseID: number;

  // Form states
  updateFlag: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  serverError: boolean = false;

  // Icons
  icon_person = person;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private roomService: RoomService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let pid = this.activatedRoute.snapshot.params['id'];
    if (pid) {
      // User passed in existing appointment to update
      this.updateFlag = true;

      this.appointmentService.get(pid).subscribe(
        res => this.appointment = res,
        err => console.log(err),
        () => this.setupForm()
      );

    } else {
      // User creating new appointment
      this.setupForm();

    }

    this.room_list = this.roomService.getAll();

  }

  submitHandler() {
    this.loading = true;

    let obs: Observable<Appointment>;
    if (this.updateFlag) {
      // Updating existing appointment
      obs = this.appointmentService
        .update(this.form.value, this.appointment.id);

    } else {
      // Creating new appointment
      obs = this.appointmentService
        .add(this.form.value);

    }

    // Getting the response back from server
    obs.subscribe(
      res => {
        this.responseID = res.id;
        this.success = true;
      },
      error => {
        console.log("oops", error);
        this.serverError = true;
      },
      () => this.loading = false
    );

  }

  get agenda() {
    return this.form.get('agenda');
  }

  get description() {
    return this.form.get('description');
  }

  get date() {
    return this.form.get('date');
  }

  get time() {
    return this.form.get('time');
  }

  get room() {
    return this.form.get('roomId');
  }

  get participantsForm() {
    return this.form.get('participants') as FormArray;
  }

  addParticipant() {
    const person = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]]
    });

    this.participantsForm.push(person);
  }

  removeParticipant(i) {
    this.participantsForm.removeAt(i);
  }

  setupForm(): void {
    // Date range
    let range = this.fb.group({
      start: [this.appointment && new Date(this.appointment.date.start) || "", [
        Validators.required
      ]],
      end: [this.appointment && new Date(this.appointment.date.end) || "", [
        Validators.required
      ]]
    });

    // Convert participants objects into FormGroup to store in form
    let participants = this.appointment && this.appointment.participants || [];
    let list = participants && participants.map(p => this.fb.group({
      name: [p.name, [
        Validators.required,
        Validators.maxLength(30)
      ]]
    }));

    // Enter form data
    this.form = this.fb.group({
      agenda: [this.appointment && this.appointment.agenda || "", [
        Validators.required,
        Validators.maxLength(50),
      ]],
      description: [this.appointment && this.appointment.description || "", [
        Validators.maxLength(300),
      ]],
      date: range,
      time: [this.appointment && this.appointment.time || "", [
        Validators.required,
        Validators.maxLength(50),
      ]],
      roomId: [this.appointment && this.appointment.room.id || "", [
        Validators.required,
      ]],
      userId: this.appointment && this.appointment.user.id || this.tokenService.getDecodedToken().id,
      participants: this.fb.array(list)
    });
  }
}
