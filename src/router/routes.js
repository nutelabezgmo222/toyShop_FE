import HomePage from '@/components/Pages/HomePage';
import CatalogPage from '@/components/Pages/CatalogPage';
import BasketPage from '@/components/Pages/BasketPage';
import OrderPage from '@/components/Pages/Order/OrderPage';
import LoginPage from '@/components/Pages/LoginPage';
import RegistrationPage from '@/components/Pages/RegistrationPage';

import AdminPage from '@/components/Pages/Admin/AdminPage';
import AdminCreate from '@/components/Pages/Admin/AdminCreate';
import AdminDelete from '@/components/Pages/Admin/AdminDelete';

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
              path: 'delete',
              component: AdminDelete,
              name: 'AdminDelete'
          }
        ]
    },
]

export default routes;