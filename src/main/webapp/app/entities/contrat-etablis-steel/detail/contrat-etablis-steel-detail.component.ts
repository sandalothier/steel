import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContratEtablisSteel } from '../contrat-etablis-steel.model';

@Component({
  selector: 'jhi-contrat-etablis-steel-detail',
  templateUrl: './contrat-etablis-steel-detail.component.html',
})
export class ContratEtablisSteelDetailComponent implements OnInit {
  contratEtablis: IContratEtablisSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contratEtablis }) => {
      this.contratEtablis = contratEtablis;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
