
import { MasterService } from './master.service';
import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';
describe('MasterService', () => {
  let masterService: MasterService;
  let spy = jasmine.createSpyObj('ValueService', ['getValue']);
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [MasterService,
        {provide: ValueService, useValue: spy}
      ]
    });
    masterService = TestBed.inject(MasterService);
    spy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  });
  it('should be create', ()=>{
    expect(masterService).toBeTruthy();
  });
  /*
  it('should return "my Value" from the real service' , () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);

    expect(masterService.getValue()).toBe('my value');
  });
  it('should return "other value" from the fake service', ()=>{
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  })

  it('should return "other value" from the fake object', ()=>{
    const fake = {getValue: ()=> 'fake from object'};
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  })*/

  it('should call to getValue from ValueService', ()=>{
    spy.getValue.and.returnValue('fake value')
    expect(masterService.getValue()).toBe('fake value');
    expect(spy.getValue).toHaveBeenCalled();
    expect(spy.getValue).toHaveBeenCalledTimes(1);

  })
});
