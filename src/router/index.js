import Vue from 'vue'
import VueRouter from 'vue-router'

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'

import store from 'Store'
import session from 'Session'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'main-dashboard',
      component: () => import(/*webpachChunkName: 'dashboard'*/'Views/dashboard')

   },

   {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('Views/admin/login'),
      beforeEnter: (to, from, next) => {

         if (store.getters['Customer/getClientSession']) {
            next({ name: 'MovieRecord' })
         }

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
      ],
      beforeEnter: (to, from, next) => {
         if (store.getters['Admin/getAdminSessionStatus']) {
            next()
         } else {
            next({ name: 'main-dashboard' })
         }
      }
   },
   {
      path: '/client',
      redirect: 'client/record',
      component: () => import('Views/client'),
      children: [
         {
            path: 'record',
            name: 'MovieRecord',
            component: () => import('Views/client/movieRecord'),
            meta: {
               requireAuth: true
            }
         },
         {
            path: 'client-profile',
            name: 'ClientProfile',
            component: () => import('Views/client/profile'),
            meta: {
               requireAuth: true
            }
         },
         {
            path: 'client-checkout',
            name: 'ClientCheckout',
            component: () => import('Views/client/checkOut'),
            meta: {
               requireAuth: true
            }
         }
      ],
      beforeEnter: (to, from, next) => {
         if (store.getters['Admin/getAdminSessionStatus']) {
            next({ name: 'AdminDashboard' })
         }

         if (store.getters['Customer/getClientSession']) {
            next()
         } else {
            next({ name: 'main-dashboard' })
         }
      }
   },
   {
      path: '/403',
      alias: "*",
      name: '403',
      component: () => import('Views/403')
   },
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   Nprogress.start()

   if (to.matched.some(route => route.meta.requireAuth)) {

      if (session.exists()) {
         next()
      } else {
         next({ name: 'main-dashboard' })
      }
   } else {
      next()
   }


})

router.afterEach((to, from) => {
   Nprogress.done()

})

export default router
