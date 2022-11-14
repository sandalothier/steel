import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISocieteSteel } from '../societe-steel.model';

@Component({
  selector: 'jhi-societe-steel-detail',
  templateUrl: './societe-steel-detail.component.html',
})
export class SocieteSteelDetailComponent implements OnInit {
  societe: ISocieteSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ societe }) => {
      this.societe = societe;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
