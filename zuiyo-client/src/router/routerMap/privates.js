import auth from '../middleware/auth'
export default [
    {
        name: 'privates',
        path: '/privates',
        component: () => import(/* webpackChunkName: "about" */ '@/views/privates'),
        meta: {
            middleware:[auth]
        }
    }
]