import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  })


  it('should be create', ()=>{
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', ()=>{
    it('should return "my value"', ()=>{
      expect(service.getValue()).toBe('my value');
    })
  })
  describe('Test for getValue', ()=>{
    it('should change "my value"', ()=>{
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    })
  })

  describe('Test for getPromiseValue', ()=>{
    it('should return "promise value" form promise', (doneFn)=>{
      service.getPromiseValue()
      .then((value)=>{
        expect(value).toBe('promise value');
        doneFn();
      })
    })
    it('should return "promise value" form promise using async', async ()=>{
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value')
    })
  })
  describe('Test for getObservableValue', ()=>{
    it('should return "observable value" form observable', (doneFn)=>{
      service.getObservableValue().subscribe((response)=>{
        expect(response).toBe('observable value');
        doneFn();
      })
    })
  })
});
