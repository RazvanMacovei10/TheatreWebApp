import { TestBed } from '@angular/core/testing';

import { RegisterFormsService } from './register-forms.service';

describe('RegisterFormsService', () => {
  let service: RegisterFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
