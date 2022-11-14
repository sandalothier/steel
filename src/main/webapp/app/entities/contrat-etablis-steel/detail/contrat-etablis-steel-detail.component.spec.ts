import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContratEtablisSteelDetailComponent } from './contrat-etablis-steel-detail.component';

describe('ContratEtablisSteel Management Detail Component', () => {
  let comp: ContratEtablisSteelDetailComponent;
  let fixture: ComponentFixture<ContratEtablisSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratEtablisSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contratEtablis: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContratEtablisSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContratEtablisSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contratEtablis on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contratEtablis).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
