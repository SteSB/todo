import { Routes } from '@angular/router';

import { AllComponent } from './all/all.component';
import { ClosedComponent } from './closed/closed.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
    {path: 'all', component: AllComponent},
    {path: 'closed', component: ClosedComponent},
    {path: 'add', component: AddComponent},
    {path: '', redirectTo: '/all', pathMatch: 'full'},
    {path: '**', redirectTo: '/all'}
];

