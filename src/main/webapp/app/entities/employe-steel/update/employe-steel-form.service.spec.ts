import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employe-steel.test-samples';

import { EmployeSteelFormService } from './employe-steel-form.service';

describe('EmployeSteel Form Service', () => {
  let service: EmployeSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeSteelFormService);
  });

  describe('Service methods', () => {
    describe('createEmployeSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployeSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sexe: expect.any(Object),
            nomActeur: expect.any(Object),
            prenomsActeur: expect.any(Object),
            dateNaissance: expect.any(Object),
            lieuNaissance: expect.any(Object),
            situationMatrimoniale: expect.any(Object),
            photo: expect.any(Object),
            paysOrigine: expect.any(Object),
            codeDiplome: expect.any(Object),
            cel: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing IEmployeSteel should create a new form with FormGroup', () => {
        const formGroup = service.createEmployeSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sexe: expect.any(Object),
            nomActeur: expect.any(Object),
            prenomsActeur: expect.any(Object),
            dateNaissance: expect.any(Object),
            lieuNaissance: expect.any(Object),
            situationMatrimoniale: expect.any(Object),
            photo: expect.any(Object),
            paysOrigine: expect.any(Object),
            codeDiplome: expect.any(Object),
            cel: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployeSteel', () => {
      it('should return NewEmployeSteel for default EmployeSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmployeSteelFormGroup(sampleWithNewData);

        const employe = service.getEmployeSteel(formGroup) as any;

        expect(employe).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployeSteel for empty EmployeSteel initial value', () => {
        const formGroup = service.createEmployeSteelFormGroup();

        const employe = service.getEmployeSteel(formGroup) as any;

        expect(employe).toMatchObject({});
      });

      it('should return IEmployeSteel', () => {
        const formGroup = service.createEmployeSteelFormGroup(sampleWithRequiredData);

        const employe = service.getEmployeSteel(formGroup) as any;

        expect(employe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmployeSteel should not enable id FormControl', () => {
        const formGroup = service.createEmployeSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmployeSteel should disable id FormControl', () => {
        const formGroup = service.createEmployeSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
