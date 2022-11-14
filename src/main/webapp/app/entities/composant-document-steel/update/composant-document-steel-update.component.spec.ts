import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ComposantDocumentSteelFormService } from './composant-document-steel-form.service';
import { ComposantDocumentSteelService } from '../service/composant-document-steel.service';
import { IComposantDocumentSteel } from '../composant-document-steel.model';
import { ITypeDocumentSteel } from 'app/entities/type-document-steel/type-document-steel.model';
import { TypeDocumentSteelService } from 'app/entities/type-document-steel/service/type-document-steel.service';

import { ComposantDocumentSteelUpdateComponent } from './composant-document-steel-update.component';

describe('ComposantDocumentSteel Management Update Component', () => {
  let comp: ComposantDocumentSteelUpdateComponent;
  let fixture: ComponentFixture<ComposantDocumentSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let composantDocumentFormService: ComposantDocumentSteelFormService;
  let composantDocumentService: ComposantDocumentSteelService;
  let typeDocumentService: TypeDocumentSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ComposantDocumentSteelUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ComposantDocumentSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComposantDocumentSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    composantDocumentFormService = TestBed.inject(ComposantDocumentSteelFormService);
    composantDocumentService = TestBed.inject(ComposantDocumentSteelService);
    typeDocumentService = TestBed.inject(TypeDocumentSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TypeDocumentSteel query and add missing value', () => {
      const composantDocument: IComposantDocumentSteel = { id: 456 };
      const intTypeDoc: ITypeDocumentSteel = { id: 85866 };
      composantDocument.intTypeDoc = intTypeDoc;

      const typeDocumentCollection: ITypeDocumentSteel[] = [{ id: 72917 }];
      jest.spyOn(typeDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: typeDocumentCollection })));
      const additionalTypeDocumentSteels = [intTypeDoc];
      const expectedCollection: ITypeDocumentSteel[] = [...additionalTypeDocumentSteels, ...typeDocumentCollection];
      jest.spyOn(typeDocumentService, 'addTypeDocumentSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ composantDocument });
      comp.ngOnInit();

      expect(typeDocumentService.query).toHaveBeenCalled();
      expect(typeDocumentService.addTypeDocumentSteelToCollectionIfMissing).toHaveBeenCalledWith(
        typeDocumentCollection,
        ...additionalTypeDocumentSteels.map(expect.objectContaining)
      );
      expect(comp.typeDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const composantDocument: IComposantDocumentSteel = { id: 456 };
      const intTypeDoc: ITypeDocumentSteel = { id: 92215 };
      composantDocument.intTypeDoc = intTypeDoc;

      activatedRoute.data = of({ composantDocument });
      comp.ngOnInit();

      expect(comp.typeDocumentsSharedCollection).toContain(intTypeDoc);
      expect(comp.composantDocument).toEqual(composantDocument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComposantDocumentSteel>>();
      const composantDocument = { id: 123 };
      jest.spyOn(composantDocumentFormService, 'getComposantDocumentSteel').mockReturnValue(composantDocument);
      jest.spyOn(composantDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ composantDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: composantDocument }));
      saveSubject.complete();

      // THEN
      expect(composantDocumentFormService.getComposantDocumentSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(composantDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(composantDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComposantDocumentSteel>>();
      const composantDocument = { id: 123 };
      jest.spyOn(composantDocumentFormService, 'getComposantDocumentSteel').mockReturnValue({ id: null });
      jest.spyOn(composantDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ composantDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: composantDocument }));
      saveSubject.complete();

      // THEN
      expect(composantDocumentFormService.getComposantDocumentSteel).toHaveBeenCalled();
      expect(composantDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComposantDocumentSteel>>();
      const composantDocument = { id: 123 };
      jest.spyOn(composantDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ composantDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(composantDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTypeDocumentSteel', () => {
      it('Should forward to typeDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typeDocumentService, 'compareTypeDocumentSteel');
        comp.compareTypeDocumentSteel(entity, entity2);
        expect(typeDocumentService.compareTypeDocumentSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
