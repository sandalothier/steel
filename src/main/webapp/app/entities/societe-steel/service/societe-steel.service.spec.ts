import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISocieteSteel } from '../societe-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../societe-steel.test-samples';

import { SocieteSteelService } from './societe-steel.service';

const requireRestSample: ISocieteSteel = {
  ...sampleWithRequiredData,
};

describe('SocieteSteel Service', () => {
  let service: SocieteSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: ISocieteSteel | ISocieteSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SocieteSteelService);
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

    it('should create a SocieteSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const societe = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(societe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SocieteSteel', () => {
      const societe = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(societe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SocieteSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SocieteSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SocieteSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSocieteSteelToCollectionIfMissing', () => {
      it('should add a SocieteSteel to an empty array', () => {
        const societe: ISocieteSteel = sampleWithRequiredData;
        expectedResult = service.addSocieteSteelToCollectionIfMissing([], societe);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(societe);
      });

      it('should not add a SocieteSteel to an array that contains it', () => {
        const societe: ISocieteSteel = sampleWithRequiredData;
        const societeCollection: ISocieteSteel[] = [
          {
            ...societe,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSocieteSteelToCollectionIfMissing(societeCollection, societe);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SocieteSteel to an array that doesn't contain it", () => {
        const societe: ISocieteSteel = sampleWithRequiredData;
        const societeCollection: ISocieteSteel[] = [sampleWithPartialData];
        expectedResult = service.addSocieteSteelToCollectionIfMissing(societeCollection, societe);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(societe);
      });

      it('should add only unique SocieteSteel to an array', () => {
        const societeArray: ISocieteSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const societeCollection: ISocieteSteel[] = [sampleWithRequiredData];
        expectedResult = service.addSocieteSteelToCollectionIfMissing(societeCollection, ...societeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const societe: ISocieteSteel = sampleWithRequiredData;
        const societe2: ISocieteSteel = sampleWithPartialData;
        expectedResult = service.addSocieteSteelToCollectionIfMissing([], societe, societe2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(societe);
        expect(expectedResult).toContain(societe2);
      });

      it('should accept null and undefined values', () => {
        const societe: ISocieteSteel = sampleWithRequiredData;
        expectedResult = service.addSocieteSteelToCollectionIfMissing([], null, societe, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(societe);
      });

      it('should return initial array if no SocieteSteel is added', () => {
        const societeCollection: ISocieteSteel[] = [sampleWithRequiredData];
        expectedResult = service.addSocieteSteelToCollectionIfMissing(societeCollection, undefined, null);
        expect(expectedResult).toEqual(societeCollection);
      });
    });

    describe('compareSocieteSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSocieteSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSocieteSteel(entity1, entity2);
        const compareResult2 = service.compareSocieteSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSocieteSteel(entity1, entity2);
        const compareResult2 = service.compareSocieteSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSocieteSteel(entity1, entity2);
        const compareResult2 = service.compareSocieteSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
