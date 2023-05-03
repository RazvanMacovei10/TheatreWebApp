import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreNavbarComponent } from './theatre-navbar.component';

describe('TheatreNavbarComponent', () => {
  let component: TheatreNavbarComponent;
  let fixture: ComponentFixture<TheatreNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
