import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';

@Component({
  selector: 'jhi-type-contrat-de-travail-steel-detail',
  templateUrl: './type-contrat-de-travail-steel-detail.component.html',
})
export class TypeContratDeTravailSteelDetailComponent implements OnInit {
  typeContratDeTravail: ITypeContratDeTravailSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeContratDeTravail }) => {
      this.typeContratDeTravail = typeContratDeTravail;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
