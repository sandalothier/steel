import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContratEtablisSteelFormService, ContratEtablisSteelFormGroup } from './contrat-etablis-steel-form.service';
import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import { ContratEtablisSteelService } from '../service/contrat-etablis-steel.service';
import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';
import { EmployeSteelService } from 'app/entities/employe-steel/service/employe-steel.service';
import { ITypeContratDeTravailSteel } from 'app/entities/type-contrat-de-travail-steel/type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from 'app/entities/type-contrat-de-travail-steel/service/type-contrat-de-travail-steel.service';

@Component({
  selector: 'jhi-contrat-etablis-steel-update',
  templateUrl: './contrat-etablis-steel-update.component.html',
})
export class ContratEtablisSteelUpdateComponent implements OnInit {
  isSaving = false;
  contratEtablis: IContratEtablisSteel | null = null;

  employesSharedCollection: IEmployeSteel[] = [];
  typeContratDeTravailsSharedCollection: ITypeContratDeTravailSteel[] = [];

  editForm: ContratEtablisSteelFormGroup = this.contratEtablisFormService.createContratEtablisSteelFormGroup();

  constructor(
    protected contratEtablisService: ContratEtablisSteelService,
    protected contratEtablisFormService: ContratEtablisSteelFormService,
    protected employeService: EmployeSteelService,
    protected typeContratDeTravailService: TypeContratDeTravailSteelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployeSteel = (o1: IEmployeSteel | null, o2: IEmployeSteel | null): boolean => this.employeService.compareEmployeSteel(o1, o2);

  compareTypeContratDeTravailSteel = (o1: ITypeContratDeTravailSteel | null, o2: ITypeContratDeTravailSteel | null): boolean =>
    this.typeContratDeTravailService.compareTypeContratDeTravailSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contratEtablis }) => {
      this.contratEtablis = contratEtablis;
      if (contratEtablis) {
        this.updateForm(contratEtablis);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contratEtablis = this.contratEtablisFormService.getContratEtablisSteel(this.editForm);
    if (contratEtablis.id !== null) {
      this.subscribeToSaveResponse(this.contratEtablisService.update(contratEtablis));
    } else {
      this.subscribeToSaveResponse(this.contratEtablisService.create(contratEtablis));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContratEtablisSteel>>): void {
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

  protected updateForm(contratEtablis: IContratEtablisSteel): void {
    this.contratEtablis = contratEtablis;
    this.contratEtablisFormService.resetForm(this.editForm, contratEtablis);

    this.employesSharedCollection = this.employeService.addEmployeSteelToCollectionIfMissing<IEmployeSteel>(
      this.employesSharedCollection,
      contratEtablis.nomActeur
    );
    this.typeContratDeTravailsSharedCollection =
      this.typeContratDeTravailService.addTypeContratDeTravailSteelToCollectionIfMissing<ITypeContratDeTravailSteel>(
        this.typeContratDeTravailsSharedCollection,
        contratEtablis.intTypeContrat
      );
  }

  protected loadRelationshipsOptions(): void {
    this.employeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeSteel[]>) => res.body ?? []))
      .pipe(
        map((employes: IEmployeSteel[]) =>
          this.employeService.addEmployeSteelToCollectionIfMissing<IEmployeSteel>(employes, this.contratEtablis?.nomActeur)
        )
      )
      .subscribe((employes: IEmployeSteel[]) => (this.employesSharedCollection = employes));

    this.typeContratDeTravailService
      .query()
      .pipe(map((res: HttpResponse<ITypeContratDeTravailSteel[]>) => res.body ?? []))
      .pipe(
        map((typeContratDeTravails: ITypeContratDeTravailSteel[]) =>
          this.typeContratDeTravailService.addTypeContratDeTravailSteelToCollectionIfMissing<ITypeContratDeTravailSteel>(
            typeContratDeTravails,
            this.contratEtablis?.intTypeContrat
          )
        )
      )
      .subscribe(
        (typeContratDeTravails: ITypeContratDeTravailSteel[]) => (this.typeContratDeTravailsSharedCollection = typeContratDeTravails)
      );
  }
}
