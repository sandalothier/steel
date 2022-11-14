import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISuccursaleSteel, NewSuccursaleSteel } from '../succursale-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISuccursaleSteel for edit and NewSuccursaleSteelFormGroupInput for create.
 */
type SuccursaleSteelFormGroupInput = ISuccursaleSteel | PartialWithRequiredKeyOf<NewSuccursaleSteel>;

type SuccursaleSteelFormDefaults = Pick<NewSuccursaleSteel, 'id'>;

type SuccursaleSteelFormGroupContent = {
  id: FormControl<ISuccursaleSteel['id'] | NewSuccursaleSteel['id']>;
  intSuccursale: FormControl<ISuccursaleSteel['intSuccursale']>;
  societe: FormControl<ISuccursaleSteel['societe']>;
};

export type SuccursaleSteelFormGroup = FormGroup<SuccursaleSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SuccursaleSteelFormService {
  createSuccursaleSteelFormGroup(succursale: SuccursaleSteelFormGroupInput = { id: null }): SuccursaleSteelFormGroup {
    const succursaleRawValue = {
      ...this.getFormDefaults(),
      ...succursale,
    };
    return new FormGroup<SuccursaleSteelFormGroupContent>({
      id: new FormControl(
        { value: succursaleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intSuccursale: new FormControl(succursaleRawValue.intSuccursale, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      societe: new FormControl(succursaleRawValue.societe),
    });
  }

  getSuccursaleSteel(form: SuccursaleSteelFormGroup): ISuccursaleSteel | NewSuccursaleSteel {
    return form.getRawValue() as ISuccursaleSteel | NewSuccursaleSteel;
  }

  resetForm(form: SuccursaleSteelFormGroup, succursale: SuccursaleSteelFormGroupInput): void {
    const succursaleRawValue = { ...this.getFormDefaults(), ...succursale };
    form.reset(
      {
        ...succursaleRawValue,
        id: { value: succursaleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SuccursaleSteelFormDefaults {
    return {
      id: null,
    };
  }
}
