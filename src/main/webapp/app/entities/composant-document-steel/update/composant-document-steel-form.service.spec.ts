import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../composant-document-steel.test-samples';

import { ComposantDocumentSteelFormService } from './composant-document-steel-form.service';

describe('ComposantDocumentSteel Form Service', () => {
  let service: ComposantDocumentSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComposantDocumentSteelFormService);
  });

  describe('Service methods', () => {
    describe('createComposantDocumentSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intComposant: expect.any(Object),
            titreComposant: expect.any(Object),
            contenu: expect.any(Object),
            intTypeDoc: expect.any(Object),
          })
        );
      });

      it('passing IComposantDocumentSteel should create a new form with FormGroup', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intComposant: expect.any(Object),
            titreComposant: expect.any(Object),
            contenu: expect.any(Object),
            intTypeDoc: expect.any(Object),
          })
        );
      });
    });

    describe('getComposantDocumentSteel', () => {
      it('should return NewComposantDocumentSteel for default ComposantDocumentSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createComposantDocumentSteelFormGroup(sampleWithNewData);

        const composantDocument = service.getComposantDocumentSteel(formGroup) as any;

        expect(composantDocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewComposantDocumentSteel for empty ComposantDocumentSteel initial value', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup();

        const composantDocument = service.getComposantDocumentSteel(formGroup) as any;

        expect(composantDocument).toMatchObject({});
      });

      it('should return IComposantDocumentSteel', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup(sampleWithRequiredData);

        const composantDocument = service.getComposantDocumentSteel(formGroup) as any;

        expect(composantDocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComposantDocumentSteel should not enable id FormControl', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComposantDocumentSteel should disable id FormControl', () => {
        const formGroup = service.createComposantDocumentSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
