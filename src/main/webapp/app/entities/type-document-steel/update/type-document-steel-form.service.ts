import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITypeDocumentSteel, NewTypeDocumentSteel } from '../type-document-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITypeDocumentSteel for edit and NewTypeDocumentSteelFormGroupInput for create.
 */
type TypeDocumentSteelFormGroupInput = ITypeDocumentSteel | PartialWithRequiredKeyOf<NewTypeDocumentSteel>;

type TypeDocumentSteelFormDefaults = Pick<NewTypeDocumentSteel, 'id'>;

type TypeDocumentSteelFormGroupContent = {
  id: FormControl<ITypeDocumentSteel['id'] | NewTypeDocumentSteel['id']>;
  intTypeDoc: FormControl<ITypeDocumentSteel['intTypeDoc']>;
  societe: FormControl<ITypeDocumentSteel['societe']>;
};

export type TypeDocumentSteelFormGroup = FormGroup<TypeDocumentSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TypeDocumentSteelFormService {
  createTypeDocumentSteelFormGroup(typeDocument: TypeDocumentSteelFormGroupInput = { id: null }): TypeDocumentSteelFormGroup {
    const typeDocumentRawValue = {
      ...this.getFormDefaults(),
      ...typeDocument,
    };
    return new FormGroup<TypeDocumentSteelFormGroupContent>({
      id: new FormControl(
        { value: typeDocumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intTypeDoc: new FormControl(typeDocumentRawValue.intTypeDoc, {
        validators: [Validators.maxLength(50)],
      }),
      societe: new FormControl(typeDocumentRawValue.societe),
    });
  }

  getTypeDocumentSteel(form: TypeDocumentSteelFormGroup): ITypeDocumentSteel | NewTypeDocumentSteel {
    return form.getRawValue() as ITypeDocumentSteel | NewTypeDocumentSteel;
  }

  resetForm(form: TypeDocumentSteelFormGroup, typeDocument: TypeDocumentSteelFormGroupInput): void {
    const typeDocumentRawValue = { ...this.getFormDefaults(), ...typeDocument };
    form.reset(
      {
        ...typeDocumentRawValue,
        id: { value: typeDocumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TypeDocumentSteelFormDefaults {
    return {
      id: null,
    };
  }
}
