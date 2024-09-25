import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { TopnavComponent } from '../components/topnav/topnav.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

