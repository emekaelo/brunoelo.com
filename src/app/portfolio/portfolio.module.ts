import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioHomeComponent } from './portfolio-home/portfolio-home.component';

@NgModule({
  declarations: [PortfolioComponent, PortfolioHomeComponent],
  imports: [CommonModule, PortfolioRoutingModule],
})
export class PortfolioModule {}
