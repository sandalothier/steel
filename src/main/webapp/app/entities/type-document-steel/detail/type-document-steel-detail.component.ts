import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeDocumentSteel } from '../type-document-steel.model';

@Component({
  selector: 'jhi-type-document-steel-detail',
  templateUrl: './type-document-steel-detail.component.html',
})
export class TypeDocumentSteelDetailComponent implements OnInit {
  typeDocument: ITypeDocumentSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
