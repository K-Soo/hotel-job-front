// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import environment from '@/environment';

Sentry.init({
  dsn: 'https://1c4677e53ca58408d8b46cc8fa48f198@o4509067262230528.ingest.us.sentry.io/4509067319705600',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: environment.appEnv === 'production',
});
