import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContratEtablisSteel, NewContratEtablisSteel } from '../contrat-etablis-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContratEtablisSteel for edit and NewContratEtablisSteelFormGroupInput for create.
 */
type ContratEtablisSteelFormGroupInput = IContratEtablisSteel | PartialWithRequiredKeyOf<NewContratEtablisSteel>;

type ContratEtablisSteelFormDefaults = Pick<NewContratEtablisSteel, 'id'>;

type ContratEtablisSteelFormGroupContent = {
  id: FormControl<IContratEtablisSteel['id'] | NewContratEtablisSteel['id']>;
  dateEtablissement: FormControl<IContratEtablisSteel['dateEtablissement']>;
  nomActeur: FormControl<IContratEtablisSteel['nomActeur']>;
  intTypeContrat: FormControl<IContratEtablisSteel['intTypeContrat']>;
};

export type ContratEtablisSteelFormGroup = FormGroup<ContratEtablisSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContratEtablisSteelFormService {
  createContratEtablisSteelFormGroup(contratEtablis: ContratEtablisSteelFormGroupInput = { id: null }): ContratEtablisSteelFormGroup {
    const contratEtablisRawValue = {
      ...this.getFormDefaults(),
      ...contratEtablis,
    };
    return new FormGroup<ContratEtablisSteelFormGroupContent>({
      id: new FormControl(
        { value: contratEtablisRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dateEtablissement: new FormControl(contratEtablisRawValue.dateEtablissement),
      nomActeur: new FormControl(contratEtablisRawValue.nomActeur),
      intTypeContrat: new FormControl(contratEtablisRawValue.intTypeContrat),
    });
  }

  getContratEtablisSteel(form: ContratEtablisSteelFormGroup): IContratEtablisSteel | NewContratEtablisSteel {
    return form.getRawValue() as IContratEtablisSteel | NewContratEtablisSteel;
  }

  resetForm(form: ContratEtablisSteelFormGroup, contratEtablis: ContratEtablisSteelFormGroupInput): void {
    const contratEtablisRawValue = { ...this.getFormDefaults(), ...contratEtablis };
    form.reset(
      {
        ...contratEtablisRawValue,
        id: { value: contratEtablisRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContratEtablisSteelFormDefaults {
    return {
      id: null,
    };
  }
}
