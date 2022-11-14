import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdresseSteelDetailComponent } from './adresse-steel-detail.component';

describe('AdresseSteel Management Detail Component', () => {
  let comp: AdresseSteelDetailComponent;
  let fixture: ComponentFixture<AdresseSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ adresse: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AdresseSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AdresseSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load adresse on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.adresse).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
