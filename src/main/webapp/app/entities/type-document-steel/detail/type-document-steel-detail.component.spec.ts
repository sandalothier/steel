import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeDocumentSteelDetailComponent } from './type-document-steel-detail.component';

describe('TypeDocumentSteel Management Detail Component', () => {
  let comp: TypeDocumentSteelDetailComponent;
  let fixture: ComponentFixture<TypeDocumentSteelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDocumentSteelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeDocument: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeDocumentSteelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeDocumentSteelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeDocument on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeDocument).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
