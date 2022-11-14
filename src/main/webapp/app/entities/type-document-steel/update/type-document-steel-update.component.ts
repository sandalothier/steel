import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TypeDocumentSteelFormService, TypeDocumentSteelFormGroup } from './type-document-steel-form.service';
import { ITypeDocumentSteel } from '../type-document-steel.model';
import { TypeDocumentSteelService } from '../service/type-document-steel.service';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';

@Component({
  selector: 'jhi-type-document-steel-update',
  templateUrl: './type-document-steel-update.component.html',
})
export class TypeDocumentSteelUpdateComponent implements OnInit {
  isSaving = false;
  typeDocument: ITypeDocumentSteel | null = null;

  societesSharedCollection: ISocieteSteel[] = [];

  editForm: TypeDocumentSteelFormGroup = this.typeDocumentFormService.createTypeDocumentSteelFormGroup();

  constructor(
    protected typeDocumentService: TypeDocumentSteelService,
    protected typeDocumentFormService: TypeDocumentSteelFormService,
    protected societeService: SocieteSteelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSocieteSteel = (o1: ISocieteSteel | null, o2: ISocieteSteel | null): boolean => this.societeService.compareSocieteSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument;
      if (typeDocument) {
        this.updateForm(typeDocument);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeDocument = this.typeDocumentFormService.getTypeDocumentSteel(this.editForm);
    if (typeDocument.id !== null) {
      this.subscribeToSaveResponse(this.typeDocumentService.update(typeDocument));
    } else {
      this.subscribeToSaveResponse(this.typeDocumentService.create(typeDocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDocumentSteel>>): void {
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

  protected updateForm(typeDocument: ITypeDocumentSteel): void {
    this.typeDocument = typeDocument;
    this.typeDocumentFormService.resetForm(this.editForm, typeDocument);

    this.societesSharedCollection = this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(
      this.societesSharedCollection,
      typeDocument.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISocieteSteel[]>) => res.body ?? []))
      .pipe(
        map((societes: ISocieteSteel[]) =>
          this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(societes, this.typeDocument?.societe)
        )
      )
      .subscribe((societes: ISocieteSteel[]) => (this.societesSharedCollection = societes));
  }
}
