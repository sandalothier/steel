import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DiplomeSteelComponent } from '../list/diplome-steel.component';
import { DiplomeSteelDetailComponent } from '../detail/diplome-steel-detail.component';
import { DiplomeSteelUpdateComponent } from '../update/diplome-steel-update.component';
import { DiplomeSteelRoutingResolveService } from './diplome-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const diplomeRoute: Routes = [
  {
    path: '',
    component: DiplomeSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiplomeSteelDetailComponent,
    resolve: {
      diplome: DiplomeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiplomeSteelUpdateComponent,
    resolve: {
      diplome: DiplomeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiplomeSteelUpdateComponent,
    resolve: {
      diplome: DiplomeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(diplomeRoute)],
  exports: [RouterModule],
})
export class DiplomeSteelRoutingModule {}
