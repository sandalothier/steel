import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISocieteSteel, NewSocieteSteel } from '../societe-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISocieteSteel for edit and NewSocieteSteelFormGroupInput for create.
 */
type SocieteSteelFormGroupInput = ISocieteSteel | PartialWithRequiredKeyOf<NewSocieteSteel>;

type SocieteSteelFormDefaults = Pick<NewSocieteSteel, 'id'>;

type SocieteSteelFormGroupContent = {
  id: FormControl<ISocieteSteel['id'] | NewSocieteSteel['id']>;
  intSociete: FormControl<ISocieteSteel['intSociete']>;
  sigle: FormControl<ISocieteSteel['sigle']>;
  logo: FormControl<ISocieteSteel['logo']>;
  siege: FormControl<ISocieteSteel['siege']>;
};

export type SocieteSteelFormGroup = FormGroup<SocieteSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SocieteSteelFormService {
  createSocieteSteelFormGroup(societe: SocieteSteelFormGroupInput = { id: null }): SocieteSteelFormGroup {
    const societeRawValue = {
      ...this.getFormDefaults(),
      ...societe,
    };
    return new FormGroup<SocieteSteelFormGroupContent>({
      id: new FormControl(
        { value: societeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intSociete: new FormControl(societeRawValue.intSociete, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      sigle: new FormControl(societeRawValue.sigle, {
        validators: [Validators.maxLength(25)],
      }),
      logo: new FormControl(societeRawValue.logo, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      siege: new FormControl(societeRawValue.siege),
    });
  }

  getSocieteSteel(form: SocieteSteelFormGroup): ISocieteSteel | NewSocieteSteel {
    return form.getRawValue() as ISocieteSteel | NewSocieteSteel;
  }

  resetForm(form: SocieteSteelFormGroup, societe: SocieteSteelFormGroupInput): void {
    const societeRawValue = { ...this.getFormDefaults(), ...societe };
    form.reset(
      {
        ...societeRawValue,
        id: { value: societeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SocieteSteelFormDefaults {
    return {
      id: null,
    };
  }
}
