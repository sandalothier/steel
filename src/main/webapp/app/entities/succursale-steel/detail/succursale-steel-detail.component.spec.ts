import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SuccursaleSteelDetailComponent } from './succursale-steel-detail.component';

describe('SuccursaleSteel Management Detail Component', () => {
  let comp: SuccursaleSteelDetailComponent;
  let fixture: ComponentFixture<SuccursaleSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccursaleSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ succursale: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SuccursaleSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SuccursaleSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load succursale on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.succursale).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
