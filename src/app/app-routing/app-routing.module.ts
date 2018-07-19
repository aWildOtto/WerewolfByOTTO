import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeOlComponent } from '../ol/welcome-ol/welcome-ol.component';
import { MainAreaComponent } from '../ofl/main-area/main-area.component';
import { NotFoundComponent } from '../not-found/not-found.component';


const routes: Routes = [
  { path: '', component: WelcomeOlComponent},
  { path: 'offline', component: MainAreaComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
