import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { SpyExamplesComponent } from './spy-examples.component';

describe('SpyExamplesComponent - #1', () => {
  let component: SpyExamplesComponent;
  let fixture: ComponentFixture<SpyExamplesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpyExamplesComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SpyExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   *  [spyOn] - allows to spy on method that already exists,
   *  method that is presented on a component
   */
  it('simple spy for function - #1', () => {
    spyOn(component, 'foo').and.callFake(() => {
      console.log('callFake called');
      return 111;
    });
    // function call
    component.foo();
    expect(component.foo).toHaveBeenCalled();
  });

  it('simple spy for function - #2', () => {
    spyOn(component, 'foo').withArgs(1, 2, 3).and.returnValue(42);

    expect(component.foo(1, 2, 3)).toBe(42);
    expect(component.foo).toHaveBeenCalledTimes(1);
  });
});


describe('Multiple spies created with createSpyObj() - example 1', () => {
  let ball;

  beforeEach(() => {
    ball = jasmine.createSpyObj('ball', ['roll', 'bounce', 'stop']);
  });

  it('should create multiple spy methods', () => {
      expect(ball.roll).toBeDefined();
      expect(ball.bounce).toBeDefined();
      expect(ball.stop).toBeDefined();
  });
});

describe('Multiple spies created with createSpyObj() - example 2', () => {
  let ball;

  beforeEach(() => {
    ball = jasmine.createSpyObj('ball', ['roll', 'bounce', 'stop']);
    ball.roll();
    ball.bounce(4);
    ball.stop();
  });

  it('should track the invoked spy methods', () => {
      expect(ball.roll).toHaveBeenCalled();
      expect(ball.bounce).toHaveBeenCalled();
      expect(ball.stop).toHaveBeenCalled();
  });
});

/**
 * [jasmine.createSpy(<name>)] -  method is useful when you do not have
 * any function to spy upon (non-existing method) or when the call to the original function
 * would inflict a lag in time (especially if it involves HTTP requests)
 */
describe('jasmine.createSpy examples', () => {
  let fakeMethod: jasmine.Spy;

  beforeEach(() => {
    fakeMethod = jasmine.createSpy('fakeMethodDemo');
    fakeMethod();
  });

  it('[jasmine.createSpy] - example 1', () => {
    expect(fakeMethod).toBeDefined();
  });
  it('[jasmine.createSpy] - example 2', () => {
    expect(fakeMethod).toHaveBeenCalled();
  });
  it('[jasmine.createSpy] - example 3', () => {
    expect(fakeMethod).toHaveBeenCalledTimes(1);
  });
});
