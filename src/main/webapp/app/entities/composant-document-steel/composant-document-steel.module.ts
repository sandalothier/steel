import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComposantDocumentSteelComponent } from './list/composant-document-steel.component';
import { ComposantDocumentSteelDetailComponent } from './detail/composant-document-steel-detail.component';
import { ComposantDocumentSteelUpdateComponent } from './update/composant-document-steel-update.component';
import { ComposantDocumentSteelDeleteDialogComponent } from './delete/composant-document-steel-delete-dialog.component';
import { ComposantDocumentSteelRoutingModule } from './route/composant-document-steel-routing.module';

@NgModule({
  imports: [SharedModule, ComposantDocumentSteelRoutingModule],
  declarations: [
    ComposantDocumentSteelComponent,
    ComposantDocumentSteelDetailComponent,
    ComposantDocumentSteelUpdateComponent,
    ComposantDocumentSteelDeleteDialogComponent,
  ],
})
export class ComposantDocumentSteelModule {}
