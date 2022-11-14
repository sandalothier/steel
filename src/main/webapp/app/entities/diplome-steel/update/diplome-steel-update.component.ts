import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DiplomeSteelFormService, DiplomeSteelFormGroup } from './diplome-steel-form.service';
import { IDiplomeSteel } from '../diplome-steel.model';
import { DiplomeSteelService } from '../service/diplome-steel.service';

@Component({
  selector: 'jhi-diplome-steel-update',
  templateUrl: './diplome-steel-update.component.html',
})
export class DiplomeSteelUpdateComponent implements OnInit {
  isSaving = false;
  diplome: IDiplomeSteel | null = null;

  editForm: DiplomeSteelFormGroup = this.diplomeFormService.createDiplomeSteelFormGroup();

  constructor(
    protected diplomeService: DiplomeSteelService,
    protected diplomeFormService: DiplomeSteelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      this.diplome = diplome;
      if (diplome) {
        this.updateForm(diplome);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diplome = this.diplomeFormService.getDiplomeSteel(this.editForm);
    if (diplome.id !== null) {
      this.subscribeToSaveResponse(this.diplomeService.update(diplome));
    } else {
      this.subscribeToSaveResponse(this.diplomeService.create(diplome));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiplomeSteel>>): void {
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

  protected updateForm(diplome: IDiplomeSteel): void {
    this.diplome = diplome;
    this.diplomeFormService.resetForm(this.editForm, diplome);
  }
}
