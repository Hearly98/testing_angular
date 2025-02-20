import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './product.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { Auth } from '../models/auth.model';
import { environment } from '../environment/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, TokenService],
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return access token', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token: '121212',
      };
      const email = 'hearly@gmail.com';
      const password = '1212';
      //no llama a la funcion real pero si lo espía
      spyOn(tokenService, 'saveToken').and.callThrough();
      //Act
      authService.login(email, password).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
        //http config
            const url = `${environment.API_URL}/api/v1/auth/login`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
    });
  });
  describe('test for login', () => {
    it('should call to access token', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token: '121212',
      };
      const email = 'hearly@gmail.com';
      const password = '1212';
      //no llama a la funcion real pero si lo espía
      spyOn(tokenService, 'saveToken').and.callThrough();
      //Act
      authService.login(email, password).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1),
        //Aqui indicamos que el token deberia de haber guardando con este argumento
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212'),
        doneFn();
      });
        //http config
            const url = `${environment.API_URL}/api/v1/auth/login`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
    });
  });
});
