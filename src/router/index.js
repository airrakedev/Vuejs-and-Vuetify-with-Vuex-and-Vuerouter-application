import Vue from 'vue'
import VueRouter from 'vue-router'

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'

import store from 'Store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-dashboard',
    component: () => import('Views/dashboard')

  },
  {
    path: '*',
    name: '403',
    component: () => import('Views/403')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('Views/admin/login'),
    beforeEnter: (to, from, next) => {
      if (store.getters['Admin/getAdminSessionStatus']) {
        next({ name: 'AdminDashboard' })
      } else {
        next()
      }
    }
  },
  {
    path: '/admin',
    redirect: 'admin/dashboard',
    component: () => import('Views/admin'),
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('Views/admin/dashboard'),
        meta: {
          requireAuth: true
        }

      },
      {
        path: 'movie-list',
        name: 'AdminMovieList',
        component: () => import('Views/admin/movieList'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'all-clients',
        name: 'AllClientList',
        component: () => import('Views/admin/clientList'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'admin-profile',
        name: 'AdminProfile',
        component: () => import('Views/admin/adminProfile'),
        meta: {
          requireAuth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()

  if (to.matched.some(route => route.meta.requireAuth)) {
    if (store.getters['Admin/getAdminSessionStatus']) {
      next()
    } else {
      next({ name: 'main-dashboard' })
    }
  } else {
    // if (store.getters[ 'Admin/getAdminSessionStatus' ]) {
    //   next({ name: 'AdminDashboard' })
    // } else {
    //   next()
    // }
    next()
  }


})

router.afterEach((to, from) => {
  Nprogress.done()

})

export default router
