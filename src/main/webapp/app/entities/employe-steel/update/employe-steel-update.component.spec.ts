import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployeSteelFormService } from './employe-steel-form.service';
import { EmployeSteelService } from '../service/employe-steel.service';
import { IEmployeSteel } from '../employe-steel.model';
import { IDiplomeSteel } from 'app/entities/diplome-steel/diplome-steel.model';
import { DiplomeSteelService } from 'app/entities/diplome-steel/service/diplome-steel.service';
import { IAdresseSteel } from 'app/entities/adresse-steel/adresse-steel.model';
import { AdresseSteelService } from 'app/entities/adresse-steel/service/adresse-steel.service';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';

import { EmployeSteelUpdateComponent } from './employe-steel-update.component';

describe('EmployeSteel Management Update Component', () => {
  let comp: EmployeSteelUpdateComponent;
  let fixture: ComponentFixture<EmployeSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeFormService: EmployeSteelFormService;
  let employeService: EmployeSteelService;
  let diplomeService: DiplomeSteelService;
  let adresseService: AdresseSteelService;
  let societeService: SocieteSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeSteelUpdateComponent],
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
      .overrideTemplate(EmployeSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeFormService = TestBed.inject(EmployeSteelFormService);
    employeService = TestBed.inject(EmployeSteelService);
    diplomeService = TestBed.inject(DiplomeSteelService);
    adresseService = TestBed.inject(AdresseSteelService);
    societeService = TestBed.inject(SocieteSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DiplomeSteel query and add missing value', () => {
      const employe: IEmployeSteel = { id: 456 };
      const codeDiplome: IDiplomeSteel = { id: 85199 };
      employe.codeDiplome = codeDiplome;

      const diplomeCollection: IDiplomeSteel[] = [{ id: 87629 }];
      jest.spyOn(diplomeService, 'query').mockReturnValue(of(new HttpResponse({ body: diplomeCollection })));
      const additionalDiplomeSteels = [codeDiplome];
      const expectedCollection: IDiplomeSteel[] = [...additionalDiplomeSteels, ...diplomeCollection];
      jest.spyOn(diplomeService, 'addDiplomeSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(diplomeService.query).toHaveBeenCalled();
      expect(diplomeService.addDiplomeSteelToCollectionIfMissing).toHaveBeenCalledWith(
        diplomeCollection,
        ...additionalDiplomeSteels.map(expect.objectContaining)
      );
      expect(comp.diplomesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AdresseSteel query and add missing value', () => {
      const employe: IEmployeSteel = { id: 456 };
      const cel: IAdresseSteel = { id: 78429 };
      employe.cel = cel;

      const adresseCollection: IAdresseSteel[] = [{ id: 89152 }];
      jest.spyOn(adresseService, 'query').mockReturnValue(of(new HttpResponse({ body: adresseCollection })));
      const additionalAdresseSteels = [cel];
      const expectedCollection: IAdresseSteel[] = [...additionalAdresseSteels, ...adresseCollection];
      jest.spyOn(adresseService, 'addAdresseSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(adresseService.query).toHaveBeenCalled();
      expect(adresseService.addAdresseSteelToCollectionIfMissing).toHaveBeenCalledWith(
        adresseCollection,
        ...additionalAdresseSteels.map(expect.objectContaining)
      );
      expect(comp.adressesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SocieteSteel query and add missing value', () => {
      const employe: IEmployeSteel = { id: 456 };
      const societe: ISocieteSteel = { id: 4808 };
      employe.societe = societe;

      const societeCollection: ISocieteSteel[] = [{ id: 6822 }];
      jest.spyOn(societeService, 'query').mockReturnValue(of(new HttpResponse({ body: societeCollection })));
      const additionalSocieteSteels = [societe];
      const expectedCollection: ISocieteSteel[] = [...additionalSocieteSteels, ...societeCollection];
      jest.spyOn(societeService, 'addSocieteSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(societeService.query).toHaveBeenCalled();
      expect(societeService.addSocieteSteelToCollectionIfMissing).toHaveBeenCalledWith(
        societeCollection,
        ...additionalSocieteSteels.map(expect.objectContaining)
      );
      expect(comp.societesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const employe: IEmployeSteel = { id: 456 };
      const codeDiplome: IDiplomeSteel = { id: 89130 };
      employe.codeDiplome = codeDiplome;
      const cel: IAdresseSteel = { id: 99243 };
      employe.cel = cel;
      const societe: ISocieteSteel = { id: 3163 };
      employe.societe = societe;

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(comp.diplomesSharedCollection).toContain(codeDiplome);
      expect(comp.adressesSharedCollection).toContain(cel);
      expect(comp.societesSharedCollection).toContain(societe);
      expect(comp.employe).toEqual(employe);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeSteel>>();
      const employe = { id: 123 };
      jest.spyOn(employeFormService, 'getEmployeSteel').mockReturnValue(employe);
      jest.spyOn(employeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employe }));
      saveSubject.complete();

      // THEN
      expect(employeFormService.getEmployeSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeService.update).toHaveBeenCalledWith(expect.objectContaining(employe));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeSteel>>();
      const employe = { id: 123 };
      jest.spyOn(employeFormService, 'getEmployeSteel').mockReturnValue({ id: null });
      jest.spyOn(employeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employe }));
      saveSubject.complete();

      // THEN
      expect(employeFormService.getEmployeSteel).toHaveBeenCalled();
      expect(employeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeSteel>>();
      const employe = { id: 123 };
      jest.spyOn(employeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDiplomeSteel', () => {
      it('Should forward to diplomeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(diplomeService, 'compareDiplomeSteel');
        comp.compareDiplomeSteel(entity, entity2);
        expect(diplomeService.compareDiplomeSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAdresseSteel', () => {
      it('Should forward to adresseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(adresseService, 'compareAdresseSteel');
        comp.compareAdresseSteel(entity, entity2);
        expect(adresseService.compareAdresseSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
