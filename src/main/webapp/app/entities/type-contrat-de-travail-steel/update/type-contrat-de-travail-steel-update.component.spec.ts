import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypeContratDeTravailSteelFormService } from './type-contrat-de-travail-steel-form.service';
import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';
import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';

import { TypeContratDeTravailSteelUpdateComponent } from './type-contrat-de-travail-steel-update.component';

describe('TypeContratDeTravailSteel Management Update Component', () => {
  let comp: TypeContratDeTravailSteelUpdateComponent;
  let fixture: ComponentFixture<TypeContratDeTravailSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeContratDeTravailFormService: TypeContratDeTravailSteelFormService;
  let typeContratDeTravailService: TypeContratDeTravailSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TypeContratDeTravailSteelUpdateComponent],
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
      .overrideTemplate(TypeContratDeTravailSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeContratDeTravailSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeContratDeTravailFormService = TestBed.inject(TypeContratDeTravailSteelFormService);
    typeContratDeTravailService = TestBed.inject(TypeContratDeTravailSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typeContratDeTravail: ITypeContratDeTravailSteel = { id: 456 };

      activatedRoute.data = of({ typeContratDeTravail });
      comp.ngOnInit();

      expect(comp.typeContratDeTravail).toEqual(typeContratDeTravail);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeContratDeTravailSteel>>();
      const typeContratDeTravail = { id: 123 };
      jest.spyOn(typeContratDeTravailFormService, 'getTypeContratDeTravailSteel').mockReturnValue(typeContratDeTravail);
      jest.spyOn(typeContratDeTravailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeContratDeTravail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeContratDeTravail }));
      saveSubject.complete();

      // THEN
      expect(typeContratDeTravailFormService.getTypeContratDeTravailSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeContratDeTravailService.update).toHaveBeenCalledWith(expect.objectContaining(typeContratDeTravail));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeContratDeTravailSteel>>();
      const typeContratDeTravail = { id: 123 };
      jest.spyOn(typeContratDeTravailFormService, 'getTypeContratDeTravailSteel').mockReturnValue({ id: null });
      jest.spyOn(typeContratDeTravailService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeContratDeTravail: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeContratDeTravail }));
      saveSubject.complete();

      // THEN
      expect(typeContratDeTravailFormService.getTypeContratDeTravailSteel).toHaveBeenCalled();
      expect(typeContratDeTravailService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeContratDeTravailSteel>>();
      const typeContratDeTravail = { id: 123 };
      jest.spyOn(typeContratDeTravailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeContratDeTravail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeContratDeTravailService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
