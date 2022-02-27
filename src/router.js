import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: "notFound",
        path: "/:path(.*)+",
        redirect: {
            name: "home",
        },
    },
    {
        name: "home",
        path: "/",
        component: () => import("./view/home"),
        meta: {
            title: "首页",
        },
    },
    {
        name: "appointment",
        path: "/appointment",
        component: () => import("./view/appointment"),
        meta: {
            title: "预约场地",
        },
    },
    {
        name: "appointmentList",
        path: "/appointmentList",
        component: () => import("./view/appointmentList"),
        meta: {
            title: "预约记录",
        },
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export { router };
