import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeContratDeTravailSteelComponent } from '../list/type-contrat-de-travail-steel.component';
import { TypeContratDeTravailSteelDetailComponent } from '../detail/type-contrat-de-travail-steel-detail.component';
import { TypeContratDeTravailSteelUpdateComponent } from '../update/type-contrat-de-travail-steel-update.component';
import { TypeContratDeTravailSteelRoutingResolveService } from './type-contrat-de-travail-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typeContratDeTravailRoute: Routes = [
  {
    path: '',
    component: TypeContratDeTravailSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeContratDeTravailSteelDetailComponent,
    resolve: {
      typeContratDeTravail: TypeContratDeTravailSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeContratDeTravailSteelUpdateComponent,
    resolve: {
      typeContratDeTravail: TypeContratDeTravailSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeContratDeTravailSteelUpdateComponent,
    resolve: {
      typeContratDeTravail: TypeContratDeTravailSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeContratDeTravailRoute)],
  exports: [RouterModule],
})
export class TypeContratDeTravailSteelRoutingModule {}
