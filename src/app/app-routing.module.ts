import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'heroes', loadChildren: () => import('./features/heroes/heroes.module').then(m => m.HeroesModule) }
    ]
  },
  { path: '**', redirectTo: 'heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
