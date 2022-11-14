import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../type-contrat-de-travail-steel.test-samples';

import { TypeContratDeTravailSteelService } from './type-contrat-de-travail-steel.service';

const requireRestSample: ITypeContratDeTravailSteel = {
  ...sampleWithRequiredData,
};

describe('TypeContratDeTravailSteel Service', () => {
  let service: TypeContratDeTravailSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: ITypeContratDeTravailSteel | ITypeContratDeTravailSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypeContratDeTravailSteelService);
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

    it('should create a TypeContratDeTravailSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const typeContratDeTravail = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(typeContratDeTravail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypeContratDeTravailSteel', () => {
      const typeContratDeTravail = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(typeContratDeTravail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypeContratDeTravailSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypeContratDeTravailSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TypeContratDeTravailSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTypeContratDeTravailSteelToCollectionIfMissing', () => {
      it('should add a TypeContratDeTravailSteel to an empty array', () => {
        const typeContratDeTravail: ITypeContratDeTravailSteel = sampleWithRequiredData;
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing([], typeContratDeTravail);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeContratDeTravail);
      });

      it('should not add a TypeContratDeTravailSteel to an array that contains it', () => {
        const typeContratDeTravail: ITypeContratDeTravailSteel = sampleWithRequiredData;
        const typeContratDeTravailCollection: ITypeContratDeTravailSteel[] = [
          {
            ...typeContratDeTravail,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing(typeContratDeTravailCollection, typeContratDeTravail);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypeContratDeTravailSteel to an array that doesn't contain it", () => {
        const typeContratDeTravail: ITypeContratDeTravailSteel = sampleWithRequiredData;
        const typeContratDeTravailCollection: ITypeContratDeTravailSteel[] = [sampleWithPartialData];
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing(typeContratDeTravailCollection, typeContratDeTravail);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeContratDeTravail);
      });

      it('should add only unique TypeContratDeTravailSteel to an array', () => {
        const typeContratDeTravailArray: ITypeContratDeTravailSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const typeContratDeTravailCollection: ITypeContratDeTravailSteel[] = [sampleWithRequiredData];
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing(
          typeContratDeTravailCollection,
          ...typeContratDeTravailArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typeContratDeTravail: ITypeContratDeTravailSteel = sampleWithRequiredData;
        const typeContratDeTravail2: ITypeContratDeTravailSteel = sampleWithPartialData;
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing([], typeContratDeTravail, typeContratDeTravail2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeContratDeTravail);
        expect(expectedResult).toContain(typeContratDeTravail2);
      });

      it('should accept null and undefined values', () => {
        const typeContratDeTravail: ITypeContratDeTravailSteel = sampleWithRequiredData;
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing([], null, typeContratDeTravail, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeContratDeTravail);
      });

      it('should return initial array if no TypeContratDeTravailSteel is added', () => {
        const typeContratDeTravailCollection: ITypeContratDeTravailSteel[] = [sampleWithRequiredData];
        expectedResult = service.addTypeContratDeTravailSteelToCollectionIfMissing(typeContratDeTravailCollection, undefined, null);
        expect(expectedResult).toEqual(typeContratDeTravailCollection);
      });
    });

    describe('compareTypeContratDeTravailSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTypeContratDeTravailSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTypeContratDeTravailSteel(entity1, entity2);
        const compareResult2 = service.compareTypeContratDeTravailSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTypeContratDeTravailSteel(entity1, entity2);
        const compareResult2 = service.compareTypeContratDeTravailSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTypeContratDeTravailSteel(entity1, entity2);
        const compareResult2 = service.compareTypeContratDeTravailSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
