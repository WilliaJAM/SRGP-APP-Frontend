import {createRouter, createWebHistory} from 'vue-router'
import LayoutMain from '../components/LayoutMain.vue';
import address from '../views/address/address.vue';
import inventory from '../views/inventories/inventory.vue';
import countries from '../views/countries/country.vue';
import deparment from '../views/deparments/deparment.vue';
import bank from '../views/bank/bank.vue';
import cards from '../views/cards/card.vue';
import cardType from '../views/cardType/cardT.vue';
import cities from '../views/cities/city.vue';
import category from '../views/category/category.vue';
import customer from '../views/customer/customer.vue';
import detailsOfTheSale from '../views/detailOfTheSale/details.vue';
import internationalBrand from '../views/internationalBrand/international.vue';
import paymentMethods from '../views/paymentMethods/payment.vue';
import phone from '../views/phone/phone.vue';
import product from '../views/product/product.vue';
import rol from '../views/rol/rol.vue';
import sale from '../views/sale/sale.vue';
import supplier from '../views/supplier/supplier.vue';
import supplierProduct from '../views/supplierProduct/supplierProduct.vue';
import user from '../views/user/user.vue';


const routes = [

    {
        path:'/',
        name: 'LayoutMain',
        component: LayoutMain
    },
    {
        path:'/address',
        name: 'Address',
        component: address
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
        path: '/bank',
        name: 'Bank',
        component: bank
    },
    {
        path: '/cards',
        name: 'Cards',
        component: cards
    },
    {
        path: '/cardType',
        name: 'CradType',
        component: cardType
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
        path: '/internationalBrand',
        name: 'InternationalBrand',
        component: internationalBrand
    },
    {
        path: '/paymentMethods',
        name: 'PaymentMethods',
        component: paymentMethods
    },
    {
        path: '/phone',
        name: 'Phone',
        component: phone
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
        path: '/supplierProduct',
        name: 'SupplierProduct',
        component: supplierProduct
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