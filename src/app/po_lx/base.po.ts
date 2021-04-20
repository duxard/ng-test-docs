import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export interface IPageObjectParams {
  /**
   *  Defines root element to use for this PO
   */
  root?: DebugElement;
  /**
   *  Specifies a parent PO
   */
  parent?: PageObject;
}

export class PageObject {
  protected rootDebugElement: DebugElement;
  protected parentPageObject: PageObject;

  constructor(params: IPageObjectParams) {
    const { root, parent } = params;

    this.rootDebugElement = root;
    this.parentPageObject = parent;
  }

  /**
   *  Return test id of a root element of a component/directive or element connected with this PO
   *  Should ne overridden by inheritors
   */
  get tid(): string {
    throw new Error(`No test id was specified for ${this.getLogName()}`);
  }

  get root(): DebugElement {
    if (this.rootDebugElement) {
      return this.rootDebugElement;
    } else if (this.parentPageObject) {
      return this.queryBySelector(this.getParentElement(), this.getRootTreeSelector());
    } else {
      throw new Error(
        `No root element or parent object  was specified for ${this.getLogName()}`
      );
    }
  }

  /**
   * Provides all DebugElements that match root css-selector
   */
  get roots(): DebugElement[] {
    if (this.parentPageObject) {
      return this.queryAllBySelector(this.getParentElement(), this.getRootTreeSelector());
    } else {
      throw new Error(`No parent page object to query for ${this.getLogName()}`);
    }
  }

  /**
   * Resolves whether a root element of this PO is a child of a given DebugElement or not
   */
  isChildOf(element: DebugElement): boolean {
    return Boolean(this.queryBySelector(element, this.getRootSelector()));
  }

  isExisting(): boolean {
    return Boolean(this.root);
  }

  /**
   * Queries given element for ones with provided test ids
   * @Note Spec tests should not call this method directly. Instead, wrap elements querying
   * into getter/method within PO and make it public
   */
  protected queryBySelector(element: DebugElement, cssQuery: string): DebugElement {
    return element.query(By.css(cssQuery));
  }

  /**
   * Queries given element for ones with provided test ids
   * @Note Spec tests should not call this method directly. Instead, wrap elements querying
   * into getter/method within PO and make it public
   */
  protected queryAllBySelector(element: DebugElement, cssQuery: string): DebugElement[] {
    return element.queryAll(By.css(cssQuery));
  }

  /**
   * Queries given element for ones with provided test ids
   * @Note Spec tests should not call this method directly. Instead, wrap elements querying
   * into getter/method within PO and make it public
   */
  protected queryByTestId(element: DebugElement, ...tids: string[]): DebugElement {
    return this.queryBySelector(element, this.getTestIdSelector(...tids));
  }

  /**
   * Queries given element for ones with provided test ids
   * @Note Spec tests should not call this method directly. Instead, wrap elements querying
   * into getter/method within PO and make it public
   */
  protected queryAllByTestId(element: DebugElement, ...tids: string[]): DebugElement[] {
    return this.queryAllBySelector(element, this.getTestIdSelector(...tids));
  }

  /**
   * Returns a CSS selector for provided test id
   */
  private getTestIdSelector(...tids: string[]): string {
    return tids
      .map(tid => `[data-tid=${tid}]`)
      .join(' ');
  }

  /**
   * Searches for a parent DebugElement within PageObject tree
   * (as a rule, the one provided by fixture.debugElement)
   */
  private getParentElement(): DebugElement {
    if (this.rootDebugElement) {
      return this.rootDebugElement;
    } else if (this.parentPageObject) {
      return this.parentPageObject.getParentElement();
    } else {
      throw new Error(`No root element was found in PageObject tree`);
    }
  }

  /**
   * Constructs a CSS selector for a root element
   */
  private getRootSelector(): string {
    return this.getTestIdSelector(this.tid);
  }

  /**
   * Constructs a CSS selector for a root element considering PageObject tree hierarchy
   */
  private getRootTreeSelector(): string {
    const rootSelector = this.getRootSelector();

    return this.parentPageObject
      ? `${this.parentPageObject.getRootTreeSelector()} ${rootSelector}`
      : rootSelector;
  }

  private getLogName(): string {
    return this.constructor.name;
  }
}
