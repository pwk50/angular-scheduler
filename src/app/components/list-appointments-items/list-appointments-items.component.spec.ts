import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsItemsComponent } from './list-appointments-items.component';

describe('ListAppointmentsItemsComponent', () => {
  let component: ListAppointmentsItemsComponent;
  let fixture: ComponentFixture<ListAppointmentsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
