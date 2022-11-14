import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeContratDeTravailSteelDetailComponent } from './type-contrat-de-travail-steel-detail.component';

describe('TypeContratDeTravailSteel Management Detail Component', () => {
  let comp: TypeContratDeTravailSteelDetailComponent;
  let fixture: ComponentFixture<TypeContratDeTravailSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeContratDeTravailSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeContratDeTravail: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeContratDeTravailSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeContratDeTravailSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeContratDeTravail on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeContratDeTravail).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
