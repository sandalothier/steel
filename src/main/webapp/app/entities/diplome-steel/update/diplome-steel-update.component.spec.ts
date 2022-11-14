import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DiplomeSteelFormService } from './diplome-steel-form.service';
import { DiplomeSteelService } from '../service/diplome-steel.service';
import { IDiplomeSteel } from '../diplome-steel.model';

import { DiplomeSteelUpdateComponent } from './diplome-steel-update.component';

describe('DiplomeSteel Management Update Component', () => {
  let comp: DiplomeSteelUpdateComponent;
  let fixture: ComponentFixture<DiplomeSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let diplomeFormService: DiplomeSteelFormService;
  let diplomeService: DiplomeSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DiplomeSteelUpdateComponent],
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
      .overrideTemplate(DiplomeSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiplomeSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    diplomeFormService = TestBed.inject(DiplomeSteelFormService);
    diplomeService = TestBed.inject(DiplomeSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const diplome: IDiplomeSteel = { id: 456 };

      activatedRoute.data = of({ diplome });
      comp.ngOnInit();

      expect(comp.diplome).toEqual(diplome);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiplomeSteel>>();
      const diplome = { id: 123 };
      jest.spyOn(diplomeFormService, 'getDiplomeSteel').mockReturnValue(diplome);
      jest.spyOn(diplomeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diplome });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: diplome }));
      saveSubject.complete();

      // THEN
      expect(diplomeFormService.getDiplomeSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(diplomeService.update).toHaveBeenCalledWith(expect.objectContaining(diplome));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiplomeSteel>>();
      const diplome = { id: 123 };
      jest.spyOn(diplomeFormService, 'getDiplomeSteel').mockReturnValue({ id: null });
      jest.spyOn(diplomeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diplome: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: diplome }));
      saveSubject.complete();

      // THEN
      expect(diplomeFormService.getDiplomeSteel).toHaveBeenCalled();
      expect(diplomeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiplomeSteel>>();
      const diplome = { id: 123 };
      jest.spyOn(diplomeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diplome });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(diplomeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
