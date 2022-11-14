import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdresseSteelFormService } from './adresse-steel-form.service';
import { AdresseSteelService } from '../service/adresse-steel.service';
import { IAdresseSteel } from '../adresse-steel.model';

import { AdresseSteelUpdateComponent } from './adresse-steel-update.component';

describe('AdresseSteel Management Update Component', () => {
  let comp: AdresseSteelUpdateComponent;
  let fixture: ComponentFixture<AdresseSteelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adresseFormService: AdresseSteelFormService;
  let adresseService: AdresseSteelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AdresseSteelUpdateComponent],
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
      .overrideTemplate(AdresseSteelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdresseSteelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    adresseFormService = TestBed.inject(AdresseSteelFormService);
    adresseService = TestBed.inject(AdresseSteelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const adresse: IAdresseSteel = { id: 456 };

      activatedRoute.data = of({ adresse });
      comp.ngOnInit();

      expect(comp.adresse).toEqual(adresse);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresseSteel>>();
      const adresse = { id: 123 };
      jest.spyOn(adresseFormService, 'getAdresseSteel').mockReturnValue(adresse);
      jest.spyOn(adresseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adresse }));
      saveSubject.complete();

      // THEN
      expect(adresseFormService.getAdresseSteel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(adresseService.update).toHaveBeenCalledWith(expect.objectContaining(adresse));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresseSteel>>();
      const adresse = { id: 123 };
      jest.spyOn(adresseFormService, 'getAdresseSteel').mockReturnValue({ id: null });
      jest.spyOn(adresseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adresse }));
      saveSubject.complete();

      // THEN
      expect(adresseFormService.getAdresseSteel).toHaveBeenCalled();
      expect(adresseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresseSteel>>();
      const adresse = { id: 123 };
      jest.spyOn(adresseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(adresseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
