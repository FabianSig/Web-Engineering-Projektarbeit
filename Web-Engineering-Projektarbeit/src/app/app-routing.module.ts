import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonContainerComponent } from './comparison-container/comparison-container.component';
import { AboutComponent } from './about/about.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '' },
  { path: 'compare/:nameone/:nametwo', component: ComparisonContainerComponent },
  { path: 'about', component: AboutComponent },
  { path: 'compare', component: CompareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
