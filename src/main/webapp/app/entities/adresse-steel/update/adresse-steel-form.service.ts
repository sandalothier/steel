import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAdresseSteel, NewAdresseSteel } from '../adresse-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAdresseSteel for edit and NewAdresseSteelFormGroupInput for create.
 */
type AdresseSteelFormGroupInput = IAdresseSteel | PartialWithRequiredKeyOf<NewAdresseSteel>;

type AdresseSteelFormDefaults = Pick<NewAdresseSteel, 'id'>;

type AdresseSteelFormGroupContent = {
  id: FormControl<IAdresseSteel['id'] | NewAdresseSteel['id']>;
  cel: FormControl<IAdresseSteel['cel']>;
  tel: FormControl<IAdresseSteel['tel']>;
  region: FormControl<IAdresseSteel['region']>;
};

export type AdresseSteelFormGroup = FormGroup<AdresseSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AdresseSteelFormService {
  createAdresseSteelFormGroup(adresse: AdresseSteelFormGroupInput = { id: null }): AdresseSteelFormGroup {
    const adresseRawValue = {
      ...this.getFormDefaults(),
      ...adresse,
    };
    return new FormGroup<AdresseSteelFormGroupContent>({
      id: new FormControl(
        { value: adresseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cel: new FormControl(adresseRawValue.cel, {
        validators: [Validators.required, Validators.maxLength(8)],
      }),
      tel: new FormControl(adresseRawValue.tel, {
        validators: [Validators.required, Validators.maxLength(8)],
      }),
      region: new FormControl(adresseRawValue.region, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
    });
  }

  getAdresseSteel(form: AdresseSteelFormGroup): IAdresseSteel | NewAdresseSteel {
    return form.getRawValue() as IAdresseSteel | NewAdresseSteel;
  }

  resetForm(form: AdresseSteelFormGroup, adresse: AdresseSteelFormGroupInput): void {
    const adresseRawValue = { ...this.getFormDefaults(), ...adresse };
    form.reset(
      {
        ...adresseRawValue,
        id: { value: adresseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AdresseSteelFormDefaults {
    return {
      id: null,
    };
  }
}
