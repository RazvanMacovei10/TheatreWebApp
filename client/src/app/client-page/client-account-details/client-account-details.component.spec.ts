import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountDetailsComponent } from './client-account-details.component';

describe('ClientAccountDetailsComponent', () => {
  let component: ClientAccountDetailsComponent;
  let fixture: ComponentFixture<ClientAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccountDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
