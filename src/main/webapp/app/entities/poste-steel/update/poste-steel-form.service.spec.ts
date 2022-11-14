import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../poste-steel.test-samples';

import { PosteSteelFormService } from './poste-steel-form.service';

describe('PosteSteel Form Service', () => {
  let service: PosteSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteSteelFormService);
  });

  describe('Service methods', () => {
    describe('createPosteSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPosteSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intPoste: expect.any(Object),
            nomActeur: expect.any(Object),
          })
        );
      });

      it('passing IPosteSteel should create a new form with FormGroup', () => {
        const formGroup = service.createPosteSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intPoste: expect.any(Object),
            nomActeur: expect.any(Object),
          })
        );
      });
    });

    describe('getPosteSteel', () => {
      it('should return NewPosteSteel for default PosteSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPosteSteelFormGroup(sampleWithNewData);

        const poste = service.getPosteSteel(formGroup) as any;

        expect(poste).toMatchObject(sampleWithNewData);
      });

      it('should return NewPosteSteel for empty PosteSteel initial value', () => {
        const formGroup = service.createPosteSteelFormGroup();

        const poste = service.getPosteSteel(formGroup) as any;

        expect(poste).toMatchObject({});
      });

      it('should return IPosteSteel', () => {
        const formGroup = service.createPosteSteelFormGroup(sampleWithRequiredData);

        const poste = service.getPosteSteel(formGroup) as any;

        expect(poste).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPosteSteel should not enable id FormControl', () => {
        const formGroup = service.createPosteSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPosteSteel should disable id FormControl', () => {
        const formGroup = service.createPosteSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
