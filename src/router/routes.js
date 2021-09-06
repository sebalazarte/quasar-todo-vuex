
import isAuthenticatedGuard from './auth-guard'

const routes = [
  {
    path: '/',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'todo', component: () => import('pages/Todo.vue') },
      { path: '/help', name: 'help', component: () => import('pages/Help.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/register', name:'register', component: () => import('pages/Register.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
