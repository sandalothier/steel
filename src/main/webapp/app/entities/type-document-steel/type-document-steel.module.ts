import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeDocumentSteelComponent } from './list/type-document-steel.component';
import { TypeDocumentSteelDetailComponent } from './detail/type-document-steel-detail.component';
import { TypeDocumentSteelUpdateComponent } from './update/type-document-steel-update.component';
import { TypeDocumentSteelDeleteDialogComponent } from './delete/type-document-steel-delete-dialog.component';
import { TypeDocumentSteelRoutingModule } from './route/type-document-steel-routing.module';

@NgModule({
  imports: [SharedModule, TypeDocumentSteelRoutingModule],
  declarations: [
    TypeDocumentSteelComponent,
    TypeDocumentSteelDetailComponent,
    TypeDocumentSteelUpdateComponent,
    TypeDocumentSteelDeleteDialogComponent,
  ],
})
export class TypeDocumentSteelModule {}
