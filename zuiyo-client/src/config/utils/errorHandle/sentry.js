import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import errorPlugin from './errorPlugin.js'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://f3bf9595003e46daa67e2c0f217a47f5@sentry.io/1474473',
    integrations: [new Integrations.Vue({ Vue, attachProps: true }), new Integrations.RewriteFrames()],
    release: process.env.RELEASE_VERSION
  })
} else {
  Vue.use(errorPlugin)
}
