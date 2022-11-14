import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PosteSteelComponent } from '../list/poste-steel.component';
import { PosteSteelDetailComponent } from '../detail/poste-steel-detail.component';
import { PosteSteelUpdateComponent } from '../update/poste-steel-update.component';
import { PosteSteelRoutingResolveService } from './poste-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const posteRoute: Routes = [
  {
    path: '',
    component: PosteSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PosteSteelDetailComponent,
    resolve: {
      poste: PosteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PosteSteelUpdateComponent,
    resolve: {
      poste: PosteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PosteSteelUpdateComponent,
    resolve: {
      poste: PosteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(posteRoute)],
  exports: [RouterModule],
})
export class PosteSteelRoutingModule {}
