import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {

    it('should save a center', ()=>{
       //hacemos como una version de esta funcion
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGeoLocation = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 1000,
              longitude: 2000,
              speed: 0,
            },
            timestamp: 0,
          } as GeolocationPosition;;
          successFn(mockGeoLocation);
        });
        //Act
        mapService.getCurrentPosition();
        //Assert
        expect(mapService.center.lat).toEqual(1000);
        expect(mapService.center.lng).toEqual(2000);
    })
  });
});
