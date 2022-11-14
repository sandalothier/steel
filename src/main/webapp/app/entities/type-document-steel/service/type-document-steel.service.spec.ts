import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeDocumentSteel } from '../type-document-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../type-document-steel.test-samples';

import { TypeDocumentSteelService } from './type-document-steel.service';

const requireRestSample: ITypeDocumentSteel = {
  ...sampleWithRequiredData,
};

describe('TypeDocumentSteel Service', () => {
  let service: TypeDocumentSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: ITypeDocumentSteel | ITypeDocumentSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypeDocumentSteelService);
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

    it('should create a TypeDocumentSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const typeDocument = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(typeDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypeDocumentSteel', () => {
      const typeDocument = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(typeDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypeDocumentSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypeDocumentSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TypeDocumentSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTypeDocumentSteelToCollectionIfMissing', () => {
      it('should add a TypeDocumentSteel to an empty array', () => {
        const typeDocument: ITypeDocumentSteel = sampleWithRequiredData;
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing([], typeDocument);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should not add a TypeDocumentSteel to an array that contains it', () => {
        const typeDocument: ITypeDocumentSteel = sampleWithRequiredData;
        const typeDocumentCollection: ITypeDocumentSteel[] = [
          {
            ...typeDocument,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing(typeDocumentCollection, typeDocument);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypeDocumentSteel to an array that doesn't contain it", () => {
        const typeDocument: ITypeDocumentSteel = sampleWithRequiredData;
        const typeDocumentCollection: ITypeDocumentSteel[] = [sampleWithPartialData];
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing(typeDocumentCollection, typeDocument);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should add only unique TypeDocumentSteel to an array', () => {
        const typeDocumentArray: ITypeDocumentSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const typeDocumentCollection: ITypeDocumentSteel[] = [sampleWithRequiredData];
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing(typeDocumentCollection, ...typeDocumentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typeDocument: ITypeDocumentSteel = sampleWithRequiredData;
        const typeDocument2: ITypeDocumentSteel = sampleWithPartialData;
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing([], typeDocument, typeDocument2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeDocument);
        expect(expectedResult).toContain(typeDocument2);
      });

      it('should accept null and undefined values', () => {
        const typeDocument: ITypeDocumentSteel = sampleWithRequiredData;
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing([], null, typeDocument, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should return initial array if no TypeDocumentSteel is added', () => {
        const typeDocumentCollection: ITypeDocumentSteel[] = [sampleWithRequiredData];
        expectedResult = service.addTypeDocumentSteelToCollectionIfMissing(typeDocumentCollection, undefined, null);
        expect(expectedResult).toEqual(typeDocumentCollection);
      });
    });

    describe('compareTypeDocumentSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTypeDocumentSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTypeDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareTypeDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTypeDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareTypeDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTypeDocumentSteel(entity1, entity2);
        const compareResult2 = service.compareTypeDocumentSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
