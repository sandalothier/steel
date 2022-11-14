import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AdresseSteelComponent } from '../list/adresse-steel.component';
import { AdresseSteelDetailComponent } from '../detail/adresse-steel-detail.component';
import { AdresseSteelUpdateComponent } from '../update/adresse-steel-update.component';
import { AdresseSteelRoutingResolveService } from './adresse-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const adresseRoute: Routes = [
  {
    path: '',
    component: AdresseSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdresseSteelDetailComponent,
    resolve: {
      adresse: AdresseSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdresseSteelUpdateComponent,
    resolve: {
      adresse: AdresseSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdresseSteelUpdateComponent,
    resolve: {
      adresse: AdresseSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adresseRoute)],
  exports: [RouterModule],
})
export class AdresseSteelRoutingModule {}
