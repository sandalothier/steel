import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomeSteelDetailComponent } from './diplome-steel-detail.component';

describe('DiplomeSteel Management Detail Component', () => {
  let comp: DiplomeSteelDetailComponent;
  let fixture: ComponentFixture<DiplomeSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomeSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ diplome: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DiplomeSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DiplomeSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load diplome on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.diplome).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
