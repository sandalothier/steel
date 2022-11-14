import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISuccursaleSteel } from '../succursale-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../succursale-steel.test-samples';

import { SuccursaleSteelService } from './succursale-steel.service';

const requireRestSample: ISuccursaleSteel = {
  ...sampleWithRequiredData,
};

describe('SuccursaleSteel Service', () => {
  let service: SuccursaleSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: ISuccursaleSteel | ISuccursaleSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SuccursaleSteelService);
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

    it('should create a SuccursaleSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const succursale = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(succursale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SuccursaleSteel', () => {
      const succursale = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(succursale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SuccursaleSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SuccursaleSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SuccursaleSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSuccursaleSteelToCollectionIfMissing', () => {
      it('should add a SuccursaleSteel to an empty array', () => {
        const succursale: ISuccursaleSteel = sampleWithRequiredData;
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing([], succursale);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(succursale);
      });

      it('should not add a SuccursaleSteel to an array that contains it', () => {
        const succursale: ISuccursaleSteel = sampleWithRequiredData;
        const succursaleCollection: ISuccursaleSteel[] = [
          {
            ...succursale,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing(succursaleCollection, succursale);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SuccursaleSteel to an array that doesn't contain it", () => {
        const succursale: ISuccursaleSteel = sampleWithRequiredData;
        const succursaleCollection: ISuccursaleSteel[] = [sampleWithPartialData];
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing(succursaleCollection, succursale);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(succursale);
      });

      it('should add only unique SuccursaleSteel to an array', () => {
        const succursaleArray: ISuccursaleSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const succursaleCollection: ISuccursaleSteel[] = [sampleWithRequiredData];
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing(succursaleCollection, ...succursaleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const succursale: ISuccursaleSteel = sampleWithRequiredData;
        const succursale2: ISuccursaleSteel = sampleWithPartialData;
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing([], succursale, succursale2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(succursale);
        expect(expectedResult).toContain(succursale2);
      });

      it('should accept null and undefined values', () => {
        const succursale: ISuccursaleSteel = sampleWithRequiredData;
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing([], null, succursale, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(succursale);
      });

      it('should return initial array if no SuccursaleSteel is added', () => {
        const succursaleCollection: ISuccursaleSteel[] = [sampleWithRequiredData];
        expectedResult = service.addSuccursaleSteelToCollectionIfMissing(succursaleCollection, undefined, null);
        expect(expectedResult).toEqual(succursaleCollection);
      });
    });

    describe('compareSuccursaleSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSuccursaleSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSuccursaleSteel(entity1, entity2);
        const compareResult2 = service.compareSuccursaleSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSuccursaleSteel(entity1, entity2);
        const compareResult2 = service.compareSuccursaleSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSuccursaleSteel(entity1, entity2);
        const compareResult2 = service.compareSuccursaleSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
