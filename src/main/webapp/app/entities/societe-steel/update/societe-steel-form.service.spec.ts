import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../societe-steel.test-samples';

import { SocieteSteelFormService } from './societe-steel-form.service';

describe('SocieteSteel Form Service', () => {
  let service: SocieteSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocieteSteelFormService);
  });

  describe('Service methods', () => {
    describe('createSocieteSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSocieteSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intSociete: expect.any(Object),
            sigle: expect.any(Object),
            logo: expect.any(Object),
            siege: expect.any(Object),
          })
        );
      });

      it('passing ISocieteSteel should create a new form with FormGroup', () => {
        const formGroup = service.createSocieteSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intSociete: expect.any(Object),
            sigle: expect.any(Object),
            logo: expect.any(Object),
            siege: expect.any(Object),
          })
        );
      });
    });

    describe('getSocieteSteel', () => {
      it('should return NewSocieteSteel for default SocieteSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSocieteSteelFormGroup(sampleWithNewData);

        const societe = service.getSocieteSteel(formGroup) as any;

        expect(societe).toMatchObject(sampleWithNewData);
      });

      it('should return NewSocieteSteel for empty SocieteSteel initial value', () => {
        const formGroup = service.createSocieteSteelFormGroup();

        const societe = service.getSocieteSteel(formGroup) as any;

        expect(societe).toMatchObject({});
      });

      it('should return ISocieteSteel', () => {
        const formGroup = service.createSocieteSteelFormGroup(sampleWithRequiredData);

        const societe = service.getSocieteSteel(formGroup) as any;

        expect(societe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISocieteSteel should not enable id FormControl', () => {
        const formGroup = service.createSocieteSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSocieteSteel should disable id FormControl', () => {
        const formGroup = service.createSocieteSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
