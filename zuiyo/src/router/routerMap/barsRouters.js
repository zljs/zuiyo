import Home from '@/views/bars/Home'
let barsRouters = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      showBar: true
    }
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import(/* webpackChunkName: "about" */ '@/views/bars/Dynamic'),
    meta:{
      showBar: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "about" */ '@/views/bars/News'),
    meta:{
      showBar: true
    }
  },
  {
    path: '/mycenter',
    name: 'mycenter',
    component: () => import(/* webpackChunkName: "about" */ '@/views/bars/MyCenter'),
    meta:{
      showBar: true
    }
  }
]

export default barsRouters