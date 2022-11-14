import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PosteSteelDetailComponent } from './poste-steel-detail.component';

describe('PosteSteel Management Detail Component', () => {
  let comp: PosteSteelDetailComponent;
  let fixture: ComponentFixture<PosteSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosteSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ poste: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PosteSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PosteSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load poste on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.poste).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
