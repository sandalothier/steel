import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SocieteSteelDetailComponent } from './societe-steel-detail.component';

describe('SocieteSteel Management Detail Component', () => {
  let comp: SocieteSteelDetailComponent;
  let fixture: ComponentFixture<SocieteSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocieteSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ societe: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SocieteSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SocieteSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load societe on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.societe).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
