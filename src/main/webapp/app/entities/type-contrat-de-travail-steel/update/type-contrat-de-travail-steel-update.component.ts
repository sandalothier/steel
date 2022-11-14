import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TypeContratDeTravailSteelFormService, TypeContratDeTravailSteelFormGroup } from './type-contrat-de-travail-steel-form.service';
import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';

@Component({
  selector: 'jhi-type-contrat-de-travail-steel-update',
  templateUrl: './type-contrat-de-travail-steel-update.component.html',
})
export class TypeContratDeTravailSteelUpdateComponent implements OnInit {
  isSaving = false;
  typeContratDeTravail: ITypeContratDeTravailSteel | null = null;

  editForm: TypeContratDeTravailSteelFormGroup = this.typeContratDeTravailFormService.createTypeContratDeTravailSteelFormGroup();

  constructor(
    protected typeContratDeTravailService: TypeContratDeTravailSteelService,
    protected typeContratDeTravailFormService: TypeContratDeTravailSteelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeContratDeTravail }) => {
      this.typeContratDeTravail = typeContratDeTravail;
      if (typeContratDeTravail) {
        this.updateForm(typeContratDeTravail);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeContratDeTravail = this.typeContratDeTravailFormService.getTypeContratDeTravailSteel(this.editForm);
    if (typeContratDeTravail.id !== null) {
      this.subscribeToSaveResponse(this.typeContratDeTravailService.update(typeContratDeTravail));
    } else {
      this.subscribeToSaveResponse(this.typeContratDeTravailService.create(typeContratDeTravail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeContratDeTravailSteel>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(typeContratDeTravail: ITypeContratDeTravailSteel): void {
    this.typeContratDeTravail = typeContratDeTravail;
    this.typeContratDeTravailFormService.resetForm(this.editForm, typeContratDeTravail);
  }
}
