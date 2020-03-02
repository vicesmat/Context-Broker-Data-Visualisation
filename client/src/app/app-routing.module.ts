import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'map-dashboard',
    loadChildren: () => import('./map-dashboard/map-dashboard.module').then(m => m.MapDashboardModule)
  },
  {
    path: '',
    redirectTo: 'map-dashboard',
    pathMatch: 'full'
  },
  { path: 'stats-dashboard', loadChildren: () => import('./stats-dashboard/stats-dashboard.module').then(m => m.StatsDashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }