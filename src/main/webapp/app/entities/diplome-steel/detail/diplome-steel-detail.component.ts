import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiplomeSteel } from '../diplome-steel.model';

@Component({
  selector: 'jhi-diplome-steel-detail',
  templateUrl: './diplome-steel-detail.component.html',
})
export class DiplomeSteelDetailComponent implements OnInit {
  diplome: IDiplomeSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      this.diplome = diplome;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
