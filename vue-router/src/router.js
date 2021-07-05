import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = () => {
    const home = [
        {
            path: "/",
            name: "home",
            component: () => import("./views/Home.vue")
        }
    ];
    const about = [
        {
            path: "/about",
            name: "about",
            component: () => import("./views/About.vue")
        }
    ];
    const user = [
        {
            path: "/users/:id",
            name: "users",
            component: () => import("./views/Users.vue")
        }
    ]
    return [
        ...home,
        ...about,
        ...user,
        {
            path: "*",
            redirect: "/error",
        },
    ];
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes()
})
