import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EmployeSteelFormService, EmployeSteelFormGroup } from './employe-steel-form.service';
import { IEmployeSteel } from '../employe-steel.model';
import { EmployeSteelService } from '../service/employe-steel.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDiplomeSteel } from 'app/entities/diplome-steel/diplome-steel.model';
import { DiplomeSteelService } from 'app/entities/diplome-steel/service/diplome-steel.service';
import { IAdresseSteel } from 'app/entities/adresse-steel/adresse-steel.model';
import { AdresseSteelService } from 'app/entities/adresse-steel/service/adresse-steel.service';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { SocieteSteelService } from 'app/entities/societe-steel/service/societe-steel.service';
import { Sexe } from 'app/entities/enumerations/sexe.model';
import { SituationMatrimoniale } from 'app/entities/enumerations/situation-matrimoniale.model';

@Component({
  selector: 'jhi-employe-steel-update',
  templateUrl: './employe-steel-update.component.html',
})
export class EmployeSteelUpdateComponent implements OnInit {
  isSaving = false;
  employe: IEmployeSteel | null = null;
  sexeValues = Object.keys(Sexe);
  situationMatrimonialeValues = Object.keys(SituationMatrimoniale);

  diplomesSharedCollection: IDiplomeSteel[] = [];
  adressesSharedCollection: IAdresseSteel[] = [];
  societesSharedCollection: ISocieteSteel[] = [];

  editForm: EmployeSteelFormGroup = this.employeFormService.createEmployeSteelFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected employeService: EmployeSteelService,
    protected employeFormService: EmployeSteelFormService,
    protected diplomeService: DiplomeSteelService,
    protected adresseService: AdresseSteelService,
    protected societeService: SocieteSteelService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDiplomeSteel = (o1: IDiplomeSteel | null, o2: IDiplomeSteel | null): boolean => this.diplomeService.compareDiplomeSteel(o1, o2);

  compareAdresseSteel = (o1: IAdresseSteel | null, o2: IAdresseSteel | null): boolean => this.adresseService.compareAdresseSteel(o1, o2);

  compareSocieteSteel = (o1: ISocieteSteel | null, o2: ISocieteSteel | null): boolean => this.societeService.compareSocieteSteel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.employe = employe;
      if (employe) {
        this.updateForm(employe);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('steelApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employe = this.employeFormService.getEmployeSteel(this.editForm);
    if (employe.id !== null) {
      this.subscribeToSaveResponse(this.employeService.update(employe));
    } else {
      this.subscribeToSaveResponse(this.employeService.create(employe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeSteel>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employe: IEmployeSteel): void {
    this.employe = employe;
    this.employeFormService.resetForm(this.editForm, employe);

    this.diplomesSharedCollection = this.diplomeService.addDiplomeSteelToCollectionIfMissing<IDiplomeSteel>(
      this.diplomesSharedCollection,
      employe.codeDiplome
    );
    this.adressesSharedCollection = this.adresseService.addAdresseSteelToCollectionIfMissing<IAdresseSteel>(
      this.adressesSharedCollection,
      employe.cel
    );
    this.societesSharedCollection = this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(
      this.societesSharedCollection,
      employe.societe
    );
  }

  protected loadRelationshipsOptions(): void {
    this.diplomeService
      .query()
      .pipe(map((res: HttpResponse<IDiplomeSteel[]>) => res.body ?? []))
      .pipe(
        map((diplomes: IDiplomeSteel[]) =>
          this.diplomeService.addDiplomeSteelToCollectionIfMissing<IDiplomeSteel>(diplomes, this.employe?.codeDiplome)
        )
      )
      .subscribe((diplomes: IDiplomeSteel[]) => (this.diplomesSharedCollection = diplomes));

    this.adresseService
      .query()
      .pipe(map((res: HttpResponse<IAdresseSteel[]>) => res.body ?? []))
      .pipe(
        map((adresses: IAdresseSteel[]) =>
          this.adresseService.addAdresseSteelToCollectionIfMissing<IAdresseSteel>(adresses, this.employe?.cel)
        )
      )
      .subscribe((adresses: IAdresseSteel[]) => (this.adressesSharedCollection = adresses));

    this.societeService
      .query()
      .pipe(map((res: HttpResponse<ISocieteSteel[]>) => res.body ?? []))
      .pipe(
        map((societes: ISocieteSteel[]) =>
          this.societeService.addSocieteSteelToCollectionIfMissing<ISocieteSteel>(societes, this.employe?.societe)
        )
      )
      .subscribe((societes: ISocieteSteel[]) => (this.societesSharedCollection = societes));
  }
}
