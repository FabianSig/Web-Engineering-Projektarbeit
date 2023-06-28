import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonContainerComponent } from './comparison-container/comparison-container.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '' },
  { path: 'compare/:nameone/:nametwo', component: ComparisonContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
