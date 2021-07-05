import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-btn-clicks-emit',
  templateUrl: './btn-clicks-emit.component.html',
  styleUrls: ['./btn-clicks-emit.component.scss']
})
export class BtnClicksEmitComponent implements AfterContentInit {
  @HostBinding('attr.data-tid') tid = 'btn-click-emit';
  @Input() content: string;
  @Output() btnEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hostEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  state = true;
  @HostListener('click', ['$event']) hostClick(): void {
    this.hostEventEmitter.emit();
  }

  onButtonClick(): void {
    this.state = !this.state;
    this.btnEventEmitter.emit(this.state);
  }

  dummyMethod(): string {
    return 'hello from BtnClicksEmitComponent';
  }

  ngAfterContentInit(): any {
    this.delayedPromise()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  private delayedPromise(): Promise<string> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('Promise has been resolved');
      }, this.getRandomTime(1000, 15000));
    });
  }

  private getRandomTime(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
