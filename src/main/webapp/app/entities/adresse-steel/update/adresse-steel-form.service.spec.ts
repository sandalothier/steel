import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../adresse-steel.test-samples';

import { AdresseSteelFormService } from './adresse-steel-form.service';

describe('AdresseSteel Form Service', () => {
  let service: AdresseSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdresseSteelFormService);
  });

  describe('Service methods', () => {
    describe('createAdresseSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAdresseSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cel: expect.any(Object),
            tel: expect.any(Object),
            region: expect.any(Object),
          })
        );
      });

      it('passing IAdresseSteel should create a new form with FormGroup', () => {
        const formGroup = service.createAdresseSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cel: expect.any(Object),
            tel: expect.any(Object),
            region: expect.any(Object),
          })
        );
      });
    });

    describe('getAdresseSteel', () => {
      it('should return NewAdresseSteel for default AdresseSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAdresseSteelFormGroup(sampleWithNewData);

        const adresse = service.getAdresseSteel(formGroup) as any;

        expect(adresse).toMatchObject(sampleWithNewData);
      });

      it('should return NewAdresseSteel for empty AdresseSteel initial value', () => {
        const formGroup = service.createAdresseSteelFormGroup();

        const adresse = service.getAdresseSteel(formGroup) as any;

        expect(adresse).toMatchObject({});
      });

      it('should return IAdresseSteel', () => {
        const formGroup = service.createAdresseSteelFormGroup(sampleWithRequiredData);

        const adresse = service.getAdresseSteel(formGroup) as any;

        expect(adresse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAdresseSteel should not enable id FormControl', () => {
        const formGroup = service.createAdresseSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAdresseSteel should disable id FormControl', () => {
        const formGroup = service.createAdresseSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
