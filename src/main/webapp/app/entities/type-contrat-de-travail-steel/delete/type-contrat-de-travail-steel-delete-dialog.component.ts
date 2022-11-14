import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './type-contrat-de-travail-steel-delete-dialog.component.html',
})
export class TypeContratDeTravailSteelDeleteDialogComponent {
  typeContratDeTravail?: ITypeContratDeTravailSteel;

  constructor(protected typeContratDeTravailService: TypeContratDeTravailSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeContratDeTravailService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
