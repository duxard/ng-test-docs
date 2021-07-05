import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnClicksEmitComponent } from './btn-clicks-emit.component';
import { PageObject } from '../../po_lx/base.po';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { textFlatten } from '../../utils/utils';

@Component({
  template: `
    <app-btn-clicks-emit 
      [content]="content" 
      (btnEventEmitter)="onBtnClick()"
      (hostEventEmitter)="onHostClick()"
    ></app-btn-clicks-emit>
  `
})
class TestBtnClicksEmitComponent {
  @ViewChild(BtnClicksEmitComponent, {static: true}) testChild: BtnClicksEmitComponent;
  content = 'Click me';
  onBtnClick(): void {}
  onHostClick(): void {}
}

export class BtnClicksEmitComponentPageObject extends PageObject {
  get hostElement(): DebugElement {
    return this.root.query(By.css('app-btn-clicks-emit'));
  }

  get button(): DebugElement {
    return this.root.query(By.css('button'));
  }

  get header(): DebugElement {
    return this.root.query(By.css('h5'));
  }

  get label(): DebugElement {
    return this.root.query(By.css('label'));
  }

  /**
   * Example of fetching element by TID:
   */
  get box(): DebugElement {
    return this.queryByTestId(this.root, 'lorem-box');
  }

  // PO methods:
  getBoxText(): string {
    return textFlatten(this.box.nativeElement.textContent);
  }

  getHeaderText(): string {
    return textFlatten(this.header.nativeElement.textContent);
  }

  getLabelText(): string {
    return textFlatten(this.label.nativeElement.textContent);
  }

  clickOnHost(): void {
    this.hostElement.triggerEventHandler('click', null);
  }

  clickOnBtn(): void {
    this.button.triggerEventHandler('click', null);
  }
}

describe('BtnClicksEmitComponent', () => {
  // testInstance - it's a wrapper around BtnClicksEmitComponent component
  let testInstance: TestBtnClicksEmitComponent;

  // testChild BtnClicksEmitComponent component itself
  let testChild: BtnClicksEmitComponent;

  let fixture: ComponentFixture<TestBtnClicksEmitComponent>;
  let pageObject: BtnClicksEmitComponentPageObject;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnClicksEmitComponent, TestBtnClicksEmitComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBtnClicksEmitComponent);
    testInstance = fixture.componentInstance;
    testChild = testInstance.testChild;
    fixture.detectChanges();

    pageObject = new BtnClicksEmitComponentPageObject({root: fixture.debugElement});
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(testInstance).toBeTruthy();
  });

  it('checks header text', () => {
    expect(pageObject.getHeaderText()).toEqual('header');
  });

  it('checks label text', () => {
    expect(pageObject.getBoxText()).toEqual('lorem impsum dolorum');
  });

  it('checks box text', () => {
    expect(pageObject.getLabelText()).toEqual('just label');
  });

  it('should emit on host click', () => {
    spyOn(testInstance, 'onHostClick');
    pageObject.clickOnHost();
    expect(testInstance.onHostClick).toHaveBeenCalled();
  });

  it('should emit on btn click', () => {
    spyOn(testInstance, 'onBtnClick');
    pageObject.clickOnBtn();
    expect(testInstance.onBtnClick).toHaveBeenCalled();
  });

  it('should say hello from inside testChild', () => {
    expect(testChild.dummyMethod()).toEqual('hello from BtnClicksEmitComponent');
  });
});
