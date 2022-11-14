jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';

import { TypeContratDeTravailSteelDeleteDialogComponent } from './type-contrat-de-travail-steel-delete-dialog.component';

describe('TypeContratDeTravailSteel Management Delete Component', () => {
  let comp: TypeContratDeTravailSteelDeleteDialogComponent;
  let fixture: ComponentFixture<TypeContratDeTravailSteelDeleteDialogComponent>;
  let service: TypeContratDeTravailSteelService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TypeContratDeTravailSteelDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(TypeContratDeTravailSteelDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeContratDeTravailSteelDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TypeContratDeTravailSteelService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
