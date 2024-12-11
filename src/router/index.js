import {createRouter, createWebHistory} from 'vue-router'
import LayoutMain from '../components/LayoutMain.vue';
import inventory from '../views/inventories/inventory.vue';
import countries from '../views/countries/country.vue';
import cities from '../views/cities/city.vue';
import category from '../views/category/category.vue';
import customer from '../views/customer/customer.vue';
import detailsOfTheSale from '../views/detailOfTheSale/details.vue';
import product from '../views/product/product.vue';
import rol from '../views/rol/rol.vue';
import sale from '../views/sale/sale.vue';
import supplier from '../views/supplier/supplier.vue';
import user from '../views/user/user.vue';
import deparment from '../views/deparments/deparment.vue'


const routes = [

    {
        path:'/',
        name: 'LayoutMain',
        component: LayoutMain
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: inventory
    },
    {
        path: '/countries',
        name: 'Country',
        component: countries
    },
    {
        path: '/deparment',
        name: 'Department',
        component: deparment
    },
    {
        path: '/cities',
        name: 'City',
        component: cities
    },
    {
        path: '/category',
        name: 'Category',
        component: category
    },
    {
        path: '/customer',
        name: 'Customer',
        component: customer
    },
    {
        path: '/details',
        name: 'Details',
        component: detailsOfTheSale
    },
    {
        path: '/product',
        name: 'Product',
        component: product
    },
    {
        path: '/rol',
        name: 'Rol',
        component: rol
    },
    {
        path: '/sale',
        name: 'Sale',
        component: sale
    },
    {
        path: '/supplier',
        name: 'Supplier',
        component: supplier
    },
    {
        path: '/user',
        name: 'User',
        component: user
    },
    

];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;