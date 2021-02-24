import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { from } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ModuleClass } from "./LazyLoading/Module"

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ModuleClass)
  .catch(err => console.error(err));
