import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-lib-dm-panel>
      <slot name="header">
        <span>Title</span>
      </slot>
      <slot name="body">
        <span>Content</span>
      </slot>
    </app-lib-dm-panel>
  `
})
class TestComponent {}

describe('LibDmPanelComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testEl = fixture.debugElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should contain header content', () => {
    const header = testEl.query(By.css('slot[name=\'header\']'));
    expect(header.nativeElement.textContent).toBe('Title');
  });

  it('should contain body content', () => {
    const body = testEl.query(By.css('slot[name=\'body\']'));
    expect(body.nativeElement.textContent).toBe('Content');
  });
});
