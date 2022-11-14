import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContratEtablisSteelComponent } from './list/contrat-etablis-steel.component';
import { ContratEtablisSteelDetailComponent } from './detail/contrat-etablis-steel-detail.component';
import { ContratEtablisSteelUpdateComponent } from './update/contrat-etablis-steel-update.component';
import { ContratEtablisSteelDeleteDialogComponent } from './delete/contrat-etablis-steel-delete-dialog.component';
import { ContratEtablisSteelRoutingModule } from './route/contrat-etablis-steel-routing.module';

@NgModule({
  imports: [SharedModule, ContratEtablisSteelRoutingModule],
  declarations: [
    ContratEtablisSteelComponent,
    ContratEtablisSteelDetailComponent,
    ContratEtablisSteelUpdateComponent,
    ContratEtablisSteelDeleteDialogComponent,
  ],
})
export class ContratEtablisSteelModule {}
