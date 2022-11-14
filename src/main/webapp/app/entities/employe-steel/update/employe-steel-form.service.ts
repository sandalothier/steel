import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmployeSteel, NewEmployeSteel } from '../employe-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployeSteel for edit and NewEmployeSteelFormGroupInput for create.
 */
type EmployeSteelFormGroupInput = IEmployeSteel | PartialWithRequiredKeyOf<NewEmployeSteel>;

type EmployeSteelFormDefaults = Pick<NewEmployeSteel, 'id'>;

type EmployeSteelFormGroupContent = {
  id: FormControl<IEmployeSteel['id'] | NewEmployeSteel['id']>;
  sexe: FormControl<IEmployeSteel['sexe']>;
  nomActeur: FormControl<IEmployeSteel['nomActeur']>;
  prenomsActeur: FormControl<IEmployeSteel['prenomsActeur']>;
  dateNaissance: FormControl<IEmployeSteel['dateNaissance']>;
  lieuNaissance: FormControl<IEmployeSteel['lieuNaissance']>;
  situationMatrimoniale: FormControl<IEmployeSteel['situationMatrimoniale']>;
  photo: FormControl<IEmployeSteel['photo']>;
  photoContentType: FormControl<IEmployeSteel['photoContentType']>;
  paysOrigine: FormControl<IEmployeSteel['paysOrigine']>;
  codeDiplome: FormControl<IEmployeSteel['codeDiplome']>;
  cel: FormControl<IEmployeSteel['cel']>;
  societe: FormControl<IEmployeSteel['societe']>;
};

export type EmployeSteelFormGroup = FormGroup<EmployeSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeSteelFormService {
  createEmployeSteelFormGroup(employe: EmployeSteelFormGroupInput = { id: null }): EmployeSteelFormGroup {
    const employeRawValue = {
      ...this.getFormDefaults(),
      ...employe,
    };
    return new FormGroup<EmployeSteelFormGroupContent>({
      id: new FormControl(
        { value: employeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sexe: new FormControl(employeRawValue.sexe, {
        validators: [Validators.required],
      }),
      nomActeur: new FormControl(employeRawValue.nomActeur, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      prenomsActeur: new FormControl(employeRawValue.prenomsActeur, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      dateNaissance: new FormControl(employeRawValue.dateNaissance),
      lieuNaissance: new FormControl(employeRawValue.lieuNaissance, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      situationMatrimoniale: new FormControl(employeRawValue.situationMatrimoniale),
      photo: new FormControl(employeRawValue.photo),
      photoContentType: new FormControl(employeRawValue.photoContentType),
      paysOrigine: new FormControl(employeRawValue.paysOrigine),
      codeDiplome: new FormControl(employeRawValue.codeDiplome),
      cel: new FormControl(employeRawValue.cel),
      societe: new FormControl(employeRawValue.societe),
    });
  }

  getEmployeSteel(form: EmployeSteelFormGroup): IEmployeSteel | NewEmployeSteel {
    return form.getRawValue() as IEmployeSteel | NewEmployeSteel;
  }

  resetForm(form: EmployeSteelFormGroup, employe: EmployeSteelFormGroupInput): void {
    const employeRawValue = { ...this.getFormDefaults(), ...employe };
    form.reset(
      {
        ...employeRawValue,
        id: { value: employeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeSteelFormDefaults {
    return {
      id: null,
    };
  }
}
