import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContratEtablisSteelComponent } from '../list/contrat-etablis-steel.component';
import { ContratEtablisSteelDetailComponent } from '../detail/contrat-etablis-steel-detail.component';
import { ContratEtablisSteelUpdateComponent } from '../update/contrat-etablis-steel-update.component';
import { ContratEtablisSteelRoutingResolveService } from './contrat-etablis-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const contratEtablisRoute: Routes = [
  {
    path: '',
    component: ContratEtablisSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContratEtablisSteelDetailComponent,
    resolve: {
      contratEtablis: ContratEtablisSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContratEtablisSteelUpdateComponent,
    resolve: {
      contratEtablis: ContratEtablisSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContratEtablisSteelUpdateComponent,
    resolve: {
      contratEtablis: ContratEtablisSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contratEtablisRoute)],
  exports: [RouterModule],
})
export class ContratEtablisSteelRoutingModule {}
