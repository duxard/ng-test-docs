import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { SpyExamplesComponent } from './spy-examples.component';

describe('SpyExamplesComponent', () => {
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
