import * as Sentry from '@sentry/nextjs';
import environment from '@/environment';

Sentry.init({
  dsn: 'https://1c4677e53ca58408d8b46cc8fa48f198@o4509067262230528.ingest.us.sentry.io/4509067319705600',

  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: environment.appEnv === 'production',
});
