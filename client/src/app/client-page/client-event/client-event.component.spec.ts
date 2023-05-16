import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventComponent } from './client-event.component';

describe('ClientEventComponent', () => {
  let component: ClientEventComponent;
  let fixture: ComponentFixture<ClientEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
