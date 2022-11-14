import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contrat-etablis-steel.test-samples';

import { ContratEtablisSteelFormService } from './contrat-etablis-steel-form.service';

describe('ContratEtablisSteel Form Service', () => {
  let service: ContratEtablisSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratEtablisSteelFormService);
  });

  describe('Service methods', () => {
    describe('createContratEtablisSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContratEtablisSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateEtablissement: expect.any(Object),
            nomActeur: expect.any(Object),
            intTypeContrat: expect.any(Object),
          })
        );
      });

      it('passing IContratEtablisSteel should create a new form with FormGroup', () => {
        const formGroup = service.createContratEtablisSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateEtablissement: expect.any(Object),
            nomActeur: expect.any(Object),
            intTypeContrat: expect.any(Object),
          })
        );
      });
    });

    describe('getContratEtablisSteel', () => {
      it('should return NewContratEtablisSteel for default ContratEtablisSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContratEtablisSteelFormGroup(sampleWithNewData);

        const contratEtablis = service.getContratEtablisSteel(formGroup) as any;

        expect(contratEtablis).toMatchObject(sampleWithNewData);
      });

      it('should return NewContratEtablisSteel for empty ContratEtablisSteel initial value', () => {
        const formGroup = service.createContratEtablisSteelFormGroup();

        const contratEtablis = service.getContratEtablisSteel(formGroup) as any;

        expect(contratEtablis).toMatchObject({});
      });

      it('should return IContratEtablisSteel', () => {
        const formGroup = service.createContratEtablisSteelFormGroup(sampleWithRequiredData);

        const contratEtablis = service.getContratEtablisSteel(formGroup) as any;

        expect(contratEtablis).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContratEtablisSteel should not enable id FormControl', () => {
        const formGroup = service.createContratEtablisSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContratEtablisSteel should disable id FormControl', () => {
        const formGroup = service.createContratEtablisSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
