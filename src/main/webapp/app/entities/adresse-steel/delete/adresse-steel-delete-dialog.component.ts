import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdresseSteel } from '../adresse-steel.model';
import { AdresseSteelService } from '../service/adresse-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './adresse-steel-delete-dialog.component.html',
})
export class AdresseSteelDeleteDialogComponent {
  adresse?: IAdresseSteel;

  constructor(protected adresseService: AdresseSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adresseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
