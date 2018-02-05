import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6cd6e8bc = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _55f69000 = () => import('../pages/stories/index.vue' /* webpackChunkName: "pages/stories/index" */).then(m => m.default || m)
const _e189f8f0 = () => import('../pages/stories/_story_id/chapters/create.vue' /* webpackChunkName: "pages/stories/_story_id/chapters/create" */).then(m => m.default || m)
const _0afd8e50 = () => import('../pages/stories/_story_id/chapters/_chapter_id/update.vue' /* webpackChunkName: "pages/stories/_story_id/chapters/_chapter_id/update" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _6cd6e8bc,
			name: "index"
		},
		{
			path: "/stories",
			component: _55f69000,
			name: "stories"
		},
		{
			path: "/stories/:story_id/chapters/create",
			component: _e189f8f0,
			name: "stories-story_id-chapters-create"
		},
		{
			path: "/stories/:story_id/chapters/:chapter_id?/update",
			component: _0afd8e50,
			name: "stories-story_id-chapters-chapter_id-update"
		}
    ],
    fallback: false
  })
}
