import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyExamplesComponent } from './spy-examples.component';

describe('SpyExamplesComponent', () => {
  let component: SpyExamplesComponent;
  let fixture: ComponentFixture<SpyExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpyExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
