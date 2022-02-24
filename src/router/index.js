import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    redirect: '/users',
    name: 'Main',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/views/categories/index.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/views/orders/index.vue')
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import('@/views/params/index.vue')
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import('@/views/reports/index.vue')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import('@/views/rights/index.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('@/views/roles/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/no-found/no-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      return '/main'
    }
  }
})

export default router
