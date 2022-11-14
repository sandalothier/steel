import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SuccursaleSteelFormService, SuccursaleSteelFormGroup } from './succursale-steel-form.service';
import { ISuccursaleSteel } from '../succursale-steel.model';
import { SuccursaleSteelService } from '../service/succursale-steel.service';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';

@Component({
  selector: 'jhi-succursale-steel-update',
  templateUrl: './succursale-steel-update.component.html',
})
export class SuccursaleSteelUpdateComponent implements OnInit {
  isSaving = false;
  succursale: ISuccursaleSteel | null = null;

  societesSharedCollection: ISocieteSteel[] = [];

  editForm: SuccursaleSteelFormGroup = this.succursaleFormService.createSuccursaleSteelFormGroup();

  constructor(
    protected succursaleService: SuccursaleSteelService,
    protected succursaleFormService: SuccursaleSteelFormService,
    protected societeService: SocieteSteelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSocieteSteel = (o1: ISocieteSteel | null, o2: ISocieteSteel | null): boolean => this.societeService.compareSocieteSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ succursale }) => {
      this.succursale = succursale;
      if (succursale) {
        this.updateForm(succursale);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const succursale = this.succursaleFormService.getSuccursaleSteel(this.editForm);
    if (succursale.id !== null) {
      this.subscribeToSaveResponse(this.succursaleService.update(succursale));
    } else {
      this.subscribeToSaveResponse(this.succursaleService.create(succursale));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuccursaleSteel>>): void {
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

  protected updateForm(succursale: ISuccursaleSteel): void {
    this.succursale = succursale;
    this.succursaleFormService.resetForm(this.editForm, succursale);

    this.societesSharedCollection = this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(
      this.societesSharedCollection,
      succursale.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISocieteSteel[]>) => res.body ?? []))
      .pipe(
        map((societes: ISocieteSteel[]) =>
          this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(societes, this.succursale?.societe)
        )
      )
      .subscribe((societes: ISocieteSteel[]) => (this.societesSharedCollection = societes));
  }
}
