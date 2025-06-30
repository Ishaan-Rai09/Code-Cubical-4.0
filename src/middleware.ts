import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/upload',
  '/api/analysis(.*)',
  '/api/patients(.*)',
  '/api/reports(.*)',
  '/api/payments(.*)',
  '/api/subscription(.*)',
  '/api/generate-pdf',
  '/api/generate-pdf-pinata',
  '/api/user-data'
])

// Allow test routes without authentication
const isTestRoute = createRouteMatcher([
  '/api/test-db',
  '/api/test-upload',
  '/api/test-env'
])

export default clerkMiddleware((auth, req) => {
  if (isTestRoute(req)) {
    // Allow test routes without authentication
    return
  }
  if (isProtectedRoute(req)) {
    auth.protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}