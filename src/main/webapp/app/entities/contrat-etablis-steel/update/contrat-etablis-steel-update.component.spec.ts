import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContratEtablisSteelFormService } from './contrat-etablis-steel-form.service';
import { ContratEtablisSteelService } from '../service/contrat-etablis-steel.service';
import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';
import { EmployeSteelService } from 'app/entities/employe-steel/service/employe-steel.service';
import { ITypeContratDeTravailSteel } from 'app/entities/type-contrat-de-travail-steel/type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from 'app/entities/type-contrat-de-travail-steel/service/type-contrat-de-travail-steel.service';

import { ContratEtablisSteelUpdateComponent } from './contrat-etablis-steel-update.component';

describe('ContratEtablisSteel Management Update Component', () => {
  let comp: ContratEtablisSteelUpdateComponent;
  let fixture: ComponentFixture<ContratEtablisSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contratEtablisFormService: ContratEtablisSteelFormService;
  let contratEtablisService: ContratEtablisSteelService;
  let employeService: EmployeSteelService;
  let typeContratDeTravailService: TypeContratDeTravailSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContratEtablisSteelUpdateComponent],
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
      .overrideTemplate(ContratEtablisSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContratEtablisSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contratEtablisFormService = TestBed.inject(ContratEtablisSteelFormService);
    contratEtablisService = TestBed.inject(ContratEtablisSteelService);
    employeService = TestBed.inject(EmployeSteelService);
    typeContratDeTravailService = TestBed.inject(TypeContratDeTravailSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EmployeSteel query and add missing value', () => {
      const contratEtablis: IContratEtablisSteel = { id: 456 };
      const nomActeur: IEmployeSteel = { id: 99292 };
      contratEtablis.nomActeur = nomActeur;

      const employeCollection: IEmployeSteel[] = [{ id: 9269 }];
      jest.spyOn(employeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeCollection })));
      const additionalEmployeSteels = [nomActeur];
      const expectedCollection: IEmployeSteel[] = [...additionalEmployeSteels, ...employeCollection];
      jest.spyOn(employeService, 'addEmployeSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contratEtablis });
      comp.ngOnInit();

      expect(employeService.query).toHaveBeenCalled();
      expect(employeService.addEmployeSteelToCollectionIfMissing).toHaveBeenCalledWith(
        employeCollection,
        ...additionalEmployeSteels.map(expect.objectContaining)
      );
      expect(comp.employesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TypeContratDeTravailSteel query and add missing value', () => {
      const contratEtablis: IContratEtablisSteel = { id: 456 };
      const intTypeContrat: ITypeContratDeTravailSteel = { id: 93248 };
      contratEtablis.intTypeContrat = intTypeContrat;

      const typeContratDeTravailCollection: ITypeContratDeTravailSteel[] = [{ id: 36920 }];
      jest.spyOn(typeContratDeTravailService, 'query').mockReturnValue(of(new HttpResponse({ body: typeContratDeTravailCollection })));
      const additionalTypeContratDeTravailSteels = [intTypeContrat];
      const expectedCollection: ITypeContratDeTravailSteel[] = [...additionalTypeContratDeTravailSteels, ...typeContratDeTravailCollection];
      jest.spyOn(typeContratDeTravailService, 'addTypeContratDeTravailSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contratEtablis });
      comp.ngOnInit();

      expect(typeContratDeTravailService.query).toHaveBeenCalled();
      expect(typeContratDeTravailService.addTypeContratDeTravailSteelToCollectionIfMissing).toHaveBeenCalledWith(
        typeContratDeTravailCollection,
        ...additionalTypeContratDeTravailSteels.map(expect.objectContaining)
      );
      expect(comp.typeContratDeTravailsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contratEtablis: IContratEtablisSteel = { id: 456 };
      const nomActeur: IEmployeSteel = { id: 79448 };
      contratEtablis.nomActeur = nomActeur;
      const intTypeContrat: ITypeContratDeTravailSteel = { id: 76960 };
      contratEtablis.intTypeContrat = intTypeContrat;

      activatedRoute.data = of({ contratEtablis });
      comp.ngOnInit();

      expect(comp.employesSharedCollection).toContain(nomActeur);
      expect(comp.typeContratDeTravailsSharedCollection).toContain(intTypeContrat);
      expect(comp.contratEtablis).toEqual(contratEtablis);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContratEtablisSteel>>();
      const contratEtablis = { id: 123 };
      jest.spyOn(contratEtablisFormService, 'getContratEtablisSteel').mockReturnValue(contratEtablis);
      jest.spyOn(contratEtablisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contratEtablis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contratEtablis }));
      saveSubject.complete();

      // THEN
      expect(contratEtablisFormService.getContratEtablisSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contratEtablisService.update).toHaveBeenCalledWith(expect.objectContaining(contratEtablis));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContratEtablisSteel>>();
      const contratEtablis = { id: 123 };
      jest.spyOn(contratEtablisFormService, 'getContratEtablisSteel').mockReturnValue({ id: null });
      jest.spyOn(contratEtablisService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contratEtablis: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contratEtablis }));
      saveSubject.complete();

      // THEN
      expect(contratEtablisFormService.getContratEtablisSteel).toHaveBeenCalled();
      expect(contratEtablisService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContratEtablisSteel>>();
      const contratEtablis = { id: 123 };
      jest.spyOn(contratEtablisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contratEtablis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contratEtablisService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployeSteel', () => {
      it('Should forward to employeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeService, 'compareEmployeSteel');
        comp.compareEmployeSteel(entity, entity2);
        expect(employeService.compareEmployeSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTypeContratDeTravailSteel', () => {
      it('Should forward to typeContratDeTravailService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typeContratDeTravailService, 'compareTypeContratDeTravailSteel');
        comp.compareTypeContratDeTravailSteel(entity, entity2);
        expect(typeContratDeTravailService.compareTypeContratDeTravailSteel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
