import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ FormsModule ],
      //@todo: add schema
      schemas: []
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create toBeTruthy', () => {
    expect(component).toBeTruthy();
  });

  it('should create toBeDefined', () => {
    expect(component).toBeDefined();
  });

  it('should display original title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(component.title);
  });

  it('fixture.detectChanges() - should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Test Title');
  });

  it('should find the <span> with fixture.nativeElement', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should find the <span> with fixture.debugElement.nativeElement', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const span = bannerEl.querySelector('.inner');
    expect(span.textContent).toEqual('lorem');
  });

  it('should find the <h5> with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const headerDe = bannerDe.query(By.css('h5'));
    const h5: HTMLElement = headerDe.nativeElement;
    expect(h5.textContent).toEqual('some header');
  });

  it('Change an input value with dispatchEvent()', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span.hero');
    // simulate user entering a new name into the input box
    nameInput.value = 'quick BROWN fOxie';
    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
    expect(nameDisplay.textContent).toBe('Quick Brown Foxie');
  });

  it('tests: Event Emitter - emit value on btn click - debugElement [sync]', () => {
    // spy on event emitter
    spyOn(component.sendOutEmitter, 'emit');

    // trigger the click
    const hitBtnDe: DebugElement = fixture.debugElement.query(By.css('.hit-btn'));
    hitBtnDe.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(component.sendOutEmitter.emit).toHaveBeenCalledWith('hello');
  });

  it('tests: Event Emitter - emit value on btn click - nativeElement [sync]', () => {
    // spy on event emitter
    spyOn(component.sendOutEmitter, 'emit');
    
    // trigger the click
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelector('.hit-btn');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.sendOutEmitter.emit).toHaveBeenCalledWith('hello');
  });

});
