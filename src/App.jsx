import { Suspense, lazy } from 'react'
import { Router, Switch, Route, Redirect } from 'wouter'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import { PageSkeleton } from './components/Skeleton'

/**
 * The landing fork is imported eagerly because it is the first paint for most
 * visitors and has to render without waiting on a chunk. Everything past the
 * fork is split, so arriving at / never downloads the chapter page, the
 * business page, the team page and the operations manual up front.
 */
const Chapter = lazy(() => import('./pages/Chapter'))
const Business = lazy(() => import('./pages/Business'))
const Team = lazy(() => import('./pages/Team'))
const About = lazy(() => import('./pages/About'))
const Manual = lazy(() => import('./pages/Manual'))
const Apply = lazy(() => import('./pages/Apply'))

export default function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Layout>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/chapter">
            <Suspense fallback={<PageSkeleton />}>
              <Chapter />
            </Suspense>
          </Route>
          <Route path="/business">
            <Suspense fallback={<PageSkeleton />}>
              <Business />
            </Suspense>
          </Route>
          <Route path="/team">
            <Suspense fallback={<PageSkeleton />}>
              <Team />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<PageSkeleton />}>
              <About />
            </Suspense>
          </Route>
          <Route path="/manual">
            <Suspense fallback={<PageSkeleton />}>
              <Manual />
            </Suspense>
          </Route>
          <Route path="/apply">
            <Suspense fallback={<PageSkeleton />}>
              <Apply />
            </Suspense>
          </Route>

          {/* Old links already in the wild. /chapter is now a real page, so
              only the retired gate redirects. */}
          <Route path="/enter">
            <Redirect href="/" replace />
          </Route>
          <Route>
            <Redirect href="/" replace />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

