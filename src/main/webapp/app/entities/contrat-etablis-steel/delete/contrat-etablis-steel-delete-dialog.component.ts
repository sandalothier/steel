import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import { ContratEtablisSteelService } from '../service/contrat-etablis-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './contrat-etablis-steel-delete-dialog.component.html',
})
export class ContratEtablisSteelDeleteDialogComponent {
  contratEtablis?: IContratEtablisSteel;

  constructor(protected contratEtablisService: ContratEtablisSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contratEtablisService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
