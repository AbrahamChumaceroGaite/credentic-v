import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './components/preview/preview.component';
import { NonPageComponent } from './components/non-page/non-page.component';
import { ViewportComponent } from './components/viewport/viewport.component';

const routes: Routes = [

{ path: 'certificado/codigo/:id', component: PreviewComponent},
{ path: 'certificado/chk/codigo/:id', component: PreviewComponent},
{ path: 'certificado/qr/codigo/:id', component: PreviewComponent},
{ path: 'certificado/pdf/:id', component: ViewportComponent},
{ path: 'certificado/404', component: NonPageComponent},
{ path: '**', redirectTo: 'certificado/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
