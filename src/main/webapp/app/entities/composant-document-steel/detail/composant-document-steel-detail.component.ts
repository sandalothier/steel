import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComposantDocumentSteel } from '../composant-document-steel.model';

@Component({
  selector: 'jhi-composant-document-steel-detail',
  templateUrl: './composant-document-steel-detail.component.html',
})
export class ComposantDocumentSteelDetailComponent implements OnInit {
  composantDocument: IComposantDocumentSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ composantDocument }) => {
      this.composantDocument = composantDocument;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
