import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { TestBtnClickComponent } from './components/test-btn-click/test-btn-click.component';
import { SpyExamplesComponent } from './components/spy-examples/spy-examples.component';
import { PlaygroundComponent } from './playground/playground.component';
import { LibDmPanelComponent } from './components/lib-dm-panel/lib-dm-panel.component';
import { BtnClicksEmitComponent } from './components/btn-clicks-emit/btn-clicks-emit.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    WelcomeComponent,
    TestBtnClickComponent,
    SpyExamplesComponent,
    PlaygroundComponent,
    LibDmPanelComponent,
    BtnClicksEmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
