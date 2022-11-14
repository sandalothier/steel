import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IComposantDocumentSteel } from '../composant-document-steel.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../composant-document-steel.test-samples';

import { ComposantDocumentSteelService } from './composant-document-steel.service';

const requireRestSample: IComposantDocumentSteel = {
  ...sampleWithRequiredData,
};

describe('ComposantDocumentSteel Service', () => {
  let service: ComposantDocumentSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: IComposantDocumentSteel | IComposantDocumentSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ComposantDocumentSteelService);
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

    it('should create a ComposantDocumentSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const composantDocument = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(composantDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ComposantDocumentSteel', () => {
      const composantDocument = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(composantDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ComposantDocumentSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ComposantDocumentSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ComposantDocumentSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addComposantDocumentSteelToCollectionIfMissing', () => {
      it('should add a ComposantDocumentSteel to an empty array', () => {
        const composantDocument: IComposantDocumentSteel = sampleWithRequiredData;
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing([], composantDocument);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(composantDocument);
      });

      it('should not add a ComposantDocumentSteel to an array that contains it', () => {
        const composantDocument: IComposantDocumentSteel = sampleWithRequiredData;
        const composantDocumentCollection: IComposantDocumentSteel[] = [
          {
            ...composantDocument,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing(composantDocumentCollection, composantDocument);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ComposantDocumentSteel to an array that doesn't contain it", () => {
        const composantDocument: IComposantDocumentSteel = sampleWithRequiredData;
        const composantDocumentCollection: IComposantDocumentSteel[] = [sampleWithPartialData];
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing(composantDocumentCollection, composantDocument);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(composantDocument);
      });

      it('should add only unique ComposantDocumentSteel to an array', () => {
        const composantDocumentArray: IComposantDocumentSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const composantDocumentCollection: IComposantDocumentSteel[] = [sampleWithRequiredData];
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing(composantDocumentCollection, ...composantDocumentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const composantDocument: IComposantDocumentSteel = sampleWithRequiredData;
        const composantDocument2: IComposantDocumentSteel = sampleWithPartialData;
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing([], composantDocument, composantDocument2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(composantDocument);
        expect(expectedResult).toContain(composantDocument2);
      });

      it('should accept null and undefined values', () => {
        const composantDocument: IComposantDocumentSteel = sampleWithRequiredData;
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing([], null, composantDocument, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(composantDocument);
      });

      it('should return initial array if no ComposantDocumentSteel is added', () => {
        const composantDocumentCollection: IComposantDocumentSteel[] = [sampleWithRequiredData];
        expectedResult = service.addComposantDocumentSteelToCollectionIfMissing(composantDocumentCollection, undefined, null);
        expect(expectedResult).toEqual(composantDocumentCollection);
      });
    });

    describe('compareComposantDocumentSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareComposantDocumentSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareComposantDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareComposantDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareComposantDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareComposantDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareComposantDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareComposantDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
