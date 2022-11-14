import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../type-document-steel.test-samples';

import { TypeDocumentSteelFormService } from './type-document-steel-form.service';

describe('TypeDocumentSteel Form Service', () => {
  let service: TypeDocumentSteelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDocumentSteelFormService);
  });

  describe('Service methods', () => {
    describe('createTypeDocumentSteelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intTypeDoc: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });

      it('passing ITypeDocumentSteel should create a new form with FormGroup', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            intTypeDoc: expect.any(Object),
            societe: expect.any(Object),
          })
        );
      });
    });

    describe('getTypeDocumentSteel', () => {
      it('should return NewTypeDocumentSteel for default TypeDocumentSteel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTypeDocumentSteelFormGroup(sampleWithNewData);

        const typeDocument = service.getTypeDocumentSteel(formGroup) as any;

        expect(typeDocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewTypeDocumentSteel for empty TypeDocumentSteel initial value', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup();

        const typeDocument = service.getTypeDocumentSteel(formGroup) as any;

        expect(typeDocument).toMatchObject({});
      });

      it('should return ITypeDocumentSteel', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup(sampleWithRequiredData);

        const typeDocument = service.getTypeDocumentSteel(formGroup) as any;

        expect(typeDocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITypeDocumentSteel should not enable id FormControl', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTypeDocumentSteel should disable id FormControl', () => {
        const formGroup = service.createTypeDocumentSteelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
