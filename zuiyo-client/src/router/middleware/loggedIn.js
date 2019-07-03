export default function loggedIn({next, store}){
    if(store.getters.auth.loggedIn){
        return next({
            name: 'home'
        })
    }
    return next()
}