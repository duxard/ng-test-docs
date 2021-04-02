import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { TestBtnClickComponent } from './test-btn-click.component';
import { By } from '@angular/platform-browser';

describe('TestBtnClickComponent', () => {
  let component: TestBtnClickComponent;
  let fixture: ComponentFixture<TestBtnClickComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBtnClickComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestBtnClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should click Set button', waitForAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.set-button'));
    let p = fixture.debugElement.nativeElement.querySelector('p');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.personName).toBe('Mahesh');
      expect(p.textContent).toBe('Mahesh');
    });
  }));

  it('should click Send button with async', waitForAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.send-button'));

    spyOn(component, 'sendData');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(component.sendData).toHaveBeenCalled();
    });
  }));

  xit('should click Send button - synchronous analog', () => {
    let buttonElement = fixture.debugElement.query(By.css('.send-button'));
    spyOn(component, 'sendData');
    buttonElement.triggerEventHandler('click', null);
    expect(component.sendData).toHaveBeenCalled();
  });

  /*
    The fakeAsync is the Angular testing API that wraps a test function in a fake asynchronous test zone. The tick() simulates the asynchronous passage of time.
  */
  it('should click Send button with fakeAsync', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.send-button'));

    spyOn(component, 'sendData');
    // Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.sendData).toHaveBeenCalled();
  }));

  it('should click Edit button', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.edit-button'));

    spyOn(component, 'editPerson');
    // Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.editPerson).toHaveBeenCalled();
  }));

});
