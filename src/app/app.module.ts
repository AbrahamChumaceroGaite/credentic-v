import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NebularLibraryModule } from './modules/nebular-library/nebular-library.module';
import { PrimengLibraryModule } from './modules/primeng-library/primeng-library.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { NonPageComponent } from './components/non-page/non-page.component';
import { HttpClientModule } from '@angular/common/http';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { ViewportComponent } from './components/viewport/viewport.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "skyblue",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "three-strings",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "skyblue",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "skyblue",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
  };
@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NonPageComponent,
    ViewportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
