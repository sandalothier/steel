import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SocieteSteelFormService } from './societe-steel-form.service';
import { SocieteSteelService } from '../service/societe-steel.service';
import { ISocieteSteel } from '../societe-steel.model';

import { SocieteSteelUpdateComponent } from './societe-steel-update.component';

describe('SocieteSteel Management Update Component', () => {
  let comp: SocieteSteelUpdateComponent;
  let fixture: ComponentFixture<SocieteSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let societeFormService: SocieteSteelFormService;
  let societeService: SocieteSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SocieteSteelUpdateComponent],
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
      .overrideTemplate(SocieteSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SocieteSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    societeFormService = TestBed.inject(SocieteSteelFormService);
    societeService = TestBed.inject(SocieteSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const societe: ISocieteSteel = { id: 456 };

      activatedRoute.data = of({ societe });
      comp.ngOnInit();

      expect(comp.societe).toEqual(societe);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISocieteSteel>>();
      const societe = { id: 123 };
      jest.spyOn(societeFormService, 'getSocieteSteel').mockReturnValue(societe);
      jest.spyOn(societeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ societe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: societe }));
      saveSubject.complete();

      // THEN
      expect(societeFormService.getSocieteSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(societeService.update).toHaveBeenCalledWith(expect.objectContaining(societe));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISocieteSteel>>();
      const societe = { id: 123 };
      jest.spyOn(societeFormService, 'getSocieteSteel').mockReturnValue({ id: null });
      jest.spyOn(societeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ societe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: societe }));
      saveSubject.complete();

      // THEN
      expect(societeFormService.getSocieteSteel).toHaveBeenCalled();
      expect(societeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISocieteSteel>>();
      const societe = { id: 123 };
      jest.spyOn(societeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ societe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(societeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
