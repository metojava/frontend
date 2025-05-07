import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page'
      },
      {
        path: 'register',
        component: RegistrationFormComponent,
        title: 'Customer Registration'
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        title: 'Page Not Found'
      }
];
