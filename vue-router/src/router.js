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
            // beforeEnter: (to, from, next) => {
            //     if (from.name === "users") next();
            //     else next('/');
            // },
            component: () => import("./views/About.vue")
        }
    ];
    const user = [
        {
            path: "/users",
            name: "users",
            component: () => import("./views/Users.vue"),
            children: [
                {
                    path: ":id",
                    name: "users-detail",
                    component: () => import("./views/UsersDetail.vue")
                },
                {
                    path: ":id/users-edit",
                    name: "users-edit",
                    component: () => import("./views/UsersEdit")
                }
            ]
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
