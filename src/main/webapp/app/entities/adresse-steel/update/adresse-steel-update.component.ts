import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AdresseSteelFormService, AdresseSteelFormGroup } from './adresse-steel-form.service';
import { IAdresseSteel } from '../adresse-steel.model';
import { AdresseSteelService } from '../service/adresse-steel.service';

@Component({
  selector: 'jhi-adresse-steel-update',
  templateUrl: './adresse-steel-update.component.html',
})
export class AdresseSteelUpdateComponent implements OnInit {
  isSaving = false;
  adresse: IAdresseSteel | null = null;

  editForm: AdresseSteelFormGroup = this.adresseFormService.createAdresseSteelFormGroup();

  constructor(
    protected adresseService: AdresseSteelService,
    protected adresseFormService: AdresseSteelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adresse }) => {
      this.adresse = adresse;
      if (adresse) {
        this.updateForm(adresse);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adresse = this.adresseFormService.getAdresseSteel(this.editForm);
    if (adresse.id !== null) {
      this.subscribeToSaveResponse(this.adresseService.update(adresse));
    } else {
      this.subscribeToSaveResponse(this.adresseService.create(adresse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdresseSteel>>): void {
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

  protected updateForm(adresse: IAdresseSteel): void {
    this.adresse = adresse;
    this.adresseFormService.resetForm(this.editForm, adresse);
  }
}
