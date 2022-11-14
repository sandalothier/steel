import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SocieteSteelFormService, SocieteSteelFormGroup } from './societe-steel-form.service';
import { ISocieteSteel } from '../societe-steel.model';
import { SocieteSteelService } from '../service/societe-steel.service';

@Component({
  selector: 'jhi-societe-steel-update',
  templateUrl: './societe-steel-update.component.html',
})
export class SocieteSteelUpdateComponent implements OnInit {
  isSaving = false;
  societe: ISocieteSteel | null = null;

  editForm: SocieteSteelFormGroup = this.societeFormService.createSocieteSteelFormGroup();

  constructor(
    protected societeService: SocieteSteelService,
    protected societeFormService: SocieteSteelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ societe }) => {
      this.societe = societe;
      if (societe) {
        this.updateForm(societe);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const societe = this.societeFormService.getSocieteSteel(this.editForm);
    if (societe.id !== null) {
      this.subscribeToSaveResponse(this.societeService.update(societe));
    } else {
      this.subscribeToSaveResponse(this.societeService.create(societe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISocieteSteel>>): void {
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

  protected updateForm(societe: ISocieteSteel): void {
    this.societe = societe;
    this.societeFormService.resetForm(this.editForm, societe);
  }
}
