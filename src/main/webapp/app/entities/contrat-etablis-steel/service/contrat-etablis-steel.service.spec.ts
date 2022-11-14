import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../contrat-etablis-steel.test-samples';

import { ContratEtablisSteelService, RestContratEtablisSteel } from './contrat-etablis-steel.service';

const requireRestSample: RestContratEtablisSteel = {
  ...sampleWithRequiredData,
  dateEtablissement: sampleWithRequiredData.dateEtablissement?.format(DATE_FORMAT),
};

describe('ContratEtablisSteel Service', () => {
  let service: ContratEtablisSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: IContratEtablisSteel | IContratEtablisSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContratEtablisSteelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ContratEtablisSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contratEtablis = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contratEtablis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContratEtablisSteel', () => {
      const contratEtablis = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contratEtablis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContratEtablisSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContratEtablisSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContratEtablisSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContratEtablisSteelToCollectionIfMissing', () => {
      it('should add a ContratEtablisSteel to an empty array', () => {
        const contratEtablis: IContratEtablisSteel = sampleWithRequiredData;
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing([], contratEtablis);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contratEtablis);
      });

      it('should not add a ContratEtablisSteel to an array that contains it', () => {
        const contratEtablis: IContratEtablisSteel = sampleWithRequiredData;
        const contratEtablisCollection: IContratEtablisSteel[] = [
          {
            ...contratEtablis,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing(contratEtablisCollection, contratEtablis);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContratEtablisSteel to an array that doesn't contain it", () => {
        const contratEtablis: IContratEtablisSteel = sampleWithRequiredData;
        const contratEtablisCollection: IContratEtablisSteel[] = [sampleWithPartialData];
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing(contratEtablisCollection, contratEtablis);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contratEtablis);
      });

      it('should add only unique ContratEtablisSteel to an array', () => {
        const contratEtablisArray: IContratEtablisSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contratEtablisCollection: IContratEtablisSteel[] = [sampleWithRequiredData];
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing(contratEtablisCollection, ...contratEtablisArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contratEtablis: IContratEtablisSteel = sampleWithRequiredData;
        const contratEtablis2: IContratEtablisSteel = sampleWithPartialData;
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing([], contratEtablis, contratEtablis2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contratEtablis);
        expect(expectedResult).toContain(contratEtablis2);
      });

      it('should accept null and undefined values', () => {
        const contratEtablis: IContratEtablisSteel = sampleWithRequiredData;
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing([], null, contratEtablis, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contratEtablis);
      });

      it('should return initial array if no ContratEtablisSteel is added', () => {
        const contratEtablisCollection: IContratEtablisSteel[] = [sampleWithRequiredData];
        expectedResult = service.addContratEtablisSteelToCollectionIfMissing(contratEtablisCollection, undefined, null);
        expect(expectedResult).toEqual(contratEtablisCollection);
      });
    });

    describe('compareContratEtablisSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContratEtablisSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContratEtablisSteel(entity1, entity2);
        const compareResult2 = service.compareContratEtablisSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContratEtablisSteel(entity1, entity2);
        const compareResult2 = service.compareContratEtablisSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContratEtablisSteel(entity1, entity2);
        const compareResult2 = service.compareContratEtablisSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
