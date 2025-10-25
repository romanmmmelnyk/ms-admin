<template>
  <div class="doc-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="breadcrumb-item" @click="$router.push('/documentation')">Documentation</span>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-current">{{ title }}</span>
          </div>
          <h1 class="page-title">{{ title }}</h1>
          <p class="page-description">{{ description }}</p>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <button class="action-btn" @click="toggleToc">
              <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              Table of Contents
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-layout">
      <!-- Table of Contents Sidebar -->
      <div class="toc-sidebar" :class="{ 'toc-visible': showToc }">
        <div class="toc-content">
          <h3 class="toc-title">Contents</h3>
          <nav class="toc-nav">
            <ul class="toc-list">
              <li v-for="section in sections" :key="section.id" class="toc-item">
                <a 
                  :href="`#${section.id}`" 
                  class="toc-link"
                  :class="{ 'toc-active': activeSection === section.id }"
                  @click="scrollToSection(section.id)"
                >
                  {{ section.title }}
                </a>
                <ul v-if="section.subsections" class="toc-sublist">
                  <li v-for="subsection in section.subsections" :key="subsection.id" class="toc-subitem">
                    <a 
                      :href="`#${subsection.id}`" 
                      class="toc-sublink"
                      :class="{ 'toc-active': activeSection === subsection.id }"
                      @click="scrollToSection(subsection.id)"
                    >
                      {{ subsection.title }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <div class="content-wrapper">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocContent',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    sections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showToc: false,
      activeSection: null
    }
  },
  mounted() {
    this.setupScrollSpy()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleToc() {
      this.showToc = !this.showToc
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      this.showToc = false
    },
    setupScrollSpy() {
      // Setup intersection observer for active section detection
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id
            }
          })
        },
        { rootMargin: '-20% 0px -70% 0px' }
      )

      // Observe all sections
      this.sections.forEach(section => {
        const element = document.getElementById(section.id)
        if (element) observer.observe(element)
        
        if (section.subsections) {
          section.subsections.forEach(subsection => {
            const subElement = document.getElementById(subsection.id)
            if (subElement) observer.observe(subElement)
          })
        }
      })
    },
    handleScroll() {
      // Additional scroll handling if needed
    }
  }
}
</script>

<style scoped>
.doc-content {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 3rem 0;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.header-left {
  color: white;
  flex: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.8;
}

.breadcrumb-item {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.breadcrumb-item:hover {
  opacity: 1;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  opacity: 0.6;
}

.breadcrumb-current {
  font-weight: 500;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 1.125rem;
  opacity: 0.85;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
  max-width: 600px;
}

.header-right {
  flex-shrink: 0;
  margin-left: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.action-icon {
  width: 1rem;
  height: 1rem;
}

/* Main Layout */
.main-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem 4rem;
  display: flex;
  gap: 4rem;
  position: relative;
}

/* Table of Contents */
.toc-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06);
  border-left: 1px solid rgba(226, 232, 240, 0.8);
  overflow-y: auto;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.toc-sidebar.toc-visible {
  transform: translateX(0);
  opacity: 1;
}

.toc-content {
  padding: 1.5rem;
}

.toc-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.toc-nav {
  font-size: 0.875rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.toc-link:hover,
.toc-link.toc-active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

.toc-sublist {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
}

.toc-subitem {
  margin-bottom: 0.25rem;
}

.toc-sublink {
  display: block;
  padding: 0.375rem 0.75rem 0.375rem 1.5rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.toc-sublink:hover,
.toc-sublink.toc-active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

/* Content Area */
.content-area {
  flex: 1;
  min-width: 0;
}

.content-wrapper {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-layout {
    padding: 0 2rem 3rem;
  }
  
  .header-content {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem 0;
    margin-bottom: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 0 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .main-layout {
    padding: 0 1.5rem 2rem;
  }
  
  .toc-sidebar {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .main-layout {
    padding: 0 1rem 1.5rem;
  }
}
</style>
