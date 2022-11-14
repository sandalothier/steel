import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ComposantDocumentSteelFormService, ComposantDocumentSteelFormGroup } from './composant-document-steel-form.service';
import { IComposantDocumentSteel } from '../composant-document-steel.model';
import { ComposantDocumentSteelService } from '../service/composant-document-steel.service';
import { ITypeDocumentSteel } from 'app/entities/type-document-steel/type-document-steel.model';
import { TypeDocumentSteelService } from 'app/entities/type-document-steel/service/type-document-steel.service';

@Component({
  selector: 'jhi-composant-document-steel-update',
  templateUrl: './composant-document-steel-update.component.html',
})
export class ComposantDocumentSteelUpdateComponent implements OnInit {
  isSaving = false;
  composantDocument: IComposantDocumentSteel | null = null;

  typeDocumentsSharedCollection: ITypeDocumentSteel[] = [];

  editForm: ComposantDocumentSteelFormGroup = this.composantDocumentFormService.createComposantDocumentSteelFormGroup();

  constructor(
    protected composantDocumentService: ComposantDocumentSteelService,
    protected composantDocumentFormService: ComposantDocumentSteelFormService,
    protected typeDocumentService: TypeDocumentSteelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTypeDocumentSteel = (o1: ITypeDocumentSteel | null, o2: ITypeDocumentSteel | null): boolean =>
    this.typeDocumentService.compareTypeDocumentSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ composantDocument }) => {
      this.composantDocument = composantDocument;
      if (composantDocument) {
        this.updateForm(composantDocument);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const composantDocument = this.composantDocumentFormService.getComposantDocumentSteel(this.editForm);
    if (composantDocument.id !== null) {
      this.subscribeToSaveResponse(this.composantDocumentService.update(composantDocument));
    } else {
      this.subscribeToSaveResponse(this.composantDocumentService.create(composantDocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComposantDocumentSteel>>): void {
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

  protected updateForm(composantDocument: IComposantDocumentSteel): void {
    this.composantDocument = composantDocument;
    this.composantDocumentFormService.resetForm(this.editForm, composantDocument);

    this.typeDocumentsSharedCollection = this.typeDocumentService.addTypeDocumentSteelToCollectionIfMissing<ITypeDocumentSteel>(
      this.typeDocumentsSharedCollection,
      composantDocument.intTypeDoc
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typeDocumentService
      .query()
      .pipe(map((res: HttpResponse<ITypeDocumentSteel[]>) => res.body ?? []))
      .pipe(
        map((typeDocuments: ITypeDocumentSteel[]) =>
          this.typeDocumentService.addTypeDocumentSteelToCollectionIfMissing<ITypeDocumentSteel>(
            typeDocuments,
            this.composantDocument?.intTypeDoc
          )
        )
      )
      .subscribe((typeDocuments: ITypeDocumentSteel[]) => (this.typeDocumentsSharedCollection = typeDocuments));
  }
}
