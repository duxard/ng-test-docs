import { CalculatorService } from './clalculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService' , () => {    

  it('should add two number - #1 - spyOn', () => {
    const logger = new LoggerService();
    const calculator = new CalculatorService(logger);
    spyOn(logger, 'log');
    const res = calculator.add(1,2);

    expect(res).toBe(3);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should add two number - #2 - createSpyObj', () => {
    /*
      mock logger service dependency
      we are interested intesting the component itself
      all dependencies should be mocked
    */
    const logger = jasmine.createSpyObj('LoggerService', ['log'])  
    const calculator = new CalculatorService(logger);
    const res = calculator.add(1,2);

    expect(res).toBe(3);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

});