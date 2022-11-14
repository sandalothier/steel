import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../succursale-steel.test-samples';

import { SuccursaleSteelFormService } from './succursale-steel-form.service';

describe('SuccursaleSteel Form Service', () => {
  let service: SuccursaleSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccursaleSteelFormService);
  });

  describe('Service methods', () => {
    describe('createSuccursaleSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSuccursaleSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intSuccursale: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing ISuccursaleSteel should create a new form with FormGroup', () => {
        const formGroup = service.createSuccursaleSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intSuccursale: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getSuccursaleSteel', () => {
      it('should return NewSuccursaleSteel for default SuccursaleSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSuccursaleSteelFormGroup(sampleWithNewData);

        const succursale = service.getSuccursaleSteel(formGroup) as any;

        expect(succursale).toMatchObject(sampleWithNewData);
      });

      it('should return NewSuccursaleSteel for empty SuccursaleSteel initial value', () => {
        const formGroup = service.createSuccursaleSteelFormGroup();

        const succursale = service.getSuccursaleSteel(formGroup) as any;

        expect(succursale).toMatchObject({});
      });

      it('should return ISuccursaleSteel', () => {
        const formGroup = service.createSuccursaleSteelFormGroup(sampleWithRequiredData);

        const succursale = service.getSuccursaleSteel(formGroup) as any;

        expect(succursale).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISuccursaleSteel should not enable id FormControl', () => {
        const formGroup = service.createSuccursaleSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSuccursaleSteel should disable id FormControl', () => {
        const formGroup = service.createSuccursaleSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
