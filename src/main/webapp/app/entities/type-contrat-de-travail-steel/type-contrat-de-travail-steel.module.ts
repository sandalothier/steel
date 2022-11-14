import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeContratDeTravailSteelComponent } from './list/type-contrat-de-travail-steel.component';
import { TypeContratDeTravailSteelDetailComponent } from './detail/type-contrat-de-travail-steel-detail.component';
import { TypeContratDeTravailSteelUpdateComponent } from './update/type-contrat-de-travail-steel-update.component';
import { TypeContratDeTravailSteelDeleteDialogComponent } from './delete/type-contrat-de-travail-steel-delete-dialog.component';
import { TypeContratDeTravailSteelRoutingModule } from './route/type-contrat-de-travail-steel-routing.module';

@NgModule({
  imports: [SharedModule, TypeContratDeTravailSteelRoutingModule],
  declarations: [
    TypeContratDeTravailSteelComponent,
    TypeContratDeTravailSteelDetailComponent,
    TypeContratDeTravailSteelUpdateComponent,
    TypeContratDeTravailSteelDeleteDialogComponent,
  ],
})
export class TypeContratDeTravailSteelModule {}
