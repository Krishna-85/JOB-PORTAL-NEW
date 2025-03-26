// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
 import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://ce538b8ada06ed3cfdea4c2a15e767e8@o4509020188377088.ingest.us.sentry.io/4509043209863168",
   
   
  integrations: [
    Sentry.mongooseIntegration()

  ],
   
  

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});

  