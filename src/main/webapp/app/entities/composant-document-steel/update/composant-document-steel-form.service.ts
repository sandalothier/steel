import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComposantDocumentSteel, NewComposantDocumentSteel } from '../composant-document-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComposantDocumentSteel for edit and NewComposantDocumentSteelFormGroupInput for create.
 */
type ComposantDocumentSteelFormGroupInput = IComposantDocumentSteel | PartialWithRequiredKeyOf<NewComposantDocumentSteel>;

type ComposantDocumentSteelFormDefaults = Pick<NewComposantDocumentSteel, 'id'>;

type ComposantDocumentSteelFormGroupContent = {
  id: FormControl<IComposantDocumentSteel['id'] | NewComposantDocumentSteel['id']>;
  intComposant: FormControl<IComposantDocumentSteel['intComposant']>;
  titreComposant: FormControl<IComposantDocumentSteel['titreComposant']>;
  contenu: FormControl<IComposantDocumentSteel['contenu']>;
  intTypeDoc: FormControl<IComposantDocumentSteel['intTypeDoc']>;
};

export type ComposantDocumentSteelFormGroup = FormGroup<ComposantDocumentSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComposantDocumentSteelFormService {
  createComposantDocumentSteelFormGroup(
    composantDocument: ComposantDocumentSteelFormGroupInput = { id: null }
  ): ComposantDocumentSteelFormGroup {
    const composantDocumentRawValue = {
      ...this.getFormDefaults(),
      ...composantDocument,
    };
    return new FormGroup<ComposantDocumentSteelFormGroupContent>({
      id: new FormControl(
        { value: composantDocumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intComposant: new FormControl(composantDocumentRawValue.intComposant, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      titreComposant: new FormControl(composantDocumentRawValue.titreComposant, {
        validators: [Validators.maxLength(50)],
      }),
      contenu: new FormControl(composantDocumentRawValue.contenu),
      intTypeDoc: new FormControl(composantDocumentRawValue.intTypeDoc),
    });
  }

  getComposantDocumentSteel(form: ComposantDocumentSteelFormGroup): IComposantDocumentSteel | NewComposantDocumentSteel {
    return form.getRawValue() as IComposantDocumentSteel | NewComposantDocumentSteel;
  }

  resetForm(form: ComposantDocumentSteelFormGroup, composantDocument: ComposantDocumentSteelFormGroupInput): void {
    const composantDocumentRawValue = { ...this.getFormDefaults(), ...composantDocument };
    form.reset(
      {
        ...composantDocumentRawValue,
        id: { value: composantDocumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComposantDocumentSteelFormDefaults {
    return {
      id: null,
    };
  }
}
