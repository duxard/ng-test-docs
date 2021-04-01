import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserService } from './user.service';
import { WelcomeComponent } from './welcome.component';

// Mock service for injection
let userServiceStub: Partial<UserService>;

xdescribe('WelcomeComponent', () => {
  let testInstance: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService;
  let el: HTMLElement;

  beforeEach(waitForAsync(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' },
    };

    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      // Don't provide the real service! Provide a test-double instead
      providers: [{ provide: UserService, useValue: userServiceStub }],
      //@todo: add schema
      schemas: []
    });
  
    fixture = TestBed.createComponent(WelcomeComponent);
    testInstance = fixture.componentInstance;
    /* UserService from the root injector: */
    // userService = TestBed.inject(UserService);
    /* OR: */
    userService = fixture.debugElement.injector.get(UserService);
    //  get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  }));
  afterEach(() => {
    fixture.destroy();
  });

  /////////////////////////////////////////////////////////////////////////
  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });
  
  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });
  
  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

});
