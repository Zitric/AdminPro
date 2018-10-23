import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncreaserComponent } from '../components/increaser/increaser.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
    IncreaserComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component
  ]
})

export class PagesModule { }
