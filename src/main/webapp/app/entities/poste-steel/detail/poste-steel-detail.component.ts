import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPosteSteel } from '../poste-steel.model';

@Component({
  selector: 'jhi-poste-steel-detail',
  templateUrl: './poste-steel-detail.component.html',
})
export class PosteSteelDetailComponent implements OnInit {
  poste: IPosteSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ poste }) => {
      this.poste = poste;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
