import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypeDocumentSteelFormService } from './type-document-steel-form.service';
import { TypeDocumentSteelService } from '../service/type-document-steel.service';
import { ITypeDocumentSteel } from '../type-document-steel.model';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';

import { TypeDocumentSteelUpdateComponent } from './type-document-steel-update.component';

describe('TypeDocumentSteel Management Update Component', () => {
  let comp: TypeDocumentSteelUpdateComponent;
  let fixture: ComponentFixture<TypeDocumentSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeDocumentFormService: TypeDocumentSteelFormService;
  let typeDocumentService: TypeDocumentSteelService;
  let societeService: SocieteSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TypeDocumentSteelUpdateComponent],
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
      .overrideTemplate(TypeDocumentSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeDocumentSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeDocumentFormService = TestBed.inject(TypeDocumentSteelFormService);
    typeDocumentService = TestBed.inject(TypeDocumentSteelService);
    societeService = TestBed.inject(SocieteSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SocieteSteel query and add missing value', () => {
      const typeDocument: ITypeDocumentSteel = { id: 456 };
      const societe: ISocieteSteel = { id: 20922 };
      typeDocument.societe = societe;

      const societeCollection: ISocieteSteel[] = [{ id: 55017 }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocieteSteels = [societe];
      const expectedCollection: ISocieteSteel[] = [...additionalSocieteSteels, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteSteelToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocieteSteels.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const typeDocument: ITypeDocumentSteel = { id: 456 };
      const societe: ISocieteSteel = { id: 88712 };
      typeDocument.societe = societe;

      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.typeDocument).toEqual(typeDocument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocumentSteel>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocumentSteel').mockReturnValue(typeDocument);
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocumentSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(typeDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocumentSteel>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocumentSteel').mockReturnValue({ id: null });
      jest.spyOn(typeDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocumentSteel).toHaveBeenCalled();
      expect(typeDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocumentSteel>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSocieteSteel', () => {
      it('Should forward to societeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(societeService, 'compareSocieteSteel');
        comp.compareSocieteSteel(entity, entity2);
        expect(societeService.compareSocieteSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
