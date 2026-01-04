import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ✅ No change needed here, just ensure you have appConfig with provideHttpClient()
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
