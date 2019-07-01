import loggedIn from '../middleware/loggedIn'
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/common/Login.vue'),
    meta:{
      middleware:[loggedIn]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/common/Register.vue'),
    meta:{
      middleware:[loggedIn]
    }
  }
]
