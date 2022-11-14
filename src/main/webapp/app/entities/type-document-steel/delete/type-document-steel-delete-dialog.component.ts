import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeDocumentSteel } from '../type-document-steel.model';
import { TypeDocumentSteelService } from '../service/type-document-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './type-document-steel-delete-dialog.component.html',
})
export class TypeDocumentSteelDeleteDialogComponent {
  typeDocument?: ITypeDocumentSteel;

  constructor(protected typeDocumentService: TypeDocumentSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeDocumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
