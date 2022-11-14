import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITypeContratDeTravailSteel, NewTypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITypeContratDeTravailSteel for edit and NewTypeContratDeTravailSteelFormGroupInput for create.
 */
type TypeContratDeTravailSteelFormGroupInput = ITypeContratDeTravailSteel | PartialWithRequiredKeyOf<NewTypeContratDeTravailSteel>;

type TypeContratDeTravailSteelFormDefaults = Pick<NewTypeContratDeTravailSteel, 'id'>;

type TypeContratDeTravailSteelFormGroupContent = {
  id: FormControl<ITypeContratDeTravailSteel['id'] | NewTypeContratDeTravailSteel['id']>;
  intTypeContrat: FormControl<ITypeContratDeTravailSteel['intTypeContrat']>;
  description: FormControl<ITypeContratDeTravailSteel['description']>;
  dureeMax: FormControl<ITypeContratDeTravailSteel['dureeMax']>;
};

export type TypeContratDeTravailSteelFormGroup = FormGroup<TypeContratDeTravailSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TypeContratDeTravailSteelFormService {
  createTypeContratDeTravailSteelFormGroup(
    typeContratDeTravail: TypeContratDeTravailSteelFormGroupInput = { id: null }
  ): TypeContratDeTravailSteelFormGroup {
    const typeContratDeTravailRawValue = {
      ...this.getFormDefaults(),
      ...typeContratDeTravail,
    };
    return new FormGroup<TypeContratDeTravailSteelFormGroupContent>({
      id: new FormControl(
        { value: typeContratDeTravailRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intTypeContrat: new FormControl(typeContratDeTravailRawValue.intTypeContrat, {
        validators: [Validators.maxLength(25)],
      }),
      description: new FormControl(typeContratDeTravailRawValue.description, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      dureeMax: new FormControl(typeContratDeTravailRawValue.dureeMax, {
        validators: [Validators.required],
      }),
    });
  }

  getTypeContratDeTravailSteel(form: TypeContratDeTravailSteelFormGroup): ITypeContratDeTravailSteel | NewTypeContratDeTravailSteel {
    return form.getRawValue() as ITypeContratDeTravailSteel | NewTypeContratDeTravailSteel;
  }

  resetForm(form: TypeContratDeTravailSteelFormGroup, typeContratDeTravail: TypeContratDeTravailSteelFormGroupInput): void {
    const typeContratDeTravailRawValue = { ...this.getFormDefaults(), ...typeContratDeTravail };
    form.reset(
      {
        ...typeContratDeTravailRawValue,
        id: { value: typeContratDeTravailRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TypeContratDeTravailSteelFormDefaults {
    return {
      id: null,
    };
  }
}
