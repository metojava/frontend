import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
        loadComponent: () =>  import('./registration-form/registration-form.component').then((c) => c.RegistrationFormComponent),
        title: 'Customer Registration'
      },
      {
        path: 'contact',
        loadComponent: () =>  import('./contact-form/contact-form.component').then((c) => c.ContactFormComponent),
        title: 'Contact Form'
      },
      
      {
        path: '**',
        component: PageNotFoundComponent,
        title: 'Page Not Found'
      }
];
