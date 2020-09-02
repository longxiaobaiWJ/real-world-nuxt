import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ae921c7a = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _6f309b45 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _1db29dc5 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _65310f64 = () => interopDefault(import('..\\pages\\article\\_slug.vue' /* webpackChunkName: "pages/article/_slug" */))
const _1231371a = () => interopDefault(import('..\\pages\\editor\\_slug.vue' /* webpackChunkName: "pages/editor/_slug" */))
const _81b49b34 = () => interopDefault(import('..\\pages\\profile\\_username.vue' /* webpackChunkName: "pages/profile/_username" */))
const _d5589270 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _ae921c7a,
    name: "login"
  }, {
    path: "/register",
    component: _6f309b45,
    name: "register"
  }, {
    path: "/settings",
    component: _1db29dc5,
    name: "settings"
  }, {
    path: "/article/:slug?",
    component: _65310f64,
    name: "article-slug"
  }, {
    path: "/editor/:slug?",
    component: _1231371a,
    name: "editor-slug"
  }, {
    path: "/profile/:username?",
    component: _81b49b34,
    name: "profile-username"
  }, {
    path: "/",
    component: _d5589270,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
