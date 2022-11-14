import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPosteSteel, NewPosteSteel } from '../poste-steel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPosteSteel for edit and NewPosteSteelFormGroupInput for create.
 */
type PosteSteelFormGroupInput = IPosteSteel | PartialWithRequiredKeyOf<NewPosteSteel>;

type PosteSteelFormDefaults = Pick<NewPosteSteel, 'id'>;

type PosteSteelFormGroupContent = {
  id: FormControl<IPosteSteel['id'] | NewPosteSteel['id']>;
  intPoste: FormControl<IPosteSteel['intPoste']>;
  nomActeur: FormControl<IPosteSteel['nomActeur']>;
};

export type PosteSteelFormGroup = FormGroup<PosteSteelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PosteSteelFormService {
  createPosteSteelFormGroup(poste: PosteSteelFormGroupInput = { id: null }): PosteSteelFormGroup {
    const posteRawValue = {
      ...this.getFormDefaults(),
      ...poste,
    };
    return new FormGroup<PosteSteelFormGroupContent>({
      id: new FormControl(
        { value: posteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      intPoste: new FormControl(posteRawValue.intPoste, {
        validators: [Validators.maxLength(25)],
      }),
      nomActeur: new FormControl(posteRawValue.nomActeur),
    });
  }

  getPosteSteel(form: PosteSteelFormGroup): IPosteSteel | NewPosteSteel {
    return form.getRawValue() as IPosteSteel | NewPosteSteel;
  }

  resetForm(form: PosteSteelFormGroup, poste: PosteSteelFormGroupInput): void {
    const posteRawValue = { ...this.getFormDefaults(), ...poste };
    form.reset(
      {
        ...posteRawValue,
        id: { value: posteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PosteSteelFormDefaults {
    return {
      id: null,
    };
  }
}
