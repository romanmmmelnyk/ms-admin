<template>
  <div id="app" class="app-container">
    <!-- Route Loader (Shows during navigation) -->
    <RouteLoader v-if="isNavigating" />
    
    <!-- Login Page Layout (No Sidebar/Header) -->
    <div v-else-if="isLoginPage" class="login-layout">
      <router-view />
    </div>
    
    <!-- 404 Page Layout (No Sidebar/Header) -->
    <div v-else-if="isNotFoundPage" class="not-found-layout">
      <router-view />
    </div>
    
    <!-- Authenticated Layout (With Sidebar/Header) -->
    <div v-else-if="shouldShowLayout" class="app-layout">
      <!-- Sidebar -->
      <div class="sidebar-container" :class="{ 'sidebar-hidden': !sidebarOpen }">
        <Sidebar @close-sidebar="handleSidebarClose" />
      </div>
      
      <!-- Main Content -->
      <div class="main-content-area">
        <!-- Top Header -->
        <TopHeader @toggle-sidebar="handleSidebarToggle" />
        
        <!-- Page Content -->
        <main class="page-content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import TopHeader from './components/TopHeader.vue'
import RouteLoader from './components/RouteLoader.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    TopHeader,
    RouteLoader
  },
  data() {
    return {
      sidebarOpen: window.innerWidth > 768, // Open by default on desktop, closed on mobile
      isNavigating: false
    }
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login'
    },
    isNotFoundPage() {
      return this.$route.path === '/404'
    },
    shouldShowLayout() {
      return !this.isLoginPage && !this.isNotFoundPage
    }
  },
  async mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    
    // Listen for route changes to show loader
    this.$router.beforeEach((to, from, next) => {
      this.isNavigating = true
      next()
    })
    
    this.$router.afterEach(() => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        this.isNavigating = false
      }, 100)
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleSidebarToggle() {
      this.sidebarOpen = !this.sidebarOpen
    },
    handleSidebarClose() {
      this.sidebarOpen = false
    },
    handleResize() {
      // Auto-close sidebar on mobile when resizing to mobile
      if (window.innerWidth <= 768) {
        this.sidebarOpen = false
      } else {
        this.sidebarOpen = true
      }
    }
  }
}
</script>

<style>
/* App Layout Styles */
.app-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Login Layout - Full Screen, No Sidebar/Header */
.login-layout {
  min-height: 100vh;
  width: 100%;
}

/* 404 Layout - Full Screen, No Sidebar/Header */
.not-found-layout {
  min-height: 100vh;
  width: 100%;
}

/* Authenticated Layout - With Sidebar/Header */
.app-layout {
  display: flex;
}

.sidebar-container {
  width: 20rem;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: transform 0.3s ease;
}

.sidebar-container.sidebar-hidden {
  transform: translateX(-100%);
}

.main-content-area {
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
}

/* Remove old header styles - now handled by TopHeader component */

.page-content {
  padding: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar-container {
    position: fixed;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .main-content-area {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .sidebar-container {
    width: 20rem;
  }
}

@media (max-width: 640px) {
  .sidebar-container {
    width: 20rem;
  }
}
</style>
