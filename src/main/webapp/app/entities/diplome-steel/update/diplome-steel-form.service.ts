import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDiplomeSteel, NewDiplomeSteel } from '../diplome-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDiplomeSteel for edit and NewDiplomeSteelFormGroupInput for create.
 */
type DiplomeSteelFormGroupInput = IDiplomeSteel | PartialWithRequiredKeyOf<NewDiplomeSteel>;

type DiplomeSteelFormDefaults = Pick<NewDiplomeSteel, 'id'>;

type DiplomeSteelFormGroupContent = {
  id: FormControl<IDiplomeSteel['id'] | NewDiplomeSteel['id']>;
  codeDiplome: FormControl<IDiplomeSteel['codeDiplome']>;
  intDiplome: FormControl<IDiplomeSteel['intDiplome']>;
};

export type DiplomeSteelFormGroup = FormGroup<DiplomeSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DiplomeSteelFormService {
  createDiplomeSteelFormGroup(diplome: DiplomeSteelFormGroupInput = { id: null }): DiplomeSteelFormGroup {
    const diplomeRawValue = {
      ...this.getFormDefaults(),
      ...diplome,
    };
    return new FormGroup<DiplomeSteelFormGroupContent>({
      id: new FormControl(
        { value: diplomeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codeDiplome: new FormControl(diplomeRawValue.codeDiplome, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      intDiplome: new FormControl(diplomeRawValue.intDiplome),
    });
  }

  getDiplomeSteel(form: DiplomeSteelFormGroup): IDiplomeSteel | NewDiplomeSteel {
    return form.getRawValue() as IDiplomeSteel | NewDiplomeSteel;
  }

  resetForm(form: DiplomeSteelFormGroup, diplome: DiplomeSteelFormGroupInput): void {
    const diplomeRawValue = { ...this.getFormDefaults(), ...diplome };
    form.reset(
      {
        ...diplomeRawValue,
        id: { value: diplomeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DiplomeSteelFormDefaults {
    return {
      id: null,
    };
  }
}
