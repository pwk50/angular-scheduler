import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentContainerComponent } from './list-appointment-container.component';

describe('ListAppointmentContainerComponent', () => {
  let component: ListAppointmentContainerComponent;
  let fixture: ComponentFixture<ListAppointmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
