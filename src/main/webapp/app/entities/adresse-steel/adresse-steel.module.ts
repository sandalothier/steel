import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdresseSteelComponent } from './list/adresse-steel.component';
import { AdresseSteelDetailComponent } from './detail/adresse-steel-detail.component';
import { AdresseSteelUpdateComponent } from './update/adresse-steel-update.component';
import { AdresseSteelDeleteDialogComponent } from './delete/adresse-steel-delete-dialog.component';
import { AdresseSteelRoutingModule } from './route/adresse-steel-routing.module';

@NgModule({
  imports: [SharedModule, AdresseSteelRoutingModule],
  declarations: [AdresseSteelComponent, AdresseSteelDetailComponent, AdresseSteelUpdateComponent, AdresseSteelDeleteDialogComponent],
})
export class AdresseSteelModule {}
