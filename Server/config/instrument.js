// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://15ef18ea0f1251206b7336fabd7ac299@o4509020188377088.ingest.us.sentry.io/4509020195389440",
  integrations:[
    Sentry.nodeContextIntegration(),
    Sentry.mongoIntegration()
  ],

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});