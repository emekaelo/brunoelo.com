import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioHomeComponent } from './portfolio-home/portfolio-home.component';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    children: [
      { path: '', component: PortfolioHomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
