import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IComposantDocumentSteel } from '../composant-document-steel.model';
import { ComposantDocumentSteelService } from '../service/composant-document-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './composant-document-steel-delete-dialog.component.html',
})
export class ComposantDocumentSteelDeleteDialogComponent {
  composantDocument?: IComposantDocumentSteel;

  constructor(protected composantDocumentService: ComposantDocumentSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.composantDocumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
