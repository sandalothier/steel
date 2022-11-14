import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SuccursaleSteelFormService } from './succursale-steel-form.service';
import { SuccursaleSteelService } from '../service/succursale-steel.service';
import { ISuccursaleSteel } from '../succursale-steel.model';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';

import { SuccursaleSteelUpdateComponent } from './succursale-steel-update.component';

describe('SuccursaleSteel Management Update Component', () => {
  let comp: SuccursaleSteelUpdateComponent;
  let fixture: ComponentFixture<SuccursaleSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let succursaleFormService: SuccursaleSteelFormService;
  let succursaleService: SuccursaleSteelService;
  let societeService: SocieteSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SuccursaleSteelUpdateComponent],
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
      .overrideTemplate(SuccursaleSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SuccursaleSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    succursaleFormService = TestBed.inject(SuccursaleSteelFormService);
    succursaleService = TestBed.inject(SuccursaleSteelService);
    societeService = TestBed.inject(SocieteSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SocieteSteel query and add missing value', () => {
      const succursale: ISuccursaleSteel = { id: 456 };
      const societe: ISocieteSteel = { id: 57574 };
      succursale.societe = societe;

      const societeCollection: ISocieteSteel[] = [{ id: 48057 }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocieteSteels = [societe];
      const expectedCollection: ISocieteSteel[] = [...additionalSocieteSteels, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ succursale });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteSteelToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocieteSteels.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const succursale: ISuccursaleSteel = { id: 456 };
      const societe: ISocieteSteel = { id: 79879 };
      succursale.societe = societe;

      activatedRoute.data = of({ succursale });
      comp.ngOnInit();

      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.succursale).toEqual(succursale);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuccursaleSteel>>();
      const succursale = { id: 123 };
      jest.spyOn(succursaleFormService, 'getSuccursaleSteel').mockReturnValue(succursale);
      jest.spyOn(succursaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ succursale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: succursale }));
      saveSubject.complete();

      // THEN
      expect(succursaleFormService.getSuccursaleSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(succursaleService.update).toHaveBeenCalledWith(expect.objectContaining(succursale));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuccursaleSteel>>();
      const succursale = { id: 123 };
      jest.spyOn(succursaleFormService, 'getSuccursaleSteel').mockReturnValue({ id: null });
      jest.spyOn(succursaleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ succursale: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: succursale }));
      saveSubject.complete();

      // THEN
      expect(succursaleFormService.getSuccursaleSteel).toHaveBeenCalled();
      expect(succursaleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuccursaleSteel>>();
      const succursale = { id: 123 };
      jest.spyOn(succursaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ succursale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(succursaleService.update).toHaveBeenCalled();
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
