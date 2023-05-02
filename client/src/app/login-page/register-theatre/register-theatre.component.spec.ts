import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTheatreComponent } from './register-theatre.component';

describe('RegisterTheatreComponent', () => {
  let component: RegisterTheatreComponent;
  let fixture: ComponentFixture<RegisterTheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTheatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
