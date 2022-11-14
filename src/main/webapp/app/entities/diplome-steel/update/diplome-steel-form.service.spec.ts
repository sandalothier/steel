import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../diplome-steel.test-samples';

import { DiplomeSteelFormService } from './diplome-steel-form.service';

describe('DiplomeSteel Form Service', () => {
  let service: DiplomeSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomeSteelFormService);
  });

  describe('Service methods', () => {
    describe('createDiplomeSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDiplomeSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeDiplome: expect.any(Object),
            intDiplome: expect.any(Object),
          })
        );
      });

      it('passing IDiplomeSteel should create a new form with FormGroup', () => {
        const formGroup = service.createDiplomeSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeDiplome: expect.any(Object),
            intDiplome: expect.any(Object),
          })
        );
      });
    });

    describe('getDiplomeSteel', () => {
      it('should return NewDiplomeSteel for default DiplomeSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDiplomeSteelFormGroup(sampleWithNewData);

        const diplome = service.getDiplomeSteel(formGroup) as any;

        expect(diplome).toMatchObject(sampleWithNewData);
      });

      it('should return NewDiplomeSteel for empty DiplomeSteel initial value', () => {
        const formGroup = service.createDiplomeSteelFormGroup();

        const diplome = service.getDiplomeSteel(formGroup) as any;

        expect(diplome).toMatchObject({});
      });

      it('should return IDiplomeSteel', () => {
        const formGroup = service.createDiplomeSteelFormGroup(sampleWithRequiredData);

        const diplome = service.getDiplomeSteel(formGroup) as any;

        expect(diplome).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDiplomeSteel should not enable id FormControl', () => {
        const formGroup = service.createDiplomeSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDiplomeSteel should disable id FormControl', () => {
        const formGroup = service.createDiplomeSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
