import HomePage from '@/components/Pages/HomePage';
import CatalogPage from '@/components/Pages/CatalogPage';
import BasketPage from '@/components/Pages/BasketPage';
import OrderPage from '@/components/Pages/Order/OrderPage';
import LoginPage from '@/components/Pages/LoginPage';
import RegistrationPage from '@/components/Pages/RegistrationPage';
import ProfilePage from '@/components/Pages/Profile/ProfilePage';
import PersonalInfoPage from '@/components/Pages/Profile/PersonalInfoPage';
import PersonalOrdersPage from '@/components/Pages/Profile/PersonalOrdersPage';

import AdminPage from '@/components/Pages/Admin/AdminPage';
import AdminCreate from '@/components/Pages/Admin/AdminCreate';
import AdminOrders from '@/components/Pages/Admin/AdminOrders';

const routes = [
    { path: '/', component: HomePage },
    { 
        path: '/register',
        component: RegistrationPage,
        props: true
    },
    { 
        path: '/login',
        component: LoginPage,
    },
    { 
        path: '/basket',
        component: BasketPage,
    },
    { 
        path: '/order',
        component: OrderPage,
    },
    { 
        path: '/profile',
        component: ProfilePage,
        redirect: '/profile/info',
        children: [
            {
                path: 'info',
                component: PersonalInfoPage
            },
            {
                path: 'orders',
                component: PersonalOrdersPage
            }
        ]
    },
    { 
        path: '/catalog',
        component: CatalogPage
    },
    { 
        path: '/catalog/category/:categoryId/subcategory/:subCategoryId',
        component: CatalogPage,
        props: true
    },
    { 
        path: '/admin',
        component: AdminPage,
        children: [
           {
              path: 'create',
              component: AdminCreate,
              name: 'AdminCreate'
           },
           {
              path: 'orders',
              component: AdminOrders,
              name: 'AdminOrders'
          }
        ]
    },
]

export default routes;