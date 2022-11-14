import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PosteSteelFormService, PosteSteelFormGroup } from './poste-steel-form.service';
import { IPosteSteel } from '../poste-steel.model';
import { PosteSteelService } from '../service/poste-steel.service';
import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';
import { EmployeSteelService } from 'app/entities/employe-steel/service/employe-steel.service';

@Component({
  selector: 'jhi-poste-steel-update',
  templateUrl: './poste-steel-update.component.html',
})
export class PosteSteelUpdateComponent implements OnInit {
  isSaving = false;
  poste: IPosteSteel | null = null;

  employesSharedCollection: IEmployeSteel[] = [];

  editForm: PosteSteelFormGroup = this.posteFormService.createPosteSteelFormGroup();

  constructor(
    protected posteService: PosteSteelService,
    protected posteFormService: PosteSteelFormService,
    protected employeService: EmployeSteelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployeSteel = (o1: IEmployeSteel | null, o2: IEmployeSteel | null): boolean => this.employeService.compareEmployeSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ poste }) => {
      this.poste = poste;
      if (poste) {
        this.updateForm(poste);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const poste = this.posteFormService.getPosteSteel(this.editForm);
    if (poste.id !== null) {
      this.subscribeToSaveResponse(this.posteService.update(poste));
    } else {
      this.subscribeToSaveResponse(this.posteService.create(poste));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosteSteel>>): void {
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

  protected updateForm(poste: IPosteSteel): void {
    this.poste = poste;
    this.posteFormService.resetForm(this.editForm, poste);

    this.employesSharedCollection = this.employeService.addEmployeSteelToCollectionIfMissing<IEmployeSteel>(
      this.employesSharedCollection,
      poste.nomActeur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeSteel[]>) => res.body ?? []))
      .pipe(
        map((employes: IEmployeSteel[]) =>
          this.employeService.addEmployeSteelToCollectionIfMissing<IEmployeSteel>(employes, this.poste?.nomActeur)
        )
      )
      .subscribe((employes: IEmployeSteel[]) => (this.employesSharedCollection = employes));
  }
}
