import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDiplomeSteel } from '../diplome-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../diplome-steel.test-samples';

import { DiplomeSteelService } from './diplome-steel.service';

const requireRestSample: IDiplomeSteel = {
  ...sampleWithRequiredData,
};

describe('DiplomeSteel Service', () => {
  let service: DiplomeSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: IDiplomeSteel | IDiplomeSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DiplomeSteelService);
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

    it('should create a DiplomeSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const diplome = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(diplome).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DiplomeSteel', () => {
      const diplome = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(diplome).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DiplomeSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DiplomeSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DiplomeSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDiplomeSteelToCollectionIfMissing', () => {
      it('should add a DiplomeSteel to an empty array', () => {
        const diplome: IDiplomeSteel = sampleWithRequiredData;
        expectedResult = service.addDiplomeSteelToCollectionIfMissing([], diplome);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(diplome);
      });

      it('should not add a DiplomeSteel to an array that contains it', () => {
        const diplome: IDiplomeSteel = sampleWithRequiredData;
        const diplomeCollection: IDiplomeSteel[] = [
          {
            ...diplome,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDiplomeSteelToCollectionIfMissing(diplomeCollection, diplome);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DiplomeSteel to an array that doesn't contain it", () => {
        const diplome: IDiplomeSteel = sampleWithRequiredData;
        const diplomeCollection: IDiplomeSteel[] = [sampleWithPartialData];
        expectedResult = service.addDiplomeSteelToCollectionIfMissing(diplomeCollection, diplome);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(diplome);
      });

      it('should add only unique DiplomeSteel to an array', () => {
        const diplomeArray: IDiplomeSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const diplomeCollection: IDiplomeSteel[] = [sampleWithRequiredData];
        expectedResult = service.addDiplomeSteelToCollectionIfMissing(diplomeCollection, ...diplomeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const diplome: IDiplomeSteel = sampleWithRequiredData;
        const diplome2: IDiplomeSteel = sampleWithPartialData;
        expectedResult = service.addDiplomeSteelToCollectionIfMissing([], diplome, diplome2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(diplome);
        expect(expectedResult).toContain(diplome2);
      });

      it('should accept null and undefined values', () => {
        const diplome: IDiplomeSteel = sampleWithRequiredData;
        expectedResult = service.addDiplomeSteelToCollectionIfMissing([], null, diplome, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(diplome);
      });

      it('should return initial array if no DiplomeSteel is added', () => {
        const diplomeCollection: IDiplomeSteel[] = [sampleWithRequiredData];
        expectedResult = service.addDiplomeSteelToCollectionIfMissing(diplomeCollection, undefined, null);
        expect(expectedResult).toEqual(diplomeCollection);
      });
    });

    describe('compareDiplomeSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDiplomeSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDiplomeSteel(entity1, entity2);
        const compareResult2 = service.compareDiplomeSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDiplomeSteel(entity1, entity2);
        const compareResult2 = service.compareDiplomeSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDiplomeSteel(entity1, entity2);
        const compareResult2 = service.compareDiplomeSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
