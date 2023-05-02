import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreRegisterFormsComponent } from './theatre-register-forms.component';

describe('TheatreRegisterFormsComponent', () => {
  let component: TheatreRegisterFormsComponent;
  let fixture: ComponentFixture<TheatreRegisterFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreRegisterFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreRegisterFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
