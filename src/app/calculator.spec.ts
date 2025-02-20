import { Calculator } from './calculator';

//Titulo del test
describe('Test for calculator', () => {

  describe('Tests for multiply', ()=>{
    it('#multiply should return nine', () => {
      //AAA
      //Arrange -> Prepare the class you want to test.
      const calculator = new Calculator();
      //Act -> Perform the action you are testing.
      const rta = calculator.multiply(3,3);
      //Assert -> Check the result of the action you are testing.
      expect(rta).toEqual(9);
    });
    it('#multiply should return four', () => {
      const calculator = new Calculator();
      const rta = calculator.multiply(1,4);
      expect(rta).toEqual(4);
    });
  })
  describe('tests for divide', ()=>{
    it('#divide should return a some numbers', () => {
      const calculator = new Calculator();
      expect(calculator.divide(6,3)).toEqual(2);
      expect(calculator.divide(5,2)).toEqual(2.5);
    });
    it('#divide for zero', () => {
      const calculator = new Calculator();
      expect(calculator.divide(6,0)).toBeNull();
      expect(calculator.divide(5,0)).toBeNull();
    });
    it('test matchers', () => {
      const name = 'Sebastian';
      let name2;
      //Si está definido
      expect(name).toBeDefined();
      //No está definido
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy(); //4
      expect(1 + 1 === 3).toBeFalsy();

      //menor que
      expect(5).toBeLessThan(10);
      //mayor que
      expect(20).toBeGreaterThan(10);

      expect('123456').toMatch(/123/);
      expect(['apples', 'oranges', 'pears']).toContain('oranges')
    });
  })



});
