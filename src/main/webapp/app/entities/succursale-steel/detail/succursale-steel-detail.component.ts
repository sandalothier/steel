import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuccursaleSteel } from '../succursale-steel.model';

@Component({
  selector: 'jhi-succursale-steel-detail',
  templateUrl: './succursale-steel-detail.component.html',
})
export class SuccursaleSteelDetailComponent implements OnInit {
  succursale: ISuccursaleSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ succursale }) => {
      this.succursale = succursale;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
