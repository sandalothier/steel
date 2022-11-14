import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../type-contrat-de-travail-steel.test-samples';

import { TypeContratDeTravailSteelFormService } from './type-contrat-de-travail-steel-form.service';

describe('TypeContratDeTravailSteel Form Service', () => {
  let service: TypeContratDeTravailSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeContratDeTravailSteelFormService);
  });

  describe('Service methods', () => {
    describe('createTypeContratDeTravailSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intTypeContrat: expect.any(Object),
            description: expect.any(Object),
            dureeMax: expect.any(Object),
          })
        );
      });

      it('passing ITypeContratDeTravailSteel should create a new form with FormGroup', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intTypeContrat: expect.any(Object),
            description: expect.any(Object),
            dureeMax: expect.any(Object),
          })
        );
      });
    });

    describe('getTypeContratDeTravailSteel', () => {
      it('should return NewTypeContratDeTravailSteel for default TypeContratDeTravailSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTypeContratDeTravailSteelFormGroup(sampleWithNewData);

        const typeContratDeTravail = service.getTypeContratDeTravailSteel(formGroup) as any;

        expect(typeContratDeTravail).toMatchObject(sampleWithNewData);
      });

      it('should return NewTypeContratDeTravailSteel for empty TypeContratDeTravailSteel initial value', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup();

        const typeContratDeTravail = service.getTypeContratDeTravailSteel(formGroup) as any;

        expect(typeContratDeTravail).toMatchObject({});
      });

      it('should return ITypeContratDeTravailSteel', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup(sampleWithRequiredData);

        const typeContratDeTravail = service.getTypeContratDeTravailSteel(formGroup) as any;

        expect(typeContratDeTravail).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITypeContratDeTravailSteel should not enable id FormControl', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTypeContratDeTravailSteel should disable id FormControl', () => {
        const formGroup = service.createTypeContratDeTravailSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
