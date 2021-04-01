import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <h1>{{title}}</h1>

    <p>
      <span>banner works!</span>
      <span class="inner">lorem</span>
    </p>
    <h5>some header</h5>

    <div>
      <h2><span class="hero">{{hero.name | titlecase}}</span> details</h2>
      <input id="name" [(ngModel)]="hero.name" placeholder="name" />
    </div>

    <button (click)="handleClick()" class="hit-btn">Hit</button>
  `,
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BannerComponent implements OnInit {
  @Output() sendOutEmitter: EventEmitter<any> = new EventEmitter();

  title = 'Banner';
  hero = { name: '' }

  constructor() { }
  ngOnInit(): void {
    this.sendOutEmitter.subscribe(emittedData => console.log(emittedData));
  }

  handleClick() {
    this.sendOutEmitter.emit('hello');
  }
}
