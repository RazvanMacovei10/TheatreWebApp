import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreAccountPageComponent } from './theatre-account-page.component';

describe('TheatreAccountPageComponent', () => {
  let component: TheatreAccountPageComponent;
  let fixture: ComponentFixture<TheatreAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
