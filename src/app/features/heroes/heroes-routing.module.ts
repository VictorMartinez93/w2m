import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HeroesComponent,
            },
            {
                path: 'create',
                component: HeroDetailComponent
            },
            {
                path: ':id',
                component: HeroDetailComponent
            },
            { path: '**', redirectTo: 'heroes' }
        ])
    ],
    exports: [RouterModule]
})
export class HeroesRoutingModule { }