import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
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
//@todo: rewrite the test
  it('spy on function', fakeAsync(() => {
    spyOn(component, 'foo').and.callFake(() => {
      console.log('functionName called');
      return 111;
    });
    tick(1000);
    expect(component.foo).toHaveBeenCalled();
  }));
});
