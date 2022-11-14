import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdresseSteel } from '../adresse-steel.model';

@Component({
  selector: 'jhi-adresse-steel-detail',
  templateUrl: './adresse-steel-detail.component.html',
})
export class AdresseSteelDetailComponent implements OnInit {
  adresse: IAdresseSteel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adresse }) => {
      this.adresse = adresse;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
