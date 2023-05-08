import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTheatresComponent } from './client-theatres.component';

describe('ClientTheatresComponent', () => {
  let component: ClientTheatresComponent;
  let fixture: ComponentFixture<ClientTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTheatresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
