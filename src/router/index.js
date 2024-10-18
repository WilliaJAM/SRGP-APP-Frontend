import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home.vue'
import Inventory from '../views/invetory.vue'
import Login from '../views/login.vue'
import userProfile from '../views/userProfile.vue'
import adminPage from '../views/pageAdmin.vue'
import buyPage from '../views/buyPage.vue'
import Payment from '../views/payment.vue'
import historyPurchase from '../views/historyPurchase.vue'

const routes = [


    {
        path:'/home',
        name: 'Home',
        component: Home
    },
    {
        path:'/inventory',
        name: 'Inventory',
        component: Inventory
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/userProfile',
        name: 'userProfile',
        component: userProfile
    },
    {
        path: '/adminPage',
        name: 'adminPage',
        component: adminPage
    },
    {
        path: '/buyPage',
        name: 'buyPage',
        component: buyPage
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment
    },
    {
        path: '/historyPurchase',
        name: 'historyPurchase',
        component: historyPurchase
    },
];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;