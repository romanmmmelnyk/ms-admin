import { createRouter, createWebHistory } from 'vue-router'
import HealthCheck from '../views/HealthCheck.vue'
import { authService } from '../services/auth.js'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/health-check',
    name: 'HealthCheck',
    component: HealthCheck
  },
  {
    path: '/sites',
    name: 'Sites',
    component: () => import('../views/Sites.vue')
  },
  {
    path: '/instances',
    name: 'Instances',
    component: () => import('../views/Instances.vue')
  },
        {
          path: '/domains',
          name: 'Domains',
          component: () => import('../views/Domains.vue')
        },
        {
          path: '/ports',
          name: 'Ports',
          component: () => import('../views/Ports.vue')
        },
        {
          path: '/hosting',
          name: 'Hosting',
          component: () => import('../views/Hosting.vue')
        },
        {
          path: '/models',
          name: 'Models',
          component: () => import('../views/Models.vue')
        },
        {
          path: '/documentation',
          name: 'Documentation',
          component: () => import('../views/Documentation.vue')
        },
        {
          path: '/documentation/getting-started',
          name: 'GettingStarted',
          component: () => import('../views/GettingStarted.vue')
        },
        {
          path: '/documentation/api-reference',
          name: 'ApiReference',
          component: () => import('../views/ApiReference.vue')
        },
        {
          path: '/documentation/infrastructure',
          name: 'Infrastructure',
          component: () => import('../views/Infrastructure.vue')
        },
        {
          path: '/404',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'CatchAll',
          redirect: '/404'
        }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Define valid routes for security validation
const validRoutes = [
  '/login',
  '/dashboard',
  '/sites',
  '/instances',
  '/domains',
  '/ports',
  '/hosting',
  '/models',
  '/documentation',
  '/documentation/getting-started',
  '/documentation/api-reference',
  '/documentation/infrastructure',
  '/health-check',
  '/404'
]

// Route guard for authentication and page existence
router.beforeEach(async (to, from, next) => {
  try {
    // STEP 1: Check if user is authenticated
    const isAuthenticated = authService.isLoggedIn()
    
    // STEP 2: Validate route exists
    const isValidRoute = validRoutes.includes(to.path)
    
    // STEP 3: Determine if route requires authentication
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)
    
    // Security Logic:
    
    // Case 1: Not authenticated and trying to access protected route
    if (requiresAuth && !isAuthenticated) {
      console.warn(`Security: Unauthenticated access attempt to ${to.path}`)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // Case 2: Authenticated but trying to access login page
    if (to.path === '/login' && isAuthenticated) {
      console.log(`Security: Authenticated user redirected from login page`)
      next('/dashboard')
      return
    }
    
    // Case 3: Invalid route (doesn't exist in our valid routes)
    if (!isValidRoute) {
      console.error(`Security: Invalid route access attempt: ${to.path}`)
      // Redirect to dashboard if authenticated, login if not
      const redirectPath = isAuthenticated ? '/dashboard' : '/login'
      next(redirectPath)
      return
    }
    
    // Case 4: Valid route and proper authentication state
    console.log(`Security: Valid access to ${to.path}`)
    next()
    
  } catch (error) {
    console.error('Route guard error:', error)
    // On error, redirect to login for safety
    next('/login')
  }
})

export default router
