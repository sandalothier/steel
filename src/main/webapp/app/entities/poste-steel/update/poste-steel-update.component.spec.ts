import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PosteSteelFormService } from './poste-steel-form.service';
import { PosteSteelService } from '../service/poste-steel.service';
import { IPosteSteel } from '../poste-steel.model';
import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';
import { EmployeSteelService } from 'app/entities/employe-steel/service/employe-steel.service';

import { PosteSteelUpdateComponent } from './poste-steel-update.component';

describe('PosteSteel Management Update Component', () => {
  let comp: PosteSteelUpdateComponent;
  let fixture: ComponentFixture<PosteSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let posteFormService: PosteSteelFormService;
  let posteService: PosteSteelService;
  let employeService: EmployeSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PosteSteelUpdateComponent],
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
      .overrideTemplate(PosteSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PosteSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    posteFormService = TestBed.inject(PosteSteelFormService);
    posteService = TestBed.inject(PosteSteelService);
    employeService = TestBed.inject(EmployeSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EmployeSteel query and add missing value', () => {
      const poste: IPosteSteel = { id: 456 };
      const nomActeur: IEmployeSteel = { id: 78149 };
      poste.nomActeur = nomActeur;

      const employeCollection: IEmployeSteel[] = [{ id: 17807 }];
      jest.spyOn(employeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeCollection })));
      const additionalEmployeSteels = [nomActeur];
      const expectedCollection: IEmployeSteel[] = [...additionalEmployeSteels, ...employeCollection];
      jest.spyOn(employeService, 'addEmployeSteelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      expect(employeService.query).toHaveBeenCalled();
      expect(employeService.addEmployeSteelToCollectionIfMissing).toHaveBeenCalledWith(
        employeCollection,
        ...additionalEmployeSteels.map(expect.objectContaining)
      );
      expect(comp.employesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const poste: IPosteSteel = { id: 456 };
      const nomActeur: IEmployeSteel = { id: 65044 };
      poste.nomActeur = nomActeur;

      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      expect(comp.employesSharedCollection).toContain(nomActeur);
      expect(comp.poste).toEqual(poste);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosteSteel>>();
      const poste = { id: 123 };
      jest.spyOn(posteFormService, 'getPosteSteel').mockReturnValue(poste);
      jest.spyOn(posteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: poste }));
      saveSubject.complete();

      // THEN
      expect(posteFormService.getPosteSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(posteService.update).toHaveBeenCalledWith(expect.objectContaining(poste));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosteSteel>>();
      const poste = { id: 123 };
      jest.spyOn(posteFormService, 'getPosteSteel').mockReturnValue({ id: null });
      jest.spyOn(posteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: poste }));
      saveSubject.complete();

      // THEN
      expect(posteFormService.getPosteSteel).toHaveBeenCalled();
      expect(posteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosteSteel>>();
      const poste = { id: 123 };
      jest.spyOn(posteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ poste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(posteService.update).toHaveBeenCalled();
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
  });
});
