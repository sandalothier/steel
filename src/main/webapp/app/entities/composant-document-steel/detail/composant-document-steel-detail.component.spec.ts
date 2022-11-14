import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComposantDocumentSteelDetailComponent } from './composant-document-steel-detail.component';

describe('ComposantDocumentSteel Management Detail Component', () => {
  let comp: ComposantDocumentSteelDetailComponent;
  let fixture: ComponentFixture<ComposantDocumentSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComposantDocumentSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ composantDocument: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ComposantDocumentSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ComposantDocumentSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load composantDocument on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.composantDocument).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
