import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductsService } from './product.service';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../environment/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  HTTP_INTERCEPTORS,
  HttpStatusCode,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { TokenService } from './token.service';

describe('ProductService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
      imports: [HttpClientTestingModule],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a Product List', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      //manera de usar spy
      spyOn(tokenService, 'getToken').and.returnValue('123')
      //Act
      productService.getAllSimple().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual(`Bearer 123`)
      req.flush(mockData);
    });
  });

  describe('test for getAll', () => {
    it('should return a Product List', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
    it('should return Product List with taxes', (doneFn) => {
      //Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //100 * 0.19  = taxes -> 19
        },
        {
          ...generateOneProduct(),
          price: 200, //200 * 0.19  = taxes -> 38
        },
        {
          ...generateOneProduct(),
          price: 0, //200 * 0.19  = 0
        },
        {
          ...generateOneProduct(),
          price: -200, //200 * 0.19  = 0
        },
      ];
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
  it('should return query params with limit 10 and offset 3', (doneFn) => {
    //Arrange
    const mockData: Product[] = generateManyProducts(3);
    const limit = 10;
    const offset = 3;
    //Act
    productService.getAll(limit, offset).subscribe((data) => {
      //Assert
      expect(data.length).toEqual(mockData.length);
      doneFn();
    });

    //http config
    const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
    const params = req.request.params;
    expect(params.get('limit')).toEqual(`${limit}`);
    expect(params.get('offset')).toEqual(`${offset}`);
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dtoCreate: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'asdsad',
        categoryId: 12,
      };
      //Act
      productService.create({ ...dtoCreate }).subscribe((response) => {
        //Assert
        expect(response).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      //asi prevenimos que no se modifique los datos antes de enviar
      expect(req.request.body).toEqual(dtoCreate);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for update', () => {
    it('should return a product updated', (doneFn) => {
      const mockData = generateOneProduct();
      const dtoUpdate: UpdateProductDTO = {
        price: 10,
      };
      //Act
      productService
        .update(mockData.id, { ...dtoUpdate })
        .subscribe((response) => {
          //Assert
          expect(response).toEqual(mockData);
          doneFn();
        });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      //asi prevenimos que no se modifique los datos antes de enviar
      expect(req.request.body).toEqual(dtoUpdate);
      expect(req.request.method).toEqual('PUT');
    });
  });
  describe('test for delete', () => {
    it('should return a product updated', (doneFn) => {
      const mockData = true;
      const productId = '1';
      //Act
      productService.delete(productId).subscribe((response) => {
        //Assert
        expect(response).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });
  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      //Arrange
      const mockData: Product = generateOneProduct();
      const productId: string = '1';
      //Act
      productService.getOne(productId).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });
    it('should return the right message when the status code is 404', (doneFn) => {
      //Arrange
      const productId: string = '1';
      const messageError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };
      //Act
      productService.getOne(productId).subscribe({
        //error
        error: (error) => {
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(messageError, mockError);
    });
  });
});
