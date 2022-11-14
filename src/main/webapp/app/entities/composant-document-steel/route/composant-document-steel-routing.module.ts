import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComposantDocumentSteelComponent } from '../list/composant-document-steel.component';
import { ComposantDocumentSteelDetailComponent } from '../detail/composant-document-steel-detail.component';
import { ComposantDocumentSteelUpdateComponent } from '../update/composant-document-steel-update.component';
import { ComposantDocumentSteelRoutingResolveService } from './composant-document-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const composantDocumentRoute: Routes = [
  {
    path: '',
    component: ComposantDocumentSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComposantDocumentSteelDetailComponent,
    resolve: {
      composantDocument: ComposantDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComposantDocumentSteelUpdateComponent,
    resolve: {
      composantDocument: ComposantDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComposantDocumentSteelUpdateComponent,
    resolve: {
      composantDocument: ComposantDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(composantDocumentRoute)],
  exports: [RouterModule],
})
export class ComposantDocumentSteelRoutingModule {}
