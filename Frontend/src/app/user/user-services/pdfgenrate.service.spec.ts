import { TestBed } from '@angular/core/testing';

import { PdfgenrateService } from './pdfgenrate.service';

describe('PdfgenrateService', () => {
  let service: PdfgenrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfgenrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
